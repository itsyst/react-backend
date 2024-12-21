import { UserType } from '../types/UserType';
import http from './httpService';

const apiEndpoint = '/users';

/**
 * Fetches the list of users from the API.
 * @param signal - AbortSignal for canceling the request
 * @returns Promise containing the user list
 */
export const getUsers = async (signal: AbortSignal) => {
    return await http.get<UserType[]>(apiEndpoint, { signal });
}

/**
 * Creates a new user via the API.
 * @param user - The user object to create
 * @returns Promise containing the created user
 */
export const createUser = async (user: UserType) => {
    return await http.post<UserType>(apiEndpoint, user)
}

/**
 * Patches a user via the API
 * @param id - The ID of the user to patch
 * @param user - The user object to patch
 * @returns Promise containing the patched user
 */
export const patchUser = async (user: UserType) => {
    return await http.patch<UserType>(`${apiEndpoint}/${user.id}`, user)
}

/**
 * Deletes a user by ID from the API.
 * @param id - The ID of the user to delete
 * @returns Promise containing the deleted user response or any relevant message
 */
export const deleteUser = async (id: number) => {
    return await http.delete<UserType>(`${apiEndpoint}/${id}`);
};