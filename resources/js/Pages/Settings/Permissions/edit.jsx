import BreadCrumb from '@/Components/BreadCrumb';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react'

export default function edit({ permission }) {

    const { data, setData, put, processing, errors } = useForm({
        name: permission.name || '',
        icon: permission.icon || ''
    })

    const submit = (e) => {
        e.preventDefault();
        put(route("settings.permissions.update", permission.id));
    }

    return (
        <>

            <AuthenticatedLayout>

                <Head title='Permissions' />
                <BreadCrumb
                    header={"Edit Permission"}
                    parent={"Permissions"}
                    child={"Edit Permission"}
                    parent_link={route("settings.permissions.index")}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Back To Permissions"}
                                    URL={route("settings.permissions.index")}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                        </svg>


                                    }
                                />
                            </div>

                            <form onSubmit={submit}>
                                <div className="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">

                                    <div className="grid grid-cols-1 gap-4 px-5 mb-4 sm:grid-cols-2 sm:px-6">

                                        <Input
                                            InputName={"Permission Name"}
                                            Error={errors.name}
                                            Value={data.name}
                                            Action={
                                                (e) => setData("name", e.target.value)
                                            }

                                            Placeholder={"Enter Permission Name"}
                                            Id={"name"}
                                            Name={"name"}
                                            Type={"text"}
                                            Required={true}

                                        />


                                        <Input
                                            InputName={"Permission Icon"}
                                            Error={errors.icon}
                                            Value={data.icon}
                                            Action={
                                                (e) => setData("icon", e.target.value)
                                            }

                                            Placeholder={"Enter Permission Icon"}
                                            Id={"icon"}
                                            Name={"icon"}
                                            Type={"text"}
                                            Required={true}

                                        />

                                    </div>




                                    <PrimaryButton
                                        Text={"Update Permission"}
                                        Type={"submit"}
                                        CustomClass={"w-[200px] mx-5 mt-10"}
                                        Disabled={(processing || data.name === "" || data.icon_class === "") || data.name === permission.name && data.icon === permission.icon}
                                        Spinner={processing}
                                        Icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        }

                                    />


                                </div>

                            </form>
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    )
}
