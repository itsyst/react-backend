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
 * Deletes a user by ID from the API.
 * @param id - The ID of the user to delete
 * @returns Promise containing the deleted user response or any relevant message
 */
export const deleteUser = async (id: number) => {
    return await http.delete<UserType>(`${apiEndpoint}/${id}`);
};