<?php

namespace App\Repositories\Courses\Repository;

use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use App\Repositories\Courses\Interface\CoursesRepositoryInterface;
use Cloudinary\Cloudinary;
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
        $courses = $this->course->query()->latest();

        $search = $request->filled('search') ? $request->input('search') : null;
        if ($request->filled('search')) {
            $courses = $courses->where('title', 'like', '%'.$search.'%');
        }

        $courses = $courses->with(['instructor', 'category'])->paginate(10);

        $courses->getCollection()->transform(function ($course) {
            $course->is_published = $course->is_published ? 'Published' : 'Not published';
            $course->is_approved = $course->is_approved ? 'Approved' : 'Not Approved';
            $course->price = $course->price == 0 ? 'Free' : $course->price;
            $course->added_at = $course->created_at->format('Y-m-d g:i A');

            return $course;
        });

        return ['courses' => $courses, 'search' => $search];

    }

    public function storeCourse(Request $request)
    {

        $validated_req = $request->validate([
            'title' => 'required|string|min:5|max:150',
            'short_description' => 'required|string|min:10',
            'description' => 'required|string|min:20',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'promo_video' => 'nullable|mimetypes:video/mp4|max:10240000',
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

            if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url']) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail.'];
            }

            $validated_req['thumbnail'] = $movedToCloudaniry['secure_url'];
            $validated_req['thumbnail_public_id'] = $movedToCloudaniry['public_id'];
        }

        if ($request->hasFile('promo_video')) {
            $file = $request->file('promo_video');
            $renamedFile = time().uniqid();

            $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => 'ApexUnified_LMS/Courses/PromoVideos',
                'public_id' => $renamedFile,
                'resource_type' => 'video',
            ]);

            if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url']) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading video.'];
            }

            $validated_req['promo_video'] = $movedToCloudaniry['secure_url'];
            $validated_req['promo_video_public_id'] = $movedToCloudaniry['public_id'];
        }

        $validated_req['slug'] = Str::slug($validated_req['title']);

        $validated_req['meta_title'] = $validated_req['slug'];
        $validated_req['meta_description'] = $validated_req['short_description'];

        if ($this->course->create($validated_req)) {
            return true;
        } else {
            return false;
        }

    }

    public function getCourse(string $id)
    {
        return $this->course->find($id);
    }

    public function updateCourse(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'title' => 'required|string|min:5|max:150',
            'short_description' => 'required|string|min:10',
            'description' => 'required|string|min:20',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'promo_video' => 'nullable|mimetypes:video/mp4|max:10240000',
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

        if (empty($course)) {
            return false;
        }

        if (empty($course->thumbnail)) {
            $request->validate(['thumbnail' => 'required']);
        }

        if ($request->hasFile('thumbnail')) {

            if (! empty($course->thumbnail) && ! empty($course->thumbnail_public_id)) {
                $this->cloudinary->uploadApi()->destroy($course->thumbnail_public_id);
            }

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

            if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url']) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail.'];
            }

            $validated_req['thumbnail'] = $movedToCloudaniry['secure_url'];
            $validated_req['thumbnail_public_id'] = $movedToCloudaniry['public_id'];
        } else {
            $validated_req['thumbnail'] = $course->thumbnail;
            $validated_req['thumbnail_public_id'] = $course->thumbnail_public_id;
        }

        if ($request->hasFile('promo_video')) {

            if (! empty($course->promo_video) && ! empty($course->promo_video_public_id)) {
                $this->cloudinary->uploadApi()->destroy($course->promo_video_public_id, [
                    'resource_type' => 'video',
                ]);
            }

            $file = $request->file('promo_video');
            $renamedFile = time().uniqid();

            $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => 'ApexUnified_LMS/Courses/PromoVideos',
                'public_id' => $renamedFile,
                'resource_type' => 'video',
            ]);

            if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url']) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading video.'];
            }

            $validated_req['promo_video'] = $movedToCloudaniry['secure_url'];
            $validated_req['promo_video_public_id'] = $movedToCloudaniry['public_id'];
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

        if (empty($course)) {
            return false;
        }

        if (! empty($course->thumbnail) && ! empty($course->thumbnail_public_id)) {
            $this->cloudinary->uploadApi()->destroy($course->thumbnail_public_id);
        }

        if (! empty($course->promo_video) && ! empty($course->promo_video_public_id)) {
            $this->cloudinary->uploadApi()->destroy($course->promo_video_public_id, [
                'resource_type' => 'video',
            ]);
        }

        return $course->delete();
    }

    public function destroyCourseBySelection(Request $request)
    {
        $ids = $request->array('ids');
        $deleted = 0;

        if (blank($ids)) {
            return false;
        }

        $courses = $this->course->whereIn('id', $ids)->get();

        if ($courses->isEmpty()) {
            return false;
        }

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

        return $deleted === count($ids);
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
