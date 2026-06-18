# Real-time Chat Application — Google Dialogflow ES + WebSocket

A full-stack real-time chat application built as part of a technical evaluation. The system connects a React chat interface to a Google Dialogflow ES bot through a NestJS WebSocket server, enabling seamless real-time conversational interactions.

---

## Architecture Overview

```
┌─────────────────────┐        WebSocket        ┌──────────────────────────┐        HTTPS        ┌────────────────┐
│     Frontend        │  ◄──────────────────►   │        Backend           │  ◄────────────────► │  Dialogflow ES │
│     (React)         │      Socket.io           │       (NestJS)           │    REST API         │  (Google Cloud)│
│                     │                          │                          │                     │                │
│  - Chat UI          │                          │  - WebSocket Gateway     │                     │  - NLP Engine  │
│  - Socket.io client │                          │  - Dialogflow Service    │                     │  - Intents     │
│  - Message display  │                          │  - Chat Service          │                     │  - Entities    │
└─────────────────────┘                          └──────────────────────────┘                     └────────────────┘
```

**Flow:**
1. User types a message in the React chat UI
2. Frontend emits it to the NestJS server over a Socket.io WebSocket connection
3. NestJS forwards the message to Dialogflow ES via HTTPS REST API
4. Dialogflow processes the message and returns an intent response
5. NestJS emits the response back to the frontend over WebSocket
6. React renders the bot reply in the chat panel

---

## Repository Structure

```
project-root/
├── frontend/                  # React chat UI (Vite)
│   ├── src/
│   └── README.md              # Frontend setup guide
│
├── backend/                   # NestJS WebSocket + Dialogflow server
│   ├── src/
│   └── README.md              # Backend setup guide
│
├── dialogflow-export.zip      # Exported Dialogflow ES agent
└── README.md                  # This file
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Socket.io-client |
| Backend | NestJS, Socket.io, TypeScript |
| Bot / NLP | Google Dialogflow ES |
| Real-time | WebSocket (Socket.io) |
| Auth | Google Service Account (JSON key) |

---

## Prerequisites

Before running the project locally you will need:

- **Node.js** v18 or above
- **npm** v9 or above
- A **Google Cloud project** with Dialogflow ES API enabled
- A **Dialogflow ES Agent** — import `dialogflow-export.zip` (included in this repo) to get started instantly
- A **Service Account JSON key** file from Google Cloud Console

---

## Dialogflow Agent Setup

The `dialogflow-export.zip` file in this repository contains the pre-built Dialogflow ES agent used in this project. To import it:

1. Go to [Dialogflow ES Console](https://dialogflow.cloud.google.com/)
2. Create a new agent (or open an existing one)
3. Click the **gear icon** next to your agent name → go to **Export and Import**
4. Click **Import From Zip** and upload `dialogflow-export.zip`
5. Type `IMPORT` to confirm and click the import button
6. Your agent will now have all the intents and entities pre-configured

> After importing, go to Google Cloud Console → IAM & Admin → Service Accounts, create a service account with the `Dialogflow API Client` role, generate a JSON key, and place it in the `backend/` folder.

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/dialogflow-chat-app.git
cd dialogflow-chat-app
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Fill in your values:

```env
PORT=3000
DIALOGFLOW_PROJECT_ID=your-google-cloud-project-id
DIALOGFLOW_KEY_FILE=./your-credentials-file.json
CORS_ORIGIN=http://localhost:5173
```

Place your Google Service Account JSON key file inside the `backend/` folder and update `DIALOGFLOW_KEY_FILE` with its filename.

Start the backend:

```bash
npm run start:dev
```

Backend runs on **http://localhost:3000**

### 3. Set up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create your `.env` file:

```env
VITE_SOCKET_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

### 4. Open the app

Go to **http://localhost:5173** in your browser and start chatting.

---

## Detailed Setup Guides

- **Frontend** — see [`frontend/README.md`](./frontend/README.md)
- **Backend** — see [`backend/README.md`](./backend/README.md)

---

## Security Notes

- **Never commit** the Google Service Account JSON credentials file to GitHub
- **Never commit** `.env` files — only `.env.example` with empty values is safe to commit
- The `dialogflow-export.zip` contains only agent training data (intents, entities) — it does not contain any credentials or private keys and is safe to share

---

## Submission Info

| Item | Details |
|---|---|
| GitHub Repo | *(this repository)* |
| Dialogflow Export | `dialogflow-export.zip` — included in repo root |
| Demo Video | Submitted separately via email |
| Submission Email | submissions@interactcx.com |