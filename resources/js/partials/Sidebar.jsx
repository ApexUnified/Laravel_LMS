import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import Can from '@/Hooks/Can';
import {
    BellRing,
    BookCheck,
    BookOpen,
    ChartColumnStacked,
    CreditCard,
    Folder,
    FolderDown,
    GraduationCap,
    LayoutDashboardIcon,
    Settings,
    User,
    Users,
} from 'lucide-react';

export default function Sidebar({
    sidebarToggle,
    setSidebarToggle,
    ApplicationLogoLight,
    ApplicationLogoDark,
}) {
    // For Managing Sidebar Navlinks Selection State
    const [selected, setSelected] = useState(null);

    return (
        <>
            <aside
                className={`${
                    sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'
                } sidebar fixed left-0 top-0 z-[12] flex h-screen w-[290px] flex-col overflow-y-hidden border-r border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0`}
            >
                <div
                    className={`flex items-center ${sidebarToggle ? 'justify-center' : 'justify-between'} sidebar-header gap-2 pb-7 pt-8`}
                >
                    <Link href={route('dashboard')}>
                        <span className={`logo ${sidebarToggle ? 'hidden' : ''}`}>
                            <img
                                className="h-[140px] w-auto dark:hidden"
                                src={ApplicationLogoLight}
                                alt="Logo"
                            />

                            <img
                                className="hidden h-[140px] w-auto dark:block"
                                src={ApplicationLogoDark}
                                alt="Logo"
                            />
                        </span>
                    </Link>

                    <button
                        className={`${sidebarToggle ? 'bg-gray-100 dark:bg-gray-800 lg:bg-transparent dark:lg:bg-transparent' : ''} z-99999 flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400 lg:hidden lg:h-11 lg:w-11 lg:border`}
                        onClick={() => setSidebarToggle(!sidebarToggle)}
                    >
                        <svg
                            className={`${sidebarToggle ? 'block lg:hidden' : 'hidden'} fill-current`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>

                <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto duration-300 ease-linear">
                    <nav>
                        <div>
                            <h3 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                                <span
                                    className={`menu-group-title ${sidebarToggle ? 'lg:hidden' : ''}`}
                                >
                                    MENU
                                </span>

                                <svg
                                    className={`menu-group-icon mx-auto fill-current ${sidebarToggle ? 'hidden lg:block' : 'hidden'}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
                                        fill=""
                                    />
                                </svg>
                            </h3>

                            <ul className="mb-6 flex flex-col gap-4">
                                <Can permission={'Dashboard'}>
                                    <li>
                                        <Link
                                            href={route('dashboard')}
                                            className={`menu-item group ${route().current() === 'dashboard' ? 'menu-item-active' : 'menu-item-inactive'}`}
                                        >
                                            <LayoutDashboardIcon />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Dashboard
                                            </span>

                                            <svg
                                                className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </Can>

                                <Can permission={'My Courses'}>
                                    <li>
                                        <Link
                                            href={route('my.courses')}
                                            className={`menu-item group ${route().current() === 'my.courses' ? 'menu-item-active' : 'menu-item-inactive'}`}
                                        >
                                            <Folder />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                My Courses
                                            </span>

                                            <svg
                                                className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </Can>

                                <Can permission={'All Courses'}>
                                    <li>
                                        <Link
                                            href={route('all.courses')}
                                            className={`menu-item group ${route().current() === 'all.courses' ? 'menu-item-active' : 'menu-item-inactive'}`}
                                        >
                                            <FolderDown />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                All Courses
                                            </span>

                                            <svg
                                                className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </Can>

                                <Can permission={['Category View', 'Category Create']}>
                                    <li>
                                        <a
                                            onClick={() => {
                                                if (selected === 'Categories') {
                                                    setSelected(null);
                                                } else {
                                                    setSelected('Categories');
                                                }
                                            }}
                                            className={`menu-item group cursor-pointer ${route().current().includes('category.') || selected === 'Categories' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                        >
                                            <ChartColumnStacked />
                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Categories
                                            </span>

                                            <svg
                                                className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('category.') || (selected === 'Categories' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>

                                        <div
                                            className={`translate transform overflow-hidden ${selected === 'Categories' ? 'block' : 'hidden'}`}
                                        >
                                            <ul
                                                className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                            >
                                                <Can permission={'Category View'}>
                                                    <li>
                                                        <Link
                                                            href={route('category.index')}
                                                            className={`menu-dropdown-item group ${route().current() === 'category.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Category List
                                                        </Link>
                                                    </li>
                                                </Can>

                                                <Can permission={'Category Create'}>
                                                    <li>
                                                        <Link
                                                            href={route('category.create')}
                                                            className={`menu-dropdown-item group ${route().current() === 'category.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Create Category
                                                        </Link>
                                                    </li>
                                                </Can>
                                            </ul>
                                        </div>
                                    </li>
                                </Can>

                                <Can permission={['User View', 'User Create']}>
                                    <li>
                                        <a
                                            onClick={() => {
                                                if (selected === 'Users') {
                                                    setSelected(null);
                                                } else {
                                                    setSelected('Users');
                                                }
                                            }}
                                            className={`menu-item group cursor-pointer ${route().current().includes('users.') || selected === 'Users' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                        >
                                            <Users />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Users
                                            </span>

                                            <svg
                                                className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('users.') || (selected === 'Users' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>

                                        <div
                                            className={`translate transform overflow-hidden ${selected === 'Users' ? 'block' : 'hidden'}`}
                                        >
                                            <ul
                                                className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                            >
                                                <Can permission={'User View'}>
                                                    <li>
                                                        <Link
                                                            href={route('users.index')}
                                                            className={`menu-dropdown-item group ${route().current() === 'users.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Users List
                                                        </Link>
                                                    </li>
                                                </Can>

                                                <Can permission={'User Create'}>
                                                    <li>
                                                        <Link
                                                            href={route('users.create')}
                                                            className={`menu-dropdown-item group ${route().current() === 'users.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Create User
                                                        </Link>
                                                    </li>
                                                </Can>
                                            </ul>
                                        </div>
                                    </li>
                                </Can>

                                <Can permission={['Course View', 'Course Create']}>
                                    <li>
                                        <a
                                            onClick={() => {
                                                if (selected === 'Courses') {
                                                    setSelected(null);
                                                } else {
                                                    setSelected('Courses');
                                                }
                                            }}
                                            className={`menu-item group cursor-pointer ${route().current().includes('courses.') || selected === 'Courses' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                        >
                                            <BookOpen />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Courses
                                            </span>

                                            <svg
                                                className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('courses.') || (selected === 'Courses' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>

                                        <div
                                            className={`translate transform overflow-hidden ${selected === 'Courses' ? 'block' : 'hidden'}`}
                                        >
                                            <ul
                                                className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                            >
                                                <Can permission={'Course View'}>
                                                    <li>
                                                        <Link
                                                            href={route('courses.index')}
                                                            className={`menu-dropdown-item group ${route().current() === 'courses.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Courses List
                                                        </Link>
                                                    </li>
                                                </Can>

                                                <Can permission={'Course Create'}>
                                                    <li>
                                                        <Link
                                                            href={route('courses.create')}
                                                            className={`menu-dropdown-item group ${route().current() === 'courses.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Create Course
                                                        </Link>
                                                    </li>
                                                </Can>
                                            </ul>
                                        </div>
                                    </li>
                                </Can>

                                <Can permission={['Lesson View', 'Lesson Create']}>
                                    <li>
                                        <a
                                            onClick={() => {
                                                if (selected === 'Lessons') {
                                                    setSelected(null);
                                                } else {
                                                    setSelected('Lessons');
                                                }
                                            }}
                                            className={`menu-item group cursor-pointer ${route().current().includes('lessons.') || selected === 'Lessons' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                        >
                                            <BookCheck />
                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Lessons
                                            </span>

                                            <svg
                                                className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('lessons.') || (selected === 'Lessons' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>

                                        <div
                                            className={`translate transform overflow-hidden ${selected === 'Lessons' ? 'block' : 'hidden'}`}
                                        >
                                            <ul
                                                className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                            >
                                                <Can permission={'Lesson View'}>
                                                    <li>
                                                        <Link
                                                            href={route('lessons.index')}
                                                            className={`menu-dropdown-item group ${route().current() === 'lessons.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Lessons List
                                                        </Link>
                                                    </li>
                                                </Can>

                                                <Can permission={'Lesson Create'}>
                                                    <li>
                                                        <Link
                                                            href={route('lessons.create')}
                                                            className={`menu-dropdown-item group ${route().current() === 'lessons.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Create Lesson
                                                        </Link>
                                                    </li>
                                                </Can>
                                            </ul>
                                        </div>
                                    </li>
                                </Can>

                                <Can permission={['Enrollment View', 'Enrollment Create']}>
                                    <li>
                                        <a
                                            onClick={() => {
                                                if (selected === 'Enrollments') {
                                                    setSelected(null);
                                                } else {
                                                    setSelected('Enrollments');
                                                }
                                            }}
                                            className={`menu-item group cursor-pointer ${route().current().includes('enrollments.') || selected === 'Enrollments' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                        >
                                            <GraduationCap />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Enrollments
                                            </span>

                                            <svg
                                                className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('enrollments.') || (selected === 'Enrollments' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>

                                        <div
                                            className={`translate transform overflow-hidden ${selected === 'Enrollments' ? 'block' : 'hidden'}`}
                                        >
                                            <ul
                                                className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                            >
                                                <Can permission={'Enrollment View'}>
                                                    <li>
                                                        <Link
                                                            href={route('enrollments.index')}
                                                            className={`menu-dropdown-item group ${route().current() === 'enrollments.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Enrollments List
                                                        </Link>
                                                    </li>
                                                </Can>

                                                <Can permission={'Enrollment Create'}>
                                                    <li>
                                                        <Link
                                                            href={route('enrollments.create')}
                                                            className={`menu-dropdown-item group ${route().current() === 'enrollments.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                        >
                                                            Create Enrollment
                                                        </Link>
                                                    </li>
                                                </Can>
                                            </ul>
                                        </div>
                                    </li>
                                </Can>

                                <Can permission={'Notification View'}>
                                    <li>
                                        <Link
                                            href={route('notifications.index')}
                                            className={`menu-item group ${route().current() === 'notifications.index' ? 'menu-item-active' : 'menu-item-inactive'}`}
                                        >
                                            <BellRing />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Notifications
                                            </span>

                                            <svg
                                                className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </Can>

                                <Can permission={'Transaction View'}>
                                    <li>
                                        <Link
                                            href={route('transactions.index')}
                                            className={`menu-item group ${route().current() === 'transactions.index' ? 'menu-item-active' : 'menu-item-inactive'}`}
                                        >
                                            <CreditCard />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Transactions
                                            </span>

                                            <svg
                                                className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </Can>

                                <Can permission={'Setting View'}>
                                    <li>
                                        <Link
                                            href={route('settings.index')}
                                            className={`menu-item group ${route().current().includes('settings') ? 'menu-item-active' : 'menu-item-inactive'}`}
                                        >
                                            <Settings />

                                            <span
                                                className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            >
                                                Settings
                                            </span>

                                            <svg
                                                className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                    stroke=""
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </Can>
                            </ul>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
}
