import { Outlet, useNavigate } from "react-router-dom";

const Logo = () => {

    const navigate = useNavigate();
    return (
        <div className="flex p-3 items-center justify-start " onClick={() => {

            navigate("/")
        }}>
            <div className="flex h-full">
                <div className="flex h-full items-center">
                    <img
                        className="rounded-full border-1 border-b-2 h-8 w-8"
                        src="/assets/forager-logo.jpeg"
                        alt="logo"
                    />
                </div>
            </div>
            <div className="flex ml-3"> Forager </div>
        </div>
    );
};

const Header = () => {
    return (
        <div className="flex h-16 w-screen  bg-white border-b-4 border-delimiter">
            <Logo />
        </div>
    );
};

export const DefaultLayout = () => {
    return (
        <div id="app-entry" className="flex  bg-red-50 h-screen w-screen flex-col">
            <Header />
            <Outlet />
        </div>
    );
};
