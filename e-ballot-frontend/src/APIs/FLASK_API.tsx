import axios from "axios";

const FLASK_API_ADDRESS: string = "https://e.ballot.api.usec.club";
const FLASK_LOCAL_ADDRESS: string = "http://127.0.0.1:5050"

const instance = axios.create({
  baseURL: FLASK_API_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  }
});

 export default instance;
