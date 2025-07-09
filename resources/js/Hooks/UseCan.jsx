import { usePage } from '@inertiajs/react';

export default function useCan(permission) {
    const { permissions } = usePage().props.auth;

    if (permissions === true) return true; // Admin
    if (!Array.isArray(permissions)) return false;

    return permissions.includes(permission);
}
