# SkyBot Chat Widget — Integration Notes

## 1. Install the one new dependency
```
npm install socket.io-client
```

## 2. Environment variable
Copy `.env.example` to `.env` and point it at your NestJS gateway:
```
REACT_APP_SOCKET_URL=http://localhost:3001
```

## 3. Tailwind config
If Tailwind isn't installed in this CRA project yet:
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
and set `content: ['./src/**/*.{js,jsx}']` in `tailwind.config.js`.

Either way, merge this into your `tailwind.config.js` under `theme.extend` (don't overwrite the whole file — just add these keys):
```js
theme: {
  extend: {
    colors: {
      ink: '#0B1220',
    },
    fontFamily: {
      mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
    },
    keyframes: {
      flap: {
        '0%': { transform: 'rotateX(-90deg)', opacity: '0.3' },
        '60%': { transform: 'rotateX(10deg)', opacity: '1' },
        '100%': { transform: 'rotateX(0deg)', opacity: '1' },
      },
      'message-in': {
        '0%': { opacity: '0', transform: 'translateY(6px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      flap: 'flap 0.18s ease-out',
      'message-in': 'message-in 0.2s ease-out',
    },
  },
},
```

## 4. Global CSS
Add this line to the very top of `src/index.css`, above your `@tailwind` directives:
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap');
```

## 5. Mount the widget
In `src/App.js`:
```jsx
import ChatWidget from './components/ChatBot/ChatWidget';

function App() {
  return (
    <div>
      {/* your existing app */}
      <ChatWidget />
    </div>
  );
}
```
Want a full-page chat instead of a floating launcher? Render `<ChatBot />` directly inside a container with an explicit size, e.g. `<div className="h-screen p-4"><ChatBot /></div>`.

## 6. Socket event contract — your NestJS gateway needs to speak this
```
client -> server   "sendMessage"     { message: string, sessionId: string }
server -> client   "receiveMessage"  { message: string, timestamp?: string }
server -> client   "botTyping"       boolean   (optional, while Dialogflow is processing)
```
Also enable CORS on the Nest side or the browser will refuse the connection and the widget will sit on "Offline" forever, e.g.:
```ts
@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
```

## 7. Testing before the backend exists
You can smoke-test the UI with a throwaway 10-line Node + socket.io echo server before the NestJS gateway is ready — say the word and I'll write one.

## Design notes
Boarding-pass theme: dark "ink" header, dashed ticket-perforation divider, monospace departure-board type for labels/timestamps, amber accent, teal user bubbles. The typing indicator is a tiny split-flap board (3 flipping letters) instead of generic dots, as a nod to the airport departure boards this bot is themed around. Quick-reply labels in `QuickReplies.jsx` are placeholders — rename their `value` strings to match your actual trained Dialogflow intents/phrases.
