import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BreadCrumb from '@/Components/BreadCrumb'
import { Head, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import PrimaryButton from '@/Components/PrimaryButton'
import Input from '@/Components/Input'

export default function index() {

    const [cloudinaryCredentialModalOpen, setCloudinaryCredentialModalOpen] = useState(false);
    const [stripeCredentialModalOpen, setStripeCredentialModalOpen] = useState(false);

    // Cloudinary
    // Api Key Toggle
    const [apiKeyToggle, setApiKeyToggle] = useState(false);

    // Api Secret Toggle
    const [apiSecretToggle, setApiSecretToggle] = useState(false);


    // Stripe
    // Publishable key Toggle
    const [publishableKeyToggle, setPublishableKeyToggle] = useState(false);

    // Secret key Toggle
    const [secretKeyToggle, setSecretKeyToggle] = useState(false);

    const {
        data: cloudinaryCredentialData,
        setData: setCloudinaryCredentialData,
        put: putCloudinaryCredentialData,
        processing: cloudinaryCredentialProcessing,
        errors: cloudinaryCredentialErrors
    } = useForm({
        cloudinary_cloud_name: "",
        cloudinary_url: "",
        cloudinary_api_key: "",
        cloudinary_api_secret: "",
    });


    const {
        data: stripeCredentialData,
        setData: setStripeCredentialData,
        put: putStripeCredentialData,
        processing: stripeCredentialProcessing,
        errors: stripeCredentialErrors
    } = useForm({
        stripe_publishable_key: "",
        stripe_secret_key: "",
    });



    const stripeSubmit = (e) => {
        e.preventDefault();
    }


    const cloudinarySubmit = (e) => {
        e.preventDefault();
    }

    return (
        <AuthenticatedLayout
        >
            <Head title="Settings" />


            <BreadCrumb
                header={"Settings"}
                parent={"Dashboard"}
                parent_link={route("dashboard")}
                child={"Settings"}
            />

            <Card
                Content={
                    <>
                        <div className="flex flex-wrap items-center justify-around gap-5 my-10">
                            <Card
                                CustomCss={"flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px] min-w-[500px]"}
                                Content={
                                    <>
                                        <div className='flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full dark:bg-gray-800'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 dark:text-white dark:border-white`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            General Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application settings including app name, contact information, and branding like logos—all from one place.
                                        </p>

                                        <LinkButton
                                            URL={route("settings.general.setting")}
                                            Text={"Manage General Settings"}
                                            CustomClass="w-full md:w-[280px] "
                                            Icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6`}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />


                            <Card
                                CustomCss={"flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px] min-w-[500px]"}
                                Content={
                                    <>
                                        <div className='flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full dark:bg-gray-800'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-9 dark:text-white dark:border-white`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>

                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            SMTP Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application SMTP settings That Will Be Use For Sending Mails.
                                        </p>

                                        <LinkButton
                                            URL={route("settings.smtp.setting")}
                                            Text={"Manage SMTP Settings"}
                                            CustomClass="w-full md:w-[280px] mt-10 "
                                            Icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />
                        </div>


                        <div className="flex flex-wrap items-center justify-around gap-5 my-10">
                            <Card
                                CustomCss={"flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px] min-w-[500px]"}
                                Content={
                                    <>
                                        <div className='flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full dark:bg-gray-800'>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 dark:text-white dark:border-white`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>


                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Role & Permissions
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application Role Permissions
                                        </p>

                                        <LinkButton
                                            URL={route("settings.roles.index")}
                                            Text={"Manage Role Permissions"}
                                            CustomClass="w-full md:w-[280px] "
                                            Icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                </svg>

                                            }
                                        />
                                    </>
                                }
                            />



                            <Card
                                CustomCss={"flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px] min-w-[500px]"}
                                Content={
                                    <>
                                        <div className='flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full dark:bg-gray-800'>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 dark:text-white dark:border-white`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>


                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Currencies
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application Currency
                                        </p>

                                        <LinkButton
                                            URL={route("settings.currencies.index")}
                                            Text={"Manage Currency"}
                                            CustomClass="w-full md:w-[280px] "
                                            Icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>


                                            }
                                        />
                                    </>
                                }
                            />

                        </div>


                        <div className="flex flex-wrap items-center justify-around gap-5 my-10">
                            <Card
                                CustomCss={"flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px] min-w-[500px]"}
                                Content={
                                    <>
                                        <div className='flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full dark:bg-gray-800'>




                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 dark:text-white dark:border-white`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                            </svg>



                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Cloudinary Credential
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application's Cloudinary Credential
                                        </p>

                                        <PrimaryButton
                                            Action={() => {
                                                setCloudinaryCredentialModalOpen(true);
                                            }}
                                            Text={"Manage Cloudinary Credential"}
                                            CustomClass="w-full md:w-[280px] "
                                            Icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                                </svg>

                                            }
                                        />
                                    </>
                                }
                            />



                            <Card
                                CustomCss={"flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px] min-w-[500px]"}
                                Content={
                                    <>
                                        <div className='flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full dark:bg-gray-800'>




                                            <svg
                                                className="size-10 fill-black dark:fill-white"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.954-1.757 2.334-1.757 4 0 3.023 1.847 4.312 4.847 5.403 1.936.688 2.579 1.178 2.579 1.934 0 .732-.629 1.155-1.762 1.155-1.403 0-3.716-.689-5.231-1.578l-.674 4.157c1.304.732 3.705 1.488 6.197 1.488 1.976 0 3.624-.467 4.735-1.356 1.245-.977 1.89-2.422 1.89-4.289 0-3.091-1.889-4.38-4.935-5.468h.002z"></path>
                                            </svg>



                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Stripe Credential
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application Stripe Credential
                                        </p>

                                        <PrimaryButton
                                            Action={() => {
                                                setStripeCredentialModalOpen(true);
                                            }}

                                            Text={"Manage Stripe Credential"}
                                            CustomClass="w-full md:w-[280px] "
                                            Icon={
                                                <svg
                                                    className="size-6 fill-white"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.954-1.757 2.334-1.757 4 0 3.023 1.847 4.312 4.847 5.403 1.936.688 2.579 1.178 2.579 1.934 0 .732-.629 1.155-1.762 1.155-1.403 0-3.716-.689-5.231-1.578l-.674 4.157c1.304.732 3.705 1.488 6.197 1.488 1.976 0 3.624-.467 4.735-1.356 1.245-.977 1.89-2.422 1.89-4.289 0-3.091-1.889-4.38-4.935-5.468h.002z"></path>
                                                </svg>


                                            }
                                        />
                                    </>
                                }
                            />

                        </div>

                    </>
                }
            />



            {cloudinaryCredentialModalOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5 bg-black/50">
                    <div
                        className="fixed inset-0 backdrop-blur-[32px] "
                        onClick={() => setCloudinaryCredentialModalOpen(false)}
                    ></div>

                    <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-800 p-6 lg:p-10 shadow-xl ">
                        <div className="text-center">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                Cloudinary Credentials
                            </h4>
                            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Be Careful With Your Cloudinary Credentials
                            </p>
                        </div>

                        <form onSubmit={cloudinarySubmit} className="mt-6 space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <Input
                                    InputName={"Cloudinary Cloud Name"}
                                    Id={'cloudinary_cloud_name'}
                                    Name={'cloudinary_cloud_name'}
                                    Required={true}
                                    Type={'text'}
                                    Error={cloudinaryCredentialErrors.cloudinary_cloud_name}
                                    Value={cloudinaryCredentialData.cloudinary_cloud_name}
                                    Action={(e) => setCloudinaryCredentialData('cloudinary_cloud_name', e.target.value)}
                                    Placeholder={'Enter Cloudinary Cloud Name'}
                                />

                                <Input
                                    InputName={"Cloudinary URL"}
                                    Id={'cloudinary_url'}
                                    Name={'cloudinary_url'}
                                    Required={true}
                                    Type={'url'}
                                    Error={cloudinaryCredentialErrors.cloudinary_url}
                                    Value={cloudinaryCredentialData.cloudinary_url}
                                    Action={(e) => setCloudinaryCredentialData('cloudinary_url', e.target.value)}
                                    Placeholder={'Enter Cloudinary URL'}
                                />

                                <Input
                                    InputName={"Cloudinary Api Key"}
                                    Id={'cloudinary_api_key'}
                                    Name={'cloudinary_api_key'}
                                    Required={true}
                                    Type={'password'}
                                    Error={cloudinaryCredentialErrors.cloudinary_api_key}
                                    Value={cloudinaryCredentialData.cloudinary_api_key}
                                    Action={(e) => setCloudinaryCredentialData('cloudinary_api_key', e.target.value)}
                                    Placeholder={'Enter Cloudinary Api Key'}
                                    ShowPasswordToggle={apiKeyToggle}
                                    setShowPasswordToggle={setApiKeyToggle}
                                />

                                <Input
                                    InputName={"Cloudinary Api Secret"}
                                    Id={'cloudinary_api_secret'}
                                    Name={'cloudinary_api_secret'}
                                    Required={true}
                                    Type={'password'}
                                    Error={cloudinaryCredentialErrors.cloudinary_api_secret}
                                    Value={cloudinaryCredentialData.cloudinary_api_secret}
                                    Action={(e) => setCloudinaryCredentialData('cloudinary_api_secret', e.target.value)}
                                    Placeholder={'Enter Cloudinary Api Secret'}
                                    ShowPasswordToggle={apiSecretToggle}
                                    setShowPasswordToggle={setApiSecretToggle}
                                />
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <PrimaryButton
                                    Text={"Save Changes"}
                                    CustomClass={"w-[200px]"}
                                    Type={"button"}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    }
                                />

                                <PrimaryButton
                                    Text={"Close"}
                                    CustomClass={"w-[200px]"}
                                    Type={"button"}
                                    Action={() => setCloudinaryCredentialModalOpen(false)}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}




            {stripeCredentialModalOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5 bg-black/50">
                    <div
                        className="fixed inset-0 backdrop-blur-[32px] "
                        onClick={() => setStripeCredentialModalOpen(false)}
                    ></div>

                    <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-800 p-6 lg:p-10 shadow-xl ">
                        <div className="text-center">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                Stripe Credentials
                            </h4>
                            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Be Careful With Your Stripe Credentials
                            </p>
                        </div>

                        <form onSubmit={stripeSubmit} className="mt-6 space-y-6">
                            <div className="grid grid-cols-1 gap-4">

                                <Input
                                    InputName={"Stripe Publishable Key"}
                                    Id={'stripe_publishable_key'}
                                    Name={'stripe_publishable_key'}
                                    Required={true}
                                    Type={'password'}
                                    Error={stripeCredentialErrors.stripe_publishable_key}
                                    Value={stripeCredentialData.stripe_publishable_key}
                                    Action={(e) => setStripeCredentialData('stripe_publishable_key', e.target.value)}
                                    Placeholder={'Enter Stripe Publishable Key'}
                                    ShowPasswordToggle={publishableKeyToggle}
                                    setShowPasswordToggle={setPublishableKeyToggle}
                                />

                                <Input
                                    InputName={"Stripe Secret Key"}
                                    Id={'stripe_secret_key'}
                                    Name={'stripe_secret_key'}
                                    Required={true}
                                    Type={'password'}
                                    Error={stripeCredentialErrors.stripe_secret_key}
                                    Value={stripeCredentialData.stripe_secret_key}
                                    Action={(e) => setStripeCredentialData('stripe_secret_key', e.target.value)}
                                    Placeholder={'Enter Stripe Secret Key'}
                                    ShowPasswordToggle={secretKeyToggle}
                                    setShowPasswordToggle={setSecretKeyToggle}
                                />
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <PrimaryButton
                                    Text={"Save Changes"}
                                    CustomClass={"w-[200px]"}
                                    Type={"button"}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    }
                                />

                                <PrimaryButton
                                    Text={"Close"}
                                    CustomClass={"w-[200px]"}
                                    Type={"button"}
                                    Action={() => setStripeCredentialModalOpen(false)}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    )
}
