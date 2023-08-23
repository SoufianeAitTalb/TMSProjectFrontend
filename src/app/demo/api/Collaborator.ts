export interface Collaborator {
    agentId?:bigint;
    clientId?:bigint;
    name?:string;
    company?:string;
    phoneNumber?: string;
    email?: string;

    address?: string;
    city?: string;

    countryLongName?:string;
    staffFullName?:string;


}
