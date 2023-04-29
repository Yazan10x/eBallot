import { ObjectID } from "bson";

export interface Profile {
    first_name: string;
    last_name: string;
    dob: Date;
    email: string;
    government_id_image: BinaryData;
    portrait_image: BinaryData;
}

export interface User {
    _id: ObjectID;
    profile: Profile;
}
