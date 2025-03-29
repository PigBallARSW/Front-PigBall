
import axios from "axios";

// Leer variables de entorno


const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_LOCAL;

export async function createRoom(newRoom, playerName) {

    try {
        const creatorName = playerName || "default";
        const endpoint = `${API}/lobby`;

        const requestBody = {
            lobbyName: newRoom.name,
            creatorName: creatorName,
            maxPlayers: newRoom.maxPlayers,
            privateLobby: newRoom.isPrivate
        };
        const response = await axios.post(endpoint, requestBody);
        return response;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
}

export async function getGames() {
    try {
        console.log(API);
        const endpoint = `${API}/lobby`;
        const response = await axios.get(endpoint);
        return response;
    } catch (error) {
        console.error("Error getting games:", error);
        throw error;
    }
}

export async function getGame(id) {
    try {
        console.log(id);
        const endpoint = `${API}/getGame/${id}`;
        const response = await axios.get(endpoint);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error getting games:", error);
        throw error;
    }
}
