import BreadCrumb from '@/Components/BreadCrumb'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function view() {
    return (
        <>
            <AuthenticatedLayout>

                <Head title='Courses' />

                <BreadCrumb
                    header={"View Course"}
                    parent={"Courses"}
                    child={"View Course"}
                    parent_link={route("courses.index")}
                />
            </AuthenticatedLayout>
        </>
    )
}
