import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import Table from '@/Components/Table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function index({ users }) {


    // Bulk Delete Form Data
    const { props } = usePage();
    const { data: BulkselectedIds, setData: setBulkSelectedIds, delete: BulkDelete, reset: resetBulkSelectedIds } = useForm({
        ids: [],
    });


    // Single Delete Form Data
    const { data: SingleSelectedId, setData: setSingleSelectedId, delete: SingleDelete, reset: resetSingleSelectedId } = useForm({
        id: null,
    })

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const columns = [
            { key: 'profile_url', label: 'Profile', image: true, default: 'avatar' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role_name', label: 'Role Name' },
            { key: 'added_at', label: 'Created At' },
        ];

        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>

                <Head title='Users' />

                <BreadCrumb
                    header={"Users"}
                    parent={"Dashboard"}
                    parent_link={route("dashboard")}
                    child={"Users"}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Create User"}
                                    URL={route("users.create")}
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
                                EditRoute={"users.edit"}
                                BulkDeleteRoute={"users.destroybyselection"}
                                SearchRoute={"users.index"}
                                SingleDeleteRoute={"users.destroy"}
                                ViewRoute={"users.show"}
                                items={users}
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
