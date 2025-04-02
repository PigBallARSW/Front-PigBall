import { useCallback, useEffect, useState } from "react";
import { getGames } from "../../APIServices/gameAPI";


export function useRooms () {
    const [rooms, setRooms] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const getRooms = useCallback(async () => {
        setIsRefreshing(true);
        const response = await getGames();
        if(response){
            setRooms(response.data);
            setIsRefreshing(false);
        }
    }, []);
    useEffect(() => {
        getRooms();
    }, [getRooms]); 

    return {rooms, isRefreshing, getRooms};

}