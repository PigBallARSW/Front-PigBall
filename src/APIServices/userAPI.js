import axios from "axios";

// Leer variables de entorno
const API = process.env.REACT_APP_API_USER_URL || process.env.REACT_APP_API_USER_URL_LOCAL || "https://backendeci.duckdns.org:8082";

export async function createUser(id, name) {
    try {
        const creatorName = name || "default";
        const endpoint = `${API}/users`;
        const requestBody = {
            id: id,
            username: creatorName
        };
        console.log(requestBody);
        const response = await axios.post(endpoint, requestBody);
        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export async function getUser(id) {
    try {
        const endpoint = `${API}/users/`;
        const response = await axios.get(endpoint + id);
        return response;
    } catch (error) {
        console.error("Error user user:", error);
        throw error;
    }
}
