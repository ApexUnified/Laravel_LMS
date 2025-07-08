import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import Table from '@/Components/Table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import * as LucideIcons from 'lucide-react';

export default function index({ permissions }) {

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
            { key: 'name', label: 'Role Name' },
            { key: 'guard_name', label: 'Guard Name' },
            {
                label: "Icon",
                render: (item) => {
                    const IconComponent = LucideIcons[item.icon] || LucideIcons.HelpCircle;

                    return (
                        <>
                            <IconComponent size={20} />
                        </>
                    );
                }
            },
            { key: 'added_at', label: 'Created At' },
        ];


        setColumns(columns);

    }, []);



    return (
        <AuthenticatedLayout>

            <Head title='Permissions' />

            <BreadCrumb
                header={"Permissions"}
                parent={"Roles"}
                parent_link={route("settings.roles.index")}
                child={"Permissions"}
            />


            <Card
                Content={
                    <>
                        <div className="flex flex-wrap justify-end gap-5 my-3">
                            <LinkButton
                                Text={"Back To Roles"}
                                URL={route("settings.roles.index")}
                                Icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>


                                }
                            />


                            <LinkButton
                                Text={"Create Permission"}
                                URL={route("settings.permissions.create")}
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
                            EditRoute={"settings.permissions.edit"}
                            BulkDeleteRoute={"settings.permissions.destroybyselection"}
                            Search={false}
                            SingleDeleteRoute={"settings.permissions.destroy"}
                            items={permissions}
                            props={props}
                            columns={columns}
                        />
                    </>
                }
            />

        </AuthenticatedLayout>
    )
}
