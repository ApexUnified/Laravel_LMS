import Card from '@/Components/Card'
import VideoPlayer from '@/Components/VideoPlayer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import CoursePlayerSidebar from '@/partials/CoursePlayerSidebar'
import { Head, Link } from '@inertiajs/react'

import React, { useEffect } from 'react'


export default function CoursePlayer({ course, course_progress }) {

    return (
        <>
            <AuthenticatedLayout ManuallytoggleSidebar={true}>
                <Head>
                    <title>{course.title}</title>
                    <meta name="title" content={course.meta_title} />
                    <meta name="description" content={course.meta_description} />
                </Head>




                <div className="grid  grid-cols-1 lg:grid-cols-[30%_70%] gap-5 min-h-[500px]">

                    <CoursePlayerSidebar
                        allLessons={course.lessons}
                        course={course}
                        lessonProgress={course.lessons.lesson_progress}
                        course_progress={course_progress}
                    />


                    <Card
                        Content={
                            <>
                                <div className="w-full h-full max-w-6xl px-4 py-6 space-y-6">

                                    {/* Title */}
                                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                                        {course.title}
                                    </h1>

                                    <div className="text-gray-800 dark:text-white text-lg  flex justify-center gap-4 items-center">
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
                                    </div>


                                    {/* Video Player */}
                                    <Card
                                        Content={
                                            <>
                                                {course.promo_video && (
                                                    <VideoPlayer videoUrl={course.promo_video} thumbnail={course.thumbnail} />

                                                )}
                                                {!course.promo_video && (
                                                    <img
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        className="object-cover w-full h-full"
                                                    />
                                                )}
                                            </>
                                        }
                                    />



                                    {/* Description */}
                                    {course.description && (
                                        <Card
                                            Content={
                                                <>
                                                    <h2 className="text-2xl my-2 font-semibold text-gray-700 dark:text-white">Course Description:</h2>
                                                    <div
                                                        className="text-gray-600 dark:text-gray-300 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
                                                        dangerouslySetInnerHTML={{ __html: course.description }}
                                                    />
                                                </>
                                            }
                                        />
                                    )}

                                    {/* What You'll Learn */}
                                    {course.learning_outcomes && (
                                        <Card
                                            Content={
                                                <>
                                                    <h2 className="text-2xl my-2 font-semibold text-indigo-600 dark:text-indigo-400">What You'll Learn</h2>
                                                    <div
                                                        className="text-gray-600 dark:text-gray-300 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
                                                        dangerouslySetInnerHTML={{ __html: course.learning_outcomes }}
                                                    />
                                                </>
                                            }
                                        />
                                    )}

                                    {/* Requirements */}
                                    {course.requirements && (
                                        <Card
                                            Content={
                                                <>
                                                    <h2 className="text-2xl my-2  font-semibold text-rose-600 dark:text-rose-400">Requirements</h2>
                                                    <div
                                                        className="text-gray-600 dark:text-gray-300 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
                                                        dangerouslySetInnerHTML={{ __html: course.requirements }}
                                                    />
                                                </>
                                            }
                                        />
                                    )}
                                </div>
                            </>
                        }
                    />
                </div>

            </AuthenticatedLayout >
        </>
    )
}
