import crownLogo from '../assets/icons/OpenAI-logo.svg';
import appIcons from '../assets/icons/app-icons.svg';
import designIcon from '../assets/icons/design.svg';
import analyticsIcon from '../assets/icons/analitycs.png';
import supportIcon from '../assets/icons/suport.png';
import plus from '../assets/icons/plus.svg';
import arrowDown from '../assets/icons/ic_Keyboard_arrow_down.svg';
import { useState } from 'react';

interface MainContentProps {
    currentView: 'landing' | 'chat';
    onStartChat: () => void;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const ArrowIcon = () => <img src={arrowDown} alt="menu" className="w-[20px] h-[20px]" />;

function CategoryCard({ icon, title }: { icon: string; title: string }) {
    return (
        <div className="flex flex-col items-start gap-[8px] p-[16px] bg-dark-600 hover:bg-dark-700 rounded-[12px] text-left transition-colors w-full min-w-[140px] max-w-[180px] h-[118px] cursor-pointer">
            <img src={icon} alt="" className="w-[24px] h-[24px]" />
            <span className="text-[14px] text-white">{title}</span>
        </div>
    );
}

export default function MainContent({ currentView, onStartChat }: MainContentProps) {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSubmit = () => {
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: trimmedValue
        };

        setMessages(prev => {
            const updatedMessages = [...prev, userMessage];
            onStartChat(updatedMessages);
            return updatedMessages;
        });

        setInputValue('');


        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content:
                    'Sure! Imagine you have a slide in a playground. When you slide down, you can go really fast because the slide is smooth and slippery. This is a simulated response.'
            };

            setMessages(prev => [...prev, assistantMessage]);
        }, 1000);
    };


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <main className="flex-1 flex flex-col bg-dark-800 rounded-[16px] overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-end p-[16px]">
                <button className="hidden md:flex items-center gap-[8px] px-[16px] py-[8px] bg-dark-600 rounded-[8px] text-white mr-auto">
                    Kingdom <span className="text-gray-400"> <ArrowIcon /></span>
                </button>
                <div className="w-[32px] h-[32px] bg-purple-500 rounded-full flex items-center justify-center text-[12px] font-bold text-white">
                    NS
                </div>
            </header>

            {/* Content - Landing ili Chat */}
            {currentView === 'landing' ? (
                <div className="flex-1 flex flex-col items-center justify-center px-[16px]">
                    <img src={crownLogo} alt="logo" className="w-[48px] h-[48px] mb-[16px]" />
                    <h1 className="text-[20px] md:text-[24px] text-white mb-[24px] md:mb-[32px] text-center">What can we help with?</h1>
                    <div className="grid grid-cols-2 gap-[12px] mb-[24px] md:mb-[32px] w-full max-w-[400px] md:max-w-[720px] md:grid-cols-4">
                        <CategoryCard icon={appIcons} title="Message for Developers" />
                        <CategoryCard icon={designIcon} title="Message for Designers" />
                        <CategoryCard icon={analyticsIcon} title="Message for Analytics" />
                        <CategoryCard icon={supportIcon} title="Message for Support" />
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-[16px] flex flex-col gap-[16px] items-center">
                    <div className="w-full max-w-[640px] flex flex-col gap-[16px]">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <img
                                        src={crownLogo}
                                        alt="AI"
                                        className="w-[24px] h-[24px] mr-[12px] mt-[4px] flex-shrink-0"
                                    />
                                )}
                                <div
                                    className={`${
                                        message.role === 'user'
                                            ? 'bg-dark-600 text-white p-[12px] rounded-[12px]'
                                            : 'text-white'
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Input at bottom */}
            <div className="p-[16px] flex flex-col items-center">
                <div className="flex items-center gap-[12px] bg-dark-600 rounded-[12px] p-[12px] w-full max-w-[639px]">
                    <button className="text-gray-400">
                        <img src={plus} alt="add" className="w-[20px] h-[20px]" />
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message Kingdom Manager"
                        className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 min-w-0"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-[32px] h-[32px] bg-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    >
                        ↑
                    </button>
                </div>
                <p className="text-center text-gray-500 text-[12px] mt-[8px] px-[8px]">
                    Interaction Faction workspace chats aren't used to train our models. ChatGPT can make mistakes.
                </p>
            </div>
        </main>
    );
}