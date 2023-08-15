import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { DefaultLayout } from "./pages/components/layout.tsx";
import PageHome from "./pages/home";
import PageCounter from "./pages/counter";
import { store } from "./store.tsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<PageHome />} />
      <Route path="/counter" element={<PageCounter />}></Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div id="app-body">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </div>,
);
