import { useNavigate } from "react-router-dom";
import { createRoom, getGame, getGames, finishGame } from "../APIServices/gameAPI";
import { useAlert } from "../context/alert/AlertContext";
import { useCallback } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { useUserLogin } from "./useUserLogin"
export function useLobbyService() {
    const {showAlert} = useAlert();
    const { getToken } = useAuth(); 
    const {sendStatsUser} = useUserLogin();
    const navigate = useNavigate();
    const finishRoom = useCallback(async (id) => {
        try {
            const token = await getToken();
            const response = await finishGame(id, token);
            await sendStatsUser(response.data);
        } catch (error) {
        }
    }, [getToken, navigate, sendStatsUser]);
    
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
        const func = (response) => {
            const id = response.id;
            navigate(`/game/${id}`);
            showAlert("Joined successfully!", "success");
        }
       getAGame(func, id);
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
    const getAGame = useCallback(async (callback, id) => {
        try{
            const response = await getGame(id);
            callback(response.data);
        }catch(error){
            showAlert("Could not load game", "error");
        }
    },[showAlert]);

    return {createNewRoom, joinRoom, getAllRooms, getAGame, finishRoom};

}




