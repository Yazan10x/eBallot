import {ObjectID} from "bson";

export interface VoteRes {
        success: Boolean
}

export interface UserVote {
        success: Boolean,
        party_id?: ObjectID
}
