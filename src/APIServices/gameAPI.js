import axios from "axios";

// Leer variables de entorno

//const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_LOCAL;
const API = "https://localhost:8081";

export async function createRoom(newRoom, playerName) {

    try {
        const creatorName = playerName || "default";
        const endpoint = `${API}/lobby`;

        const requestBody = {
            gameName: newRoom.name,
            creatorName: creatorName,
            maxPlayers: newRoom.maxPlayers,
            isPrivate: newRoom.isPrivate
        };

        const response = await axios.post(endpoint, requestBody);

        console.log(response.status);
        return response;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
}

export async function getGames() {
    try {
        const endpoint = `${API}/lobby`;
        const response = await axios.get(endpoint);
        console.log(response.status);
        return response;
    } catch (error) {
        console.error("Error getting games:", error);
        throw error;
    }
}
