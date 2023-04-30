import FLASK_HTTPS from "./0_FLASK_API";
import {ObjectID} from "bson";
import {Party} from "../Models/Party";

export namespace PartyAPI {

    let route_name = "/party"

    export const get_party = async (user_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/get_party/" + user_id.toString())
            .then((res) => {
                return res.data as Party
            })
            .catch((res) => {
                console.log(res)
            })
    }

    export const get_parties = async () => {
        return FLASK_HTTPS.get(route_name + "/get_parties")
            .then((res) => {
                return res.data as Array<Party>
            }).catch((res) => {
                console.log(res)
            })
    }

    export const get_partiesLength = async () => {
        return FLASK_HTTPS.get(route_name + "/get_parties")
            .then((res) => {
                const partyArray = res.data as Array<Party>;
                const partyArrayLength = partyArray.length; // get the length of the array
                return partyArrayLength;
            }).catch((res) => {
                console.log(res)
            })
    }
    

}
