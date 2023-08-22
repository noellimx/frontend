import { NavLink, useNavigate } from "react-router-dom";
import { Fragment, useMemo } from "react";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../../store";
import { logoutUser } from "../../../redux/store/slice/auth";
import ButtonFC from "../../components/utils/Button";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

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

const menuDropDownItemClassName = (active: boolean) =>
    classNames(
        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
        "block px-4 py-2 text-sm",
    );

const Menus = () => {
    return (
        <div className="flex ">
            <div id="menu-create" className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Create
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active: itemActive }) => {
                                        return (
                                            <NavLink
                                                to="/create/youtubeReference"
                                                className={
                                                    (/**{ isActive, isPending } */) =>
                                                        menuDropDownItemClassName(itemActive)
                                                }
                                            >
                                                Youtube Reference
                                            </NavLink>
                                        );
                                    }}
                                </Menu.Item>
                                {/* <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Support
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    License
                                </a>
                            )}
                        </Menu.Item> */}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

const AuthenticatedNavItems = () => {
    const dispatch = useAppDispatch();


    const navigate = useNavigate();
    const dispatchLogout = () => {

        dispatch(logoutUser()).unwrap().then(() => navigate("/"))
    };

    return (
        <div id="authenticated-nav-items" className="flex space-x-3 ">
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
