import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from "./components/MainContent";

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
}

function App() {
    const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing');
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);

    const handleNewChat = () => {
        setActiveChat(null);
        setCurrentView('landing');
    };

    const handleStartChat = (messages: Message[]) => {
        if (!messages.length) return;

        const firstMessage = messages[0].content;

        const newChat: Chat = {
            id: Date.now().toString(),
            title: firstMessage.slice(0, 30) + (firstMessage.length > 30 ? '...' : ''),
            messages: messages,
            createdAt: new Date()
        };

        setChats(prev => [newChat, ...prev]);
        setActiveChat(newChat);
        setCurrentView('chat');
    };


    const handleUpdateMessages = (messages: Message[]) => {
        if (activeChat) {
            setActiveChat({ ...activeChat, messages });
            setChats(prev => prev.map(chat =>
                chat.id === activeChat.id ? { ...chat, messages } : chat
            ));
        }
    };

    const handleSelectChat = (chat: Chat) => {
        setActiveChat(chat);
        setCurrentView('chat');
    };

    return (
        <div className="h-screen bg-dark-900 p-[16px]">
            <div className="flex h-full gap-[8px]">
                <Sidebar
                    chats={chats}
                    onNewChat={handleNewChat}
                    onSelectChat={handleSelectChat}
                    activeChatId={activeChat?.id}
                />
                <MainContent
                    currentView={currentView}
                    onStartChat={handleStartChat}
                    messages={activeChat?.messages || []}
                    onUpdateMessages={handleUpdateMessages}
                />
            </div>
        </div>
    );
}

export default App;