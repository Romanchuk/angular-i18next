export class Contact {
    lastName: string | undefined;
    firstName: string | undefined;
    middleName: string | undefined;
}

export class RichFormModel {
    email: string | undefined;
    count = 0;
    technicalContact: Contact = new Contact();
}
