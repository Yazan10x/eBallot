import { ObjectID } from "bson";

export interface Profile {
    first_name: string;
    last_name: string;
    dob: Date;
    gender: string;
    email: string;
    id1: string;
    id2: string;
}

export interface User {
    _id: ObjectID;
    profile: Profile;
    province: string
}

export interface Auth_Res{
  success: Boolean,
  user_id?: string
}
