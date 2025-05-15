export function createAddFriendHandler(playerId, sendFriendRequest, fetchFriends, setFriends, setSuggestions) {
  return async function handleAddFriend(id) {
    const onRequestSent = () => {
      updateSuggestions(id);
      refreshFriends();
    };

    const updateSuggestions = (userId) => {
      setSuggestions(prev => prev.filter(u => u.id !== userId));
    };

    const refreshFriends = () => {
      fetchFriends(playerId, setFriends);
    };

    await sendFriendRequest(playerId, id, onRequestSent);
  };
}

export function createRemoveFriendHandler(playerId, deleteFriend, setFriends) {
  return async function handleRemoveFriend(id) {
    const onFriendDeleted = () => {
      removeFriendFromList(id);
    };

    const removeFriendFromList = (userId) => {
      setFriends(prev => prev.filter(u => u.id !== userId));
    };

    await deleteFriend(playerId, id, onFriendDeleted);
  };
}

