import {ObjectID} from "bson";


export interface Profile {
    first_name: string
    last_name: string
}

export interface User {
    _id: ObjectID
    profile: Profile
}
