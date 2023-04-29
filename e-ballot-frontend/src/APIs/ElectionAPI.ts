import FLASK_HTTPS from "./0_FLASK_API";
import {ObjectID} from "bson";
import {User} from "../Models/User";

export namespace UsersAPI {

    let route_name = "/election"

    export const vote = async (user_id: ObjectID, party_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/election_results/" + user_id.toString() + "/" + party_id.toString())
            .catch((res) => {
                console.log(res)
            })
    }

}
