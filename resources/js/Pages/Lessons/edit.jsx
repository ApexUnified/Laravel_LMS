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


export default function edit({ lesson, courses }) {
    const { data, setData, post, processing, progress, errors } = useForm({
        _method: "PUT",
        title: lesson.title || "",
        description: lesson.description || "",
        course_id: lesson.course_id || "",
        thumbnail: null,
        video: null,
        is_published: lesson.is_published ?? 0,
        is_approved: lesson.is_approved ?? 0,
        attachments: [],
    });



    const submit = (e) => {
        e.preventDefault();
        post(route("lessons.update", lesson.id));
    }

    return (
        <>
            <AuthenticatedLayout>

                <Head title='Lessons' />

                <BreadCrumb
                    header={"Edit Lesson"}
                    parent={"Lessons"}
                    child={"Edit Lesson"}
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
                                        <FileUploaderInput
                                            Label={'Drag & Drop your Lesson Thumbnail Or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.thumbnail}
                                            Id={"thumbnail"}
                                            InputName={"Lesson Thumbnail"}
                                            onUpdate={(file) => {
                                                setData("thumbnail", file);
                                            }}
                                            Required={true}
                                            Multiple={false}
                                            DefaultFile={lesson.thumbnail && [lesson.thumbnail]}
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
                                                setData("video", file);
                                            }}
                                            Multiple={false}
                                            Required={true}
                                            MaxFileSize={"10000MB"}
                                            DefaultFile={lesson.video && [lesson.video]}
                                        />
                                    </div>


                                    <div className="px-4 mt-4 sm:px-6 ">
                                        <FileUploaderInput
                                            Label={'Drag & Drop your Lesson Attachments Or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.attachments}
                                            Id={"attachments"}
                                            acceptedFileTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                                            InputName={"Lesson Attachments"}
                                            onUpdate={(files) => {
                                                setData("attachments", files);
                                            }}
                                            Multiple={true}
                                            DefaultFile={lesson.attachments && lesson.attachments.map(attachment => attachment.secure_url)}
                                            MaxFileSize={"5000MB"}
                                        />
                                    </div>


                                    <PrimaryButton
                                        Text={"Update Lesson"}
                                        Type={"submit"}
                                        CustomClass={"w-[200px] mx-5 mt-10"}
                                        Disabled={
                                            (
                                                processing ||


                                                data.title === '' ||
                                                data.description === '' ||
                                                data.course_id === '' ||
                                                lesson.thumbnail === null ||
                                                lesson.video === null ||


                                                (
                                                    data.title === lesson.title &&
                                                    data.description === lesson.description &&
                                                    data.course_id === lesson.course_id
                                                )


                                            )
                                        }
                                        Spinner={processing}
                                        Icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                        }

                                    />


                                </div>

                            </form>

                        </>
                    }
                />



                {progress && (
                    <div className="fixed inset-0 flex items-center justify-center p-5 overflow-y-auto modal z-99999">
                        <div className="modal-close-btn fixed inset-0 h-full w-full dark:bg-gray-900 backdrop-blur-[32px]"></div>
                        <div className="flex flex-col px-4 py-4 overflow-y-auto no-scrollbar">
                            <div className="relative w-full max-w-[507px] rounded-3xl bg-white p-6 dark:bg-gray-800 lg:p-10">
                                <div className="flex flex-col items-center justify-center gap-3 text-center">
                                    <Spinner
                                        customSize={"w-12 h-12"}
                                    />
                                    <p className="text-lg leading-6 text-gray-500 dark:text-gray-400">
                                        Upload in progress. Please wait while your file is being transferred to the server.
                                    </p>

                                    <h2 className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        Do not close this window or refresh the page — doing so may interrupt the upload and result in data loss.
                                    </h2>



                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </AuthenticatedLayout>
        </>
    )
}
