import { ObjectID } from "bson";

export interface Party {
    _id: ObjectID;
    name: string;
    ontario: Array<ObjectID>
    quebec: Array<ObjectID>
    bc: Array<ObjectID>
    alberta: Array<ObjectID>
}
