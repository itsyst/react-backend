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