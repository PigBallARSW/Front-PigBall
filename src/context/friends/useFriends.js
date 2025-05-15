import { useEffect, useState } from "react";
import { useUserLogin } from "../../Modules/useUserLogin";
import { useUser } from "../user/userContext";

export function useFriends () {
    const [friends, setFriends] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const {
        sendFriendRequest,
        fetchFriends,
        deleteFriend
      } = useUserLogin()
      const { playerData } = useUser()
    useEffect(() => {
        if (!playerData?.id) return
        fetchFriends(playerData.id, setFriends)
      }, [playerData, fetchFriends])
    
      const handleAddFriend = async (id) => {
        const sendRequest = (s) => {
          setSuggestions(s => s.filter(u => u.id !== id))
          fetchFriends(playerData.id, setFriends)
        }
        await sendFriendRequest(playerData.id, id, sendRequest)
      }
      const handleRemoveFriend = async (id) => {
        await deleteFriend(playerData.id, id, () => {
          setFriends(f => f.filter(u => u.id !== id))
        })
      }

    return {friends, suggestions, handleAddFriend, handleRemoveFriend, setSuggestions}

}