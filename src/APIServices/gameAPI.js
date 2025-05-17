
import axios from "axios";


// Leer variables de entorno
const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_LOCAL || "https://piglobby.duckdns.org:8081";

export async function createRoom(newRoom, playerName, token) {
    const creatorName = playerName || "default";
    const endpoint = `${API}/lobby`;
    console.log(newRoom)
    const requestBody = {
        lobbyName: newRoom.name,
        creatorName: creatorName,
        maxPlayers: newRoom.maxPlayers,
        privateLobby: newRoom.isPrivate,
        style: newRoom.style
    };
    const response = await axios.post(endpoint, requestBody, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response;
}

export async function getGames(token) {
    const endpoint = `${API}/lobby`;
    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response;
}

export async function getGame(id,token) {
    const endpoint = `${API}/lobby/${id}`;
    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response;
}

export async function finishGame(id,token) {
    const endpoint = `${API}/lobby/${id}`;
    const response = await axios.delete(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response;
}