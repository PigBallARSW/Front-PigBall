import { useCallback, useEffect, useState } from "react";
import { getGame, getGames } from "../../APIServices/gameAPI";


export function useWaitingRoom (id) {
    const [roomData, setRoomData] = useState({
        lobbyName: "",
        creatorName: "",
        maxPlayers: 0,
        privateLobby: false,
        creationTime: 0,
        players: []
      });
      const getRoom = useCallback(async () => {
        if (id) {
          const response = await getGame(id); 
          if (response) {
            setRoomData(response.data);
          }
        }
      }, [] );
      useEffect(() => {
        getRoom();
      },[getRoom]);

      return{roomData}

}