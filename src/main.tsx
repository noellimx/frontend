import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootRoutes from "./routes.tsx";
import "./index.css";

// development config

import logger from "redux-logger";
import { Middleware } from "redux";
import { store } from "./store.tsx";
import initMSW from "./mock/service.ts";
import initConfig from "./initConfig.ts";

const reduxMiddlewares: Middleware[] = [];

// Environment-based Config

const globalConfig = initConfig(import.meta.env.VITE_SERVER_URL);

if (import.meta.env.MODE === "development") {
  reduxMiddlewares.push(logger);
  const { client } = initMSW(globalConfig.serverUrl);
  client.start();
}

const router = createBrowserRouter(createRoutesFromElements(RootRoutes));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div id="app-body">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </div>,
);
