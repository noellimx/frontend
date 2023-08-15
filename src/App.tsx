import { Route, Routes } from "react-router-dom";

import PageHome from "./pages/home";
import PageCounter from "./pages/counter";
import { DefaultLayout } from "./pages/components/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<PageHome />} />
        <Route path="/counter" element={<PageCounter />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
