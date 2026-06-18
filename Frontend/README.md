# Frontend — Real-time Dialogflow Chat UI

React-based chat interface that communicates with the NestJS WebSocket server in real time. Users type messages into the chat panel; the frontend forwards them over a Socket.io connection and renders the Dialogflow bot responses as they arrive.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Real-time | Socket.io-client |
| Styling | CSS Modules (ChatBot.css) |
| State / Side-effects | Custom hook — `useChatSocket` |

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── Components/
│   │   └── ChatBot/
│   │       ├── Widgets/
│   │       │   ├── BotAvatar.jsx        # Bot avatar icon
│   │       │   ├── ChatMessage.jsx      # Single message bubble
│   │       │   ├── ChatWidget.jsx       # Full chat window layout
│   │       │   ├── icons.jsx            # Shared SVG icons
│   │       │   ├── QuickReplies.jsx     # Suggestion chip buttons
│   │       │   ├── TypingIndicator.jsx  # Animated "bot is typing" dots
│   │       │   └── ChatBot.css          # All chat styles
│   │       └── ChatBot.jsx              # Root chatbot component
│   ├── hooks/
│   │   └── useChatSocket.js             # Socket.io connection + message state
│   ├── services/
│   │   └── socket.js                    # Socket.io client instance
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
└── INTEGRATION_NOTES.md
```

---

## Prerequisites

- **Node.js** v18 or above
- **npm** v9 or above
- The NestJS backend server must be running before starting the frontend

---

## Environment Variables

Create a `.env` file in the `frontend/` root (copy from `.env.example` if provided):

```env
# URL of the NestJS WebSocket gateway — no trailing slash
VITE_SOCKET_URL=http://localhost:3000
```

> **Note:** This project uses Vite. Only variables prefixed with `VITE_` are exposed to the browser. The `REACT_APP_SOCKET_URL` variable in the file is a legacy CRA reference and is not used.

---

## Installation

```bash
# From the frontend/ directory
npm install
```

---

## Running the Development Server

```bash
npm run dev
```

Vite starts on **http://localhost:5173** by default.  
Open that URL in your browser to see the chat interface.

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Serve it with any static file host or:

```bash
npm run preview
```

---

## How It Works

1. On mount, `useChatSocket.js` initialises a Socket.io client pointed at `VITE_SOCKET_URL`.
2. The user types a message and hits Send — `ChatWidget.jsx` calls the hook's `sendMessage` function.
3. The hook emits a `message` event to the NestJS WebSocket gateway.
4. While waiting for the response, `TypingIndicator.jsx` is displayed.
5. The server emits a `botResponse` event back with the Dialogflow reply.
6. The hook appends the bot message to state and the chat panel re-renders.

---

## Key Files Explained

| File | Responsibility |
|---|---|
| `services/socket.js` | Creates and exports the single Socket.io client instance |
| `hooks/useChatSocket.js` | Manages connection lifecycle, outgoing messages, and incoming bot responses |
| `Components/ChatBot/ChatBot.jsx` | Composes the full chat UI and connects to the hook |
| `Widgets/ChatWidget.jsx` | Renders the scrollable message list and input bar |
| `Widgets/ChatMessage.jsx` | Renders an individual user or bot message bubble |
| `Widgets/QuickReplies.jsx` | Renders Dialogflow suggestion chips if the response includes them |
| `utils/chatHelpers.js` | Normalises message payloads and formats timestamps |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Blank screen / no connection | Make sure the backend is running and `VITE_SOCKET_URL` matches its port |
| CORS error in console | Add the Vite dev server origin (`http://localhost:5173`) to the NestJS CORS config |
| Messages sent but no reply | Check the backend terminal for Dialogflow credential errors |
| Socket connects then immediately disconnects | Confirm Socket.io versions match between frontend (`socket.io-client`) and backend (`@nestjs/platform-socket.io`) |

---

## Related

- `../backend/` — NestJS WebSocket server + Dialogflow integration
- `../README.md` — Full project overview and combined setup guide