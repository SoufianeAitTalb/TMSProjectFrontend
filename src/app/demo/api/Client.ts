export interface Client {

    clientId?: bigint;
    name?:string;
    company ?: string;
    iceClient?: string;
    phoneNumber?: string;
    email?: string;
    enCours?: number;
    echeance?: number;
    website?: string;
    rc?: string;
    cnss?: string;

    address?: string;
    city?: string;
    zip?: string;
    countryId?: bigint;

    codeComptable?: string;
    codeAuxi?: string;
    defaultCurrencyId?: bigint;
    patente?: number;

    billingStreet?: string;
    billingState?: string;
    billingCity?: string;
    billingZip?: string;
    billingCountryId?: bigint;

    shippingStreet?: string;
    shippingState?: string;
    shippingCity?: string;
    shippingZip?: string;
    shippingCountryId?: string;

    dateAffectation?:Date;
    staffFullName?:string;
    staffId?: bigint;


    /*
    state?: string;
    dateCreated?: Date;
    active?:Boolean;


    longitude?: string;
    latitude?: string;
    defaultLanguage?: string;
    showPrimaryContact?:Boolean;
    DateAffectationOfCommercial?: Date;
    country?: string;
    currency?: string;
    staff?: string;
    ngp?: string;
    clientsupplier?:string;
    clientFolders?:string;
    contacts?: string;*/






}
