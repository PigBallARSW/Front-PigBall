import axios from "axios";
const API = "https://localhost:8080/";

export default async function createRoom(name){
    try{
        const response = await axios.post(API+"createGame"+name);
        if(response){
            alert(response.status);
            return response;
        }
    }catch(error){
        alert(error);
    }
    
}