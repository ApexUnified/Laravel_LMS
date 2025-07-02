<?php

namespace App\Repositories\Courses\Repository;

use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use Cloudinary\Cloudinary;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Role;

class CourseRepository implements CoursesRepositoryInterface
{
    public function __construct(
        private Course $course,
        private User $user,
        private Role $role,
        private Category $category,
        private Cloudinary $cloudinary
    ) {
        //
    }

    public function getCourses(Request $request)
    {
        // dd($request->all());
        $courses = $this->course->query()->latest();

        $search = $request->filled('search') ? $request->input('search') : null;
        if ($request->filled('search')) {
            $courses = $courses->where('title', 'like', '%'.$search.'%');
        }

        $category_id = $request->filled('category_id') ? $request->input('category_id') : '';
        if ($request->filled('category_id')) {
            $courses = $courses->where('category_id', $category_id);
        }

        $instructor_id = $request->filled('instructor_id') ? $request->input('instructor_id') : '';
        if ($request->filled('instructor_id')) {
            $courses = $courses->where('instructor_id', $instructor_id);
        }

        $courses = $courses->with(['instructor', 'category'])->withCount('lessons')->paginate(10);

        $courses->getCollection()->transform(function ($course) {
            $course->is_published = $course->is_published ? 'Published' : 'Not published';
            $course->is_approved = $course->is_approved ? 'Approved' : 'Not Approved';
            $course->price = $course->price == 0 ? 'Free' : $course->price;
            $course->added_at = $course->created_at->format('Y-m-d g:i A');

            return $course;
        });

        $instructors = $this->user->role('instructor')->get();
        $categories = $this->category->get();

        return [
            'courses' => $courses,
            'search' => $search,
            'instructors' => $instructors,
            'categories' => $categories,
            'instructor_id' => $instructor_id,
            'category_id' => $category_id,
        ];

    }

    public function storeCourse(Request $request)
    {

        $validated_req = $request->validate([
            'title' => 'required|string|min:5|max:150',
            'short_description' => 'required|string|min:10',
            'description' => 'required',
            'thumbnail' => 'required|image|max:2048',
            'promo_video' => 'nullable|mimes:mp4,webm,ogg,avi|max:10485760',
            'instructor_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced',
            'course_language' => 'required|string',
            'is_published' => 'nullable|boolean',
            'is_approved' => 'nullable|boolean',
            'requirements' => 'nullable',
            'learning_outcomes' => 'nullable',
        ], [
            'thumbnail.max' => 'Thumbnail size should be less than Or Equal To 2MB',
            'promo_video.max' => 'Promo video size should be less than Or Equal To 10GB',
            'category_id.exists' => 'Selected Category does not exist',
            'instructor_id.exists' => 'Selected Instructor does not exist',
        ]);

        if ($validated_req['price'] == 0 && $validated_req['discount'] > 0) {
            throw ValidationException::withMessages([
                'discount' => 'Discount Cannot be Applied If Price is 0',
            ]);
        }

        $description = trim(strip_tags($validated_req['description']));
        if (Str::length($description) < 20) {
            throw ValidationException::withMessages([
                'description' => 'Description is required And Its length should be more than 20 characters.',
            ]);
        }

        $requirements = trim(strip_tags($validated_req['requirements']));
        if (! empty($requirements)) {
            if (Str::length($requirements) < 20) {
                throw ValidationException::withMessages([
                    'requirements' => 'Requirements length should be more than 20 characters.',
                ]);
            }
            $validated_req['requirements'] = json_encode($request->requirements);
        }

        $learning_outcomes = trim(strip_tags($validated_req['learning_outcomes']));
        if (! empty($learning_outcomes)) {
            if (Str::length($learning_outcomes) < 20) {
                throw ValidationException::withMessages([
                    'learning_outcomes' => 'Learning Outcomes length should be more than 20 characters.',
                ]);
            }
            $validated_req['learning_outcomes'] = json_encode($request->learning_outcomes);
        }

        if ($request->hasFile('promo_video')) {
            try {

                $file = $request->file('promo_video');
                $renamedFile = time().uniqid();

                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Courses/PromoVideos',
                    'public_id' => $renamedFile,
                    'resource_type' => 'video',
                ]);
                if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                    return ['status' => false, 'message' => 'Something went wrong! While uploading video.'];
                }

                $validated_req['promo_video_duration'] = $movedToCloudaniry['duration'];
                $validated_req['promo_video'] = $movedToCloudaniry['secure_url'];
                $validated_req['promo_video_public_id'] = $movedToCloudaniry['public_id'];
            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Video. '.$e->getMessage()];
            }
        }

        if ($request->hasFile('thumbnail')) {
            try {
                $file = $request->file('thumbnail');
                $renamedFile = time().uniqid();
                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Courses/Thumbnails',
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

        $validated_req['meta_title'] = $validated_req['slug'];
        $validated_req['meta_description'] = $validated_req['short_description'];

        if ($this->course->create($validated_req)) {
            return ['status' => true, 'message' => 'Course created successfully!'];
        } else {
            return ['status' => false, 'message' => 'Course Creation Failed Something went wrong!'];
        }

    }

    public function getCourse(string $slug)
    {

        $course = $this->course->with(['lessons'])->where('slug', $slug)->first();

        if (empty($course)) {
            return ['status' => false, 'message' => 'Course not found!'];
        }

        return $course;
    }

    public function updateCourse(Request $request, string $slug)
    {

        $validated_req = $request->validate([
            'title' => 'required|string|min:5|max:150',
            'short_description' => 'required|string|min:10',
            'description' => 'required',
            ...($request->hasFile('thumbnail') ? ['thumbnail' => 'nullable|image|max:2048'] : []),
            ...($request->hasFile('promo_video') ? ['promo_video' => 'nullable|mimes:mp4,webm,ogg,avi|max:10485760'] : []),
            'instructor_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced',
            'course_language' => 'required|string',
            'is_published' => 'nullable|boolean',
            'is_approved' => 'nullable|boolean',
            'requirements' => 'nullable',
            'learning_outcomes' => 'nullable',
        ], [
            ...($request->hasFile('thumbanil') ? ['thumbnail.max' => 'Thumbnail size should be less than Or Equal To 2MB'] : []),
            ...($request->hasFile('promo_video') ? ['promo_video.max' => 'Video size should be less than Or Equal To 10GB'] : []),
            'category_id.exists' => 'Selected Category does not exist',
            'instructor_id.exists' => 'Selected Instructor does not exist',
        ]);

        if ($validated_req['price'] == 0 && $validated_req['discount'] > 0) {
            throw ValidationException::withMessages([
                'discount' => 'Discount Cannot be Applied If Price is 0',
            ]);
        }

        $description = trim(strip_tags($validated_req['description']));
        if (Str::length($description) < 20) {
            throw ValidationException::withMessages([
                'description' => 'Description is required And Its length should be more than 20 characters.',
            ]);
        }

        $requirements = trim(strip_tags($validated_req['requirements']));
        if (! empty($requirements)) {
            if (Str::length($requirements) < 20) {
                throw ValidationException::withMessages([
                    'requirements' => 'Requirements length should be more than 20 characters.',
                ]);
            }
            $validated_req['requirements'] = json_encode($request->requirements);
        }

        $learning_outcomes = trim(strip_tags($validated_req['learning_outcomes']));
        if (! empty($learning_outcomes)) {
            if (Str::length($learning_outcomes) < 20) {
                throw ValidationException::withMessages([
                    'learning_outcomes' => 'Learning Outcomes length should be more than 20 characters.',
                ]);
            }
            $validated_req['learning_outcomes'] = json_encode($request->learning_outcomes);
        }

        $course = $this->getCourse($slug);

        if (isset($course['status']) && $course['status'] === false) {
            return ['status' => false, 'message' => $course['message']];
        }

        if (empty($course->thumbnail)) {
            $request->validate(['thumbnail' => 'required']);
        }

        if ($request->hasFile('promo_video')) {

            try {
                $file = $request->file('promo_video');
                $renamedFile = time().uniqid();

                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Courses/PromoVideos',
                    'public_id' => $renamedFile,
                    'resource_type' => 'video',
                ]);

                if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                    return ['status' => false, 'message' => 'Something went wrong! While uploading video.'];
                }

                if (! empty($course->promo_video) && ! empty($course->promo_video_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($course->promo_video_public_id, [
                        'resource_type' => 'video',
                    ]);
                }
                $validated_req['promo_video_duration'] = $movedToCloudaniry['duration'];
                $validated_req['promo_video'] = $movedToCloudaniry['secure_url'];
                $validated_req['promo_video_public_id'] = $movedToCloudaniry['public_id'];

            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading video. '.$e->getMessage()];
            }

        }

        if ($request->hasFile('thumbnail')) {

            try {
                $file = $request->file('thumbnail');
                $renamedFile = time().uniqid();

                $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'ApexUnified_LMS/Courses/Thumbnails',
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

                if (! empty($course->thumbnail) && ! empty($course->thumbnail_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($course->thumbnail_public_id);
                }

                $validated_req['thumbnail'] = $movedToCloudaniry['secure_url'];
                $validated_req['thumbnail_public_id'] = $movedToCloudaniry['public_id'];

            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail. '.$e->getMessage()];
            }

        }

        if ($validated_req['title'] != $course->title) {
            $validated_req['slug'] = Str::slug($validated_req['title']).substr(uniqid(), 2, 5);
            $validated_req['meta_title'] = $validated_req['slug'];
        }

        $validated_req['description'] = json_encode($request->description);

        $validated_req['meta_description'] = $validated_req['short_description'];

        return $course->update($validated_req) ?
        ['status' => true, 'message' => 'Course updated successfully!']
        :
        ['status' => false, 'message' => 'Something went wrong!'];
    }

    public function destroyCourse(string $id)
    {
        try {
            $course = $this->course->find($id);

            if (empty($course)) {
                return ['status' => false, 'message' => 'Course not found!'];
            }

            if (! empty($course->promo_video) && ! empty($course->promo_video_public_id)) {
                $this->cloudinary->uploadApi()->destroy($course->promo_video_public_id, [
                    'resource_type' => 'video',
                ]);
            }

            if (! empty($course->thumbnail) && ! empty($course->thumbnail_public_id)) {
                $this->cloudinary->uploadApi()->destroy($course->thumbnail_public_id);
            }

            return $course->delete() ?
        ['status' => true, 'message' => 'Course deleted successfully!']
        :
        ['status' => false, 'message' => 'Something went wrong!'];

        } catch (Exception $e) {
            return ['status' => false, 'message' => 'Something went wrong! '.$e->getMessage()];
        }

    }

    public function destroyCourseBySelection(Request $request)
    {
        try {

            $ids = $request->array('ids');
            $deleted = 0;

            if (blank($ids)) {
                return ['status' => false, 'message' => 'Please select at least one course!'];
            }

            $courses = $this->course->whereIn('id', $ids)->get();

            if ($courses->isEmpty()) {
                return ['status' => false, 'message' => 'No Course Found With The Given IDs!'];
            }

            foreach ($courses as $course) {

                if (! empty($course->promo_video) && ! empty($course->promo_video_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($course->promo_video_public_id, [
                        'resource_type' => 'video',
                    ]);
                }

                if (! empty($course->thumbnail) && ! empty($course->thumbnail_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($course->thumbnail_public_id);
                }

                $course->delete();
                $deleted++;
            }

            return $deleted === count($ids) ?
              ['status' => true, 'message' => 'Course deleted successfully!']
              :
              ['status' => false, 'message' => 'Something went wrong!'];

        } catch (Exception $e) {
            return ['status' => false, 'message' => 'Something went wrong! '.$e->getMessage()];
        }

    }

    public function getInstructors()
    {
        if (! $this->role->where('name', 'instructor')->exists()) {
            $this->role->create(['name' => 'instructor']);
        }

        return $this->user->role('instructor')->get();
    }

    public function getCategories()
    {
        return $this->category->all();
    }
}
