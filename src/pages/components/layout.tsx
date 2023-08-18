import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { NotificationDetail } from "../../redux/store/slice/notification";
import { FC, useMemo } from "react";
import ButtonFC from "./utils/Button";
import { logoutUser } from "../../redux/store/slice/auth";
import jwt_decode from "jwt-decode";

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

const NavItem = () => {
  return <></>;
};

const AuthenticatedNavItems = () => {
  const dispatch = useAppDispatch();

  const dispatchLogout = () => dispatch(logoutUser());

  return (
    <div className="flex">
      {" "}
      <NavItem /> <ButtonFC text="logout" onClick={dispatchLogout} />{" "}
    </div>
  );
};
const UnauthenticatedNavItems = () => {
  return <div className="flex"></div>;
};


const getUsernameFromJWT = (token: string): string => {

  try {

    const tk: { username: string } = jwt_decode(token);


    return tk["username"];

  }
  catch {
    return ""

  }

}
const Header = () => {
  const authToken = useAppSelector((s) => s.auth.token);

  const NavItems_ = useMemo(() => {
    return authToken === "" ? (
      <UnauthenticatedNavItems />
    ) : (
      <AuthenticatedNavItems />
    );
  }, [authToken]);



  const username = authToken === "" ? "a" : getUsernameFromJWT(authToken)
  return (
    <div className="flex h-16 w-screen  bg-white border-b-4 border-delimiter items-center">
      <Logo />

      <div>{`${username}`}</div>
      <div className="flex ml-auto p-[10px]">{NavItems_}</div>
    </div>
  );
};

const emojiType = {
  Error: "❗",
  Info: "😊",
};

const NotificationFC: FC<{ detail: NotificationDetail }> = ({ detail }) => {
  const emoji = emojiType[detail.type] || "";

  return (
    <div
      key={`notification-toast-${detail.uuid}`}
      id={`${detail.uuid}-notification-toast`}
      className="flex bg-white  py-1 px-3 rounded-l-[25px] border-secondary-deep border-l-[1px] border-y-[1px]"
    >
      <div>{`${emoji} ${detail.type}: ${detail.text}`}</div>{" "}
    </div>
  );
};

const NotificationsFC: FC<{ details: NotificationDetail[] }> = ({
  details,
}) => {
  return (
    <div id="notifications" className="absolute right-0">
      {details.map((detail) => {
        return <NotificationFC detail={detail} key={detail.uuid} />;
      })}
    </div>
  );
};

export const DefaultLayout = () => {
  const notificationDetails = useAppSelector((s) => s.notification.items);

  return (
    <div id="app-entry" className="flex   h-screen w-screen flex-col ">
      <header id="nav-bar" className="sticky top-0 ">
        <Header />
        <NotificationsFC details={notificationDetails} />
      </header>
      <main
        id="default-layout-outlet-wrapper"
        className="flex-1 overflow-y-scroll w-full min-h-max border-1 bg-background-default"
      >
        <Outlet />
      </main>
    </div>
  );
};
