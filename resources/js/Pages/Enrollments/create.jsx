import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import PrimaryButton from '@/Components/PrimaryButton'
import SelectInput from '@/Components/SelectInput'
import Toast from '@/Components/Toast'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function create({ users }) {

    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        user_id: '',
    });

    const [courses, setCourses] = useState([]);
    const [alertUser, setAlertUser] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        post(route("enrollments.store"));
    }


    const HandleGetCourses = (id) => {
        setAlertUser(null);
        if (id) {
            axios.get(route('enrollments.getcourse.relatedtouser', { user_id: id }))
                .then(response => {
                    if (response.data.status) {
                        const courseData = response.data?.courses.courses ?? [];

                        if (courseData.length > 0) {
                            setCourses(courseData);
                        } else {
                            setAlertUser(response.data.message)
                            setCourses([]);
                        }
                    } else {
                        setAlertUser(response.data.message)
                        setCourses([]);
                    }
                })
                .catch(() => {
                    setCourses([]);
                });
        } else {
            setCourses([]);
        }
    }

    return (
        <AuthenticatedLayout>

            <Head title='Enrollments' />

            <BreadCrumb
                header={"Create Enrollment"}
                parent={"Enrollments"}
                child={"Create Enrollment"}
                parent_link={route('enrollments.index')}

            />

            {alertUser && <Toast flash={{ info: alertUser }} />}
            <Card
                Content={
                    <>
                        <div className="flex flex-wrap justify-end my-3">
                            <LinkButton
                                Text={"Back To Enrollments"}
                                URL={route("enrollments.index")}
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

                                    <SelectInput
                                        InputName={"User"}
                                        Id={"user_id"}
                                        Name={"user_id"}
                                        Error={errors.user_id}
                                        items={users}
                                        itemKey={"name"}
                                        Value={data.user_id}
                                        Action={
                                            (e) => {
                                                setData("user_id", e.target.value);
                                                HandleGetCourses(e.target.value);

                                            }
                                        }
                                        Required={true}
                                    />

                                    {Array.isArray(courses) && courses.length > 0 && (
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
                                    )}


                                </div>



                                <PrimaryButton
                                    Text={"Create Enrollment"}
                                    Type={"submit"}
                                    CustomClass={"w-[200px] mx-5 mt-10"}
                                    Disabled={
                                        (
                                            processing ||
                                            !data.user_id ||
                                            !data.course_id

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
    )
}
