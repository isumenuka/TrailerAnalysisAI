import { GoogleGenerativeAI } from '@google/generative-ai';
import type { MovieMetadata } from '../types/movie';
import type { Scene } from '../types/analysis';
import { RateLimiter } from './rateLimit';

const genAI = new GoogleGenerativeAI('AIzaSyCOBWZqy59UplzK05zgfxsivsAsFW3ZtVI');

export async function generateYouTubeMetadata(
  scenes: Scene[],
  metadata: MovieMetadata
): Promise<string[]> {
  await RateLimiter.waitForNextCall();
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Generate 5 clickbait-style YouTube titles for a trailer breakdown video about ${metadata.title} (${metadata.year}).

Focus on hidden details, easter eggs, and fan theories. Make them engaging and mysterious.

Style guide:
- Use CAPS for emphasis
- Include numbers (e.g., "10 HIDDEN Details")
- Add emotional hooks ("You Won't Believe", "Mind-Blowing")
- Mention "Easter Eggs", "Hidden Details", "Secret References"
- Include fan theory elements
- Add reaction elements ("😱", "🤯")

Example formats:
- "10 MIND-BLOWING Easter Eggs in [Movie] You MISSED! 🤯"
- "Hidden Details in [Movie] That Change EVERYTHING! 😱"
- "The SHOCKING Fan Theory That Makes [Movie] Even Better!"

Return only an array of strings, each being a complete title. Format as JSON:
["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanText = response.text().replace(/```json\s*|\s*```/g, '').trim();
    const titles = JSON.parse(cleanText);
    
    return Array.isArray(titles) ? titles.slice(0, 5) : [];
  } catch (error) {
    console.error('Failed to generate YouTube metadata:', error);
    return [];
  }
}