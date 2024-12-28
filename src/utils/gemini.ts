import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Scene, SceneAnalysis, SceneDetails } from '../types/analysis';
import type { MovieMetadata } from '../types/movie';
import { RateLimiter } from './rateLimit';

const genAI = new GoogleGenerativeAI('AIzaSyCOBWZqy59UplzK05zgfxsivsAsFW3ZtVI');

export class AnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnalysisError';
  }
}

const sanitizeArrayItems = (arr: any[]): string[] => {
  return arr.map(item => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item !== null) {
      if (item.description) return item.description;
      return Object.values(item).filter(v => typeof v === 'string').join(' - ');
    }
    return String(item);
  });
};

export async function analyzeScene(
  scene: Scene, 
  metadata: MovieMetadata
): Promise<SceneAnalysis> {
  try {
    await RateLimiter.waitForNextCall();
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Analyze this scene from ${metadata.title} (${metadata.year}) and provide:
- Easter Eggs (references or callbacks to other ${metadata.type === 'movie' ? 'movies' : 'TV shows'}, pop culture, or hidden references)
- Hidden Details (subtle visual elements that might be significant to the plot or character development)
- Fan Theories (potential speculations about plot points, character relationships, or future developments)

Consider the context of ${metadata.title} and its place in ${metadata.type === 'movie' ? 'cinema' : 'television'} history.

Return ONLY simple strings in arrays. No objects or nested structures.

Format as JSON:
{
  "easterEggs": ["string1", "string2"],
  "hiddenDetails": ["string1", "string2"],
  "fanTheories": ["string1", "string2"]
}`;

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
    let details: SceneDetails;
    
    try {
      const cleanText = response.text().replace(/```json\s*|\s*```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      details = {
        easterEggs: sanitizeArrayItems(parsed.easterEggs || []),
        hiddenDetails: sanitizeArrayItems(parsed.hiddenDetails || []),
        fanTheories: sanitizeArrayItems(parsed.fanTheories || [])
      };
    } catch (parseError) {
      console.warn('Failed to parse Gemini response:', parseError);
      details = {
        easterEggs: [],
        hiddenDetails: [],
        fanTheories: []
      };
    }
    
    return {
      ...scene,
      details
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('429')) {
      throw new AnalysisError(
        'Too many requests. The application is automatically waiting between analyses to prevent rate limiting.'
      );
    }
    throw new AnalysisError(
      error instanceof Error 
        ? error.message 
        : 'Failed to analyze scene. Please try again.'
    );
  }
}