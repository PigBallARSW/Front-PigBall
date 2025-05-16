import _ from "lodash";

export function handlePlayersMessage(setGameState, setGameStarted,setLoadingRoom) {
  return (message) => {
    const body = JSON.parse(message.body);
    setGameState(body);
    setLoadingRoom(false)
    if (body.startTime !== null) setGameStarted(true);
  };
}

export function handleStartedMessage(setGameState, setGameStarted, setLoading) {
  return (message) => {
    setLoading(false);
    setGameState(JSON.parse(message.body));
    setGameStarted(true);
  };
}

export function handlePlayMessage(setPlayers, setBall, messageCountRef, signalFramesReached, FRAME_RATE) {
  return (message) => {
    const data = JSON.parse(message.body);
    setPlayers((prev) => (_.isEqual(prev, data.players) ? prev : data.players));
    setBall((prev) => (_.isEqual(prev, data.ball) ? prev : data.ball));

    messageCountRef.current += 1;
    if (messageCountRef.current >= FRAME_RATE) {
      signalFramesReached();
      messageCountRef.current = 0;
    }
  };
}

export function handleGoalMessage(setGameState, addGoal) {
  return (message) => {
    const newState = JSON.parse(message.body);
    setGameState((prev) => (_.isEqual(prev, newState) ? prev : newState));
    addGoal(newState);
  };
}

export function subscribeToTopics(client, id, handlers) {
  client.subscribe(`/topic/players/${id}`, handlers.players);
  client.subscribe(`/topic/started/${id}`, handlers.started);
  client.subscribe(`/topic/play/${id}`, handlers.play);
  client.subscribe(`/topic/goal/${id}`, handlers.goal);
}
