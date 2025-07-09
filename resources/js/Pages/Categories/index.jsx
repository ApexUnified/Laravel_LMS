import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BreadCrumb from '@/Components/BreadCrumb'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import Table from '@/Components/Table';
import { Label } from '@headlessui/react';
import { useEffect, useState } from 'react';
import Can from '@/Hooks/Can';
import useCan from '@/Hooks/UseCan';

export default function index({ categories }) {


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

    useEffect(() => {
        const columns = [
            { key: 'name', label: 'Category Name' },
            { key: 'courses_count', label: 'Total Courses', badge: (value) => 'bg-gray-800 text-white  dark:bg-white dark:text-black  px-4' },
            { key: 'added_at', label: 'Created At' },
        ];


        setColumns(columns);
    }, []);



    return (
        <>
            <AuthenticatedLayout>
                <Head title="Category" />

                <BreadCrumb
                    header={"Category"}
                    parent={"Dashboard"}
                    parent_link={route("dashboard")}
                    child={"Category"}
                />

                <Card
                    Content={
                        <>
                            <Can permission={"Category Create"}>
                                <div className="flex flex-wrap justify-end my-3">
                                    <LinkButton
                                        Text={"Create Category"}
                                        URL={route("category.create")}
                                        Icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>

                                        }
                                    />
                                </div>
                            </Can>

                            <Table
                                setBulkSelectedIds={setBulkSelectedIds}
                                setSingleSelectedId={setSingleSelectedId}
                                SingleSelectedId={SingleSelectedId}
                                resetBulkSelectedIds={resetBulkSelectedIds}
                                resetSingleSelectedId={resetSingleSelectedId}
                                BulkDeleteMethod={useCan("Category Delete") ? BulkDelete : null}
                                SingleDeleteMethod={SingleDelete}
                                EditRoute={useCan("Category Edit") ? "category.edit" : null}
                                BulkDeleteRoute={"category.deletebyselection"}
                                SearchRoute={"category.index"}
                                SingleDeleteRoute={"category.destroy"}
                                items={categories}
                                props={props}
                                columns={columns}
                                DeleteAction={useCan("Category Delete")}
                            />
                        </>
                    }
                />








            </AuthenticatedLayout >
        </>
    );

}

