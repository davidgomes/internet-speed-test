
import { serial, text, pgTable, timestamp, numeric, integer } from 'drizzle-orm/pg-core';

export const speedTestResultsTable = pgTable('speed_test_results', {
  id: serial('id').primaryKey(),
  download_speed: numeric('download_speed', { precision: 8, scale: 2 }).notNull(), // Mbps with 2 decimal places
  upload_speed: numeric('upload_speed', { precision: 8, scale: 2 }).notNull(), // Mbps with 2 decimal places
  ping: numeric('ping', { precision: 8, scale: 2 }).notNull(), // milliseconds with 2 decimal places
  test_duration: integer('test_duration').notNull(), // seconds as integer
  user_ip: text('user_ip').notNull(),
  user_agent: text('user_agent'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type SpeedTestResult = typeof speedTestResultsTable.$inferSelect;
export type NewSpeedTestResult = typeof speedTestResultsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { speedTestResults: speedTestResultsTable };
