import axios from "axios";

const FLASK_API_ADDRESS: string = "https://e.ballot.api.usec.club";
const FLASK_LOCAL_ADDRESS: string = "http://127.0.0.1:5050";

export const CURRENT_URL = FLASK_LOCAL_ADDRESS

export const instance = axios.create({
  baseURL: CURRENT_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

 export default instance;
