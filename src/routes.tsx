import { Outlet, Route } from "react-router-dom";

import { DefaultLayout } from "./pages/layout/layout.tsx";
import BodyDiagnostics from "./pages/body/home.tsx";
import BodyCounter from "./pages/body/counter.tsx";
import BodyHome from "./pages/body/landing/index.tsx";
import { useAppSelector } from "./store.tsx";
import CreateYoutubeReferenceForm from "./pages/body/create/youtubereference/CreateYoutubeReferenceForm.tsx";

const AuthWrapper = () => {
  const auth = useAppSelector((s) => s.auth);
  if (auth.token) {
    return <Outlet />;
  }
  return <div>Unauthenticated.</div>;
};

const Root = (
  <Route path="/" element={<DefaultLayout />}>
    <Route index element={<BodyHome />} />
    <Route path="create" element={<AuthWrapper />}>
      <Route index element={<></>} />
      <Route path="youtubeReference" element={<CreateYoutubeReferenceForm />} />
    </Route>
    <Route path="/diagnostics">
      <Route index element={<BodyDiagnostics />} />
      <Route path="ping" element={<BodyCounter />}></Route>
      <Route path="health" element={<AuthWrapper />}>
        <Route path="auth" element={<div>healthcheck-auth-ok</div>}></Route>
      </Route>
    </Route>

    <Route path="*" element={<div className="flex justify-center">Oops! this page leads to nowhere.</div>} />


  </Route>
);

export default Root;
