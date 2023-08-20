import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../../store";
import { logoutUser } from "../../../redux/store/slice/auth";
import ButtonFC from "../../components/utils/Button";

const Logo = () => {
    const navigate = useNavigate();
    return (
        <div
            className="flex p-3 items-center justify-start "
            onClick={() => {
                navigate("/");
            }}
        >
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

const Menus = () => {
    return <div className="flex bg-debug"><div id="menu-create" className="flex items-center">
        s</div>

        {/** HERE */}




    </div>;
};

const AuthenticatedNavItems = () => {
    const dispatch = useAppDispatch();

    const dispatchLogout = () => dispatch(logoutUser());

    return (
        <div id="authenticated-nav-items" className="flex space-x-3 border-2 border-black">
            <Menus /> <ButtonFC text="logout" onClick={dispatchLogout} />{" "}
        </div>
    );
};
const UnauthenticatedNavItems = () => {
    return <div className="flex"></div>;
};

const getUsernameFromJWT = (token: string): string => {
    try {
        const tk: { sub: string } = jwt_decode(token);

        return tk?.sub;
    } catch {
        return "";
    }
};

const Header = () => {
    const authToken = useAppSelector((s) => s.auth.token);

    const NavItems_ = useMemo(() => {
        return authToken === "" ? (
            <UnauthenticatedNavItems />
        ) : (
            <AuthenticatedNavItems />
        );
    }, [authToken]);

    const username = authToken === "" ? "" : getUsernameFromJWT(authToken);
    return (
        <div
            id="top-bar"
            className="flex h-16 w-screen  bg-white border-b-4 border-delimiter items-center"
        >
            <Logo />

            <div>{`${username}`}</div>
            <div className="flex ml-auto p-[10px]">{NavItems_}</div>
        </div>
    );
};

export default Header;
