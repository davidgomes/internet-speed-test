
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

import { speedTestExecutionSchema, createSpeedTestInputSchema } from './schema';
import { runSpeedTest } from './handlers/run_speed_test';
import { createSpeedTestResult } from './handlers/create_speed_test_result';
import { getSpeedTestResults } from './handlers/get_speed_test_results';
import { getSpeedTestStats } from './handlers/get_speed_test_stats';
import { getLatestSpeedTest } from './handlers/get_latest_speed_test';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Run a complete speed test (measures and stores result)
  runSpeedTest: publicProcedure
    .input(speedTestExecutionSchema)
    .mutation(({ input }) => runSpeedTest(input)),
  
  // Manually create a speed test result
  createSpeedTestResult: publicProcedure
    .input(createSpeedTestInputSchema)
    .mutation(({ input }) => createSpeedTestResult(input)),
  
  // Get all speed test results
  getSpeedTestResults: publicProcedure
    .query(() => getSpeedTestResults()),
  
  // Get speed test statistics
  getSpeedTestStats: publicProcedure
    .query(() => getSpeedTestStats()),
  
  // Get the latest speed test result
  getLatestSpeedTest: publicProcedure
    .query(() => getLatestSpeedTest()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
