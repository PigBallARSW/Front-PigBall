import axios from "axios";

const API = process.env.REACT_APP_API_USER_URL || process.env.REACT_APP_API_USER_URL_LOCAL || "https://piguser.duckdns.org:8082";

export async function getPotentialFriends(currentUserId, token, {
    search = "",
    pageNo = 0,
    pageSize = 10,
    sortBy = "username",
    sortDir = "asc"
} = {}) {
    try {
        const endpoint = `${API}/user/potential-friends/${currentUserId}`;
        const params = new URLSearchParams({
            search,
            pageNo,
            pageSize,
            sortBy,
            sortDir
        }).toString();

        const response = await axios.get(`${endpoint}?${params}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error getting potential friends:", error);
        throw error;
    }
}

export async function getFriends(userId, token) {
    try {
        const endpoint = `${API}/user/${userId}/friends`;
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error getting friends:", error);
        throw error;
    }
}

export async function addFriend(userId, friendId, token) {
    try {
        const endpoint = `${API}/user/${userId}/friends/${friendId}`;
        const response = await axios.post(endpoint, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error adding friend:", error);
        throw error;
    }
}

export async function removeFriend(userId, friendId, token) {
    try {
        const endpoint = `${API}/user/${userId}/friends/${friendId}`;
        const response = await axios.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error removing friend:", error);
        throw error;
    }
}
export async function createUser(id, name, token) {
    try {
        const creatorName = name || "default";
        const endpoint = `${API}/user`;
        const requestBody = {
            id: id,
            username: creatorName,
            image: "none",
            borderColor: "#ffffff",
            centerColor: "#ffc107",
            iconType: "none",
            iconColor: "#ffffff"
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
        const endpoint = `${API}/user/`;
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

export async function updateUserCharacter(id,username,image, centerColor, borderColor, iconColor, iconType, token) {
    try {
        const endpoint = `${API}/user/`;
        const requestBody = {
            username: username,
            image: image,
            centerColor: centerColor,
            borderColor: borderColor,
            iconColor: iconColor,
            iconType: iconType
        };
        const response = await axios.put(endpoint+id, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        return response;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export async function getUsersCharacters(users, token) {
    try {
        const endpoint = `${API}/user/summary`;
        const response = await axios.post(endpoint, users, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
        return response;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}
