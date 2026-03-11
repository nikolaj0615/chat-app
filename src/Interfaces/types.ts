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


export interface Project {
    id: string;
    name: string;
    color: string;
    letter: string;
    isActive?: boolean;
}