import BreadCrumb from '@/Components/BreadCrumb'
import Card from '@/Components/Card'
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import Toast from '@/Components/Toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import * as LucideIcons from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function rolePermissions({ groupedPermissions, role, role_permissions }) {


    const { data, setData, put, processing, errors } = useForm({
        role_id: role.id || '',
        permissions: role_permissions || [],
    });


    const [alertMessage, setAlertMessage] = useState(null);


    const handleSelectAll = () => {
        const allPermissionIds = groupedPermissions
            .flatMap(group => group.permissions.map(permission => permission.id));

        if (data.permissions.length === allPermissionIds.length) {
            setData('permissions', []);
        } else {
            setData('permissions', allPermissionIds);
        }
    };


    useEffect(() => {

        setAlertMessage(null);

        if (errors.role_id) {
            setAlertMessage(errors.role_id);
        }

        if (errors.permissions) {
            setAlertMessage(errors.permissions);
        }

    }, [errors]);


    const submit = (e) => {
        e.preventDefault();
        put(route("settings.roles.permissions.assign", role.id));
    }

    return (
        <>
            <AuthenticatedLayout>


                <Head title='Role Permissions' />

                <BreadCrumb
                    header={'Role Permissions'}
                    parent={"Roles"}
                    child={"Permissions"}
                    parent_link={route("settings.roles.index")}

                />


                {alertMessage && <Toast flash={{ error: alertMessage }} />}


                <Card
                    Content={
                        <>

                            <div className="flex justify-between items-center">
                                <div className='flex justify-start items-center'>
                                    <label htmlFor="all_permissions" className="flex items-center space-x-2 dark:text-white text-gray-700">
                                        <span className='mx-2'>All Permissions</span>
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="all_permissions"
                                        id='all_permissions'
                                        checked={data.permissions.length === groupedPermissions.flatMap(group => group.permissions.map(permission => permission.id)).length}
                                        onChange={() => handleSelectAll()}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring focus:ring-blue-200"
                                    />
                                </div>


                                <LinkButton
                                    Text={"Back To Roles"}
                                    URL={route("settings.roles.index")}
                                    CustomClass={"w-[120px] lg:w-[200px]"}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"></path></svg>
                                    }
                                />
                            </div>

                            <form onSubmit={submit} >
                                {groupedPermissions.map((group, index) => {
                                    const IconComponent = LucideIcons[group.icon] || LucideIcons.HelpCircle;

                                    return (
                                        <Card key={index}
                                            CustomCss={"my-5"}
                                            Content={
                                                <>
                                                    {/* Header with Icon and Group Name */}
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-xl">
                                                            <IconComponent size={20} />
                                                        </div>
                                                        <h2 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">{group.group} Permissions</h2>
                                                    </div>

                                                    {/* Permissions List */}
                                                    <div className="mb-5">
                                                        {group.permissions.map((permission) => {

                                                            return (
                                                                <label key={permission.id} className="flex items-center space-x-2 dark:text-white text-gray-700">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="permissions[]"
                                                                        value={permission.id}
                                                                        checked={data.permissions.includes(permission.id)}
                                                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring focus:ring-blue-200"
                                                                        onChange={(e) => setData('permissions', e.target.checked ? [...data.permissions, permission.id] : data.permissions.filter(id => id !== permission.id))}


                                                                    />
                                                                    <span>{permission.name}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </>
                                            }
                                        />
                                    );
                                })}


                                <div className="w-[200px]">
                                    <PrimaryButton
                                        Type={"submit"}
                                        Text={"Save Changes"}
                                        Icon={<LucideIcons.Save size={20} />}
                                        CustomCss={"mt-5 w-20"}
                                        Spinner={processing}
                                        Disabled={processing || data.permissions.length === 0}
                                    />
                                </div>

                            </form>
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    )
}
