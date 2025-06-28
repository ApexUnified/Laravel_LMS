import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import React from 'react'

export default function index({ courses }) {

    // Bulk Delete Form Data
    const { props } = usePage();
    const { data: BulkselectedIds, setData: setBulkSelectedIds, delete: BulkDelete, reset: resetBulkSelectedIds } = useForm({
        ids: [],
    });


    // Single Delete Form Data
    const { data: SingleSelectedId, setData: setSingleSelectedId, delete: SingleDelete, reset: resetSingleSelectedId } = useForm({
        id: null,
    })

    const columns = [
        { key: 'title', label: 'Title' },
        { key: 'instructor.name', label: 'Instructor' },
        { key: 'category.name', label: 'Category' },
        { key: 'total_course_duration', label: 'Course Duration' },
        { key: 'is_published', label: 'Published Status' },
        { key: 'is_approved', label: 'Approved Status' },
        { key: 'level', label: 'Course Level' },
        { key: 'course_language', label: 'Course Language' },
        { key: 'price', label: 'Course Price' },
        { key: 'added_at', label: 'Created At' },
    ];

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
                            />
                        </>
                    }
                />


            </AuthenticatedLayout>
        </>
    )
}
