import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In a production app, you should use a backend to make API calls
});

export async function generateNames(formData: any): Promise<any[]> {
  const prompt = `Generate 10 unique Thai baby names for a ${formData.gender} with the following characteristics: ${formData.characteristics}. 
  If provided, consider the parents' names: ${formData.parentNames} and the birth date: ${formData.birthDate}.
  For each name, provide:
  1. The Thai script
  2. Phonetic pronunciation
  3. Short form meaning
  4. An acronym meaning where each letter of the name represents a word or concept in Thai (with English translation)
  Format the response as a JSON array of objects, each with 'thai', 'phonetic', 'meaning', and 'acronym' properties.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Updated to GPT-4
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (content) {
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    console.error('Error generating names:', error);
    throw error;
  }
}