<?php

namespace App\Repositories\Lessons\Repository;

use App\Models\Lesson;
use App\Repositories\Lessons\Interface\LessonRepositoryInterface;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;

class LessonRepository implements LessonRepositoryInterface
{
    public function __construct(
        private Lesson $lesson,
        private Cloudinary $cloudinary
    ) {}

    public function getLessons(Request $request)
    {
        $lessons = $this->lesson->query()->latest();

        $lessons = $lessons->with(['course'])->paginate(10);

        return ['lessons' => $lessons];
    }

    public function getLession(string $id)
    {
        return $this->lesson->with(['course'])->find($id);
    }

    public function storeLesson(Request $request)
    {
        $validated_req = $request->validate([
            'title' => 'required|string',
            'description' => 'required',
            'course_id' => 'required|exists:courses,id',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'video' => 'nullable|mimetypes:video/mp4|max:10240000',
            'attachments' => 'nullable|array',
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

            if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading Thumbnail.'];
            }

            $validated_req['thumbnail'] = $movedToCloudaniry['secure_url'];
            $validated_req['thumbnail_public_id'] = $movedToCloudaniry['public_url'];
        }

        if ($request->hasFile('video')) {
            $file = $request->file('video');
            $renamedFile = time().uniqid();

            $movedToCloudaniry = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => 'ApexUnified_LMS/Courses/PromoVideos',
                'public_id' => $renamedFile,
                'resource_type' => 'video',
            ]);

            if (! $movedToCloudaniry || ! $movedToCloudaniry['secure_url'] || ! $movedToCloudaniry['public_id']) {
                return ['status' => false, 'message' => 'Something went wrong! While uploading video.'];
            }

            $validated_req['video'] = $movedToCloudaniry['secure_url'];
            $validated_req['video_public_id'] = $movedToCloudaniry['public_url'];
        }

    }

    public function updateLession(Request $request, string $id) {}

    public function destroyLesson(string $id)
    {
        $lesson = $this->getLession($id);

        if (empty($lesson)) {
            return ['status' => false, 'message' => 'Selected Lesson does not exist.'];
        }

        $deleted = $lesson->delete();

        if ($deleted) {
            return ['status' => true, 'message' => 'Lesson deleted successfully.'];
        } else {
            return ['status' => false, 'message' => 'Something went wrong while deleting Lesson.'];
        }
    }

    public function destroyLessonBySelection(Request $request) {}
}
