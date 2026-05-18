const axios = require('axios');

const generateRecommendations = async (employeeData) => {
    try {
        const prompt = `
        You are an HR AI Assistant. Analyze the following employee data and provide a short JSON response containing:
        - promotionRecommendation: "Yes" or "No" based on their score and experience.
        - feedback: A short 1-sentence performance feedback.
        - trainingSuggestions: An array of 1-3 strings suggesting skills they should learn based on their current skills and department.

        Employee Data:
        Name: ${employeeData.name}
        Department: ${employeeData.department}
        Skills: ${employeeData.skills.join(', ')}
        Performance Score: ${employeeData.performanceScore}/100
        Experience: ${employeeData.experience} years

        Ensure your response is valid JSON.
        `;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'meta-llama/llama-3-8b-instruct:free',
                messages: [
                    { role: 'system', content: 'You are an HR AI Assistant that outputs strictly valid JSON.' },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: 'json_object' }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'http://localhost:5000', 
                    'X-Title': 'Employee Performance Analytics',
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiOutput = response.data.choices[0].message.content;
        return JSON.parse(aiOutput);

    } catch (error) {
        console.error('Error generating AI recommendation:', error.message);
        throw new Error('Failed to generate AI recommendations');
    }
};

module.exports = { generateRecommendations };
