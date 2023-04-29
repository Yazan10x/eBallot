import { ObjectID } from "bson";

export interface Profile {
    first_name: string;
    last_name: string;
    dob: Date;
    gender: string;
    email: string;
    government_id_image: string;
    portrait_image: string;
}

export interface User {
    _id: ObjectID;
    profile: Profile;
}
