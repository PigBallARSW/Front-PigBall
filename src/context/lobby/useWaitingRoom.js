import { useEffect, useState } from "react";
import { useLobbyService } from "../../Modules/useLobbyService";


export function useWaitingRoom (id) {
    const [roomData, setRoomData] = useState({
        lobbyName: "",
        creatorName: "",
        maxPlayers: 0,
        privateLobby: false,
        creationTime: 0,
        players: []
      });
      const {getAGame} = useLobbyService();
      const func = (response) => {
        setRoomData(response);
      }
      useEffect(() => {
        getAGame(func, id);
      },[getAGame, id]);

      return{roomData}

}