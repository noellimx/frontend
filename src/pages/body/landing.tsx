import { useAppSelector } from "../../store";
import LoginForm from "../components/auth/LoginForm";

const Body = () => {
  const auth = useAppSelector((s) => s.state.auth);

  if (auth.token) {
    return <div> Dashboard</div>;
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Body;
