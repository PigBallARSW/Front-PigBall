
import axios from "axios";


// Leer variables de entorno
const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_LOCAL || "https://d7iyb9ibte.execute-api.us-east-1.amazonaws.com/v1";

export async function createRoom(newRoom, playerName, token) {
    try {

        const creatorName = playerName || "default";
        const endpoint = `${API}/lobby`;
        const requestBody = {
            lobbyName: newRoom.name,
            creatorName: creatorName,
            maxPlayers: newRoom.maxPlayers,
            privateLobby: newRoom.isPrivate
        };
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        return response;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
}

export async function getGames(token) {
    try {
        const endpoint = `${API}/lobby`;
        const response = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response;
    } catch (error) {
        console.error("Error getting games:", error);
        throw error;
    }
}

export async function getGame(id,token) {
    try {
        const endpoint = `${API}/lobby/${id}`;
        const response = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response;
    } catch (error) {
        console.error("Error getting games:", error);
        throw error;
    }
}

export async function finishGame(id,token) {
    try {
        const endpoint = `${API}/lobby/${id}`;
        const response = await axios.delete(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response;
    } catch (error) {
        console.error("Error deleting game:", error);
        throw error;
    }
}