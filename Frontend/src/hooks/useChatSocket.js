import { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '../services/socket';

// getting the session id from the local storage
function getSessionId() {
  const existing = sessionStorage.getItem('skybotSessionId');

  if (existing) return existing;

  const id = crypto.randomUUID();

  sessionStorage.setItem('skybotSessionId', id);

  return id;;
}
// main socket connection and chatting function
export default function useChatSocket() {
  const sessionIdRef = useRef(getSessionId());

  const [status, setStatus] = useState('connecting');
  const [botTyping, setBotTyping] = useState(false);

  const [message, setMessage] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! Welcome to SkyBot ✈️',
      timestamp: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log("Socket Connected");
      setStatus('online');
    });

    socket.on('disconnect', () => {
      setStatus("offline");
    });

    socket.on('reciveMessage', (payload) => {
      console.log("Bot Reply", payload);

      setBotTyping(false);

      setMessage((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: payload.message,
          timestamp: payload.timestamp,
        },
      ]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('reciveMessage');
    };
  }, []);

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim();

    if (!trimmed) return;

    setMessage((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmed,
        timestamp: new Date().toISOString(),
      },
    ]);

    setBotTyping(true);

    socket.emit('sendMessage', {
      message: trimmed,
      sessionId: sessionIdRef.current,
    });
  }, []);

  return {
    status,
    message,
    botTyping,
    sendMessage,
  };
}