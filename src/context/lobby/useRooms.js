import { useCallback, useEffect, useState } from "react";
import { useLobbyService } from "../../Modules/useLobbyService";


export function useRooms () {
    const [rooms, setRooms] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {getAllRooms} = useLobbyService();
    const func = useCallback((response) => {
        setRooms(response);
        setIsRefreshing(false);
    }, []);
    const getRooms = useCallback(() => {
        setIsRefreshing(true);
        getAllRooms(func);
    }, [getAllRooms, func]);
    useEffect(() => {
        getRooms();
    }, [getRooms]); 

    return {rooms, isRefreshing, getRooms};

}