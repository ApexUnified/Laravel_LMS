import Card from '@/Components/Card';
import { PlaceholderPattern } from '@/Components/PlaceholderPattern';
import Table from '@/Components/Table';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, router, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BookCheck,
    BookOpen,
    BookOpenCheck,
    ChartColumnStacked,
    GraduationCap,
    LucideGraduationCap,
    LucideUser,
    UserPlus,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
export default function Dashboard({
    students_count,
    instructors_count,
    new_registrations_this_month,
    total_courses_count,
    total_lessons_count,
    total_categories_count,
    enrolled_courses,
    active_courses,
    inActive_courses,
    daily_transactions_of_the_month_revenue_ChartData,
    user_total_enrolled_courses,
    user_total_completed_courses,
    user_notifications,
}) {
    const { role } = usePage().props.auth;
    const [columnsForEnrollments, setColumnsForEnrollments] = useState([]);
    const [columnsForActiveCourses, setColumnsForActiveCourses] = useState([]);
    const [columnsForInActiveCourses, setColumnsForInActiveCourses] = useState([]);

    useEffect(() => {
        setColumnsForEnrollments([
            { key: 'title', label: 'Course Title' },
            {
                key: 'enrollments',
                label: 'Total Enrollments',
                badge: (value) => 'bg-gray-800 text-white  dark:bg-white dark:text-black  px-4',
            },
        ]);

        setColumnsForActiveCourses([
            { key: 'title', label: 'Course Title' },
            {
                label: 'Approval Status',
                render: (item) => {
                    return (
                        <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold dark:bg-white dark:text-gray-800 ${item.is_approved ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} `}
                        >
                            {item.is_approved ? 'Approved' : 'Not Approved'}
                        </span>
                    );
                },
            },

            {
                label: 'Publish Status',
                render: (item) => {
                    return (
                        <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold dark:bg-white dark:text-gray-800 ${item.is_published ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} `}
                        >
                            {item.is_published ? 'Published' : 'Not Published'}
                        </span>
                    );
                },
            },
        ]);

        setColumnsForInActiveCourses([
            { key: 'title', label: 'Course Title' },
            {
                label: 'Approval Status',
                render: (item) => {
                    return (
                        <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold dark:bg-white dark:text-gray-800 ${item.is_approved ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} `}
                        >
                            {item.is_approved ? 'Approved' : 'Not Approved'}
                        </span>
                    );
                },
            },

            {
                label: 'Publish Status',
                render: (item) => {
                    return (
                        <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold dark:bg-white dark:text-gray-800 ${item.is_published ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} `}
                        >
                            {item.is_published ? 'Published' : 'Not Published'}
                        </span>
                    );
                },
            },
        ]);
    }, []);

    const DailyTransactionRevenueDataOfTheMonth = {
        labels: daily_transactions_of_the_month_revenue_ChartData.labels,
        datasets: [
            {
                label: 'Daily Revenue',
                data: daily_transactions_of_the_month_revenue_ChartData.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.2)',
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ],
    };

    const DailyTransactionRevenueOptionsOfTheMonth = {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        return `${daily_transactions_of_the_month_revenue_ChartData.currency}  ${parseFloat(value).toFixed(2)}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return (
                            daily_transactions_of_the_month_revenue_ChartData.currency + ' ' + value
                        );
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Days of Month',
                },
            },
        },
    };

    const handlePagination = (link) => {
        if (link) {
            router.visit(link, { preserveScroll: true, preserveState: true });
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <Card
                Content={
                    <>
                        {role === 'Admin' ? (
                            <h3 className="my-4 text-left text-2xl font-bold text-gray-800 dark:text-white">
                                LMS Analytics
                            </h3>
                        ) : (
                            <h3 className="my-4 text-left text-2xl font-bold text-gray-800 dark:text-white">
                                Your Analytics
                            </h3>
                        )}

                        {role === 'Admin' ? (
                            <div className="my-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                <>
                                    <Card
                                        Content={
                                            <>
                                                <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                    {/* Left: Icon */}
                                                    <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <LucideUser size={28} />
                                                    </div>

                                                    {/* Right: Count & Label */}
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                            {students_count}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            Total Students
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                    />
                                    <Card
                                        Content={
                                            <>
                                                <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                    {/* Left: Icon */}
                                                    <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <LucideGraduationCap size={28} />
                                                    </div>

                                                    {/* Right: Count & Label */}
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                            {instructors_count}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            Total Instructors
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                    />

                                    <Card
                                        Content={
                                            <>
                                                <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                    {/* Left: Icon */}
                                                    <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <UserPlus size={28} />
                                                    </div>

                                                    {/* Right: Count & Label */}
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                            {new_registrations_this_month}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            New Registrations This Month
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                    />

                                    <Card
                                        Content={
                                            <>
                                                <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                    {/* Left: Icon */}
                                                    <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <BookOpen size={28} />
                                                    </div>

                                                    {/* Right: Count & Label */}
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                            {total_courses_count}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            Total Courses
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                    />
                                    <Card
                                        Content={
                                            <>
                                                <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                    {/* Left: Icon */}
                                                    <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <BookOpenCheck size={28} />
                                                    </div>

                                                    {/* Right: Count & Label */}
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                            {total_lessons_count}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            Total Lessons
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                    />

                                    <Card
                                        Content={
                                            <>
                                                <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                    {/* Left: Icon */}
                                                    <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <ChartColumnStacked size={28} />
                                                    </div>

                                                    {/* Right: Count & Label */}
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                            {total_categories_count}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            Total Categories
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                    />

                                    <div className="col-span-full">
                                        <Card
                                            Content={
                                                <>
                                                    <h3 className="my-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
                                                        Daily Transactions Revenue Of The Month
                                                    </h3>
                                                    <Line
                                                        data={DailyTransactionRevenueDataOfTheMonth}
                                                        options={
                                                            DailyTransactionRevenueOptionsOfTheMonth
                                                        }
                                                    />
                                                </>
                                            }
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <Card
                                            Content={
                                                <>
                                                    <h3 className="my-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
                                                        Course Enrollments
                                                    </h3>
                                                    <Table
                                                        Search={false}
                                                        DeleteAction={false}
                                                        EditRoute={null}
                                                        items={enrolled_courses}
                                                        columns={columnsForEnrollments}
                                                        customActions={[
                                                            {
                                                                label: 'View Course',
                                                                type: 'link',
                                                                href: (item) =>
                                                                    route('courses.player', {
                                                                        course_slug: item.slug,
                                                                    }),
                                                            },
                                                        ]}
                                                    />
                                                </>
                                            }
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <Card
                                            Content={
                                                <>
                                                    <h3 className="my-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
                                                        Active Courses
                                                    </h3>
                                                    <Table
                                                        Search={false}
                                                        DeleteAction={false}
                                                        EditRoute={null}
                                                        items={active_courses}
                                                        columns={columnsForActiveCourses}
                                                        customActions={[
                                                            {
                                                                label: 'View Course',
                                                                type: 'link',
                                                                href: (item) =>
                                                                    route('courses.player', {
                                                                        course_slug: item.slug,
                                                                    }),
                                                            },
                                                        ]}
                                                    />
                                                </>
                                            }
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <Card
                                            Content={
                                                <>
                                                    <h3 className="my-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
                                                        InActive Courses
                                                    </h3>
                                                    <Table
                                                        Search={false}
                                                        DeleteAction={false}
                                                        EditRoute={null}
                                                        items={inActive_courses}
                                                        columns={columnsForInActiveCourses}
                                                        customActions={[
                                                            {
                                                                label: 'Edit Course',
                                                                type: 'link',
                                                                href: (item) =>
                                                                    route(
                                                                        'courses.edit',
                                                                        item.slug,
                                                                    ),
                                                            },
                                                        ]}
                                                    />
                                                </>
                                            }
                                        />
                                    </div>
                                </>
                            </div>
                        ) : (
                            <div className="my-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2">
                                <Card
                                    Content={
                                        <>
                                            <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                {/* Left: Icon */}
                                                <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <GraduationCap size={28} />
                                                </div>

                                                {/* Right: Count & Label */}
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                        {user_total_enrolled_courses}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                        Total Enrolled Courses
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                />

                                <Card
                                    Content={
                                        <>
                                            <div className="relative flex min-h-full cursor-pointer items-center overflow-hidden rounded-lg bg-white p-6 shadow-md transition duration-300 hover:scale-105 dark:bg-gray-800/10">
                                                {/* Left: Icon */}
                                                <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <BookCheck size={28} />
                                                </div>

                                                {/* Right: Count & Label */}
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                        {user_total_completed_courses}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                        Total Completed Courses
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                                />

                                <div className="col-span-full">
                                    <Card
                                        Content={
                                            <>
                                                <div className="flex items-center justify-between p-3">
                                                    <h3 className="my-4 text-left text-2xl font-bold text-gray-800 dark:text-white">
                                                        Notice Board
                                                    </h3>

                                                    <LinkButton
                                                        URL={route('notifications.index')}
                                                        Text={'View All'}
                                                        Icon={<ArrowRight size={20} />}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2">
                                                    {user_notifications.data.map(
                                                        (notification, index) => {
                                                            return (
                                                                <div
                                                                    className="w-full max-w-lg"
                                                                    key={index}
                                                                >
                                                                    <Card
                                                                        key={index}
                                                                        CustomCss="flex flex-col justify-between gap-4 max-w-xl min-h-[200px] p-4  hover:scale-105 transition duration-300 ease-in-out"
                                                                        Content={
                                                                            <>
                                                                                {/* Top Section */}
                                                                                <div className="flex items-start gap-4">
                                                                                    <div className="flex-shrink-0">
                                                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                                                            <svg
                                                                                                className="h-6 w-6"
                                                                                                fill="none"
                                                                                                stroke="currentColor"
                                                                                                strokeWidth="2"
                                                                                                viewBox="0 0 24 24"
                                                                                            >
                                                                                                <path
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                    d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                                                                                                />
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="flex-1">
                                                                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                                                            {
                                                                                                notification
                                                                                                    .data
                                                                                                    .title
                                                                                            }
                                                                                        </h4>

                                                                                        <p className="mt-1 text-sm text-gray-600 dark:text-white">
                                                                                            {
                                                                                                notification
                                                                                                    .data
                                                                                                    .message
                                                                                            }
                                                                                        </p>
                                                                                    </div>

                                                                                    {notification.read_at ? (
                                                                                        <span className="mt-1.5 h-3 w-3 rounded-full bg-green-500"></span>
                                                                                    ) : (
                                                                                        <span className="mt-1.5 h-3 w-3 rounded-full bg-blue-500"></span>
                                                                                    )}
                                                                                </div>

                                                                                <div className="flex gap-2">
                                                                                    {notification
                                                                                        .data
                                                                                        .route && (
                                                                                        <div className="mt-auto pt-2">
                                                                                            <LinkButton
                                                                                                URL={route(
                                                                                                    notification
                                                                                                        .data
                                                                                                        .route
                                                                                                        .name,
                                                                                                    [
                                                                                                        ...(notification
                                                                                                            .data
                                                                                                            .route
                                                                                                            .params ||
                                                                                                            []),
                                                                                                    ],
                                                                                                )}
                                                                                                CustomClass={
                                                                                                    'w-[50px]'
                                                                                                }
                                                                                                Icon={
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        fill="none"
                                                                                                        viewBox="0 0 24 24"
                                                                                                        strokeWidth={
                                                                                                            1.5
                                                                                                        }
                                                                                                        stroke="currentColor"
                                                                                                        className="size-6"
                                                                                                    >
                                                                                                        <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                                                                        />
                                                                                                        <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                                                        />
                                                                                                    </svg>
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </>
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>

                                                {user_notifications.data.length === 0 ? (
                                                    <div className="my-4 flex items-center justify-center gap-3 rounded-lg bg-gray-200 p-3 shadow-sm transition-all duration-300 dark:bg-gray-700">
                                                        <h4 className="text-md text-center font-semibold text-gray-800 dark:text-white">
                                                            No Notifications Found
                                                        </h4>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {user_notifications.data.length > 0 && (
                                                            <div className="mt-5 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                                                                <div className="flex items-center justify-between">
                                                                    <PrimaryButton
                                                                        Text={
                                                                            <>
                                                                                <svg
                                                                                    className="fill-current"
                                                                                    width="20"
                                                                                    height="20"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="none"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        clipRule="evenodd"
                                                                                        d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715Z"
                                                                                    />
                                                                                </svg>
                                                                                <span className="mx-2 hidden sm:inline">
                                                                                    {' '}
                                                                                    Previous{' '}
                                                                                </span>
                                                                            </>
                                                                        }
                                                                        Disabled={
                                                                            !user_notifications
                                                                                .links[0].url
                                                                        }
                                                                        Action={() =>
                                                                            handlePagination(
                                                                                user_notifications
                                                                                    .links[0].url,
                                                                            )
                                                                        }
                                                                        CustomClass="w-[140px] h-[40px]"
                                                                        Type="button"
                                                                    />
                                                                    <ul className="hidden items-center gap-0.5 sm:flex">
                                                                        {user_notifications.links
                                                                            .slice(1, -1)
                                                                            .map((link, idx) => (
                                                                                <li key={idx}>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handlePagination(
                                                                                                link.url,
                                                                                            )
                                                                                        }
                                                                                        disabled={
                                                                                            !link.url ||
                                                                                            link.active
                                                                                        }
                                                                                        className={`text-theme-sm flex h-10 w-10 items-center justify-center rounded-lg font-medium ${
                                                                                            link.active
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
                                                                                <span className="hidden sm:inline">
                                                                                    {' '}
                                                                                    Next{' '}
                                                                                </span>
                                                                                <svg
                                                                                    className="mx-2 fill-current"
                                                                                    width="20"
                                                                                    height="20"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="none"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        clipRule="evenodd"
                                                                                        d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715Z"
                                                                                    />
                                                                                </svg>
                                                                            </>
                                                                        }
                                                                        Disabled={
                                                                            !user_notifications
                                                                                .links[
                                                                                user_notifications
                                                                                    .links.length -
                                                                                    1
                                                                            ].url
                                                                        }
                                                                        Action={() =>
                                                                            handlePagination(
                                                                                user_notifications
                                                                                    .links[
                                                                                    user_notifications
                                                                                        .links
                                                                                        .length - 1
                                                                                ].url,
                                                                            )
                                                                        }
                                                                        CustomClass="w-[140px] h-[40px] mx-2"
                                                                        Type="button"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </>
                }
            />
        </AuthenticatedLayout>
    );
}
