export interface Scene {
  startTime: number;
  endTime: number;
  thumbnail: string;
}

export const detectScenes = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  threshold: number = 20 // pixel difference threshold for scene change
): Promise<Scene[]> => {
  const scenes: Scene[] = [];
  let currentScene: Scene | null = null;
  const context = canvas.getContext('2d');
  
  if (!context) return [];

  const getFrameData = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height).data;
  };

  const calculateDifference = (frame1: Uint8ClampedArray, frame2: Uint8ClampedArray) => {
    let diff = 0;
    for (let i = 0; i < frame1.length; i += 4) {
      diff += Math.abs(frame1[i] - frame2[i]); // Compare red channel only for performance
    }
    return diff / frame1.length;
  };

  let previousFrame: Uint8ClampedArray | null = null;
  const interval = 0.5; // Check every half second

  for (let time = 0; time < video.duration; time += interval) {
    video.currentTime = time;
    await new Promise(resolve => {
      video.onseeked = resolve;
    });

    const currentFrame = getFrameData();

    if (previousFrame) {
      const difference = calculateDifference(previousFrame, currentFrame);
      
      if (difference > threshold) {
        // Scene change detected
        if (currentScene) {
          currentScene.endTime = time;
          scenes.push(currentScene);
        }
        
        currentScene = {
          startTime: time,
          endTime: time,
          thumbnail: canvas.toDataURL('image/jpeg')
        };
      }
    } else if (!currentScene) {
      // First frame
      currentScene = {
        startTime: 0,
        endTime: 0,
        thumbnail: canvas.toDataURL('image/jpeg')
      };
    }

    previousFrame = currentFrame;
  }

  // Add the last scene
  if (currentScene) {
    currentScene.endTime = video.duration;
    scenes.push(currentScene);
  }

  return scenes;
};