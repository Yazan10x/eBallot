import FLASK_HTTPS from "./FLASK_API";
import {ObjectID} from "bson";
import {User} from "../Models/User";

export namespace UsersAPI {

    let route_name = "/users"

    export const get_user = async (user_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/get_user/" + user_id.toString())
            .then((res) => {
                return res.data as User
            })
            .catch((res) => {
                console.log(res)
            })
    }

    export const get_users = async () => {
        return FLASK_HTTPS.get(route_name + "/get_users")
            .then((res) => {
                return res.data as Array<User>
            }).catch((res) => {
                console.log(res)
            })
    }

}
