import axios from "axios";

const API = "https://localhost:8080";

export async function createRoom(newRoom) {
    try {
        const endpoint = `${API}/createGame/${newRoom.name}/default_user`;
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
