import { CanceledError } from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUsers } from '../services/userService';
import { UserType } from '../types/UserType';

const useUsers = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        getUsers(controller.signal)
            .then(({ data }) => {
                setUsers(data);
                setError(null);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;

                setError('Failed to fetch users');
                setUsers([]);
                toast.error(`Error fetching users: ${err.message}`);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
