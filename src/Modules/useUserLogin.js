import { useAlert } from "../context/alert/AlertContext";
import { 
    createUser, 
    getUser, 
    getUsersCharacters, 
    sendStats, 
    updateUserCharacter,
    getPotentialFriends,
    getFriends,
    addFriend,
    removeFriend } from "../APIServices/userAPI";
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
            console.error("Could not Loggin: ", error);
            showAlert("Could not Loggin", "error");
        }
    },[getToken,showAlert]);
    
    const sendStatsUser = useCallback(async (stats, callback) => {
        try{
            const token = await getToken();
            await sendStats(stats, token);
        }catch(error){
            console.error("Could not sendStats: ", error);
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
            console.error("Could not get user: ", error);
            return false;
        }
        
    },[getToken,showAlert]);

    const updateCharacter = useCallback(async (id,requestBody, callback) => {
        try{
            const token = await getToken();
            const response = await updateUserCharacter(id,requestBody,token);
            callback(response.data);
            showAlert("Character updated successfully!","success"); 
        }catch(error){
            console.error("Could not update character: ", error);
            showAlert("Could not update character", "error");
        }
        
    },[getToken,showAlert]);

    const usersCharacters = useCallback(async (users) => {
        try{
            const token = await getToken();
            const response = await getUsersCharacters(users,token);
            return response.data 
        }catch(error){
            console.error("Could not get character: ", error);
            showAlert("Could not get character", "error");
        }
        
    },[getToken,showAlert]);

    const getFriendSuggestions = useCallback(async (userId, params = {}) => {
    try {
        const token = await getToken();
        const response = await getPotentialFriends(userId, token, params);
        return response.data.users;
    } catch (error) {
        console.error("Could not fetch friend suggestions: ", error);
        showAlert("Could not fetch friend suggestions", "error");
        return [];
    }
    }, [getToken, showAlert]);

    const fetchFriends = useCallback(async (userId, callback) => {
        try {
            const token = await getToken();
            const response = await getFriends(userId, token);
            callback(response.data.users);
        } catch (error) {
            console.error("Could not fetch friends: ", error);
            showAlert("Could not fetch friends", "error");
        }
    }, [getToken, showAlert]);

    const sendFriendRequest = useCallback(async (userId, friendId, callback) => {
        try {
            const token = await getToken();
            const response = await addFriend(userId, friendId, token);
            callback?.(response.data);
            showAlert("Friend added successfully!", "success");
        } catch (error) {
            console.error("Could not add friend: ", error);
            showAlert("Could not add friend", "error");
        }
    }, [getToken, showAlert]);

    const deleteFriend = useCallback(async (userId, friendId, callback) => {
        try {
            const token = await getToken();
            const response = await removeFriend(userId, friendId, token);
            callback?.(response.data);
            showAlert("Friend removed successfully!", "success");
        } catch (error) {
            console.error("Could not remove friend: ", error);
            showAlert("Could not remove friend", "error");
        }
    }, [getToken, showAlert]);
    
    return {
        createNewUser,
        getAUser,
        sendStatsUser,
        updateCharacter,
        usersCharacters,
        getFriendSuggestions,
        fetchFriends,
        sendFriendRequest,
        deleteFriend
    };
}