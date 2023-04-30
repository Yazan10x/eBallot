import { ObjectID } from "bson";

export interface Party {
    _id: ObjectID;
    name: string;
    ontario: number
    quebec: number
    bc: number
    alberta: number
    total_votes: number
}
