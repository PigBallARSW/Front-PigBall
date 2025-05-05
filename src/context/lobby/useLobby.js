import { useEffect, useState } from "react";


export function useLobby (rooms) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRooms, setFilteredRooms] = useState([]);
    useEffect(() => {
        const filtered = rooms.filter(
        (room) =>
            room.lobbyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.creatorName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRooms(filtered); 
    }, [searchTerm, rooms]); 

    return {filteredRooms, searchTerm, setSearchTerm}

}