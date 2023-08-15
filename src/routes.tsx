import {
    Outlet,
    Route,
} from "react-router-dom";

import { DefaultLayout } from "./pages/components/layout.tsx";
import BodyHome from "./pages/body/home.tsx";
import BodyCounter from "./pages/body/counter.tsx";
import BodyLanding from "./pages/body/landing.tsx";
import { useAppSelector } from "./store.tsx";


const AuthWrapper = () => {
    const auth = useAppSelector(s => s.state.auth)
    if (auth.success) {
        return <><Outlet /></>
    }
    return <><div>
        Unauthenticated.
    </div></>
}

const Root = <Route path="/" element={<DefaultLayout />}>
    <Route index element={<BodyLanding />} />
    <Route path="/diagnostics">
        <Route index element={<BodyHome />} />
        <Route path="counter" element={<BodyCounter />}></Route>
        <Route path="health" element={<AuthWrapper />}>
            <Route path="auth" element={<div>healthcheck</div>}></Route>
        </Route>
    </Route>
</Route>


export default Root;