import { useEffect } from "react";
import { useUserLogin } from "../../Modules/useUserLogin";
import { useUser } from "../user/userContext";

export function useFilterFriends (setSuggestions, query, tab) {
      const {
         getFriendSuggestions,
       } = useUserLogin()
       const { playerData } = useUser()
     useEffect(() => {
         if (!playerData?.id || tab !== 0) return;
         if (!playerData?.id) return
         const timeout = setTimeout(() => {
           getFriendSuggestions(playerData.id, { search: query })
             .then(setSuggestions)
             .catch(() => setSuggestions([]))
         }, 500)
         return () => clearTimeout(timeout)
       }, [query, playerData, getFriendSuggestions, tab])


}