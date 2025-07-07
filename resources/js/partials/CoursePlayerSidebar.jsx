import Card from '@/Components/Card'
import PrimaryButton from '@/Components/PrimaryButton'
import Toast from '@/Components/Toast'
import { Link, router, useForm } from '@inertiajs/react'
import axios from 'axios'
import React, { useState } from 'react'

export default function CoursePlayerSidebar({ allLessons, lesson = null, course, course_progress, is_user_enrolled, user = null }) {

    const [enrolling, setEnrolling] = useState(false);

    const [flash, setFlash] = useState(null);
    return (
        <Card
            Content={
                <>
                    {
                        flash && <Toast
                            flash={flash}
                        />
                    }
                    <div
                        className="flex items-center justify-center gap-3 p-3 transition-all duration-300 bg-gray-100 rounded-lg shadow-sm dark:bg-white/[0.03]"
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 dark:text-white ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0h1.5A2.25 2.25 0 0120 11.25v7.5A2.25 2.25 0 0117.25 21h-10.5A2.25 2.25 0 014.5 18.75v-7.5A2.25 2.25 0 016.75 9h1.5m7.5 0v6l-3-1.5-3 1.5V9" />
                        </svg>

                        <h4 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">
                            Lessons
                        </h4>
                    </div>

                    {(allLessons.length === 0 && is_user_enrolled) && (
                        <div
                            className="flex items-center justify-center gap-3 p-3 my-4 transition-all duration-300 bg-gray-200 rounded-lg shadow-sm dark:bg-gray-700"
                        >
                            <h4 className="font-semibold text-center text-gray-800 text-md dark:text-white">
                                No Lessons Found
                            </h4>
                        </div>
                    )}

                    {(allLessons.length > 0 && is_user_enrolled) && (
                        <div className="space-y-2 text-gray-800 dark:text-white">
                            <h4 className="text-lg font-semibold">Course Progress</h4>

                            <div className="w-full h-4 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                    className={`${course_progress === 100 ? "bg-green-600 dark:bg-green-400" : "bg-blue-600 dark:bg-blue-400"} h-full transition-all duration-500 ease-in-out `}
                                    style={{ width: `${course_progress}%` }}
                                ></div>
                            </div>

                            <div className="text-sm text-right text-gray-600 dark:text-gray-300">
                                {course_progress}% Complete
                            </div>
                        </div>
                    )}
                    {is_user_enrolled ? (
                        <>
                            {
                                allLessons.map((c_lesson, index) => (
                                    <Link
                                        href={route("lessons.player", { course_slug: course.slug, lesson_slug: c_lesson.slug })}
                                        key={c_lesson.id}
                                        className={`flex items-start gap-3 p-3 my-5 transition-all duration-300  rounded-lg shadow-sm cursor-pointer group
                                    ${lesson && lesson.slug === c_lesson.slug ? "bg-blue-50 text-blue-500 dark:bg-blue-500/[0.12] dark:text-blue-400"
                                                :
                                                "bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 hover:text-blue-500 hover:dark:bg-blue-500/[0.12] hover:dark:text-blue-400" //opacity-[0.5] pointer-events-none
                                            }
                                             `}
                                    >

                                        {c_lesson.lesson_progress && (c_lesson.id === c_lesson.lesson_progress.lesson_id) && c_lesson.lesson_progress.completed == 1 ? (
                                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-green-600 rounded-full dark:bg-green-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className={`size-6 dark:text-green-800`}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>

                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
                                                {index + 1}
                                            </div>
                                        )
                                        }



                                        <div className="flex-1 w-full overflow-hidden">
                                            <h4 className="w-full text-sm font-semibold text-gray-800 break-words dark:text-white group-hover:text-blue-600 dark:group-hover:text-white">
                                                {c_lesson.title}
                                            </h4>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                Duration: {c_lesson.video_duration}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </>
                    )
                        :
                        (
                            <div
                                className="flex items-center justify-center gap-3 p-3 my-4 transition-all duration-300 bg-gray-200 rounded-lg shadow-sm dark:bg-gray-700"
                            >
                                <PrimaryButton
                                    Text={"Enroll Now"}
                                    Type={"button"}
                                    Spinner={enrolling}
                                    Disabled={enrolling}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                        </svg>

                                    }
                                    Action={() => {
                                        setEnrolling(true);
                                        axios.post(route('purchase.course'), {
                                            course_id: course.id,
                                            user_id: user?.id
                                        }).then(response => {

                                            if (!response.data.status) {
                                                setFlash({ error: response.data.message })
                                                setEnrolling(false);
                                                return;
                                            }

                                            if (response.data?.enrollment) {
                                                setFlash({ success: response.data.message })
                                                setEnrolling(false);
                                                router.reload();
                                                return
                                            }

                                            if (response.data?.url) {
                                                setFlash({ success: "Please Wait While We Redirect You To Checkout Page" })
                                                window.location.href = response.data.url;
                                                setEnrolling(false);
                                                return

                                            }

                                        }).catch(error => {
                                            setFlash({ error: error.message })
                                            setEnrolling(false);

                                        });
                                    }}
                                />
                            </div>
                        )
                    }

                </>
            }
        />
    )
}
