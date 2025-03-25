import axios from "axios";

// Leer variables de entorno

const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_LOCAL;

export async function createRoom(newRoom, playerName) {

    try {
        const creatorName = playerName || "default";
        const endpoint = `${API}/createGame/${newRoom.name}/${creatorName}`;
        const queryParams = `?maxPlayers=${newRoom.maxPlayers}&isPrivate=${newRoom.isPrivate}`;
        const response = await axios.post(endpoint + queryParams);
        console.log(response.status);
        return response;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
}

export async function getGames() {
    try {
        const endpoint = `${API}/getAllGames`;
        const response = await axios.get(endpoint);
        console.log(response.status);
        return response;
    } catch (error) {
        console.error("Error getting games:", error);
        throw error;
    }
}
