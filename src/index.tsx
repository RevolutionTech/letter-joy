import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import * as FullStory from "@fullstory/browser";

import App from "./client/App";
import "./index.css";

const SENTRY_DSN =
  "https://69dacec9afd244ec8178e28569fa8e97@o1118184.ingest.sentry.io/6556529";
const FULLSTORY_ORG_ID = "o-1BSGWC-na1";

// Init Sentry and Fullstory
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
  FullStory.init({ orgId: FULLSTORY_ORG_ID });
}

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
