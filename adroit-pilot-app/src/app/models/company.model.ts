export class Company {
    company_name: string;
    hr: string;
    company_location: string;
    email: string;
    contact_no: number;
    keywords: Array<string>;
    description: string;
    password: string;
    constructor(value) {
        Object.assign(this, value);
    }
}
