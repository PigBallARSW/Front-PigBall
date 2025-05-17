import axios from "axios";

const API = process.env.REACT_APP_API_USER_URL || process.env.REACT_APP_API_USER_URL_LOCAL || "https://d7iyb9ibte.execute-api.us-east-1.amazonaws.com/v1";

export async function getPotentialFriends(currentUserId, token, {
    search = "",
    pageNo = 0,
    pageSize = 10,
    sortBy = "username",
    sortDir = "asc"
} = {}) {
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
}

export async function getFriends(userId, token) {
    const endpoint = `${API}/user/${userId}/friends`;
    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export async function addFriend(userId, friendId, token) {
    const endpoint = `${API}/user/${userId}/friends/${friendId}`;
    const response = await axios.post(endpoint, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export async function removeFriend(userId, friendId, token) {
    const endpoint = `${API}/user/${userId}/friends/${friendId}`;
    const response = await axios.delete(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}
export async function createUser(id, name, token) {
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
}
export async function sendStats(data, token) {
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
}
export async function getUser(id, token) {
    const endpoint = `${API}/user/`;
    const response = await axios.get(endpoint + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response;
}

export async function updateUserCharacter(id,customizations, token) {
    const endpoint = `${API}/user/`;
    const response = await axios.put(endpoint+id, customizations, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response;
}

export async function getUsersCharacters(users, token) {
    const endpoint = `${API}/user/summary`;
    const response = await axios.post(endpoint, users, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    return response;
}
