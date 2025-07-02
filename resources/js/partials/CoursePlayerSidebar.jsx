import Card from '@/Components/Card'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function CoursePlayerSidebar({ allLessons, lesson = null, course }) {
    return (
        <Card
            Content={
                <>
                    <div
                        className="flex items-center justify-center gap-3 p-3 transition-all duration-300 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-900"
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 dark:text-white ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0h1.5A2.25 2.25 0 0120 11.25v7.5A2.25 2.25 0 0117.25 21h-10.5A2.25 2.25 0 014.5 18.75v-7.5A2.25 2.25 0 016.75 9h1.5m7.5 0v6l-3-1.5-3 1.5V9" />
                        </svg>

                        <h4 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">
                            Lessons
                        </h4>
                    </div>

                    {allLessons.length === 0 && (
                        <div
                            className="flex items-center justify-center gap-3 p-3 my-4 transition-all duration-300 bg-gray-200 rounded-lg shadow-sm dark:bg-gray-700"
                        >
                            <h4 className="font-semibold text-center text-gray-800 text-md dark:text-white">
                                No Lessons Found
                            </h4>
                        </div>
                    )}

                    {allLessons.map((c_lesson, index) => (
                        <Link
                            href={route("lessons.player", { course_slug: course.slug, lesson_slug: c_lesson.slug })}
                            key={c_lesson.id}
                            className={`flex items-start gap-3 p-3 my-5 transition-all duration-300  rounded-lg shadow-sm cursor-pointer group
                                    ${lesson && lesson.slug === c_lesson.slug ? "bg-blue-50 text-blue-500 dark:bg-blue-500/[0.12] dark:text-blue-400"
                                    :
                                    "bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 hover:text-blue-500 hover:dark:bg-blue-500/[0.12] hover:dark:text-blue-400"
                                }
                                             `}
                        >
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
                                {index + 1}
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-white line-clamp-2">
                                    {c_lesson.title}
                                </h4>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Duration: {c_lesson.video_duration}
                                </p>
                            </div>
                        </Link>
                    ))}
                </>
            }
        />
    )
}
