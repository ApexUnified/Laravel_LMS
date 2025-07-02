import Card from '@/Components/Card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import CoursePlayerSidebar from '@/partials/CoursePlayerSidebar'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
export default function LessonPlayer({ course, lesson }) {
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
                        lesson={lesson}
                        course={course}
                    />


                    <Card
                        Content={
                            <>
                                <div className="w-full h-full max-w-6xl px-4 py-6 space-y-6">

                                    {/* Title */}
                                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                                        {lesson.title}
                                    </h1>

                                    {/* Video Player */}
                                    <Card
                                        Content={
                                            <>
                                                {lesson.video && (
                                                    <video
                                                        controls
                                                        src={lesson.video}
                                                        className="object-contain w-full h-[600px]"
                                                        poster={lesson.thumbnail}
                                                    >
                                                        Your browser does not support the video tag.
                                                    </video>

                                                )}
                                                {!lesson.video && (
                                                    <img
                                                        src={lesson.thumbnail}
                                                        alt={lesson.title}
                                                        className="object-cover w-full h-full"
                                                    />
                                                )}
                                            </>
                                        }
                                    />

                                    <div className='flex flex-wrap justify-center'>
                                        <h2 className='text-4xl font-semibold text-gray-700 dark:text-white'>About This Lesson</h2>
                                    </div>

                                    {lesson.description && (
                                        <Card
                                            Content={
                                                <>
                                                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Lesson Description</h2>
                                                    <div
                                                        className="text-gray-600 dark:text-gray-300 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
                                                        dangerouslySetInnerHTML={{ __html: lesson.description }}
                                                    />
                                                </>
                                            }
                                        />
                                    )}



                                    <div className='flex flex-wrap justify-center'>
                                        <h2 className='text-4xl font-semibold text-gray-700 dark:text-white'>About This Course</h2>
                                    </div>

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
