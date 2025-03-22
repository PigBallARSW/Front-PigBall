import axios from "axios";
const API = "https://localhost:8080/";

export default async function createRoom(name){
    const response = await axios.post(API+"createGame"+name);
    return response;
}