export const generateThumbnail = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  time: number
): string => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  
  if (!context) {
    throw new Error('Could not get canvas context');
  }
  
  context.drawImage(video, 0, 0);
  return canvas.toDataURL('image/jpeg');
};