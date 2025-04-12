import { useAlert } from "../context/alert/AlertContext";
import { useCallback } from "react";
import { createUser, getUser } from "../APIServices/userAPI";

export function useUserLogin() {
    const {showAlert} = useAlert();
    const createNewUser = async (id, name, callback) => {
        try{
            const response = await createUser(id, name);
            callback(response.data);
            showAlert("Welcome "+name, "success");    
        }catch(error){
            console.log(error);
            showAlert("Could not Loggin", "error");
        }
    }
    const getAUser = async (id, callback) => {
        try{
            const response = await getUser(id);
            callback(response.data);
            showAlert("Welcome back! "+response.data.username, "success"); 
            return true;
        }catch(error){
            return false;
        }
        
    }
    
    return {createNewUser, getAUser};

}