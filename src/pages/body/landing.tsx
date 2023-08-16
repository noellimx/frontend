
import { useAppSelector } from "../../store";
import LoginForm from "../components/auth/LoginForm";

const Body = () => {
    const auth = useAppSelector(s => s.state.auth)

    if (auth.success) {
        return <div> Dashboard</div>
    }

    return (
        <>
            <LoginForm />

        </>
    );
};

export default Body;
