
import { z } from 'zod';

// Speed test result schema
export const speedTestResultSchema = z.object({
  id: z.number(),
  download_speed: z.number(), // Mbps
  upload_speed: z.number(), // Mbps
  ping: z.number(), // milliseconds
  test_duration: z.number(), // seconds
  user_ip: z.string(),
  user_agent: z.string().nullable(),
  created_at: z.coerce.date()
});

export type SpeedTestResult = z.infer<typeof speedTestResultSchema>;

// Input schema for creating speed test results
export const createSpeedTestInputSchema = z.object({
  download_speed: z.number().nonnegative(),
  upload_speed: z.number().nonnegative(),
  ping: z.number().nonnegative(),
  test_duration: z.number().positive(),
  user_ip: z.string().ip(),
  user_agent: z.string().nullable()
});

export type CreateSpeedTestInput = z.infer<typeof createSpeedTestInputSchema>;

// Speed test execution schema (for running the test)
export const speedTestExecutionSchema = z.object({
  user_ip: z.string().ip(),
  user_agent: z.string().nullable()
});

export type SpeedTestExecution = z.infer<typeof speedTestExecutionSchema>;

// Speed test statistics schema
export const speedTestStatsSchema = z.object({
  total_tests: z.number(),
  avg_download_speed: z.number(),
  avg_upload_speed: z.number(),
  avg_ping: z.number()
});

export type SpeedTestStats = z.infer<typeof speedTestStatsSchema>;
