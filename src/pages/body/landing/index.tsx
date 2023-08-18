import { useAppSelector } from "../../../store";
import LoginForm from "../../components/auth/LoginForm";
import Dashboard from "./Dashboard";



const LandingHome = () => {
  const auth = useAppSelector((s) => s.auth);

  if (auth.token) {
    return <Dashboard />;
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LandingHome;
