import { useNavigate } from "react-router-dom";

const Body = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>Hello world!</div>
            <div
                onClick={() => {
                    navigate("/diagnostics/counter");
                }}
            >
                go counter
            </div>
            <div
                onClick={() => {
                    navigate("/diagnostics/health/auth");
                }}
            >
                go auth check
            </div>
        </>
    );
};

export default Body;
