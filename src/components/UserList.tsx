import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { UserType } from '../types/UserType';
import { ToastContainer, toast } from 'react-toastify';
import { CanceledError } from 'axios';

const UserList = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Create AbortController instance
		const controller = new AbortController();

		getUsers(controller.signal)
			.then(({ data }) => setUsers(data))
			.catch((err) => {
				if (err instanceof CanceledError) return;
				else {
					setError(`Failed to fetch users: ${err}`);
					toast.error('Error fetching users!');
				}
			});

		// Cleanup: Abort ongoing requests when component unmounts
		return () => controller.abort();
	}, []);

	return (
		<div className="mt-3">
			<h3>User List</h3>
			{error && <p className="text-danger">{error}</p>} {/* Display error if any */}
			<ul className="px-0">
				{users.map((user: UserType) => (
					<li className="list-unstyled" key={user.id}>
						{user.name}
					</li> // Render each user (update based on your data structure)
				))}
			</ul>
			<ToastContainer />
		</div>
	);
};

export default UserList;