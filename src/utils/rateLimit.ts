// Simple rate limiter to track API calls
export class RateLimiter {
  private static lastCallTime: number = 0;
  private static readonly minInterval: number = 2000; // 2 seconds between calls

  static async waitForNextCall(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;
    
    if (timeSinceLastCall < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - timeSinceLastCall)
      );
    }
    
    this.lastCallTime = Date.now();
  }
}