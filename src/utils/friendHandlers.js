export function createAddFriendHandler(playerId, sendFriendRequest, fetchFriends, setFriends, setSuggestions) {
  return async function handleAddFriend(id) {
    const sendRequest = () => {
      setSuggestions(prev => prev.filter(u => u.id !== id));
      fetchFriends(playerId, setFriends);
    };
    await sendFriendRequest(playerId, id, sendRequest);
  };
}

export function createRemoveFriendHandler(playerId, deleteFriend, setFriends) {
  return async function handleRemoveFriend(id) {
    await deleteFriend(playerId, id, () => {
      setFriends(prev => prev.filter(u => u.id !== id));
    });
  };
}
