import Card from '@/Components/Card'
import VideoPlayer from '@/Components/VideoPlayer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import CoursePlayerSidebar from '@/partials/CoursePlayerSidebar'
import { Head, Link } from '@inertiajs/react'

import React, { useEffect } from 'react'


export default function CoursePlayer({ course }) {

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
                    />


                    <Card
                        Content={
                            <>
                                <div className="w-full h-full max-w-6xl px-4 py-6 space-y-6">

                                    {/* Title */}
                                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                                        {course.title}
                                    </h1>

                                    {/* Video Player */}
                                    <Card
                                        Content={
                                            <>
                                                {course.promo_video && (
                                                    <VideoPlayer video={course.promo_video} thumbnail={course.thumbnail} />

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
                                                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Course Description</h2>
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
                                                    <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">What You'll Learn</h2>
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
                                                    <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">Requirements</h2>
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
