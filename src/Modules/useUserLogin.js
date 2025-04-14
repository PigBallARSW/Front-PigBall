import { useAlert } from "../context/alert/AlertContext";
import { createUser, getUser } from "../APIServices/userAPI";
import { useCallback } from "react";

export function useUserLogin() {
    const {showAlert} = useAlert();
    const createNewUser = useCallback(async (id, name, callback) => {
        try{
            const response = await createUser(id, name);
            callback(response.data);
            showAlert("Welcome "+name, "success");    
        }catch(error){
            console.log(error);
            showAlert("Could not Loggin", "error");
        }
    },[showAlert]);
    const getAUser = useCallback(async (id, callback) => {
        try{
            const response = await getUser(id);
            callback(response.data);
            showAlert("Welcome back! "+response.data.username, "success"); 
            return true;
        }catch(error){
            return false;
        }
        
    },[showAlert]);
    
    return {createNewUser, getAUser};

}