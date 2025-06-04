
import { type SpeedTestExecution } from '../schema';

export const runSpeedTest = async (): Promise<SpeedTestExecution> => {
  try {
    // Simulate speed test execution with realistic random values
    // Download speeds typically range from 10-100 Mbps for residential connections
    const download_speed = Math.round((Math.random() * 90 + 10) * 100) / 100; // 10-100 Mbps, 2 decimal places
    
    // Upload speeds are typically lower than download speeds (asymmetric connections)
    // Range from 5-50 Mbps, typically 20-50% of download speed
    const upload_speed = Math.round((Math.random() * 45 + 5) * 100) / 100; // 5-50 Mbps, 2 decimal places
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      download_speed,
      upload_speed
    };
  } catch (error) {
    console.error('Speed test execution failed:', error);
    throw error;
  }
};
