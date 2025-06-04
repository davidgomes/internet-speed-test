
import { db } from '../db';
import { speedTestResultsTable } from '../db/schema';
import { type CreateSpeedTestInput, type SpeedTestResult } from '../schema';

export const createSpeedTestResult = async (input: CreateSpeedTestInput): Promise<SpeedTestResult> => {
  try {
    // Insert speed test result record
    const result = await db.insert(speedTestResultsTable)
      .values({
        download_speed: input.download_speed.toString(), // Convert number to string for numeric column
        upload_speed: input.upload_speed.toString() // Convert number to string for numeric column
      })
      .returning()
      .execute();

    // Convert numeric fields back to numbers before returning
    const speedTestResult = result[0];
    return {
      ...speedTestResult,
      download_speed: parseFloat(speedTestResult.download_speed), // Convert string back to number
      upload_speed: parseFloat(speedTestResult.upload_speed) // Convert string back to number
    };
  } catch (error) {
    console.error('Speed test result creation failed:', error);
    throw error;
  }
};
