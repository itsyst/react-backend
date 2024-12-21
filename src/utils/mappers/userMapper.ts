// src/utils/userMapper.ts
import { UserType } from '../../types/UserType';

export const mapToUserModel = (): UserType => ({
    id: Date.now() + Math.floor(Math.random() * 1000), // Generate Unique random number
    username: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    company: {
        name: '',
        catchPhrase: '',
        bs: '',
    },
    address: {
        street: '',
        suite: '',
        city: '',
        zipCode: '',
        geo: {
            lat: '',
            lng: '',
        },
    },
    password: '',
});


export const mapToSimpleUserModel = (): Partial<UserType> => ({
    id: Date.now() + Math.floor(Math.random() * 1000), // Generate Unique random number
    name: '',
    email: '',
    phone: '',
    website: '',
});
