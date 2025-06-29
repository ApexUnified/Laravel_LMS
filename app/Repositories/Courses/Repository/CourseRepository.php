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
use Spatie\Permission\Models\Role;

class CourseRepository implements CoursesRepositoryInterface
{
    /**
     * Create a new class instance.
     */
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

        $courses = $courses->with(['instructor', 'category'])->paginate(10);

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
            'description' => 'required|string|min:20',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'promo_video' => 'nullable|mimetypes:video/mp4|max:10485760',
            'instructor_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'total_course_duration' => 'required|string',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced',
            'course_language' => 'required|string',
            'is_published' => 'nullable|boolean',
            'is_approved' => 'nullable|boolean',
            'requirements' => 'nullable|string',
            'learning_outcomes' => 'nullable|string',
        ], [
            'thumbnail.max' => 'Thumbnail size should be less than Or Equal To 2MB',
            'promo_video.max' => 'Promo video size should be less than Or Equal To 10GB',
            'category_id.exists' => 'Selected Category does not exist',
            'instructor_id.exists' => 'Selected Instructor does not exist',
        ]);

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

                $validated_req['promo_video'] = $movedToCloudaniry['secure_url'];
                $validated_req['promo_video_public_id'] = $movedToCloudaniry['public_id'];
            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Video. '.$e->getMessage()];
            }
        }

        $validated_req['slug'] = Str::slug($validated_req['title']);

        $validated_req['meta_title'] = $validated_req['slug'];
        $validated_req['meta_description'] = $validated_req['short_description'];

        if ($this->course->create($validated_req)) {
            return ['status' => true, 'message' => 'Course created successfully!'];
        } else {
            return ['status' => false, 'message' => 'Course Creation Failed Something went wrong!'];
        }

    }

    public function getCourse(string $id)
    {
        $course = $this->course->find($id);

        if (empty($course)) {
            return ['status' => false, 'message' => 'Course not found!'];
        }

        return $course;
    }

    public function updateCourse(Request $request, string $id)
    {

        $validated_req = $request->validate([
            'title' => 'required|string|min:5|max:150',
            'short_description' => 'required|string|min:10',
            'description' => 'required|string|min:20',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'promo_video' => 'nullable|mimetypes:video/mp4|max:10485760',
            'instructor_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'total_course_duration' => 'required|string',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced',
            'course_language' => 'required|string',
            'is_published' => 'nullable|boolean',
            'is_approved' => 'nullable|boolean',
            'requirements' => 'nullable|string',
            'learning_outcomes' => 'nullable|string',
        ], [
            'thumbnail.max' => 'Thumbnail size should be less than Or Equal To 2MB',
            'promo_video.max' => 'Promo video size should be less than Or Equal To 10GB',
            'category_id.exists' => 'Selected Category does not exist',
            'instructor_id.exists' => 'Selected Instructor does not exist',
        ]);

        $course = $this->getCourse($id);

        if (empty($course->thumbnail)) {
            $request->validate(['thumbnail' => 'required']);
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

        } else {
            $validated_req['thumbnail'] = $course->thumbnail;
            $validated_req['thumbnail_public_id'] = $course->thumbnail_public_id;
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

                $validated_req['promo_video'] = $movedToCloudaniry['secure_url'];
                $validated_req['promo_video_public_id'] = $movedToCloudaniry['public_id'];

            } catch (Exception $e) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading video. '.$e->getMessage()];
            }

        } else {
            $validated_req['promo_video'] = $course->promo_video;
            $validated_req['promo_video_public_id'] = $course->promo_video_public_id;
        }

        $validated_req['slug'] = Str::slug($validated_req['title']);

        $validated_req['meta_title'] = $validated_req['slug'];
        $validated_req['meta_description'] = $validated_req['short_description'];

        return $course->update($validated_req);
    }

    public function destroyCourse(string $id)
    {
        $course = $this->getCourse($id);

        try {
            if (! empty($course->thumbnail) && ! empty($course->thumbnail_public_id)) {
                $this->cloudinary->uploadApi()->destroy($course->thumbnail_public_id);
            }

            if (! empty($course->promo_video) && ! empty($course->promo_video_public_id)) {
                $this->cloudinary->uploadApi()->destroy($course->promo_video_public_id, [
                    'resource_type' => 'video',
                ]);
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
        $ids = $request->array('ids');
        $deleted = 0;

        if (blank($ids)) {
            return ['status' => false, 'message' => 'Please select at least one course!'];
        }

        $courses = $this->course->whereIn('id', $ids)->get();

        if ($courses->isEmpty()) {
            return ['status' => false, 'message' => 'No Course Found With The Given IDs!'];
        }

        try {

            foreach ($courses as $course) {
                if (! empty($course->thumbnail) && ! empty($course->thumbnail_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($course->thumbnail_public_id);
                }

                if (! empty($course->promo_video) && ! empty($course->promo_video_public_id)) {
                    $this->cloudinary->uploadApi()->destroy($course->promo_video_public_id, [
                        'resource_type' => 'video',
                    ]);
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
