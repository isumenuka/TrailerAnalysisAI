import { GoogleGenerativeAI } from '@google/generative-ai';
import type { EnrichedMovieData } from './movieDetails';
import type { Scene } from '../types/analysis';
import { RateLimiter } from './rateLimit';

const genAI = new GoogleGenerativeAI('AIzaSyCOBWZqy59UplzK05zgfxsivsAsFW3ZtVI');

export const analyzeContent = async (
  scene: Scene,
  movieData: EnrichedMovieData,
  context: {
    title: string;
    year: number;
    type: 'movie' | 'tv';
  }
): Promise<{
  easterEggs: string[];
  hiddenDetails: string[];
  fanTheories: string[];
}> => {
  await RateLimiter.waitForNextCall();
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const prompt = `Analyze this scene from ${context.title} (${context.year}) using the following information:

Plot: ${movieData.plot}
Cast: ${movieData.cast.join(', ')}
Director: ${movieData.director}
Genre: ${movieData.genre.join(', ')}

Provide:
1. Easter Eggs: References to other works by the director, cast connections, or genre-specific callbacks
2. Hidden Details: Subtle elements that connect to the plot or character development
3. Fan Theories: Speculations based on the established plot and genre conventions

Format as JSON:
{
  "easterEggs": ["string"],
  "hiddenDetails": ["string"],
  "fanTheories": ["string"]
}`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: scene.thumbnail.split(',')[1]
        }
      }
    ]);

    const response = await result.response;
    const cleanText = response.text().replace(/```json\s*|\s*```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Analysis failed:', error);
    return {
      easterEggs: [],
      hiddenDetails: [],
      fanTheories: []
    };
  }
};