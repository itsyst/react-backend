import { useEffect, useState } from 'react';
import { createUser, deleteUser, getUsers } from '../services/userService';
import { UserType } from '../types/UserType';
import { ToastContainer, toast } from 'react-toastify';
import { CanceledError } from 'axios';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { mapToUserModel } from '../utils/mappers/userMapper';
import StaticModal from './StaticModal';

const UserList = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

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

	const handleCreateUser = (newUser: Partial<UserType>, reset: () => void) => {
		const completeUser: UserType = {
			...mapToUserModel(),
			...newUser
		};
		createUser(completeUser)
			.then(({ data }) => {
				setUsers([data, ...users]);
				toast.success('User created successfully', {
					autoClose: 1000 // Set duration to 2000ms
				});
				setShowModal(false);
				reset();
			})
			.catch((err) => {
				toast.error(`Failed to create user: ${err.message}`);
			});
	};

	const handleDeleteUser = (id: number) => {
		const initialUsers = [...users];
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

		deleteUser(id)
			.then(() => {
				toast.success('User deleted successfully', {
					autoClose: 1000
				});
			})
			.catch((err) => {
				setUsers(initialUsers);
				if (err instanceof CanceledError) return;
				toast.error(`Error deleting user: ${err.message}`);
			});
	};

	return (
		<>
			<div className="user-list mt-3">
				<div className="d-flex justify-content-between w-100">
					<h3>User List</h3>
					<IoMdAddCircleOutline color="blue" cursor="pointer" onClick={() => setShowModal(true)} />
				</div>
				{error && <p className="text-danger">{error}</p>}
				{isLoading && <div className="spinner-border"></div>}
				{!isLoading && !error && (
					<ul className="px-0">
						{users.map((user) => (
							<li className="list-unstyled d-flex justify-content-between" key={user.id}>
								{user.name}
								<MdDelete color="red" cursor="pointer" onClick={() => handleDeleteUser(user.id)} />
							</li>
						))}
					</ul>
				)}
				<ToastContainer />
			</div>
			<StaticModal show={showModal} onClose={() => setShowModal(false)} onSave={handleCreateUser} />
		</>
	);
};

export default UserList;
