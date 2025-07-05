import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import Table from '@/Components/Table'
import Toast from '@/Components/Toast'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function index({ currencies }) {

    // Bulk Delete Form Data
    const { props } = usePage();

    const [flash, setFlash] = useState(null);

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
            { key: 'currency_name', label: 'Currency Name' },
            { key: 'currency_code', label: 'Currency Code' },
            { key: 'currency_symbol', label: 'Currency Symbol' },
            {
                label: "Currency Status", render: (item) => {
                    return (
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={item.is_active}
                                onChange={(e) => {
                                    setFlash(null);
                                    const newStatus = e.target.checked;
                                    axios.put(route("settings.currencies.toggle.status", { id: item.id }),
                                        { is_active: newStatus },
                                    ).then((response) => {
                                        if (response.data.status) {
                                            setFlash({ success: response.data.message })

                                        } else {
                                            setFlash({ error: response.data.message })
                                        }
                                    });
                                    router.reload();
                                }}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700
                                        peer-checked:after:translate-x-full
                                        rtl:peer-checked:after:-translate-x-full
                                        peer-checked:after:border-white
                                        after:content-['']
                                        after:absolute after:top-[2px] after:start-[2px]
                                        after:bg-white after:border-gray-300 after:border
                                        after:rounded-full after:h-5 after:w-5 after:transition-all
                                        dark:border-gray-600
                                        peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                            </div>
                        </label>
                    )
                }
            },
            { key: 'added_at', label: 'Created At' },
        ];


        setColumns(columns);

    }, []);

    return (

        <AuthenticatedLayout>

            <Head title='Currencies' />

            <BreadCrumb
                header={'Currencies'}
                parent={"Dashboard"}
                child={"Currencies"}
                parent_link={route('dashboard')}
            />

            {flash && <Toast flash={flash} />}

            <Card
                Content={
                    <>
                        <div className="flex flex-wrap justify-end my-3">
                            <LinkButton
                                Text={"Create Currency"}
                                URL={route("settings.currencies.create")}
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
                            EditRoute={"settings.currencies.edit"}
                            BulkDeleteRoute={"settings.currencies.destroybyselection"}
                            SearchRoute={"settings.currencies.index"}
                            SingleDeleteRoute={"settings.currencies.destroy"}
                            items={currencies}
                            props={props}
                            columns={columns}
                        />
                    </>
                }
            />

        </AuthenticatedLayout>

    )
}
