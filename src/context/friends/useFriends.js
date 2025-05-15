import { useEffect, useState } from "react";
import { useUserLogin } from "../../Modules/useUserLogin";
import { useUser } from "../user/userContext";
import {
  createAddFriendHandler,
  createRemoveFriendHandler
} from "../../utils/friendHandlers"; 

export function useFriends() {
  const [friends, setFriends] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { sendFriendRequest, fetchFriends, deleteFriend } = useUserLogin();
  const { playerData } = useUser();

  useEffect(() => {
    if (!playerData?.id) return;
    fetchFriends(playerData.id, setFriends);
  }, [playerData, fetchFriends]);

  const handleAddFriend = createAddFriendHandler(
    playerData?.id,
    sendFriendRequest,
    fetchFriends,
    setFriends,
    setSuggestions
  );

  const handleRemoveFriend = createRemoveFriendHandler(
    playerData?.id,
    deleteFriend,
    setFriends
  );

  return {
    friends,
    suggestions,
    handleAddFriend,
    handleRemoveFriend,
    setSuggestions
  };
}
