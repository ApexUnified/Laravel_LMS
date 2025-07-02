import BreadCrumb from '@/Components/BreadCrumb';
import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import SelectInput from '@/Components/SelectInput';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

export default function index({ lessons, categories, instructors, courses }) {

    // Bulk Delete Form Data
    const { props } = usePage();
    const { data: BulkselectedIds, setData: setBulkSelectedIds, delete: BulkDelete, reset: resetBulkSelectedIds } = useForm({
        ids: [],
    });


    // Single Delete Form Data
    const { data: SingleSelectedId, setData: setSingleSelectedId, delete: SingleDelete, reset: resetSingleSelectedId } = useForm({
        id: null,
    });

    const [columns, setColumns] = useState([]);


    // Custom Search States
    const [instructor_id, setInstructor_id] = useState(props.instructor_id ?? '');
    const [category_id, setCategory_id] = useState(props.category_id ?? '');
    const [course_id, setCourse_id] = useState(props.course_id ?? '');
    const [ParentSearched, setParentSearched] = useState(false);


    useEffect(() => {

        const columns = [
            { key: 'title', label: 'Lesson Title' },

            {
                label: 'Instructor Related To Course',
                render: (item) => {
                    if (!item?.course?.instructor_id) {
                        return (
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  bg-red-200 text-red-800 `}
                            >
                                N/A
                            </span>
                        )
                    }
                    return (
                        <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full dark:bg-white dark:text-gray-800  bg-green-200 text-green-800 `}
                        >
                            {item.course.instructor.name}
                        </span>
                    )
                }
            },

            {
                label: 'Lesson Related To Course',
                render: (item) => {
                    if (!item?.course_id) {
                        return (
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  bg-red-200 text-red-800 `}
                            >
                                N/A
                            </span>
                        )
                    }
                    return (
                        <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full dark:bg-white dark:text-gray-800  bg-green-200 text-green-800 `}
                        >
                            {item.course.title}
                        </span>
                    )
                }
            },

            {
                label: 'Course Category',
                render: (item) => {
                    if (!item?.course?.category_id) {
                        return (
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  bg-red-200 text-red-800 `}
                            >
                                N/A
                            </span>
                        )
                    }
                    return (
                        <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full dark:bg-white dark:text-gray-800  bg-green-200 text-green-800 `}
                        >
                            {item.course.category.name}
                        </span>
                    )
                }
            },


            {
                label: 'Lesson Publish Status',
                render: (item) => {
                    if (item.is_published == 0) {
                        return (
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  bg-red-200 text-red-800 `}
                            >
                                Not Published
                            </span>
                        )
                    }
                    return (
                        <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full dark:bg-white dark:text-gray-800  bg-green-200 text-green-800 `}
                        >
                            Published
                        </span>
                    )
                }
            },



            {
                label: 'Lesson Approval Status',
                render: (item) => {
                    if (item.is_approved == 0) {
                        return (
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  bg-red-200 text-red-800 `}
                            >
                                Not Approved
                            </span>
                        )
                    }
                    return (
                        <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full dark:bg-white dark:text-gray-800  bg-green-200 text-green-800 `}
                        >
                            Approved
                        </span>
                    )
                }
            },


            { key: 'video_duration', badge: (value) => 'bg-green-200 text-green-800 dark:bg-white dark:text-gray-800', label: 'Lesson Duration' },
            { key: 'added_at', label: 'Created At' },
        ];

        setColumns(columns);

    }, []);

    return (
        <>
            <AuthenticatedLayout>

                <Head title='Lessons' />

                <BreadCrumb
                    header={"Lessons"}
                    parent={"Dashboard"}
                    child={"Lessons"}
                    parent_link={route("dashboard")}
                />


                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Create Lesson"}
                                    URL={route("lessons.create")}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>

                                    }
                                />
                            </div>

                            <Table
                                setBulkSelectedIds={setBulkSelectedIds}
                                setSingleSelectedId={setSingleSelectedId}
                                SingleSelectedId={SingleSelectedId}
                                resetBulkSelectedIds={resetBulkSelectedIds}
                                resetSingleSelectedId={resetSingleSelectedId}
                                BulkDeleteMethod={BulkDelete}
                                SingleDeleteMethod={SingleDelete}
                                EditRoute={"lessons.edit"}
                                BulkDeleteRoute={"lessons.destroybyselection"}
                                SearchRoute={"lessons.index"}
                                SingleDeleteRoute={"lessons.destroy"}
                                items={lessons}
                                props={props}
                                columns={columns}
                                ParentSearched={ParentSearched}
                                RouteParameterKey={"slug"}
                                searchProps={{ instructor_id: instructor_id, category_id: category_id, course_id: course_id }}
                                customSearch={
                                    <>
                                        <div className="relative mb-2">
                                            <SelectInput
                                                Id={'category_id'}
                                                Name={'category_id'}
                                                InputName={'Category'}
                                                items={categories}
                                                itemKey={'name'}
                                                Value={category_id}
                                                Action={(e) => {
                                                    const value = e.target.value;
                                                    setCategory_id(value);
                                                    setParentSearched(true);
                                                }}
                                            />

                                        </div>


                                        <div className="relative mb-2">
                                            <SelectInput
                                                Id={'instructor_id'}
                                                Name={'instructor_id'}
                                                InputName={'Instructor'}
                                                items={instructors}
                                                itemKey={'name'}
                                                Value={instructor_id}
                                                Action={(e) => {
                                                    const value = e.target.value;
                                                    setInstructor_id(value);
                                                    setParentSearched(true);
                                                }}
                                            />

                                        </div>


                                        <div className="relative mb-2">
                                            <SelectInput
                                                Id={'course_id'}
                                                Name={'course_id'}
                                                InputName={'Course'}
                                                items={courses}
                                                itemKey={'title'}
                                                Value={course_id}
                                                Action={(e) => {
                                                    const value = e.target.value;
                                                    setCourse_id(value);
                                                    setParentSearched(true);
                                                }}
                                            />

                                        </div>
                                    </>
                                }

                            // customActions={customActions}
                            />
                        </>
                    }
                />


            </AuthenticatedLayout>

        </>
    )
}
