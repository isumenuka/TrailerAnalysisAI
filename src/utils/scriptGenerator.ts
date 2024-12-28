import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VideoScript } from '../types/youtube';
import type { EnrichedMovieData } from './movieDetails';
import { RateLimiter } from './rateLimit';

const genAI = new GoogleGenerativeAI('AIzaSyCOBWZqy59UplzK05zgfxsivsAsFW3ZtVI');

export async function generateVideoScript(
  title: string,
  movieData: EnrichedMovieData | null,
  context: {
    title: string;
    year: number;
  }
): Promise<VideoScript> {
  await RateLimiter.waitForNextCall();
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const prompt = `Create a detailed YouTube video script for: "${title}"
About the ${movieData?.genre?.includes('TV Series') ? 'show' : 'movie'}: ${context.title} (${context.year})

${movieData ? `Using this information:
- Plot: ${movieData.plot}
- Cast: ${movieData.cast.join(', ')}
- Director: ${movieData.director}
- Genre: ${movieData.genre.join(', ')}
- Rating: ${movieData.rating}` : ''}

Include:
1. Engaging introduction
2. Main discoveries
3. Detailed analysis
4. Fan theories
5. Conclusion

Format as JSON:
{
  "title": "string",
  "sections": [
    {
      "type": "intro|mainPoint|detail|theory|conclusion",
      "content": "string",
      "timestamp": "MM:SS"
    }
  ],
  "tags": ["string"],
  "description": "string"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanText = response.text().replace(/```json\s*|\s*```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Failed to generate script:', error);
    throw error;
  }
}