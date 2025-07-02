import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card';
import FileUploaderInput from '@/Components/FileUploaderInput';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React, { useState } from 'react'



export default function create({ roles }) {


    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        profile: null,
        role_id: '',
    });


    const [showPasswordToggle, setShowPasswwordToggle] = useState(false);
    const [showPasswordConfirmationToggle, setShowPasswordConfirmationToggle] = useState(false);


    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"));

    }

    return (

        <>

            <AuthenticatedLayout>

                <Head title='Users' />
                <BreadCrumb
                    header={"Create Users"}
                    parent={"Users"}
                    child={"Create User"}
                    parent_link={route("users.index")}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Back To Users"}
                                    URL={route("users.index")}
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
                                            InputName={"User Name"}
                                            Error={errors.name}
                                            Value={data.name}
                                            Action={
                                                (e) => setData("name", e.target.value)
                                            }

                                            Placeholder={"Enter User Name"}
                                            Id={"name"}
                                            Name={"name"}
                                            Type={"text"}
                                            Required={true}

                                        />


                                        <Input
                                            InputName={"User Email"}
                                            Error={errors.email}
                                            Value={data.email}
                                            Action={
                                                (e) => setData("email", e.target.value)
                                            }

                                            Placeholder={"Enter User Email"}
                                            Id={"email"}
                                            Name={"email"}
                                            Type={"email"}
                                            Required={true}


                                        />




                                        <Input
                                            InputName={"User Password"}
                                            Error={errors.password}
                                            Value={data.password}
                                            Action={
                                                (e) => setData("password", e.target.value)
                                            }

                                            Placeholder={"Enter User Password"}
                                            Id={"password"}
                                            Name={"password"}
                                            Type={"password"}
                                            ShowPasswordToggle={showPasswordToggle}
                                            setShowPasswordToggle={setShowPasswwordToggle}
                                            Required={true}

                                        />


                                        <Input
                                            InputName={"User Password Confirmation"}
                                            Error={errors.password_confirmation}
                                            Value={data.password_confirmation}
                                            Action={
                                                (e) => setData("password_confirmation", e.target.value)
                                            }

                                            Placeholder={"Enter User Password Confirmation"}
                                            Id={"password_confirmation"}
                                            Name={"password_confirmation"}
                                            Type={"password"}
                                            ShowPasswordToggle={showPasswordConfirmationToggle}
                                            setShowPasswordToggle={setShowPasswordConfirmationToggle}
                                            Required={true}


                                        />

                                        <SelectInput
                                            InputName={"User Role"}
                                            items={roles}
                                            itemKey={"name"}
                                            Action={(e) => setData("role_id", e.target.value)}
                                            Id={"role_id"}
                                            Name={"role_id"}
                                            Error={errors.role_id}
                                            Value={data.role_id}
                                            Required={true}
                                        />




                                    </div>

                                    {/* FileUploader */}

                                    <div className="px-4 mt-4 sm:px-6 ">
                                        <FileUploaderInput
                                            Label={'Drag & Drop your Application Logo For Light Mode or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.profile}
                                            Id={"profile"}
                                            InputName={"User Profile"}
                                            onUpdate={(file) => {
                                                if (file.length > 0) {
                                                    if (file[0].isNew) {
                                                        setData("profile", file[0].file);
                                                    }
                                                } else {
                                                    setData('profile', null);
                                                }
                                            }}
                                            Multiple={false}
                                        />
                                    </div>


                                    <PrimaryButton
                                        Text={"Create User"}
                                        Type={"submit"}
                                        CustomClass={"w-[200px] mx-5 mt-10"}
                                        Disabled={
                                            (
                                                processing ||
                                                (
                                                    data.name === "" ||
                                                    data.email === "" ||
                                                    data.password === ' ' ||
                                                    data.password_confirmation === '' ||
                                                    data.role_id === ''
                                                ) ||
                                                (
                                                    data.password !== data.password_confirmation
                                                )
                                            )
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

        </>

    );
}
