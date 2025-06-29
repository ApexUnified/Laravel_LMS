import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import SelectInput from '@/Components/SelectInput';
import Table from '@/Components/Table';
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

    const [columns, setColumns] = useState([]);
    // const [customActions, setCustomActions] = useState([]);


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
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  bg-green-200 text-green-800 `}
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
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  bg-green-200 text-green-800 `}
                        >
                            {item.category.name}
                        </span>
                    )
                }
            },
            { key: 'total_course_duration', label: 'Course Duration' },
            { key: 'is_published', label: 'Published Status', badge: (value) => value === 'Published' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800' },
            { key: 'is_approved', label: 'Approved Status', badge: (value) => value === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800' },
            { key: 'level', label: 'Course Level' },
            { key: 'course_language', label: 'Course Language' },
            { key: 'price', label: 'Course Price', badge: (value) => value === 'Free' ? 'bg-green-200 text-green-800' : '' },
            { key: 'added_at', label: 'Created At' },
        ];


        // it works
        // const customActions = [
        //     {
        //         label: "Demo",
        //         onClick: (item) => router.visit(route("courses.show", item.id))

        //     }
        // ]

        // setCustomActions(customActions);
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
                                ViewRoute={"courses.show"}
                                items={courses}
                                props={props}
                                columns={columns}
                                ParentSearched={ParentSearched}
                                searchProps={{ instructor_id: instructor_id, category_id: category_id }}
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
