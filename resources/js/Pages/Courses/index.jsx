import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import SelectInput from '@/Components/SelectInput';
import Table from '@/Components/Table';
import Toast from '@/Components/Toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import debounce from 'lodash.debounce';
import React, { use, useCallback, useEffect, useState } from 'react'

export default function index({ courses, users, categories, instructors }) {

    // Bulk Delete Form Data
    const { props } = usePage();
    const { data: BulkselectedIds, setData: setBulkSelectedIds, delete: BulkDelete, reset: resetBulkSelectedIds } = useForm({
        ids: [],
    });


    // Single Delete Form Data
    const { data: SingleSelectedId, setData: setSingleSelectedId, delete: SingleDelete, reset: resetSingleSelectedId } = useForm({
        id: null,
    });


    const [flash, setFlash] = useState(null);
    const [columns, setColumns] = useState([]);
    const [customActions, setCustomActions] = useState([]);


    // Custom Search States
    const [instructor_id, setInstructor_id] = useState(props.instructor_id ?? '');
    const [category_id, setCategory_id] = useState(props.category_id ?? '');
    const [ParentSearched, setParentSearched] = useState(false);


    useEffect(() => {

        const columns = [
            { key: 'title', label: 'Title' },
            {
                label: 'Instructor', render: (item) => {
                    if (!item.instructor_id) {
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
                            {item.instructor.name}
                        </span>
                    )
                }
            },
            {
                label: 'Category', render: (item) => {
                    if (!item.category_id) {
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
                            {item.category.name}
                        </span>
                    )
                }
            },

            {
                key: 'is_published',
                label: 'Published Status',
                badge: (value) => value === 'Published' ? 'bg-green-200 text-green-800 dark:bg-white dark:text-gray-800' : 'bg-red-200 text-red-800'

            },

            {
                key: 'is_approved', label: 'Approved Status',
                badge: (value) => value === 'Approved' ? 'bg-green-200 text-green-800 dark:bg-white dark:text-gray-800' : 'bg-red-200 text-red-800'
            },



            {
                key: 'lessons_count', label: 'Lessons Count',
                badge: (value) => value > 0 ? 'bg-green-200 text-green-800 dark:bg-white dark:text-gray-800' : 'bg-red-200 text-red-800'
            },


            { key: 'level', label: 'Course Level' },
            { key: 'course_language', label: 'Course Language' },

            {
                key: 'promo_video_duration', label: 'Course Promo Video Duration', render: (item) => {
                    if (item.promo_video_duration === null) {
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
                            {item.promo_video_duration}
                        </span>
                    )

                }
            },

            {
                key: 'price',
                label: 'Course Price',
                badge: (value) => value === 'Free' ? 'bg-green-200 text-green-800 dark:bg-white dark:text-gray-800' : ''
            },

            {
                label: 'Course Price Discount',
                render: (item) => {
                    if (item.discount === 0) {
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
                            {item.discount} %
                        </span>
                    );
                }
            },

            { key: 'added_at', label: 'Created At' },
        ];


        const customActions = [
            {
                label: "View Course",
                onClick: (item) => router.visit(route("courses.player", item.slug)),

            }
        ];

        setCustomActions(customActions);
        setColumns(columns);

    }, []);

    return (
        <>

            <AuthenticatedLayout>

                <Head title='Courses' />

                <BreadCrumb
                    header={"Courses"}
                    parent={"Dashboard"}
                    child={"Courses"}
                    parent_link={route("dashboard")}
                />


                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Create Course"}
                                    URL={route("courses.create")}
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
                                EditRoute={"courses.edit"}
                                BulkDeleteRoute={"courses.destroybyselection"}
                                SearchRoute={"courses.index"}
                                SingleDeleteRoute={"courses.destroy"}
                                items={courses}
                                props={props}
                                columns={columns}
                                ParentSearched={ParentSearched}
                                RouteParameterKey={"slug"}
                                searchProps={{ instructor_id: instructor_id, category_id: category_id }}
                                customActions={customActions}
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
