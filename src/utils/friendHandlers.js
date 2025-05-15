export function createAddFriendHandler(playerId, sendFriendRequest, fetchFriends, setFriends, setSuggestions) {
  return async function handleAddFriend(id) {
    const onRequestSent = () => {
      updateSuggestions(id, setSuggestions);
      refreshFriends(fetchFriends, playerId, setFriends);
    };
    await sendFriendRequest(playerId, id, onRequestSent);
  };
}
const updateSuggestions = (userId, setSuggestions) => {
  setSuggestions(prev => prev.filter(u => u.id !== userId));
};
const refreshFriends = (fetchFriends, playerId, setFriends) => {
  fetchFriends(playerId, setFriends);
};
const removeFriendFromList = (userId, setFriends) => {
    setFriends(prev => prev.filter(u => u.id !== userId));
};
export function createRemoveFriendHandler(playerId, deleteFriend, setFriends) {
  return async function handleRemoveFriend(id) {
    const onFriendDeleted = () => {
      removeFriendFromList(id, setFriends);
    };
    await deleteFriend(playerId, id, onFriendDeleted);
  };
}

