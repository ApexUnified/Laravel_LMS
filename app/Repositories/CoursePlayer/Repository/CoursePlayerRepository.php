<?php

namespace App\Repositories\CoursePlayer\Repository;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Repositories\CoursePlayer\Interface\CoursePlayerRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CoursePlayerRepository implements CoursePlayerRepositoryInterface
{
    public function __construct(
        private Course $course,
        private Lesson $lesson,
        private LessonProgress $lessonProgress
    ) {}

    public function getCourse($course_slug)
    {
        $scopeQuery = $this->course
            ->where('slug', $course_slug);

        if (Auth::user()->hasRole('Student')) {
            $scopeQuery->where('is_published', true)
                ->where('is_approved', true)
                ->with(['lessons' => function ($query) {
                    $query->where('is_published', true)
                        ->where('is_approved', true);
                }, 'instructor']);

        } else {
            $scopeQuery->with(['lessons', 'instructor']);
        }

        $course = $scopeQuery->first();

        if (empty($course)) {
            return ['status' => false, 'message' => 'Course not found! Or Course Might Be Not Approved Please Check Approval Statuses'];
        }

        $is_user_enrolled = (bool) Auth::user()->enrollments()->where('course_id', $course->id)->first();

        if (! Auth::user()->hasRole('Student')) {
            $is_user_enrolled = true;
        }

        return ['course' => $course, 'is_user_enrolled' => $is_user_enrolled];
    }

    public function getLesson($course_slug, $lesson_slug)
    {
        $lesson = $this->lesson
            ->whereHas('course', function ($query) use ($course_slug) {
                $query->where('slug', $course_slug);
            })
            ->where('slug', $lesson_slug)
            ->when(Auth::user()->hasRole('Student'), function ($query) {
                $query->where('is_published', true)
                    ->where('is_approved', true);
            })
            ->with(['course'])
            ->first();

        if (empty($lesson)) {
            return ['status' => false, 'message' => 'Lesson not found! Or Lesson Might Be Not Approved Please Check Approval Statuses'];
        }

        return $lesson;
    }

    public function UpdateLessonProgress(Request $request)
    {
        $validated_req = $request->validate([
            'course_id' => 'required',
            'lesson_id' => 'required',
            'user_id' => 'required',
            'lesson_watched_time' => 'required',
        ]);

        $alreadyExistsLessonProgress = $this->lessonProgress
            ->where('course_id', $validated_req['course_id'])
            ->where('lesson_id', $validated_req['lesson_id'])
            ->where('user_id', $validated_req['user_id'])
            ->first();

        if (empty($alreadyExistsLessonProgress)) {

            if ($request->boolean('completed')) {
                $validated_req['completed_at'] = now();
                $validated_req['completed'] = true;
            }

            if ($this->lessonProgress->create($validated_req)) {
                return ['status' => true, 'message' => 'Lesson Progress Updated Successfully'];
            } else {
                return ['status' => false, 'message' => 'Something went wrong'];
            }
        } else {

            if (! $alreadyExistsLessonProgress->completed && empty($alreadyExistsLessonProgress->completed_at)) {
                if ($request->boolean('completed') && empty($alreadyExistsLessonProgress->completed_at) && ! $alreadyExistsLessonProgress->completed) {
                    $validated_req['completed_at'] = now();
                    $validated_req['completed'] = true;
                }

                if ($alreadyExistsLessonProgress->update($validated_req)) {
                    return ['status' => true, 'message' => 'Lesson Progress Updated Successfully'];
                } else {
                    return ['status' => false, 'message' => 'Something went wrong'];
                }
            }
        }

        return ['status' => true, 'message' => 'Lesson Progress Updated Successfully'];

    }

    public function getCourseProgress(string $course_id)
    {
        $course = $this->course->find($course_id);

        if (empty($course)) {
            return ['status' => false, 'message' => 'Course not found'];
        }

        $lessons = $course->lessons()->get();
        $lessons_progress = $lessons->pluck('lesson_progress')->where('completed', 1)->all();

        $total_course_progress = ! blank($lessons_progress) ? (count($lessons_progress) / count($lessons) * 100) : 0;

        return round($total_course_progress);

    }
}
