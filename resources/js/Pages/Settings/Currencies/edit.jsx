import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import Input from '@/Components/Input'
import LinkButton from '@/Components/LinkButton'
import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

export default function edit({ currency }) {
    const { data, setData, put, processing, errors } = useForm({
        currency_name: currency.currency_name || '',
        currency_code: currency.currency_code || '',
        currency_symbol: currency.currency_symbol || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("settings.currencies.update", currency.id));
    }
    return (
        <AuthenticatedLayout>

            <Head title='Currencies' />

            <BreadCrumb
                header={'Edit Currency'}
                parent={"Currencies"}
                child={"Edit Currency"}
                parent_link={route('settings.currencies.index')}
            />

            <Card
                Content={
                    <>
                        <div className="flex flex-wrap justify-end my-3">
                            <LinkButton
                                Text={"Back To Currencies"}
                                URL={route("settings.currencies.index")}
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
                                        InputName={"Currency Name"}
                                        Error={errors.currency_name}
                                        Value={data.currency_name}
                                        Action={
                                            (e) => setData("currency_name", e.target.value)
                                        }

                                        Placeholder={"Enter Currency Name"}
                                        Id={"currency_name"}
                                        Name={"currency_name"}
                                        Type={"text"}
                                        Required={true}

                                    />

                                    <Input
                                        InputName={"Currency Code"}
                                        Error={errors.currency_code}
                                        Value={data.currency_code}
                                        Action={
                                            (e) => setData("currency_code", e.target.value)
                                        }

                                        Placeholder={"Enter Currency Code"}
                                        Id={"currency_code"}
                                        Name={"currency_code"}
                                        Type={"text"}
                                        Required={true}

                                    />

                                </div>




                                <div className="grid grid-cols-1 gap-4 px-5 mb-4 sm:grid-cols-2 sm:px-6">

                                    <Input
                                        InputName={"Currency Symbol"}
                                        Error={errors.currency_symbol}
                                        Value={data.currency_symbol}
                                        Action={
                                            (e) => setData("currency_symbol", e.target.value)
                                        }

                                        Placeholder={"Enter Currency Symbol"}
                                        Id={"currency_symbol"}
                                        Name={"currency_symbol"}
                                        Type={"text"}
                                        Required={true}

                                    />


                                </div>




                                <PrimaryButton
                                    Text={"Update Currency"}
                                    Type={"submit"}
                                    CustomClass={"w-[200px] mx-5 mt-10"}
                                    Disabled={(processing ||
                                        data.currency_name === "" ||
                                        data.currency_code === "" ||
                                        data.currency_symbol === ""
                                    ) ||

                                        (data.currency_name === currency.currency_name &&
                                            data.currency_code === currency.currency_code &&
                                            data.currency_symbol === currency.currency_symbol)

                                    }
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

    )
}
