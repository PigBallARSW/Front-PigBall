import { useNavigate } from "react-router-dom";
import { createRoom, getGame, getGames } from "../APIServices/gameAPI";
import { useAlert } from "../context/alert/AlertContext";
import { useCallback } from "react";
import { useAuth } from "../context/auth/AuthContext";

export function useLobbyService() {
    const {showAlert} = useAlert();
    const { getToken } = useAuth(); 

    const navigate = useNavigate();
    const createNewRoom = async (newRoom, name) => {
        try{
            const token = await getToken();
            const response = await createRoom(newRoom, name, token);
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
        if(id){
            navigate(`/game/${id}`);
            showAlert("Joined successfully!", "success");
        }
    }
    const getAllRooms = useCallback(async (callback) => {
        try{
            const token = await getToken();
            const response = await getGames(token);
            callback(response.data);
        }catch(error){
            showAlert("Could not load rooms", "error");
        }
        
    },[getToken,showAlert]);
    const getAGame = useCallback(async (callback,id) => {
        try{
            const token = await getToken();
            const response = await getGame(id, token);
            callback(response.data);
        }catch(error){
            showAlert("Could not load game", "error");
        }
    },[getToken,showAlert]);
    return {createNewRoom, joinRoom, getAllRooms, getAGame};

}




