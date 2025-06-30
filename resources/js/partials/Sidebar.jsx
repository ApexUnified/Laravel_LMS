import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Sidebar({
    sidebarToggle,
    setSidebarToggle,
    ApplicationLogoLight,
    ApplicationLogoDark
}) {

    // For Managing Sidebar Navlinks Selection State
    const [selected, setSelected] = useState(null);

    return (
        <>
            <aside
                className={`${sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'
                    } sidebar fixed left-0 top-0 z-[12] flex h-screen w-[290px] flex-col overflow-y-hidden border-r border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0`}
            >
                <div
                    className={`flex items-center ${sidebarToggle ? 'justify-center' : 'justify-between'} gap-2 pt-8 sidebar-header pb-7`}
                >
                    <Link href={route("dashboard")}>
                        <span className={`logo ${sidebarToggle ? 'hidden' : ''}`} >
                            <img className="dark:hidden h-[140px] w-auto" src={ApplicationLogoLight} alt="Logo" />

                            <img
                                className="hidden dark:block h-[140px] w-auto"
                                src={ApplicationLogoDark}
                                alt="Logo"
                            />
                        </span>


                    </Link>



                    <button className={`${sidebarToggle ? 'lg:bg-transparent  dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800' : ''} z-99999 flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 lg:h-11 lg:w-11 lg:border dark:border-gray-800 dark:text-gray-400 lg:hidden`}
                        onClick={() => setSidebarToggle(!sidebarToggle)}
                    >

                        <svg className={`${sidebarToggle ? 'block lg:hidden' : 'hidden'} fill-current `}
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



                <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
                    <nav>
                        <div>
                            <h3 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                                <span className={`menu-group-title ${sidebarToggle ? 'lg:hidden' : ''}`}>MENU</span>

                                <svg
                                    className={`mx-auto fill-current menu-group-icon ${sidebarToggle ? 'lg:block hidden' : 'hidden'}`}
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

                            <ul className="flex flex-col gap-4 mb-6">
                                <li>
                                    <Link href={route("dashboard")} className={`menu-item group ${route().current() === "dashboard" ? "menu-item-active" : "menu-item-inactive"}`}>


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                        </svg>




                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
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



                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === "Categories") {
                                                setSelected(null);
                                            } else {
                                                setSelected("Categories");
                                            }
                                        }}

                                        className={`menu-item group cursor-pointer ${(route().current().includes("category.") || selected === "Categories") ? "menu-item-active" : "menu-item-inactive"}  `}

                                    >



                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                        </svg>




                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                                            Categories
                                        </span>





                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current
                                            ${route().current().includes("category.") || selected === "Categories" && " menu-item-arrow-active"} ${sidebarToggle ? 'lg:hidden' : ''}`}
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
                                        className={`overflow-hidden transform translate ${selected === "Categories" ? "block" : "hidden"}`}
                                    >
                                        <ul
                                            className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route("category.index")}
                                                    className={`menu-dropdown-item group ${route().current() === "category.index" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Category List
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route("category.create")}
                                                    className={`menu-dropdown-item group ${route().current() === "category.create" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Create Category
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </li>



                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === "Users") {
                                                setSelected(null);
                                            } else {
                                                setSelected("Users");
                                            }
                                        }}

                                        className={`menu-item group cursor-pointer ${(route().current().includes("users.") || selected === "Users") ? "menu-item-active" : "menu-item-inactive"}  `}

                                    >



                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>



                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                                            Users
                                        </span>



                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current
                                            ${route().current().includes("users.") || selected === "Users" && " menu-item-arrow-active"} ${sidebarToggle ? 'lg:hidden' : ''}`}
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
                                        className={`overflow-hidden transform translate ${selected === "Users" ? "block" : "hidden"}`}
                                    >
                                        <ul
                                            className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route("users.index")}
                                                    className={`menu-dropdown-item group ${route().current() === "users.index" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Users List
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route("users.create")}
                                                    className={`menu-dropdown-item group ${route().current() === "users.create" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Create User
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </li>


                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === "Courses") {
                                                setSelected(null);
                                            } else {
                                                setSelected("Courses");
                                            }
                                        }}

                                        className={`menu-item group cursor-pointer ${(route().current().includes("courses.") || selected === "Courses") ? "menu-item-active" : "menu-item-inactive"}  `}

                                    >



                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                        </svg>




                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                                            Courses
                                        </span>



                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current
                                            ${route().current().includes("courses.") || selected === "Courses" && " menu-item-arrow-active"} ${sidebarToggle ? 'lg:hidden' : ''}`}
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
                                        className={`overflow-hidden transform translate ${selected === "Courses" ? "block" : "hidden"}`}
                                    >
                                        <ul
                                            className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route("courses.index")}
                                                    className={`menu-dropdown-item group ${route().current() === "courses.index" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Courses List
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route("courses.create")}
                                                    className={`menu-dropdown-item group ${route().current() === "courses.create" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Create Course
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </li>


                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === "Lessons") {
                                                setSelected(null);
                                            } else {
                                                setSelected("Lessons");
                                            }
                                        }}

                                        className={`menu-item group cursor-pointer ${(route().current().includes("lessons.") || selected === "Lessons") ? "menu-item-active" : "menu-item-inactive"}  `}

                                    >



                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0h1.5A2.25 2.25 0 0120 11.25v7.5A2.25 2.25 0 0117.25 21h-10.5A2.25 2.25 0 014.5 18.75v-7.5A2.25 2.25 0 016.75 9h1.5m7.5 0v6l-3-1.5-3 1.5V9" />
                                        </svg>





                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                                            Lessons
                                        </span>



                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current
                                            ${route().current().includes("lessons.") || selected === "Lessons" && " menu-item-arrow-active"} ${sidebarToggle ? 'lg:hidden' : ''}`}
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
                                        className={`overflow-hidden transform translate ${selected === "Lessons" ? "block" : "hidden"}`}
                                    >
                                        <ul
                                            className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route("lessons.index")}
                                                    className={`menu-dropdown-item group ${route().current() === "lessons.index" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Lessons List
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route("lessons.create")}
                                                    className={`menu-dropdown-item group ${route().current() === "lessons.create" ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}

                                                >
                                                    Create Lesson
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </li>



                                <li>
                                    <Link href={route("settings.index")} className={`menu-item group
                                        ${route().current().includes("settings") ? "menu-item-active" : "menu-item-inactive"}`}>


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>



                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
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



                            </ul >
                        </div >
                    </nav >
                </div >

            </aside >

        </>
    );
};


