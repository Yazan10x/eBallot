import FLASK_HTTPS from "./0_FLASK_API";
import {ObjectID} from "bson";
import {User} from "../Models/User";

export namespace ElectionAPI {

    let route_name = "/election"

    export const vote = async (user_id: ObjectID, party_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/vote/" + user_id.toString() + "/" + party_id.toString())
            .catch((res) => {
                console.log(res)
            })
    }
    export const did_user_vote = async (user_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/did_user_vote/" + user_id.toString())
            .catch((res) => {
                console.log(res)
            })
    }

}
