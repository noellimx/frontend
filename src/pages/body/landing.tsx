import { login } from "../../redux/store/auth";
import { useAppDispatch, useAppSelector } from "../../store";

const Body = () => {

    const auth = useAppSelector(s => s.state.auth)


    const dispatch = useAppDispatch()

    if (auth.success) {
        return <div> Dashboard</div>
    }

    return (
        <>
            <div

                onClick={() => {

                    dispatch(login({ email: "a", password: "b" }))
                }}
            >
                Login
            </div>

        </>
    );
};

export default Body;
