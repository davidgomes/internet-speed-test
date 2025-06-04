
import { serial, pgTable, numeric } from 'drizzle-orm/pg-core';

export const speedTestResultsTable = pgTable('speed_test_results', {
  id: serial('id').primaryKey(),
  download_speed: numeric('download_speed', { precision: 8, scale: 2 }).notNull(), // Mbps
  upload_speed: numeric('upload_speed', { precision: 8, scale: 2 }).notNull(), // Mbps
});

// TypeScript type for the table schema
export type SpeedTestResult = typeof speedTestResultsTable.$inferSelect;
export type NewSpeedTestResult = typeof speedTestResultsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { speedTestResults: speedTestResultsTable };
