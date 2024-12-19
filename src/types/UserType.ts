interface AddressType {
    street: string;
    suite: string;
    city: string;
    zipCode: string;
    geo: GeoType;
}

interface GeoType {
    lat: string;
    lng: string;
}

interface CompanyType {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface UserType {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    address: AddressType;
    company: CompanyType;
    phone: string;
    website: string;
}
