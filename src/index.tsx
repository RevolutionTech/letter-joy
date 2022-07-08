import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import App from "./client/App";
import "./index.css";

const SENTRY_DSN =
  "https://69dacec9afd244ec8178e28569fa8e97@o1118184.ingest.sentry.io/6556529";

// Init Sentry
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
