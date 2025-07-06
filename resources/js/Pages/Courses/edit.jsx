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
import React, { useEffect, useState } from 'react'

export default function edit({ course, categories, instructors }) {

    const { data, setData, post, processing, progress, errors, reset } = useForm({
        _method: "PUT",
        title: course.title || '',
        description: course.description || '',
        short_description: course.short_description || '',
        category_id: course.category_id || '',
        instructor_id: course.instructor_id || '',
        thumbnail: null,
        promo_video: null,
        is_thumbnail_removed: false,
        is_promo_video_removed: false,
        price: course.actual_price ?? 0,
        discount: course.discount ?? 0,
        level: course.level || '',
        course_language: course.course_language || '',
        is_published: course.is_published ?? 0,
        is_approved: course.is_approved ?? 0,
        requirements: course.requirements || '',
        learning_outcomes: course.learning_outcomes || '',
    });

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const Levels = [
            { name: "Beginner" },
            { name: "Intermediate" },
            { name: "Advanced" },
        ];

        setLevels(Levels);
    }, []);
    const submit = (e) => {
        e.preventDefault();
        post(route("courses.update", course.slug));
    }
    return (
        <>
            <AuthenticatedLayout>

                <Head title='Courses' />
                <BreadCrumb
                    header={"Edit Course"}
                    parent={"Courses"}
                    child={"Edit Course"}
                    parent_link={route("courses.index")}
                />


                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Back To Courses"}
                                    URL={route("courses.index")}
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
                                            InputName={"Course Title"}
                                            Error={errors.title}
                                            Value={data.title}
                                            Action={
                                                (e) => setData("title", e.target.value)
                                            }

                                            Placeholder={"Enter Course title"}
                                            Id={"title"}
                                            Name={"title"}
                                            Type={"text"}
                                            Required={true}

                                        />


                                        <Input
                                            InputName={"Course Short Description"}
                                            Error={errors.short_description}
                                            Value={data.short_description}
                                            Action={
                                                (e) => setData("short_description", e.target.value)
                                            }

                                            Placeholder={"Enter Course Short Description"}
                                            Id={"short_description"}
                                            Name={"short_description"}
                                            Type={"text"}
                                            Required={true}

                                        />
                                    </div>

                                    {/* RichText Editor For Description */}
                                    <div className="px-4 mt-4 mb-10 sm:px-6">
                                        <RichTextEditor
                                            InputName={"Course Description"}
                                            Id={"description"}
                                            Required={true}
                                            onChange={(e) => setData("description", e)}
                                            value={data.description}
                                            Error={errors.description}
                                        />
                                    </div>



                                    <div className="grid grid-cols-1 gap-4 px-5 mb-4 sm:grid-cols-2 sm:px-6">

                                        <SelectInput
                                            InputName={"Course Category"}
                                            Id={"category_id"}
                                            Name={"category_id"}
                                            Error={errors.category_id}
                                            items={categories}
                                            itemKey={"name"}
                                            Value={data.category_id}
                                            Action={
                                                (e) => setData("category_id", e.target.value)
                                            }
                                            Required={true}
                                        />


                                        <SelectInput
                                            InputName={"Course Instructor"}
                                            Id={"instructor_id"}
                                            Name={"instructor_id"}
                                            Error={errors.instructor_id}
                                            items={instructors}
                                            itemKey={"name"}
                                            Value={data.instructor_id}
                                            Action={
                                                (e) => setData("instructor_id", e.target.value)
                                            }
                                            Required={true}
                                        />




                                        <Input
                                            InputName={"Course Price"}
                                            Error={errors.price}
                                            Value={data.price}
                                            Action={
                                                (e) => setData("price", e.target.value)
                                            }

                                            Placeholder={"Enter Course Price"}
                                            Id={"price"}
                                            Name={"price"}
                                            Type={"number"}
                                            Required={true}

                                        />




                                        <Input
                                            InputName={"Course Discount"}
                                            Error={errors.discount}
                                            Value={data.discount}
                                            Action={
                                                (e) => setData("discount", e.target.value)
                                            }

                                            Placeholder={"Enter Course Discount"}
                                            Id={"discount"}
                                            Name={"discount"}
                                            Type={"number"}
                                            Required={true}

                                        />







                                        <SelectInput
                                            InputName={"Course Level"}
                                            Id={"level"}
                                            Name={"level"}
                                            Error={errors.level}
                                            items={levels}
                                            itemKey={"name"}
                                            Value={data.level}
                                            Action={
                                                (e) => setData("level", e.target.value)
                                            }
                                            Required={true}
                                        />


                                        <Input
                                            InputName={"Course Language"}
                                            Error={errors.course_language}
                                            Value={data.course_language}
                                            Action={
                                                (e) => setData("course_language", e.target.value)
                                            }

                                            Placeholder={"Enter Course Language"}
                                            Id={"course_language"}
                                            Name={"course_language"}
                                            Type={"text"}
                                            Required={true}

                                        />





                                    </div>

                                    {/* RichText Editor For Requirements */}
                                    <div className="px-4 mt-4 mb-10 sm:px-6">
                                        <RichTextEditor
                                            InputName={"Course Requirements"}
                                            Id={"requirements"}
                                            Required={false}
                                            onChange={(e) => setData("requirements", e)}
                                            value={data.requirements}
                                            Error={errors.requirements}
                                        />
                                    </div>


                                    <div className="px-4 mt-4 mb-10 sm:px-6">
                                        <RichTextEditor
                                            InputName={"Course Learning Outcomes"}
                                            Id={"learning_outcomes"}
                                            Required={false}
                                            onChange={(e) => setData("learning_outcomes", e)}
                                            value={data.learning_outcomes}
                                            Error={errors.learning_outcomes}
                                        />
                                    </div>



                                    <div className="grid grid-cols-1 gap-4 px-5 mb-4 sm:grid-cols-2 sm:px-6">
                                        <SelectInput
                                            InputName={"Course Published Status"}
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
                                            InputName={"Course Approval Status"}
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
                                            Label={'Drag & Drop your Course Thumbnail Or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.thumbnail}
                                            Id={"thumbnail"}
                                            InputName={"Course Thumbnail"}
                                            onUpdate={(file) => {
                                                if (file.length > 0) {
                                                    if (file[0].isNew) {
                                                        setData("thumbnail", file[0].file);
                                                        setData('is_thumbnail_removed', false);
                                                    }
                                                } else {
                                                    setData('thumbnail', null);
                                                    setData('is_thumbnail_removed', true);
                                                }
                                            }}
                                            DefaultFile={course.thumbnail && [course.thumbnail]}
                                            Required={true}
                                            Multiple={false}
                                        />
                                    </div>


                                    <div className="px-4 mt-4 sm:px-6 ">
                                        <FileUploaderInput
                                            Label={'Drag & Drop your Course Promo Video Or <span class="filepond--label-action">Browse</span>'}
                                            Error={errors.promo_video}
                                            Id={"promo_video"}
                                            acceptedFileTypes={"video/*"}
                                            InputName={"Course Promo Video"}
                                            onUpdate={(file) => {
                                                if (file.length > 0) {
                                                    if (file[0].isNew) {
                                                        setData("promo_video", file[0].file);
                                                        setData('is_promo_video_removed', false);
                                                    }
                                                } else {
                                                    setData('promo_video', null);
                                                    setData('is_promo_video_removed', true);
                                                }
                                            }}
                                            MaxFileSize={"10000MB"}
                                            DefaultFile={course.promo_video && [course.promo_video]}
                                            Multiple={false}
                                        />
                                    </div>


                                    <PrimaryButton
                                        Text={"Update Course"}
                                        Type={"submit"}
                                        CustomClass={"w-[200px] mx-5 mt-10"}
                                        Disabled={
                                            processing ||
                                            (
                                                data.title === (course.title || '') &&
                                                data.description === (course.description || '') &&
                                                data.short_description === (course.short_description || '') &&
                                                data.category_id === (course.category_id || '') &&
                                                data.instructor_id === (course.instructor_id || '') &&
                                                data.thumbnail === null &&
                                                (data.promo_video === null && data.is_promo_video_removed === false) &&
                                                data.price === (course.price ?? 0) &&
                                                data.discount === (course.discount ?? 0) &&
                                                data.level === (course.level || '') &&
                                                data.course_language === (course.course_language || '') &&
                                                data.is_published === (course.is_published ?? 0) &&
                                                data.is_approved === (course.is_approved ?? 0) &&
                                                data.requirements === (course.requirements || '') &&
                                                data.learning_outcomes === (course.learning_outcomes || '') &&
                                                data.is_thumbnail_removed === false && data.thumbnail === null
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
