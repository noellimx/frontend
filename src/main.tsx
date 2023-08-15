import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


import { store } from "./store.tsx";
import "./index.css";
import RootRoutes from "./routes.tsx";




const router = createBrowserRouter(
  createRoutesFromElements(
    RootRoutes,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div id="app-body">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </div>,
);
