export interface Agent {

    agentId?: bigint;
    name?:string;
    company ?: string;
    phoneNumber?: string;
    email?: string;
    website?: string;
    cnss?: string;
    address?: string;
    city?: string;
    zip?: string;
    countryId?: bigint;
    countryLongName?:string;
    defaultCurrencyId?: bigint;
    patente?: number;
    billingStreet?: string;
    billingCity?: string;
    billingState?: string;
    billingZip?: string;
    billingCountryId?: bigint;
    shippingStreet?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingZip?: string;
    shippingCountryId?: bigint;
    dateAffectation?: string;
    staffFullName?:string;
    staffId?: bigint;
    active?:boolean;

}
