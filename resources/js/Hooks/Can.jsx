import { usePage } from '@inertiajs/react';
import React from 'react'

export default function Can({ permission, children }) {

    const { permissions } = usePage().props.auth;

    const hasPermission =
        permissions === true ||
        (Array.isArray(permissions) &&
            (Array.isArray(permission)
                ? permission.some(p => permissions.includes(p)) // multiple
                : permissions.includes(permission))              // single
        );

    if (hasPermission) {
        return <>{children}</>;
    }

}
