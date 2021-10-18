import { Server, Origins } from "boardgame.io/server";
import path from "path";
import serve from "koa-static";

import { LetterJoy } from "./game/game";

const server = Server({
  games: [LetterJoy],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
});
const PORT = +(process.env.PORT || 8000);

const clientBuildPath = path.resolve(__dirname, "../dist/client");
server.app.use(serve(clientBuildPath));

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) =>
      await serve(clientBuildPath)(
        Object.assign(ctx, { path: "index.html" }),
        next
      )
  );
});
