import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import Input from '@/Components/Input'
import LinkButton from '@/Components/LinkButton'
import Table from '@/Components/Table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import React, { useEffect, useRef, useState } from 'react'

export default function index({ transactions }) {


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
    const [customActions, setCustomActions] = useState([]);


    //  FlatPicker Ref

    const startDate_ref = useRef();
    const endDate_ref = useRef();

    useEffect(() => {
        flatpickr(startDate_ref.current, {
            enableTime: false,
            dateFormat: "Y-m-d",
            onChange: function (selectedDates, dateStr, instance) {
                setStart_date(dateStr);
                setParentSearched(true);
            }

        });


        flatpickr(endDate_ref.current, {
            enableTime: false,
            dateFormat: "Y-m-d",
            onChange: function (selectedDates, dateStr, instance) {
                setEnd_date(dateStr);
                setParentSearched(true);
            }

        });
    }, []);


    // Custom Search States
    const [start_date, setStart_date] = useState(props.start_date ?? '');
    const [end_date, setEnd_date] = useState(props.end_date ?? '');
    const [ParentSearched, setParentSearched] = useState(false);


    useEffect(() => {

        const columns = [
            {
                label: "User Details",
                render: (item) => {
                    if (item?.user) {
                        return (
                            <div className="flex flex-col items-center justify-center">
                                {item?.user?.profile_url ? (
                                    <img src={item?.user?.profile_url} alt="Profile" className="object-cover w-full rounded-full sm:h-20 sm:w-20" />
                                )
                                    :
                                    (
                                        <span className="flex items-center justify-center w-full text-2xl text-white bg-gray-500 rounded-full sm:h-20 sm:w-20">
                                            {item?.user?.avatar}
                                        </span>
                                    )
                                }
                                <div className="mt-3 ml-3 text-center">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white/50  w-[250px] break-words truncate whitespace-normal">{item?.user?.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-white/50  w-[250px] break-words truncate whitespace-normal">{item?.user?.email}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="flex flex-col items-center justify-center">
                                <span className="flex items-center justify-center w-full text-2xl text-white bg-gray-500 rounded-full sm:h-20 sm:w-20">
                                    {item?.user_name.charAt(0)}
                                </span>
                                <div className="mt-3 ml-3 text-center">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white/50  w-[250px] break-words truncate whitespace-normal">{item?.user_name}</p>
                                    <p className="text-sm text-gray-500 dark:text-white/50  w-[250px] break-words truncate whitespace-normal">{item?.user_email}</p>
                                </div>
                            </div>
                        )
                    }
                }
            },
            {
                label: "Purchased Course",
                render: (item) => {
                    if (item?.course) {
                        return (
                            <div className="flex flex-col items-center justify-center">

                                {item?.course?.thumbnail && (
                                    <img src={item?.course?.thumbnail} alt="Course Thumbnail" className="object-cover w-full rounded-full sm:h-20 sm:w-20" />
                                )}

                                <div className="mt-3 ml-3 text-center">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white/50 w-[250px] break-words truncate whitespace-normal">{item?.course?.title}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="flex flex-col items-center justify-center">
                                <span className="flex items-center justify-center w-full text-2xl text-white bg-gray-500 rounded-full sm:h-20 sm:w-20">
                                    {item?.course_title.charAt(0)}
                                </span>
                                <div className="mt-3 ml-3 text-center">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white/50 w-[250px] break-words truncate whitespace-normal">{item?.course_title}</p>
                                </div>
                            </div>
                        )
                    }
                }
            },
            {

                label: "Amount",
                render: (item) => {
                    return (
                        <div className="flex items-center justify-center">
                            <p className="p-3 text-sm font-medium text-white bg-blue-700 rounded-2xl">
                                {item.currency.toUpperCase()}   {item?.amount}
                            </p>
                        </div>
                    )
                }
            },
            {
                key: 'transaction_id',
                label: "Transaction ID",
                badge: () => 'bg-gray-900 text-white  dark:bg-white dark:text-black  px-4'
            },
            {
                key: 'mode',
                label: "Payment Mode",
                badge: () => 'bg-gray-900 text-white  dark:bg-white dark:text-black  px-4'
            },
            {
                key: 'gateway',
                label: "Payment gateway",
                badge: () => 'bg-gray-900 text-white  dark:bg-white dark:text-black  px-4'
            },

            {
                key: 'payment_status',
                label: "Payment Status",
                badge: () => 'bg-gray-900 text-white  dark:bg-white dark:text-black  px-4'
            },

            {
                key: 'status',
                label: "Transaction Status",
                badge: (value) => value === 'complete' ?
                    'bg-green-700 text-white   px-4'
                    :
                    'bg-red-700 text-white    px-4'
            },
            {
                key: 'added_at',
                label: "Created At",
            },

        ];
        setColumns(columns);

    }, []);

    return (
        <>
            <AuthenticatedLayout>

                <Head title='Transactions' />

                <BreadCrumb
                    header={"Transactions"}
                    parent={"Dashboard"}
                    child={"Transactions"}
                    parent_link={route('dashboard')}
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
                                SearchRoute={"transactions.index"}
                                items={transactions}
                                props={props}
                                DeleteAction={false}
                                columns={columns}
                                ParentSearched={ParentSearched}
                                searchProps={{ start_date: start_date, end_date: end_date }}

                                customSearch={
                                    <>
                                        <div className="relative">
                                            <Input
                                                Id={'start_date'}
                                                Name={'start_date'}
                                                InputRef={startDate_ref}
                                                Type={'text'}
                                                Value={start_date}
                                                Placeholder={'Start Date'}
                                                InputName={'Start Date'}

                                            />

                                        </div>

                                        <div className="relative">
                                            <Input
                                                Id={'start_date'}
                                                Name={'start_date'}
                                                InputRef={endDate_ref}
                                                Type={'text'}
                                                Value={end_date}
                                                Placeholder={'End Date'}
                                                InputName={'End Date'}

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
