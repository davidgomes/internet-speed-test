
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { speedTestResultsTable } from '../db/schema';
import { type CreateSpeedTestInput } from '../schema';
import { createSpeedTestResult } from '../handlers/create_speed_test_result';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: CreateSpeedTestInput = {
  download_speed: 25.5,
  upload_speed: 12.3
};

describe('createSpeedTestResult', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a speed test result', async () => {
    const result = await createSpeedTestResult(testInput);

    // Basic field validation
    expect(result.download_speed).toEqual(25.5);
    expect(result.upload_speed).toEqual(12.3);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('number');
    expect(typeof result.download_speed).toBe('number');
    expect(typeof result.upload_speed).toBe('number');
  });

  it('should save speed test result to database', async () => {
    const result = await createSpeedTestResult(testInput);

    // Query using proper drizzle syntax
    const speedTestResults = await db.select()
      .from(speedTestResultsTable)
      .where(eq(speedTestResultsTable.id, result.id))
      .execute();

    expect(speedTestResults).toHaveLength(1);
    expect(parseFloat(speedTestResults[0].download_speed)).toEqual(25.5);
    expect(parseFloat(speedTestResults[0].upload_speed)).toEqual(12.3);
    expect(speedTestResults[0].id).toEqual(result.id);
  });

  it('should handle decimal values correctly', async () => {
    const decimalInput: CreateSpeedTestInput = {
      download_speed: 100.75,
      upload_speed: 50.25
    };

    const result = await createSpeedTestResult(decimalInput);

    // Verify numeric conversion maintains precision
    expect(result.download_speed).toEqual(100.75);
    expect(result.upload_speed).toEqual(50.25);

    // Verify database storage
    const stored = await db.select()
      .from(speedTestResultsTable)
      .where(eq(speedTestResultsTable.id, result.id))
      .execute();

    expect(parseFloat(stored[0].download_speed)).toEqual(100.75);
    expect(parseFloat(stored[0].upload_speed)).toEqual(50.25);
  });

  it('should create multiple speed test results', async () => {
    const input1: CreateSpeedTestInput = {
      download_speed: 50.0,
      upload_speed: 25.0
    };

    const input2: CreateSpeedTestInput = {
      download_speed: 75.5,
      upload_speed: 35.2
    };

    const result1 = await createSpeedTestResult(input1);
    const result2 = await createSpeedTestResult(input2);

    // Verify both results have different IDs
    expect(result1.id).not.toEqual(result2.id);
    expect(result1.download_speed).toEqual(50.0);
    expect(result2.download_speed).toEqual(75.5);

    // Verify both are stored in database
    const allResults = await db.select()
      .from(speedTestResultsTable)
      .execute();

    expect(allResults).toHaveLength(2);
  });
});
