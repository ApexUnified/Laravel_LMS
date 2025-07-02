<?php

namespace App\Repositories\Lessons\Repository;

use App\Models\Course;
use App\Models\Lesson;
use App\Repositories\Lessons\Interface\LessonRepositoryInterface;
use Cloudinary\Cloudinary;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LessonRepository implements LessonRepositoryInterface
{
    public function __construct(
        private Lesson $lesson,
        private Cloudinary $cloudinary,
        private Course $course
    ) {}

    public function getLessons(Request $request)
    {
        $lessons = $this->lesson->query()->latest();

        $search = $request->filled('search') ? $request->search : null;
        if ($request->filled('search')) {
            $lessons = $lessons->where('title', 'like', '%'.$search.'%');
        }

        $category_id = $request->filled('category_id') ? $request->category_id : '';
        if ($request->filled('category_id')) {
            $lessons = $lessons->whereHas('course', function ($query) use ($category_id) {
                $query->where('category_id', $category_id);
            });
        }

        $course_id = $request->filled('course_id') ? $request->course_id : '';
        if ($request->filled('course_id')) {
            $lessons = $lessons->whereHas('course', function ($query) use ($course_id) {
                $query->where('id', $course_id);
            });
        }

        $instructor_id = $request->filled('instructor_id') ? $request->instructor_id : '';
        if ($request->filled('instructor_id')) {
            $lessons = $lessons->whereHas('course', function ($query) use ($instructor_id) {
                $query->where('instructor_id', $instructor_id);
            });
        }

        $lessons = $lessons->with(['course', 'course.instructor', 'course.category'])->paginate(10);

        $lessons->getCollection()->transform(function ($lesson) {

            $lesson->added_at = $lesson->created_at->format('Y-m-d g:i A');

            return $lesson;
        });

        return [
            'lessons' => $lessons,
            'search' => $search,
            'category_id' => $category_id,
            'course_id' => $course_id,
            'instructor_id' => $instructor_id,
        ];
    }

    public function getLesson(string $slug)
    {
        $lesson = $this->lesson->with(['course'])->where('slug', $slug)->first();

        if (empty($lesson)) {
            return ['status' => false, 'message' => 'Lesson Not Found!'];
        }

        return $lesson;
    }

    public function storeLesson(Request $request)
    {

        $validated_req = $request->validate([
            'title' => 'required|string',
            'description' => 'required',
            'course_id' => 'required|exists:courses,id',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'video' => 'required|mimes:mp4,webm,ogg,avi|max:10485760',
            'attachments' => 'nullable|array',
            'attachments.*' => 'nullable|mimes:jpeg,png,jpg,pdf,doc,docx,ppt,pptx,xls,xlsx|max:5048',
            'is_published' => 'nullable|boolean',
            'is_approved' => 'nullable|boolean',
        ], [
            'thumbnail.max' => 'Thumbnail size should be less than Or Equal To 2MB',
            'video.max' => 'Video size should be less than Or Equal To 10GB',
            'course_id.exists' => 'Selected Course does not exist',
            'course_id.required' => 'Course is required',
        ]);

        $description = trim(strip_tags($validated_req['description']));

        if (Str::length($description) < 20) {
            throw ValidationException::withMessages([
                'description' => 'Description is required And Its length should be more than 20 characters.',
            ]);
        }

        if ($request->hasFile('video')) {
            try {
                $file = $request->file('video');
                $renamedFile = time().uniqid();

                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Lessons/Videos',
                    'public_id' => $renamedFile,
                    'resource_type' => 'video',
                ]);

                if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                    return ['status' => false, 'message' => 'Something went wrong! While uploading video.'];
                }

                $validated_req['video'] = $movedToCloudaniry['secure_url'];
                $validated_req['video_public_id'] = $movedToCloudaniry['public_id'];
                $validated_req['video_duration'] = $movedToCloudaniry['duration'];
            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading video. '.$e->getMessage()];
            }
        }

        if ($request->hasFile('attachments')) {
            try {
                $attachments = [];
                $files = $request->file('attachments');

                foreach ($files as $file) {

                    $renamedFile = time().uniqid();

                    $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                        'folder' => 'ApexUnified_LMS/Lessons/Attachments',
                        'public_id' => $renamedFile,
                        'resource_type' => 'auto',
                    ]);

                    if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                        return ['status' => false, 'message' => 'Something went wrong! While uploading attachments.'];
                    }

                    $attachments[] = [
                        'secure_url' => $movedToCloudaniry['secure_url'],
                        'public_id' => $movedToCloudaniry['public_id'],
                    ];

                }

                $validated_req['attachments'] = $attachments;

            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading attachments. '.$e->getMessage()];
            }

        }

        if ($request->hasFile('thumbnail')) {
            try {
                $file = $request->file('thumbnail');
                $renamedFile = time().uniqid();

                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Lessons/Thumbnails',
                    'public_id' => $renamedFile,
                    'resource_type' => 'image',
                    'transformation' => [
                        'width' => 1280,
                        'height' => 720,
                        'crop' => 'limit',
                        'quality' => 'auto:best',
                    ],
                ]);

                if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                    return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail.'];
                }

                $validated_req['thumbnail'] = $movedToCloudaniry['secure_url'];
                $validated_req['thumbnail_public_id'] = $movedToCloudaniry['public_id'];
            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail. '.$e->getMessage()];
            }
        }

        $validated_req['slug'] = Str::slug($validated_req['title']).substr(uniqid(), 2, 5);

        $validated_req['description'] = json_encode($request->description);

        if ($this->lesson->create($validated_req)) {
            return ['status' => true, 'message' => 'Lesson created successfully.'];
        } else {
            return ['status' => false, 'message' => 'Something went wrong! While creating Lesson.'];
        }

    }

    public function updateLesson(Request $request, string $slug)
    {
        $validated_req = $request->validate([
            'title' => 'required|string',
            'description' => 'required',
            'course_id' => 'required|exists:courses,id',
            ...($request->hasFile('thumbnail') ? ['thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'] : []),
            ...($request->hasFile('video') ? ['video' => 'nullable|mimes:mp4,webm,ogg,avi|max:10485760'] : []),
            ...($request->hasFile('attachments') ? [
                'attachments' => 'nullable|array',
                'attachments.*' => 'nullable|mimes:jpeg,png,jpg,pdf,doc,docx,ppt,pptx,xls,xlsx|max:5048',
            ] : []),
            'is_published' => 'nullable|boolean',
            'is_approved' => 'nullable|boolean',
        ], [
            ...($request->hasFile('thumbnail') ? ['thumbnail.max' => 'Thumbnail size should be less than Or Equal To 2MB'] : []),
            ...($request->hasFile('video') ? ['video.max' => 'Video size should be less than Or Equal To 10GB'] : []),
            'course_id.exists' => 'Selected Course does not exist',
            'course_id.required' => 'Course is required',
        ]);

        $lesson = $this->getLesson($slug);

        if (isset($lesson['status']) && $lesson['status'] === false) {
            return ['status' => false, 'message' => $lesson['message']];
        }

        $description = trim(strip_tags($validated_req['description']));

        if (Str::length($description) < 20) {
            throw ValidationException::withMessages([
                'description' => 'Description is required And Its length should be more than 20 characters.',
            ]);
        }

        if (empty($lesson->thumbnail)) {
            $request->validate(['thumbnail' => 'required']);
        }

        if (empty($lesson->video)) {
            $request->validate(['video' => 'required']);
        }

        if ($request->hasFile('video')) {
            try {
                $file = $request->file('video');
                $renamedFile = time().uniqid();

                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Lessons/Videos',
                    'public_id' => $renamedFile,
                    'resource_type' => 'video',
                ]);

                if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                    return ['status' => false, 'message' => 'Something went wrong! While uploading video.'];
                }

                if (! empty($lesson->video) && ! empty($lesson->video_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($lesson->video_public_id, [
                        'resource_type' => 'video',
                    ]);
                }

                $validated_req['video'] = $movedToCloudaniry['secure_url'];
                $validated_req['video_public_id'] = $movedToCloudaniry['public_id'];
                $validated_req['video_duration'] = $movedToCloudaniry['duration'];
            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading video. '.$e->getMessage()];
            }
        }

        if ($request->hasFile('attachments')) {

            try {
                $attachments = [];
                $files = $request->file('attachments');

                foreach ($files as $file) {

                    $renamedFile = time().uniqid();

                    $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                        'folder' => 'ApexUnified_LMS/Lessons/Attachments',
                        'public_id' => $renamedFile,
                        'resource_type' => 'auto',
                    ]);

                    if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                        return ['status' => false, 'message' => 'Something went wrong! While uploading attachments.'];
                    }

                    if (! blank($lesson->attachments) && isset($lesson->attachments[0]['public_id']) && isset($lesson->attachments[0]['secure_url'])) {
                        foreach ($lesson->attachments as $attachment) {
                            if (isset($attachment['public_id']) && isset($attachment['secure_url'])) {
                                $this->cloudinary->uploadApi()->destroy($attachment['public_id']);
                            }
                        }
                    }

                    $attachments[] = [
                        'secure_url' => $movedToCloudaniry['secure_url'],
                        'public_id' => $movedToCloudaniry['public_id'],
                    ];
                }

                $validated_req['attachments'] = $attachments;

            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading attachments. '.$e->getMessage()];
            }

        }

        if ($request->hasFile('thumbnail')) {
            try {
                $file = $request->file('thumbnail');
                $renamedFile = time().uniqid();

                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Lessons/Thumbnails',
                    'public_id' => $renamedFile,
                    'resource_type' => 'image',
                    'transformation' => [
                        'width' => 1280,
                        'height' => 720,
                        'crop' => 'limit',
                        'quality' => 'auto:best',
                    ],
                ]);

                if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                    return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail.'];
                }

                if (! empty($lesson->thumbnail) && ! empty($lesson->thumbnail_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($lesson->thumbnail_public_id);
                }

                $validated_req['thumbnail'] = $movedToCloudaniry['secure_url'];
                $validated_req['thumbnail_public_id'] = $movedToCloudaniry['public_id'];
            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail. '.$e->getMessage()];
            }
        }

        if ($validated_req['title'] != $lesson->title) {
            $validated_req['slug'] = Str::slug($validated_req['title']).substr(uniqid(), 2, 5);
        }

        $validated_req['description'] = json_encode($request->description);

        if ($lesson->update($validated_req)) {
            return ['status' => true, 'message' => 'Lesson updated successfully.'];
        } else {
            return ['status' => false, 'message' => 'Something went wrong! While updating Lesson.'];
        }
    }

    public function destroyLesson(string $id)
    {
        try {
            $lesson = $this->lesson->find($id);

            if (empty($lesson)) {
                return ['status' => false, 'message' => 'Lesson Not Found!'];
            }

            if (! empty($lesson->video) && ! empty($lesson->video_public_id)) {
                $this->cloudinary->uploadApi()->destroy($lesson->video_public_id, [
                    'resource_type' => 'video',
                ]);
            }

            if (! blank($lesson->attachments) && isset($lesson->attachments[0]['public_id']) && isset($lesson->attachments[0]['secure_url'])) {
                foreach ($lesson->attachments as $attachment) {
                    if (isset($attachment['public_id']) && isset($attachment['secure_url'])) {
                        $this->cloudinary->uploadApi()->destroy($attachment['public_id']);
                    }
                }
            }

            if (! empty($lesson->thumbnail) && ! empty($lesson->thumbnail_public_id)) {
                $this->cloudinary->uploadApi()->destroy($lesson->thumbnail_public_id);
            }

            if ($lesson->delete()) {
                return ['status' => true, 'message' => 'Lesson deleted successfully.'];
            } else {
                return ['status' => false, 'message' => 'Something went wrong while deleting Lesson.'];
            }

        } catch (Exception $e) {
            return ['status' => false, 'message' => 'Something went wrong while deleting Lesson. '.$e->getMessage()];
        }

    }

    public function destroyLessonBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');
            $deleted = 0;
            if (blank($ids)) {
                return ['status' => false, 'message' => 'Please select at least one lesson.'];
            }

            $lessons = $this->lesson->whereIn('id', $ids)->get();
            foreach ($lessons as $lesson) {

                if (! empty($lesson->video) && ! empty($lesson->video_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($lesson->video_public_id, [
                        'resource_type' => 'video',
                    ]);
                }

                if (! blank($lesson->attachments) && isset($lesson->attachments[0]['public_id']) && isset($lesson->attachments[0]['secure_url'])) {
                    foreach ($lesson->attachments as $attachment) {
                        if (isset($attachment['public_id']) && isset($attachment['secure_url'])) {
                            $this->cloudinary->uploadApi()->destroy($attachment['public_id']);
                        }
                    }
                }

                if (! empty($lesson->thumbnail) && ! empty($lesson->thumbnail_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($lesson->thumbnail_public_id);
                }

                $lesson->delete();
                $deleted++;
            }

            return $deleted === count($ids) ?
            ['status' => true, 'message' => 'Lessons deleted successfully.']
            :
            ['status' => false, 'message' => 'Something went wrong while deleting Lessons.'];

        } catch (Exception $e) {
            return ['status' => false, 'message' => 'Something went wrong while deleting Lessons. '.$e->getMessage()];
        }
    }

    public function getCourses()
    {
        return $this->course->all();
    }
}
