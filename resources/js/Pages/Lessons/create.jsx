import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import FileUploaderInput from '@/Components/FileUploaderInput'
import Input from '@/Components/Input'
import LinkButton from '@/Components/LinkButton'
import PrimaryButton from '@/Components/PrimaryButton'
import RichTextEditor from '@/Components/RichTextEditor'
import SelectInput from '@/Components/SelectInput'
import Spinner from '@/Components/Spinner'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

export default function create({ courses }) {


    const { data, setData, post, processing, progress, errors } = useForm({
        title: "",
        description: "",
        course_id: "",
        thumbnail: null,
        video: null,
        is_published: 0,
        is_approved: 0,
        attachments: [],
    });


    const submit = (e) => {
        e.preventDefault();
        post(route("lessons.store"));
    }

    return (
        <>
            <AuthenticatedLayout>

                <Head title='Lessons' />

                <BreadCrumb
                    header={"Create Lesson"}
                    parent={"Lessons"}
                    child={"Create Lesson"}
                    parent_link={route("lessons.index")}
                />



                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Back To Lessons"}
                                    URL={route("lessons.index")}
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
                                            InputName={"Lesson Title"}
                                            Error={errors.title}
                                            Value={data.title}
                                            Action={
                                                (e) => setData("title", e.target.value)
                                            }

                                            Placeholder={"Enter Lesson title"}
                                            Id={"title"}
                                            Name={"title"}
                                            Type={"text"}
                                            Required={true}

                                        />



                                        <SelectInput
                                            InputName={"Course"}
                                            Id={"course_id"}
                                            Name={"course_id"}
                                            Error={errors.course_id}
                                            items={courses}
                                            itemKey={"title"}
                                            Value={data.course_id}
                                            Action={
                                                (e) => setData("course_id", e.target.value)
                                            }
                                            Required={true}
                                        />


                                    </div>

                                    {/* RichText Editor For Description */}
                                    <div className="px-4 mt-4 mb-10 sm:px-6">
                                        <RichTextEditor
                                            InputName={"Lesson Description"}
                                            Id={"description"}
                                            Required={true}
                                            onChange={(e) => setData("description", e)}
                                            value={data.description}
                                            Error={errors.description}
                                        />
                                    </div>





                                    <div className="grid grid-cols-1 gap-4 px-5 mb-4 sm:grid-cols-2 sm:px-6">
                                        <SelectInput
                                            InputName={"Lesson Published Status"}
                                            Id={"is_published"}
                                            Name={"is_published"}
                                            Error={errors.is_published}
                                            items={[{ id: 1, name: "Published" }, { id: 0, name: "Not Published" }]}
                                            itemKey={"name"}
                                            Value={data.is_published}
                                            Action={
                                                (e) => setData("is_published", e.target.value)
                                            }
                                        />



                                        <SelectInput
                                            InputName={"Lesson Approval Status"}
                                            Id={"is_approved"}
                                            Name={"is_approved"}
                                            Error={errors.is_approved}
                                            items={[{ id: 1, name: "Approved" }, { id: 0, name: "Not Approved" }]}
                                            itemKey={"name"}
                                            Value={data.is_approved}
                                            Action={
                                                (e) => setData("is_approved", e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* FileUploader */}

                                    <div className="px-4 mt-4 sm:px-6 ">
                                        <span className="text-center text-gray-800 dark:text-gray-200">
                                            Note: Thumbnail Image Resolution Must Be 1280x720
                                        </span>
                                        <FileUploaderInput
                                            Label={'Drag & Drop your Lesson Thumbnail Or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.thumbnail}
                                            Id={"thumbnail"}
                                            InputName={"Lesson Thumbnail"}
                                            onUpdate={(file) => {
                                                if (file.length > 0) {
                                                    if (file[0].isNew) {
                                                        setData("thumbnail", file[0].file);
                                                    }
                                                } else {
                                                    setData("thumbnail", null);
                                                }
                                            }}
                                            Required={true}
                                            Multiple={false}
                                        />
                                    </div>


                                    <div className="px-4 mt-4 sm:px-6 ">
                                        <FileUploaderInput
                                            Label={'Drag & Drop your Lesson Video Or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.video}
                                            Id={"video"}
                                            acceptedFileTypes={["video/*"]}
                                            InputName={"Lesson Video"}
                                            onUpdate={(file) => {
                                                if (file.length > 0) {
                                                    if (file[0].isNew) {
                                                        setData("video", file[0].file);
                                                    }
                                                } else {
                                                    setData("video", null);
                                                }
                                            }}
                                            Multiple={false}
                                            Required={true}
                                            MaxFileSize={"10000MB"}
                                        />
                                    </div>


                                    <div className="px-4 mt-4 sm:px-6 ">
                                        <FileUploaderInput
                                            Label={'Drag & Drop your Lesson Attachments Or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.attachments}
                                            Id={"attachments"}
                                            acceptedFileTypes={[
                                                'image/*',
                                                'application/pdf',
                                                'application/msword',
                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
                                                'application/vnd.ms-excel', // .xls
                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
                                                'application/vnd.ms-powerpoint', // .ppt
                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx
                                            ]}
                                            InputName={"Lesson Attachments"}
                                            onUpdate={(files) => {
                                                const attachments = [];
                                                files.forEach((file) => {
                                                    attachments.push(file.file);
                                                })
                                                setData("attachments", attachments);
                                            }}
                                            Multiple={true}
                                            MaxFileSize={"5000MB"}
                                        />
                                    </div>


                                    <PrimaryButton
                                        Text={"Create Lesson"}
                                        Type={"submit"}
                                        CustomClass={"w-[200px] mx-5 mt-10"}
                                        Disabled={
                                            (
                                                processing ||
                                                data.title === '' ||
                                                data.course_id === '' ||
                                                data.description === '' ||
                                                data.thumbnail === null ||
                                                data.video === null
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



                {progress && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5 bg-black/50">
                        <div
                            className="fixed inset-0 backdrop-blur-[32px] "
                        ></div>

                        <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-800 p-6 lg:p-10 shadow-xl ">
                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                <Spinner
                                    customSize={"w-12 h-12"}
                                />
                                <p className="text-2xl leading-6 text-gray-500 dark:text-gray-400">
                                    Upload in progress. Please wait while your file is being transferred to the server.
                                </p>

                                <h2 className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    Do not close this window or refresh the page — doing so may interrupt the upload and result in data loss.
                                </h2>
                            </div>
                        </div>
                    </div>
                )}

            </AuthenticatedLayout>
        </>
    )
}
