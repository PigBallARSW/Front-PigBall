import axios from "axios";

const API = process.env.REACT_APP_API_USER_URL || process.env.REACT_APP_API_USER_URL_LOCAL || "https://d7iyb9ibte.execute-api.us-east-1.amazonaws.com/v1";

export async function createUser(id, name, token) {
    try {
        const creatorName = name || "default";
        const endpoint = `${API}/users`;
        const requestBody = {
            id: id,
            username: creatorName
        };
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}
export async function sendStats(data, token) {
    try {
        console.log(data)
        const endpoint = `${API}/user/stats`;
        const requestBody = {
            stats: data.events,
            players: data.players
        };
        const response = await axios.put(endpoint, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        return response;
    } catch (error) {
        console.error("Error sending stats:", error);
        throw error;
    }
}
export async function getUser(id, token) {
    try {
        const endpoint = `${API}/users/`;
        const response = await axios.get(endpoint + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        return response;
    } catch (error) {
        console.error("Error user user:", error);
        throw error;
    }
}
