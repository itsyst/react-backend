import { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../services/userService';
import { UserType } from '../types/UserType';
import { ToastContainer, toast } from 'react-toastify';
import { CanceledError } from 'axios';
import { MdDelete } from 'react-icons/md';

const UserList = () => {
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

		// Cleanup: Abort ongoing requests when component unmounts
		return () => controller.abort();
	}, []);

	const handleDeleteUser = (id: number) => {
		// Save the initial state for rollback in case of an error
		const initialUsers = [...users];

		// Optimistically remove the user from the UI
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

		deleteUser(id)
			.then(() => {
				toast.success('User deleted successfully');
			})
			.catch((err) => {
				// Always rollback to the initial state on error
				setUsers(initialUsers);

				if (err instanceof CanceledError) return;

				if (err.response && err.response.status === 404) toast.error('User not found!');
				else toast.error(`Error deleting user: ${err.message}`);
			});
	};

	return (
		<div className="user-list mt-3">
			<h3>User List</h3>
			{error && <p className="text-danger">{error}</p>}

			{isLoading && <div className="spinner-border"></div>}

			{!isLoading && !error && (
				<ul className="px-0">
					{users.map((user: UserType) => (
						<li className="list-unstyled d-flex justify-content-between" key={user.id}>
							{user.name}
							<MdDelete key={user.id} color="red" cursor={'pointer'} onClick={() => handleDeleteUser(user.id)} />
						</li>
					))}
				</ul>
			)}

			<ToastContainer />
		</div>
	);
};

export default UserList;
