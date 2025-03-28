import axios from "axios";

// Leer variables de entorno

const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_LOCAL;

export async function createRoom(newRoom, playerName) {

    try {
        const creatorName = playerName || "default";
        const endpoint = `${API}/createGame`;

        const requestBody = {
            gameName: newRoom.name,
            creatorName: creatorName,
            maxPlayers: newRoom.maxPlayers,
            isPrivate: newRoom.isPrivate
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
        const endpoint = `${API}/getAllGames`;
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
