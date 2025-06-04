
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { runSpeedTest } from '../handlers/run_speed_test';

describe('runSpeedTest', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return speed test results with download and upload speeds', async () => {
    const result = await runSpeedTest();

    // Verify result structure
    expect(result).toHaveProperty('download_speed');
    expect(result).toHaveProperty('upload_speed');
    expect(typeof result.download_speed).toBe('number');
    expect(typeof result.upload_speed).toBe('number');
  });

  it('should return realistic download speed values', async () => {
    const result = await runSpeedTest();

    // Download speed should be between 10-100 Mbps
    expect(result.download_speed).toBeGreaterThanOrEqual(10);
    expect(result.download_speed).toBeLessThanOrEqual(100);
    
    // Should have at most 2 decimal places
    const decimalPlaces = (result.download_speed.toString().split('.')[1] || '').length;
    expect(decimalPlaces).toBeLessThanOrEqual(2);
  });

  it('should return realistic upload speed values', async () => {
    const result = await runSpeedTest();

    // Upload speed should be between 5-50 Mbps
    expect(result.upload_speed).toBeGreaterThanOrEqual(5);
    expect(result.upload_speed).toBeLessThanOrEqual(50);
    
    // Should have at most 2 decimal places
    const decimalPlaces = (result.upload_speed.toString().split('.')[1] || '').length;
    expect(decimalPlaces).toBeLessThanOrEqual(2);
  });

  it('should simulate network delay', async () => {
    const startTime = Date.now();
    await runSpeedTest();
    const endTime = Date.now();
    
    // Should take at least 100ms due to simulated delay
    expect(endTime - startTime).toBeGreaterThanOrEqual(100);
  });

  it('should return different values on multiple calls', async () => {
    const result1 = await runSpeedTest();
    const result2 = await runSpeedTest();
    const result3 = await runSpeedTest();

    // With random values, it's extremely unlikely all three calls return identical results
    const allSame = (
      result1.download_speed === result2.download_speed &&
      result1.upload_speed === result2.upload_speed &&
      result2.download_speed === result3.download_speed &&
      result2.upload_speed === result3.upload_speed
    );
    
    expect(allSame).toBe(false);
  });
});
