import { useState, useEffect } from 'react';

import hamburgerMenu from '../assets/icons/ic_menu.svg';
import edit from '../assets/icons/edit.svg';
import search from '../assets/icons/search.svg';
import icAdd from '../assets/icons/ic_add.svg';
import plus from '../assets/icons/plus.svg';

const MenuIcon = () => <img src={hamburgerMenu} alt="menu" className="w-[20px] h-[20px]" />;
const NewChatIcon = () => <img src={edit} alt="new chat" className="w-[20px] h-[20px]" />;
const SearchIcon = () => <img src={search} alt="search" className="w-[20px] h-[20px]" />;
const TasksIcon = () => <img src={icAdd} alt="tasks" className="w-[20px] h-[20px]" />;
const PlusIcon = () => <img src={plus} alt="plus" className="w-[20px] h-[20px]" />;
const CloseIcon = () => <span className="text-[20px] text-gray-400">✕</span>;

interface Project {
    id: string;
    name: string;
    color: string;
    letter: string;
    isActive?: boolean;
}
interface ChatItem {
    id: string;
    title: string;
}
interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    isCollapsed: boolean;
    isActive?: boolean;
}

interface ProjectButtonProps {
    project: Project;
    isCollapsed: boolean;
}
interface ChatButtonProps {
    title: string;
}

const projects: Project[] = [
    { id: '1', name: 'Kingdom', color: 'bg-blue-500', letter: 'K', isActive: true },
    { id: '2', name: 'GGM Moebel', color: 'bg-red-500', letter: 'G' },
];

const todayChats: ChatItem[] = [
    { id: '1', title: 'Amsterdam trip with the...' },
    { id: '2', title: 'Superconductors: Smoot...' },
];

const previousChats: ChatItem[] = [
    { id: '3', title: 'Marble Statue Pizza Cigar.' },
    { id: '4', title: 'Gradient Background Pac...' },
    { id: '5', title: 'Fern Gully, the Chief Leaf...' },
    { id: '6', title: 'Design an Uber-like app' },
    { id: '7', title: 'Product team meeting in...' },
];

function NavButton({ icon, label, isCollapsed, isActive }: NavButtonProps) {
    return (
        <button
            className={`
                flex items-center gap-[12px] p-[12px] rounded-[12px] text-white transition-colors
                ${isActive ? 'bg-dark-600' : 'hover:bg-dark-600'}
                ${isCollapsed ? 'justify-center' : ''}
            `}
        >
            {icon}
            {!isCollapsed && <span className="text-[14px]">{label}</span>}
        </button>
    );
}

function ProjectButton({ project, isCollapsed }: ProjectButtonProps) {
    return (
        <button
            className={`
                flex items-center gap-[12px] p-[12px] rounded-[12px] text-white hover:bg-dark-600 transition-colors
                ${isCollapsed ? 'justify-center' : ''}
            `}
        >
            <span
                className={`w-[32px] h-[32px] ${project.color} rounded-[8px] flex items-center justify-center text-[14px] font-bold`}
            >
                {project.letter}
            </span>
            {!isCollapsed && (
                <>
                    <span className="text-[14px] flex-1 text-left">{project.name}</span>
                    <span
                        className={`w-[16px] h-[16px] rounded-full border-2 ${
                            project.isActive ? 'border-blue-500 bg-blue-500/20' : 'border-gray-500'
                        }`}
                    />
                </>
            )}
        </button>
    );
}

function ChatButton({ title }: ChatButtonProps) {
    return (
        <button className="text-left px-[8px] py-[8px] text-[14px] text-gray-300 hover:text-white hover:bg-dark-600 rounded-[8px] transition-colors truncate">
            {title}
        </button>
    );
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMenuClick = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <>
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {isMobile && !isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed top-[24px] left-[24px] z-50 p-[12px] bg-dark-800 rounded-[12px] text-gray-400 hover:text-white"
                >
                    <MenuIcon />
                </button>
            )}

            <aside
                className={`
                    flex flex-col bg-dark-800 rounded-[16px] p-[16px] transition-all duration-300
                    ${isMobile
                    ? `fixed top-[16px] left-[16px] bottom-[16px] z-50 w-[280px] ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+32px)]'}`
                    : `relative ${isCollapsed ? 'w-[72px]' : 'w-[250px]'}`
                }
                `}
            >
                {/* Header */}
                <button
                    onClick={handleMenuClick}
                    className="text-gray-400 hover:text-white mb-[24px] self-start p-[8px] hover:bg-dark-600 rounded-[8px]"
                >
                    {isMobile && isOpen ? <CloseIcon /> : <MenuIcon />}
                </button>

                {/* Navigation */}
                <nav className="flex flex-col gap-[8px]">
                    <NavButton icon={<NewChatIcon />} label="New Chat" isCollapsed={!isMobile && isCollapsed} isActive />
                    <NavButton icon={<SearchIcon />} label="Search Chats" isCollapsed={!isMobile && isCollapsed} />
                    <NavButton icon={<TasksIcon />} label="My Tasks" isCollapsed={!isMobile && isCollapsed} />
                </nav>

                {/* Projects */}
                <div className="mt-[24px]">
                    {(!isCollapsed || isMobile) && <p className="text-gray-500 text-[12px] mb-[8px] px-[8px]">Projects</p>}
                    <div className="flex flex-col gap-[8px]">
                        {projects.map((project) => (
                            <ProjectButton key={project.id} project={project} isCollapsed={!isMobile && isCollapsed} />
                        ))}
                    </div>
                </div>

                {/* Chat History - hide when collapsed on desktop */}
                {(!isCollapsed || isMobile) && (
                    <div className="mt-[24px] flex-1 overflow-y-auto">
                        <p className="text-gray-500 text-[12px] mb-[8px] px-[8px]">Today</p>
                        <div className="flex flex-col gap-[4px]">
                            {todayChats.map((chat) => (
                                <ChatButton key={chat.id} title={chat.title} />
                            ))}
                        </div>

                        <p className="text-gray-500 text-[12px] mb-[8px] mt-[16px] px-[8px]">Previous 30 Days</p>
                        <div className="flex flex-col gap-[4px]">
                            {previousChats.map((chat) => (
                                <ChatButton key={chat.id} title={chat.title} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Invite Members */}
                <div className="mt-auto pt-[16px]">
                    <button
                        className={`
                            flex items-center gap-[12px] w-full p-[12px] rounded-[12px] bg-dark-700 hover:bg-dark-600 text-white transition-colors
                            ${!isMobile && isCollapsed ? 'justify-center' : ''}
                        `}
                    >
                        <PlusIcon />
                        {(!isCollapsed || isMobile) && <span className="text-[14px]">Invite members</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}