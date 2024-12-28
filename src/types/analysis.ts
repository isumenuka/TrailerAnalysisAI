export interface SceneDetails {
  easterEggs: string[];
  hiddenDetails: string[];
  fanTheories: string[];
}

export interface Scene {
  startTime: number;
  endTime: number;
  thumbnail: string;
}

export interface SceneAnalysis extends Scene {
  details: SceneDetails;
}