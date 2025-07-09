import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton'
import SelectInput from '@/Components/SelectInput'
import Table from '@/Components/Table'
import Can from '@/Hooks/Can'
import useCan from '@/Hooks/UseCan'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function index({ enrollments, users, courses }) {

    const { props } = usePage();
    const { data: BulkselectedIds, setData: setBulkSelectedIds, delete: BulkDelete, reset: resetBulkSelectedIds } = useForm({
        ids: [],
    });


    // Single Delete Form Data
    const { data: SingleSelectedId, setData: setSingleSelectedId, delete: SingleDelete, reset: resetSingleSelectedId } = useForm({
        id: null,
    });


    const [columns, setColumns] = useState([]);


    // Custom Search States
    const [course_id, setCourse_id] = useState(props.course_id ?? '');
    const [user_id, setUser_id] = useState(props.user_id ?? '');
    const [ParentSearched, setParentSearched] = useState(false);


    useEffect(() => {

        const columns = [
            {
                label: 'Course', render: (item) => {
                    return (
                        <div className="flex items-center">
                            <div className="w-16 h-16 overflow-hidden rounded-full">
                                <img className="object-cover w-full h-full" src={item.enrolled_courses.thumbnail} alt="" />
                            </div>
                            <div className="ml-4 ">
                                <div className="text-sm font-medium text-gray-800 dark:text-white">
                                    <p>
                                        <span className='p-2 text-white bg-gray-500 rounded-lg '>
                                            Course Title:

                                            <Link className='text-blue-200 underline' href={route('courses.player', { course_slug: item.enrolled_courses.slug })}>
                                                {item.enrolled_courses.title}
                                            </Link>
                                        </span>
                                    </p>

                                    <p className='my-4'>
                                        <span className='p-2 text-white bg-green-500 rounded-lg '>
                                            Course Language: {item.enrolled_courses.course_language}
                                        </span>
                                    </p>

                                    <p className='my-3'>
                                        <span className='p-2 text-white bg-blue-500 rounded-lg '>
                                            Course Level:  {item.enrolled_courses.level}
                                        </span>
                                    </p>


                                </div>
                            </div>
                        </div>
                    )
                }
            },


            {
                label: 'User', render: (item) => {
                    return (
                        <div className="flex items-center justify-center">
                            <div className="w-16 h-16 overflow-hidden rounded-full">
                                {item.enrolled_students?.profile ?
                                    (
                                        <img className="object-cover w-full h-full" src={item.enrolled_students?.profile_url} alt="" />
                                    )
                                    :
                                    (
                                        <span className="flex items-center justify-center w-full h-full text-3xl text-white bg-gray-500 rounded-full">
                                            {item.enrolled_students?.avatar ?? item.enrolled_students?.name.charAt(0)}
                                        </span>
                                    )
                                }
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-800 dark:text-white/50">
                                    <p>
                                        {item.enrolled_students?.name}

                                    </p>

                                    <p>
                                        {item.enrolled_students?.email}
                                    </p>

                                </div>
                            </div>
                        </div>
                    )
                }
            },

            { key: 'added_at', label: 'Created At' },
        ];

        setColumns(columns);

    }, []);

    return (
        <>
            <AuthenticatedLayout>

                <Head title='Enrollments' />

                <BreadCrumb
                    header={"Enrollments"}
                    parent={"Dashboard"}
                    child={"Enrollments"}
                    parent_link={route('dashboard')}
                />


                <Card
                    Content={
                        <>
                            <Can permission={"Enrollment Create"}>
                                <div className="flex flex-wrap justify-end my-3">
                                    <LinkButton
                                        Text={"Create Enrollment"}
                                        URL={route("enrollments.create")}
                                        Icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>

                                        }
                                    />
                                </div>
                            </Can>

                            <Table
                                setBulkSelectedIds={setBulkSelectedIds}
                                setSingleSelectedId={setSingleSelectedId}
                                SingleSelectedId={SingleSelectedId}
                                resetBulkSelectedIds={resetBulkSelectedIds}
                                resetSingleSelectedId={resetSingleSelectedId}
                                BulkDeleteMethod={useCan("Enrollment Delete") ? BulkDelete : null}
                                SingleDeleteMethod={SingleDelete}
                                BulkDeleteRoute={"enrollments.destroybyselection"}
                                SearchRoute={"enrollments.index"}
                                SingleDeleteRoute={"enrollments.destroy"}
                                items={enrollments}
                                DeleteAction={useCan("Enrollment Delete")}
                                props={props}
                                columns={columns}
                                ParentSearched={ParentSearched}
                                searchProps={{ course_id: course_id, user_id: user_id }}
                                customSearch={
                                    <>
                                        <div className="relative mb-2">
                                            <SelectInput
                                                Id={'course_id'}
                                                Name={'course_id'}
                                                InputName={'Course'}
                                                items={courses}
                                                itemKey={'title'}
                                                Value={course_id}
                                                Action={(e) => {
                                                    const value = e.target.value;
                                                    setCourse_id(value);
                                                    setParentSearched(true);
                                                }}
                                            />

                                        </div>


                                        <div className="relative mb-2">
                                            <SelectInput
                                                Id={'user_id'}
                                                Name={'user_id'}
                                                InputName={'User'}
                                                items={users}
                                                itemKey={'name'}
                                                Value={user_id}
                                                Action={(e) => {
                                                    const value = e.target.value;
                                                    setUser_id(value);
                                                    setParentSearched(true);
                                                }}
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
