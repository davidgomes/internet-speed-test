
import { z } from 'zod';

// Speed test result schema with only download and upload speeds
export const speedTestResultSchema = z.object({
  id: z.number(),
  download_speed: z.number(), // Mbps
  upload_speed: z.number(), // Mbps
});

export type SpeedTestResult = z.infer<typeof speedTestResultSchema>;

// Input schema for creating speed test results
export const createSpeedTestInputSchema = z.object({
  download_speed: z.number().positive(), // Must be positive
  upload_speed: z.number().positive(), // Must be positive
});

export type CreateSpeedTestInput = z.infer<typeof createSpeedTestInputSchema>;

// Schema for speed test execution (what gets returned from running a test)
export const speedTestExecutionSchema = z.object({
  download_speed: z.number(),
  upload_speed: z.number(),
});

export type SpeedTestExecution = z.infer<typeof speedTestExecutionSchema>;
