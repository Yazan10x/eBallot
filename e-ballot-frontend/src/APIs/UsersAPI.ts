import FLASK_HTTPS from "./0_FLASK_API";
import {ObjectID} from "bson";
import {User} from "../Models/User";

export namespace UsersAPI {

    let route_name = "/users"

    export const get_user = async (user_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/get_user/" + user_id.toString())
            .then((res) => {
                let user = res.data as User
                user.profile.dob = new Date(user.profile.dob)
                user.profile.government_id_image = CURRENT_URL + "/users/get_user_government_id_image/" + user._id.toString()
                user.profile.portrait_image = ""
                console.log(user)
                return user
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
