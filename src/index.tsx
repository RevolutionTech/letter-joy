import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./client/App";
import "./index.css";

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
