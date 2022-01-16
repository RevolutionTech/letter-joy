import { Server, Origins } from "boardgame.io/server";
import path from "path";
import serve from "koa-static";
import * as Sentry from "@sentry/node";

import { LetterJoy } from "./game/game";

const server = Server({
  games: [LetterJoy],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
});
const PORT = +(process.env.PORT || 8000);
const SENTRY_DSN_NODE = process.env.SENTRY_DSN_NODE;

// Init Sentry
if (SENTRY_DSN_NODE != null) {
  Sentry.init({ dsn: SENTRY_DSN_NODE });
  server.app.on("error", (err, ctx) => {
    Sentry.withScope(function (scope) {
      scope.addEventProcessor(function (event) {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(err);
    });
  });
}

// Serve client
const clientBuildPath = path.resolve(__dirname, "../dist/client");
server.app.use(serve(clientBuildPath));
const serveClient = () => {
  server.app.use(
    async (ctx, next) =>
      await serve(clientBuildPath)(
        Object.assign(ctx, { path: "index.html" }),
        next
      )
  );
};

server.run(PORT, serveClient);
