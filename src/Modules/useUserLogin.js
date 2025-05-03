import { useAlert } from "../context/alert/AlertContext";
import { createUser, getUser, sendStats, updateUserCharacter } from "../APIServices/userAPI";
import { useCallback } from "react";
import { useAuth } from "../context/auth/AuthContext";


export function useUserLogin() {
    const {showAlert} = useAlert();
    const { getToken } = useAuth(); 

    const createNewUser = useCallback(async (id, name, callback) => {
        try{
            const token = await getToken();
            const response = await createUser(id, name, token);
            callback(response.data);
            showAlert("Welcome "+name, "success");    
        }catch(error){
            showAlert("Could not Loggin", "error");
        }
    },[getToken,showAlert]);
    
    const sendStatsUser = useCallback(async (stats, callback) => {
        try{
            const token = await getToken();
            const response = await sendStats(stats, token);
            callback(response);
        }catch(error){
            showAlert("Could not sendStats", "error");
        }
    },[getToken,showAlert]);
    
    const getAUser = useCallback(async (id, callback) => {
        try{
            const token = await getToken();
            const response = await getUser(id,token);
            callback(response.data);
            showAlert("Welcome back! "+response.data.username, "success"); 
            return true;
        }catch(error){
            return false;
        }
        
    },[getToken,showAlert]);

    const updateCharacter = useCallback(async (id,username,image, centerColor, borderColor, iconColor, iconType, callback) => {
        try{
            const token = await getToken();
            const response = await updateUserCharacter(id,username,image, centerColor, borderColor, iconColor,iconType,token);
            callback(response.data);
            showAlert("Character updated successfully!","success"); 
        }catch(error){
            showAlert("Could not update character", "error");
        }
        
    },[getToken,showAlert]);
    
    return {createNewUser, getAUser, sendStatsUser,updateCharacter};
}