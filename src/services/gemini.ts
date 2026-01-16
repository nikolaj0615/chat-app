const API_KEY = 'AIzaSyAQnMv0IMPUe1e8hkpzOcZkdoQKT1gX0ro';

export async function sendMessage(message: string): Promise<string> {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: message }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.error);
            return `Error: ${data.error.message}`;
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API error:', error);
        return 'Sorry, there was an error processing your request.';
    }
}