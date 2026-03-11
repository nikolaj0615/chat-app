import type {Message} from '../Interfaces/types';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function sendMessage(messages: Message[]): Promise<string> {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.error);
            return `Error: ${data.error.message}`;
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error('Groq API error:', error);
        return 'Sorry, there was an error processing your request.';
    }
}
