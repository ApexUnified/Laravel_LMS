import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import PrimaryButton from '@/Components/PrimaryButton'
import Toast from '@/Components/Toast'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import axios from 'axios'
import React, { useState } from 'react'

export default function index({ notifications }) {


    const [flash, setFlash] = useState(null);

    const [destroyNotificationModal, setDestroyNotificationModal] = useState(false);
    const [destroyNotificationId, setDestroyNotificationId] = useState(null);
    const [destroyNotificationLoader, setDestroyNotificationLoader] = useState(false);
    const destroyNotification = async () => {

        setFlash(null);
        if (!destroyNotificationId) {
            setFlash({ error: 'Please select a notification to delete' });
            return;
        }
        const id = destroyNotificationId;

        setDestroyNotificationLoader(true);
        const response = await axios.delete(route('notifications.destroy', id))

        if (response.data.status) {
            setFlash({ success: response.data.message });
        } else {
            setFlash({ error: response.data.message });
        }

        setDestroyNotificationLoader(false);
        setDestroyNotificationModal(false);
        router.reload();
    }



    const [destroyAllNotificationModal, setDestroyAllNotificationModal] = useState(false);
    const [destroyAllNotificationLoader, setDestroyAllNotificationLoader] = useState(false);
    const destroyAllnotifications = async () => {
        setFlash(null);
        setDestroyAllNotificationLoader(true);
        const response = await axios.delete(route('notifications.destroyallnotifications'));
        if (response.data.status) {
            setFlash({ success: response.data.message });
        } else {
            setFlash({ error: response.data.message });
        }

        setDestroyAllNotificationLoader(true);
        setDestroyAllNotificationModal(false);
        router.reload();
    }


    const handlePagination = (link) => {
        if (link) {
            router.visit(link, { preserveScroll: true, preserveState: true });
        }
    }

    return (
        <AuthenticatedLayout>

            <Head title='Notifications' />

            <BreadCrumb
                header={'Notifications'}
                parent={'Dashboard'}
                child={'Notifications'}
                parent_link={route('dashboard')}
            />


            {flash && (
                <Toast flash={flash} />
            )}


            <Card
                Content={
                    <>

                        <div className="flex flex-wrap justify-end my-3">
                            <PrimaryButton
                                Text={"Delete All Notifications"}
                                CustomClass={"w-[300px] bg-red-500 hover:bg-red-600"}
                                Action={() => notifications.data.length > 0 && setDestroyAllNotificationModal(true)}
                                Disabled={notifications.data.length === 0}
                                Type={"button"}
                                Icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 justify-items-center">
                            {notifications.data.map((notification, index) => {

                                return (

                                    <div className="w-full max-w-lg" key={index}>
                                        <Card
                                            key={index}
                                            CustomCss="flex flex-col justify-between gap-4 max-w-xl min-h-[200px] p-4  hover:scale-105 transition duration-300 ease-in-out"
                                            Content={
                                                <>
                                                    {/* Top Section */}
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="flex items-center justify-center w-12 h-12 text-blue-600 bg-blue-100 rounded-full">
                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                                {notification.data.title}
                                                            </h4>
                                                            <p className="mt-1 text-sm text-gray-600 dark:text-white">
                                                                {notification.data.message}
                                                            </p>
                                                        </div>

                                                        {notification.read_at ? (
                                                            <span className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></span>
                                                        ) : (
                                                            <span className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></span>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-2">
                                                        {notification.data.route && (
                                                            <div className="pt-2 mt-auto">
                                                                <LinkButton
                                                                    URL={route(notification.data.route.name, [...notification.data.route.params || []])}
                                                                    CustomClass={'w-[50px]'}
                                                                    Icon={
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                        </svg>

                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="pt-2 mt-auto">
                                                            <PrimaryButton
                                                                Action={() => {
                                                                    setDestroyNotificationId(notification.id);
                                                                    setDestroyNotificationModal(true);
                                                                }}
                                                                CustomClass={'w-[50px] bg-red-500 hover:bg-red-600'}
                                                                Icon={
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                    </svg>

                                                                }
                                                            />
                                                        </div>


                                                    </div>



                                                </>
                                            }
                                        />

                                    </div>

                                )


                            })}
                        </div>

                        {notifications.data.length === 0 ? (
                            <div
                                className="flex items-center justify-center gap-3 p-3 my-4 transition-all duration-300 bg-gray-200 rounded-lg shadow-sm dark:bg-gray-700"
                            >
                                <h4 className="font-semibold text-center text-gray-800 text-md dark:text-white">
                                    No Notifications Found
                                </h4>
                            </div>
                        )
                            :
                            (
                                <>
                                    {notifications.data.length > 0 && (
                                        <div className="px-6 py-4 mt-5 border-t border-gray-200 dark:border-gray-800">
                                            <div className="flex items-center justify-between">
                                                <PrimaryButton
                                                    Text={
                                                        <>
                                                            <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715Z"
                                                                />
                                                            </svg>
                                                            <span className="hidden mx-2 sm:inline"> Previous </span>
                                                        </>
                                                    }
                                                    Disabled={!notifications.links[0].url}
                                                    Action={() => handlePagination(notifications.links[0].url)}
                                                    CustomClass="w-[140px] h-[40px]"
                                                    Type="button"
                                                />
                                                <ul className="hidden items-center gap-0.5 sm:flex">
                                                    {notifications.links.slice(1, -1).map((link, idx) => (
                                                        <li key={idx}>
                                                            <button
                                                                onClick={() => handlePagination(link.url)}
                                                                disabled={!link.url || link.active}
                                                                className={`text-theme-sm flex h-10 w-10 items-center justify-center rounded-lg font-medium ${link.active
                                                                    ? 'bg-blue-800/[0.08] text-blue-500'
                                                                    : 'text-gray-700 hover:bg-blue-500/[0.08] hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500'
                                                                    }`}
                                                            >
                                                                {link.label}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <PrimaryButton
                                                    Text={
                                                        <>
                                                            <span className="hidden sm:inline"> Next </span>
                                                            <svg className="mx-2 fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715Z"
                                                                />
                                                            </svg>
                                                        </>
                                                    }
                                                    Disabled={!notifications.links[notifications.links.length - 1].url}
                                                    Action={() => handlePagination(notifications.links[notifications.links.length - 1].url)}
                                                    CustomClass="w-[140px] h-[40px] mx-2"
                                                    Type="button"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        }
                    </>
                }
            />

            {/* Destroy Single Notification Modal */}
            {destroyNotificationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 backdrop-blur-[32px]"
                        onClick={() => !destroyNotificationLoader && setDestroyNotificationModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-md p-6 bg-white shadow-xl dark:bg-gray-800 rounded-2xl sm:p-8">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Are You Sure?</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                You won't be able to revert this action.
                            </p>

                            <div className="flex items-center justify-center gap-4 mt-6">
                                <button
                                    onClick={() => {
                                        setDestroyNotificationLoader(false);
                                        setDestroyNotificationModal(false);
                                    }}
                                    type="button"
                                    disabled={destroyNotificationLoader}
                                    className={`inline-flex h-[50px] items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition ${destroyNotificationLoader ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    Close
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                        />
                                    </svg>
                                </button>

                                <PrimaryButton
                                    Type="button"
                                    Text="Yes Delete it!"
                                    Spinner={destroyNotificationLoader}
                                    Disabled={destroyNotificationLoader}
                                    Action={destroyNotification}
                                    Icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}





            {/* Destroy All notification Modal */}
            {destroyAllNotificationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 backdrop-blur-[32px]"
                        onClick={() => !destroyAllNotificationLoader && setDestroyAllNotificationModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-md p-6 bg-white shadow-xl dark:bg-gray-800 rounded-2xl sm:p-8">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Are You Sure?</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                You won't be able to revert this action.
                            </p>

                            <div className="flex items-center justify-center gap-4 mt-6">
                                <button
                                    onClick={() => {
                                        setDestroyAllNotificationLoader(false);
                                        setDestroyAllNotificationModal(false);
                                    }}
                                    type="button"
                                    disabled={destroyAllNotificationLoader}
                                    className={`inline-flex h-[50px] items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition ${destroyAllNotificationLoader ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    Close
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                        />
                                    </svg>
                                </button>

                                <PrimaryButton
                                    Type="button"
                                    Text="Yes Delete it!"
                                    Spinner={destroyAllNotificationLoader}
                                    Disabled={destroyAllNotificationLoader}
                                    Action={destroyAllnotifications}
                                    Icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    )
}
