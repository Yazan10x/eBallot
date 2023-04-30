import FLASK_HTTPS, {CURRENT_URL} from "./0_FLASK_API";
import {ObjectID} from "bson";
import {Auth_Res, User} from "../Models/User";

export namespace UsersAPI {

    let route_name = "/users"

    export const get_user = async (user_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/get_user/" + user_id.toString())
            .then((res) => {
                let user = res.data as User
                user.profile.dob = new Date(user.profile.dob)
                user.profile.id1 = CURRENT_URL + "/users/id1/" + user._id.toString()
                user.profile.id2 = CURRENT_URL + "/users/id2/" + user._id.toString()
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

    export const authenticate_user = async (img: string) => {
        return FLASK_HTTPS.post(route_name + "/authenticate_user",
            {
                data: img
            }
            )
            .then((res) => {
                return res.data as Auth_Res
            }).catch((res) => {
                console.log(res)
            })
    }

}
