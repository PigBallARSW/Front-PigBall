import { useAlert } from "../context/alert/AlertContext";
import { createUser, getUser } from "../APIServices/userAPI";
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
            console.log(error);
            showAlert("Could not Loggin", "error");
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
    
    return {createNewUser, getAUser};

}