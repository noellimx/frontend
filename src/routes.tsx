import {
    Route,
} from "react-router-dom";

import { DefaultLayout } from "./pages/components/layout.tsx";
import PageHome from "./pages/home";
import PageCounter from "./pages/counter";



const Root = <Route path="/" element={<DefaultLayout />}>
    <Route index element={<PageHome />} />
    <Route path="/counter" element={<PageCounter />}></Route>
</Route>


export default Root;