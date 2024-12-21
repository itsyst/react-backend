import { useState } from 'react';
import { createUser, patchUser, deleteUser } from '../services/userService';
import { UserType } from '../types/UserType';
import { ToastContainer, toast } from 'react-toastify';
import { CanceledError } from 'axios';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { mapToUserModel } from '../utils/mappers/userMapper';
import StaticModal from './StaticModal';
import useUsers from '../hooks/useUsers';

const UserList = () => {
	const [showModal, setShowModal] = useState<boolean>();
	const [action, setAction] = useState<string>();
	const [user, setUser] = useState<UserType | undefined>();
	const { users, error, isLoading, setUsers, setError } = useUsers(); // Custom hook

	const addUser = (newUser: Partial<UserType>) => {
		const initialUsers = [...users];
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
			})
			.catch((err) => {
				toast.error(`Failed to create user: ${err.message}`);
				setUsers(initialUsers);
			});
	};

	const editUser = (editUser: Partial<UserType>) => {
		const initialUsers = [...users];
		if (user) {
			const completeUser: UserType = {
				...user,
				...editUser
			};

			patchUser(completeUser)
				.then(() => {
					setUsers((prevUsers) => prevUsers.map((user) => (user.id === completeUser.id ? completeUser : user)));
					toast.success('User updated successfully', {
						autoClose: 1000
					});
					setShowModal(false);
				})
				.catch((err) => {
					setError(`Failed to update user: ${err.message}`);
					toast.error(`Failed to update user: ${err.message}`);
					setUsers(initialUsers);
				});
		}
	};

	const removeUser = (id: number) => {
		const initialUsers = [...users];
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

		deleteUser(id)
			.then(() => {
				toast.success('User deleted successfully', {
					autoClose: 1000
				});
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				toast.error(`Error deleting user: ${err.message}`);
				setUsers(initialUsers);
			});
	};

	const handleShowModal = (user: UserType | undefined, state: boolean, action: 'add' | 'update') => {
		setUser(user);
		setShowModal(state);
		setAction(action);
	};

	return (
		<>
			<div className="user-list mt-3">
				<div className="d-flex justify-content-between w-100">
					<h3>User List</h3>
					<IoMdAddCircleOutline color="#0d6efd" cursor="pointer" onClick={() => handleShowModal(undefined, true, 'add')} />
				</div>
				{error && <p className="text-danger">{error}</p>}
				{isLoading && <div className="spinner-border"></div>}
				{!isLoading && !error && (
					<ul className="px-0">
						{users.map((user, index) => (
							<li className="list-unstyled d-flex justify-content-between" key={index}>
								{user.name}
								<div>
									<FaEdit color="#0dcaf0" cursor="pointer" onClick={() => handleShowModal(user, true, 'update')} />{' '}
									<MdDelete color="#dc3545" cursor="pointer" onClick={() => removeUser(user.id)} />
								</div>
							</li>
						))}
					</ul>
				)}
				<ToastContainer />
			</div>
			<StaticModal toUpdate={user} show={showModal} action={action} onClose={() => setShowModal(false)} onSave={addUser} onUpdate={editUser} />
		</>
	);
};

export default UserList;
