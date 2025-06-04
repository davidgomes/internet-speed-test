
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

import { createSpeedTestInputSchema } from './schema';
import { createSpeedTestResult } from './handlers/create_speed_test_result';
import { getSpeedTestResults } from './handlers/get_speed_test_results';
import { runSpeedTest } from './handlers/run_speed_test';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  createSpeedTestResult: publicProcedure
    .input(createSpeedTestInputSchema)
    .mutation(({ input }) => createSpeedTestResult(input)),
  getSpeedTestResults: publicProcedure
    .query(() => getSpeedTestResults()),
  runSpeedTest: publicProcedure
    .mutation(() => runSpeedTest()),
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
