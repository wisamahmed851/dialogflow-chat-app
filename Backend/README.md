# Backend — NestJS WebSocket + Dialogflow ES Server

NestJS server that acts as the real-time bridge between the React chat frontend and Google Dialogflow ES. It exposes a Socket.io WebSocket gateway, receives user messages, forwards them to Dialogflow ES via the REST API, and emits the bot response back to the connected client.

---

## Features

- **WebSocket Gateway** — persistent, low-latency connection with the frontend using Socket.io
- **Dialogflow ES Integration** — sends user messages to Dialogflow and parses intent responses
- **Modular Architecture** — chat logic, Dialogflow service, and gateway are cleanly separated
- **Environment-based Config** — credentials and project IDs managed via `@nestjs/config`, never hardcoded
- **Error Handling** — graceful handling of WebSocket disconnects, Dialogflow API failures, and malformed payloads

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS (Express adapter) |
| Real-time | Socket.io (`@nestjs/websockets`) |
| Dialogflow | `@google-cloud/dialogflow` |
| Config | `@nestjs/config` |
| Language | TypeScript |

---

## Prerequisites

- **Node.js** v18 or above
- **npm** v9 or above
- A **Google Cloud project** with Dialogflow ES API enabled
- A **Dialogflow ES Agent** already created
- A **Service Account JSON key** file downloaded from Google Cloud Console

---

## Project Structure

```
backend/
├── src/
│   ├── chat/
│   │   ├── services/
│   │   │   ├── chat.service.ts        # Core chat business logic
│   │   │   └── dialogflow.service.ts  # Dialogflow REST API integration
│   │   ├── chat.gateway.ts            # Socket.io WebSocket gateway
│   │   └── chat.module.ts             # Chat module — wires gateway + services
│   ├── app.controller.ts              # Root HTTP controller (health check)
│   ├── app.module.ts                  # Root module — imports ChatModule
│   ├── app.service.ts                 # Root service
│   └── main.ts                        # Bootstrap — sets port, CORS, Socket.io
├── .env                               # Local env vars (never commit)
├── .env.example                       # Safe template to share with the team
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

---

## Environment Configuration

Create a `.env` file in the `backend/` root. Use `.env.example` as the template:

```bash
cp .env.example .env
```

Then fill in your values:

```env
# NestJS
PORT=3000

# Google Dialogflow ES
DIALOGFLOW_PROJECT_ID=your-dialogflow-project-id
DIALOGFLOW_KEY_FILE=./your-credentials-file.json

# CORS — origin of your React frontend
CORS_ORIGIN=http://localhost:5173
```

`.env.example` (safe to commit — no real values):

```env
PORT=3000
DIALOGFLOW_PROJECT_ID=
DIALOGFLOW_KEY_FILE=./your-credentials-file.json
CORS_ORIGIN=http://localhost:5173
```

---

## Installation

```bash
# From the backend/ directory
npm install
```

---

## Running Locally

```bash
# Development (watch mode — restarts on file changes)
npm run start:dev

# Standard start
npm run start
```

Server starts on **http://localhost:3000** by default (or the `PORT` in your `.env`).

The WebSocket gateway is available at the same address — the React frontend connects to it via Socket.io.

---

## Build Commands

```bash
# Compile TypeScript to dist/
npm run build

# Run the compiled production build
npm run start:prod
```

---

## Production Deployment

1. Run `npm run build` to compile to `dist/`
2. Set all environment variables on your hosting platform (Railway, Render, Fly.io, etc.)
3. Upload or copy the `dist/` folder and `node_modules/` to the server
4. Start with `node dist/main.js` or `npm run start:prod`

> **Important:** Never deploy the Dialogflow JSON credentials file directly to a public server. Use environment variable injection or a secrets manager (e.g. Google Secret Manager, Railway secrets) in production instead.

---

## API / WebSocket Events

### HTTP Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Health check — returns `"Server is running"` |

### WebSocket Events (Socket.io)

| Direction | Event | Payload | Description |
|---|---|---|---|
| Client → Server | `message` | `{ text: string, sessionId: string }` | User sends a chat message |
| Server → Client | `botResponse` | `{ text: string, quickReplies?: string[] }` | Dialogflow reply sent back to client |
| Server → Client | `error` | `{ message: string }` | Emitted if Dialogflow call fails |

---

## Dialogflow ES Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project
2. Enable the **Dialogflow ES API** for that project
3. Open [Dialogflow ES Console](https://dialogflow.cloud.google.com/) and create a new agent linked to that project
4. Add **Intents** to train the bot (e.g. flight booking, greetings, fallback)
5. In Google Cloud Console → **IAM & Admin** → **Service Accounts**, create a service account with the `Dialogflow API Client` role
6. Generate a JSON key for that service account and download it
7. Place the JSON file in the `backend/` root directory
8. Set `DIALOGFLOW_KEY_FILE` in your `.env` to the relative path of that file (e.g. `./testbot-tsgl-d460f5b1d2a5.json`)
9. Set `DIALOGFLOW_PROJECT_ID` to your Google Cloud project ID

---

## Security Notes

> **Read carefully before pushing to GitHub.**

- **The Dialogflow credentials JSON file must never be committed to the repository.** It contains a private key that grants full access to your Google Cloud project.
- Ensure the credentials filename is listed in `.gitignore`:
  ```
  # .gitignore
  *.json
  !package.json
  !tsconfig.json
  !tsconfig.build.json
  !nest-cli.json
  .env
  ```
  Or be explicit:
  ```
  testbot-tsgl-d460f5b1d2a5.json
  .env
  ```
- **Never commit `.env`** — only commit `.env.example` with empty values
- Rotate your service account key immediately if it is accidentally pushed to a public repo

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Error: Could not load the default credentials` | `DIALOGFLOW_KEY_FILE` path is wrong or the file doesn't exist |
| CORS error from frontend | Make sure `CORS_ORIGIN` matches the exact frontend URL including port |
| Port already in use | Change `PORT` in `.env` and update `VITE_SOCKET_URL` in the frontend `.env` |
| Socket connects but no bot reply | Check the NestJS terminal for Dialogflow API errors; verify `DIALOGFLOW_PROJECT_ID` is correct |
| `Cannot find module '@google-cloud/dialogflow'` | Run `npm install` again from the `backend/` directory |

---

## Related

- `../frontend/` — React chat UI
- `../README.md` — Full project overview and combined setup guide