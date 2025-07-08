import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import PrimaryButton from '@/Components/PrimaryButton'
import Toast from '@/Components/Toast'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'

export default function index({ courses }) {

    const handlePagination = (url) => {
        if (url) {
            router.visit(url, { preserveScroll: true, preserveState: true });
        }
    };

    return (
        <AuthenticatedLayout>

            <Head title='My Courses' />

            <BreadCrumb
                header={'My Courses'}
                parent={"Dashboard"}
                child={"My Courses"}
                parent_link={route('dashboard')}
            />

            {courses.data.length === 0 && (
                <Toast flash={{ info: "You Are Not Enrolled In Any Course Yet" }} />
            )}


            <Card
                Content={
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {courses.data.map((course) => (

                                <Card
                                    key={course.id}
                                    CustomCss={"hover:scale-105 duration-300 cursor-pointer"}
                                    Content={
                                        <>

                                            <Link
                                                href={route('courses.player', { course_slug: course.slug })}

                                            >

                                                <img
                                                    src={course?.thumbnail}
                                                    alt={course?.title}
                                                    className="object-cover w-full h-58 rounded-t-2xl"
                                                    loading="lazy"
                                                />

                                                {/* Content */}
                                                <div className="p-4 space-y-3">
                                                    {/* Title */}
                                                    <h2 className="text-xl font-semibold text-gray-800 break-words line-clamp-2 dark:text-white">
                                                        {course?.title}
                                                    </h2>

                                                    {/* Description */}
                                                    <p className="text-sm text-gray-600 break-words dark:text-gray-300 line-clamp-2">
                                                        {course?.short_description}
                                                    </p>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                                                        <span className="bg-blue-100 text-blue-800 break-words overflow-hidden  px-2 py-0.5 rounded-full">
                                                            {course?.course_language}
                                                        </span>
                                                        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                                            {course?.level}
                                                        </span>

                                                    </div>


                                                    <div className="space-y-2 text-gray-800 dark:text-white">
                                                        <h4 className="text-lg font-semibold">Course Progress</h4>

                                                        <div className="w-full h-4 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                                                            <div
                                                                className={`${course.course_progress === 100 ? "bg-green-600 dark:bg-green-400" : "bg-blue-600 dark:bg-blue-400"} h-full transition-all duration-500 ease-in-out `}
                                                                style={{ width: `${course.course_progress}%` }}
                                                            ></div>
                                                        </div>

                                                        <div className="text-sm text-right text-gray-600 dark:text-gray-300">
                                                            {course.course_progress}% Complete
                                                        </div>
                                                    </div>



                                                </div>

                                            </Link>

                                            <div className="my-4">
                                                <LinkButton
                                                    Text={"View Course"}
                                                    URL={route("courses.player", { course_slug: course.slug })}
                                                    Icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>

                                                    }
                                                />
                                            </div>
                                        </>
                                    }
                                />


                            ))}
                        </div>


                        {(courses.data.length === 0) ? (
                            <div
                                className="flex items-center justify-center gap-3 p-3 my-4 transition-all duration-300 bg-gray-200 rounded-lg shadow-sm dark:bg-gray-700"
                            >
                                <h4 className="font-semibold text-center text-gray-800 text-md dark:text-white">
                                    No Courses Found
                                </h4>
                            </div>
                        )
                            :
                            (
                                <>

                                    {courses.data.length > 0 && (
                                        <div className="px-6 py-4 mt-5 border-t border-gray-200 dark:border-gray-800">
                                            <div className="flex items-center justify-between">
                                                <PrimaryButton
                                                    Text={
                                                        <>
                                                            <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715Z"
                                                                />
                                                            </svg>
                                                            <span className="hidden mx-2 sm:inline"> Previous </span>
                                                        </>
                                                    }
                                                    Disabled={!courses.links[0].url}
                                                    Action={() => handlePagination(courses.links[0].url)}
                                                    CustomClass="w-[140px] h-[40px]"
                                                    Type="button"
                                                />
                                                <ul className="hidden items-center gap-0.5 sm:flex">
                                                    {courses.links.slice(1, -1).map((link, idx) => (
                                                        <li key={idx}>
                                                            <button
                                                                onClick={() => handlePagination(link.url)}
                                                                disabled={!link.url || link.active}
                                                                className={`text-theme-sm flex h-10 w-10 items-center justify-center rounded-lg font-medium ${link.active
                                                                    ? 'bg-blue-800/[0.08] text-blue-500'
                                                                    : 'text-gray-700 hover:bg-blue-500/[0.08] hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500'
                                                                    }`}
                                                            >
                                                                {link.label}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <PrimaryButton
                                                    Text={
                                                        <>
                                                            <span className="hidden sm:inline"> Next </span>
                                                            <svg className="mx-2 fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715Z"
                                                                />
                                                            </svg>
                                                        </>
                                                    }
                                                    Disabled={!courses.links[courses.links.length - 1].url}
                                                    Action={() => handlePagination(courses.links[courses.links.length - 1].url)}
                                                    CustomClass="w-[140px] h-[40px] mx-2"
                                                    Type="button"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        }
                    </>
                }
            />
        </AuthenticatedLayout>
    )
}
