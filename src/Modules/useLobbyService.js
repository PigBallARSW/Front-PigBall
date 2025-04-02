import { useNavigate } from "react-router-dom";
import { createRoom, getGame, getGames } from "../APIServices/gameAPI";
import { useAlert } from "../context/alert/AlertContext";

export function useLobbyService() {
    const {showAlert} = useAlert();
    const navigate = useNavigate();
    const createNewRoom = async (newRoom, name) => {
        try{
            const response = await createRoom(newRoom, name);
            const id = response.data.id;
            if(id){
                navigate(`/game/${id}`);
                showAlert("Room created successfully!", "success");   
            }
        }catch(error){
            showAlert("Could not create", "error");
        }
    }
    const joinRoom = (id) => {
        const func = (response) => {
            const id = response.id;
            navigate(`/game/${id}`);
            showAlert("Joined successfully!", "success");
        }
       getAGame(func, id);
    }
    const getAllRooms = async (callback) => {
        try{
            const response = await getGames();
            callback(response.data);
        }catch(error){
            showAlert("Could not load rooms", "error");
        }
        
    }
    const getAGame = async (callback, id) => {
        try{
            const response = await getGame(id);
            callback(response.data);
        }catch(error){
            showAlert("Could not load game", "error");
        }
    }
    return {createNewRoom, joinRoom, getAllRooms, getAGame};

}




