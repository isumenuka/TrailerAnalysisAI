export interface FrameAnalysis {
  timestamp: number;
  analysis: string;
  thumbnail: string;
}

export const extractFrames = async (
  video: HTMLVideoElement, 
  canvas: HTMLCanvasElement,
  framesPerSecond: number = 1
): Promise<string[]> => {
  const frames: string[] = [];
  const duration = video.duration;
  const interval = 1 / framesPerSecond;
  
  for (let time = 0; time < duration; time += interval) {
    video.currentTime = time;
    await new Promise(resolve => {
      video.onseeked = resolve;
    });
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    frames.push(canvas.toDataURL('image/jpeg'));
  }
  
  return frames;
}