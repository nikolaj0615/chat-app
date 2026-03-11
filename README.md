# Kingdom Chat

A ChatGPT-inspired AI chat application built with React, TypeScript, and Groq API. Features a clean dark UI with multi-conversation management and real-time AI responses powered by Llama 3.3 70B.

![Kingdom Chat Screenshot](./screenshot.png)

## Features

- Real-time AI responses via Groq API (Llama 3.3 70B)
- Multi-conversation management with sidebar navigation
- Conversation history — AI remembers context within a chat
- Clean dark UI inspired by ChatGPT

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — fast dev server and build tool
- **Tailwind CSS** — utility-first styling
- **Groq API** — free, fast LLM inference (Llama 3.3 70B)

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/chat-app.git
cd chat-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your Groq API key**

Create a `.env.local` file in the root:
```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

**4. Start the dev server**
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── MainContent.tsx   # Chat UI, message rendering, input
│   └── Sidebar.tsx       # Conversation list, navigation
├── services/
│   └── gemini.ts         # Groq API integration
├── Interfaces/
│   └── types.ts          # TypeScript interfaces
└── App.tsx               # State management, routing
```
