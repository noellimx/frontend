import { FC } from "react";
import { useAppSelector } from "../../store";
import LoginForm from "../components/auth/LoginForm";


const Dashboard: FC = () => {


  return <></>

}

const LandingHome = () => {


  const auth = useAppSelector((s) => s.state.auth);

  if (auth.token) {
    return <Dashboard />
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LandingHome;
