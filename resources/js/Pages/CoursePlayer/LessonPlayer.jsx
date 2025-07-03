import Card from '@/Components/Card'
import PrimaryButton from '@/Components/PrimaryButton'
import VideoPlayer from '@/Components/VideoPlayer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import CoursePlayerSidebar from '@/partials/CoursePlayerSidebar'
import { Head, Link, usePage } from '@inertiajs/react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css';
import React, { useEffect, useState } from 'react'
export default function LessonPlayer({ course, lesson, course_progress }) {


    const user = usePage().props.auth.user;
    const [markAsComplete, setMarkAsComplete] = useState(false);


    const getFileType = (file) => {
        const name = file.secure_url;
        const ext = name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
        if (ext === 'pdf') return 'pdf';
        if (['doc', 'docx'].includes(ext)) return 'word';
        if (['xls', 'xlsx'].includes(ext)) return 'excel';
        if (['ppt', 'pptx'].includes(ext)) return 'powerpoint';
        return 'file'; // fallback
    };


    const downloadFile = async (url) => {
        const fileName = decodeURIComponent(url.split('/').pop());
        const response = await fetch(url, { mode: 'cors' });
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };



    return (
        <>
            <AuthenticatedLayout ManuallytoggleSidebar={true}>
                <Head>
                    <title>{lesson.title}</title>
                    <meta name="title" content={course.meta_title} />
                    <meta name="description" content={course.meta_description} />
                </Head>




                <div className="grid  grid-cols-1 lg:grid-cols-[30%_70%] gap-5 min-h-[500px]">

                    <CoursePlayerSidebar
                        allLessons={course.lessons}
                        lesson={lesson}
                        course={course}
                        course_progress={course_progress}
                    />


                    <Card
                        Content={
                            <>
                                <div className="w-full h-full max-w-6xl px-4 py-6 space-y-6">

                                    {/* Title */}
                                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                                        {lesson.title}
                                    </h1>


                                    <div className="text-gray-800 dark:text-white text-base sm:text-lg flex flex-wrap justify-center gap-4 items-center py-4">
                                        {/* Instructor */}
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Instructor:</span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-2xl text-sm font-semibold">
                                                {course.instructor.name}
                                            </span>
                                        </div>

                                        {/* Language */}
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Language:</span>
                                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-xl text-sm">
                                                {course.course_language}
                                            </span>
                                        </div>

                                        {/* Level */}
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Level:</span>
                                            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-xl text-sm">
                                                {course.level}
                                            </span>
                                        </div>

                                        {/* Course Part */}
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Part Of Course</span>
                                            <Link href={route("courses.player", course.slug)} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl text-sm font-medium underline">
                                                {lesson.course.title.length > 20 ? lesson.course.title.slice(0, 20) + '...' : lesson.course.title}
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Video Player */}
                                    <Card
                                        Content={
                                            <>
                                                {lesson.video && (
                                                    <VideoPlayer videoUrl={lesson.video} thumbnail={lesson.thumbnail}
                                                        startTime={lesson?.lesson_progress?.lesson_watched_time} lesson={lesson} course={course} user={user} LessonMarkAsComplete={markAsComplete} />

                                                )}
                                                {!lesson.video && (
                                                    <img
                                                        src={lesson.thumbnail}
                                                        alt={lesson.title}
                                                        className="object-cover w-full h-full"
                                                    />
                                                )}

                                                <div className="flex justify-center items-center mt-20">
                                                    <PrimaryButton
                                                        Icon={
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                            </svg>

                                                        }
                                                        CustomClass={"lg:w-[200px] md:w-[160px] mt-4 sm:w-[100px] w-[150px] "}
                                                        Text={lesson?.lesson_progress?.completed == 1 ? "Completed" : "Mark As Completed"}
                                                        Type={"button"}
                                                        Disabled={lesson?.lesson_progress?.completed == 1 ? true : markAsComplete}
                                                        Spinner={markAsComplete && lesson?.lesson_progress?.completed != 1}
                                                        Action={() => setMarkAsComplete(true)}
                                                    />
                                                </div>
                                            </>
                                        }
                                    />



                                    {lesson.description && (
                                        <Card
                                            Content={
                                                <>
                                                    <h2 className="text-2xl my-2 font-semibold text-gray-700 dark:text-white">Lesson Description:</h2>
                                                    <div
                                                        className="text-gray-600 dark:text-gray-300 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
                                                        dangerouslySetInnerHTML={{ __html: lesson.description }}
                                                    />
                                                </>
                                            }
                                        />
                                    )}


                                    {lesson.attachments && lesson.attachments.map((file, index) => {
                                        const type = getFileType(file);
                                        const fileName = decodeURIComponent(file.secure_url.split('/').pop());

                                        return (
                                            <li key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-800">
                                                <div className="flex items-center gap-3">
                                                    {type === 'image' ? (
                                                        <img src={file.secure_url} alt={fileName} className="object-cover w-10 h-10 border rounded" loading="eager" />
                                                    ) : type === 'pdf' ? (
                                                        // PDF Icon
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="PDF" role="img" viewBox="0 0 512 512" fill="#c80a0a" width="32" height="32">
                                                            <rect width="512" height="512" rx="15%"></rect>
                                                            <path fill="#fff" d="M413 302c-9-10-29-15-56-15-16 0-33 2-53 5a252 252 0 0 1-52-69c10-30 17-59 17-81 0-17-6-44-30-44-7 0-13 4-17 10-10 18-6 58 13 100a898 898 0 0 1-50 117c-53 22-88 46-91 65-2 9 4 24 25 24 31 0 65-45 91-91a626 626 0 0 1 92-24c38 33 71 38 87 38 32 0 35-23 24-35z" />
                                                        </svg>
                                                    ) : type === 'word' ? (
                                                        // Word Icon
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#2A5699" width="32" height="32">
                                                            <path d="M64 0h256l128 128v352c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V32C32 14.3 46.3 0 64 0z" />
                                                            <path fill="#fff" d="M192 160h128v32H192v-32zm0 64h128v32H192v-32zm0 64h128v32H192v-32zm0 64h128v32H192v-32z" />
                                                        </svg>
                                                    ) : type === 'powerpoint' ? (
                                                        // PowerPoint Icon
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#D24726" width="32" height="32">
                                                            <path d="M64 0h256l128 128v352c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V32C32 14.3 46.3 0 64 0z" />
                                                            <path fill="#fff" d="M192 144h128v48H192v-48zm0 80h128v144H192V224z" />
                                                        </svg>
                                                    ) : type === 'excel' ? (
                                                        // Excel Icon ✅
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#0F9D58" width="32" height="32">
                                                            <path d="M64 0h256l128 128v352c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V32C32 14.3 46.3 0 64 0z" />
                                                            <path fill="#fff" d="M192 128h128v32H192v-32zm0 64h128v32H192v-32zm0 64h128v32H192v-32zm0 64h128v32H192v-32z" />
                                                        </svg>
                                                    ) : (
                                                        // Fallback File Icon
                                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.828a2 2 0 00-.586-1.414l-4.828-4.828A2 2 0 0010.172 1H6z" />
                                                        </svg>
                                                    )}


                                                    <span className="text-gray-700 dark:text-gray-200">{fileName}</span>
                                                </div>

                                                <button
                                                    onClick={() => downloadFile(file.secure_url)}
                                                    className='text-gray-800 dark:text-white hover:text-gray-500 '
                                                    title='Download'
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 4a1 1 0 112 0v6.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3A1 1 0 016.707 9.293L8 10.586V4z" />
                                                        <path d="M3 14a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1z" />
                                                    </svg>
                                                </button>
                                            </li>
                                        );
                                    })}

                                </div>
                            </>
                        }
                    />
                </div>

            </AuthenticatedLayout >
        </>
    )
}
