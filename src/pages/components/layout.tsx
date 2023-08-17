import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { NotificationDetail } from "../../redux/store/slice/notification";
import { FC } from "react";

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

const Header = () => {
  return (
    <div className="flex h-16 w-screen  bg-white border-b-4 border-delimiter">
      <Logo />
    </div>
  );
};



const NotificationFC: FC<{ detail: NotificationDetail }> = ({ detail }) => {


  const emoji = detail.type === "Error" ? "❗" : ""

  return <div key={`${detail.uuid}-notification-toast`} id={`${detail.uuid}-notification-toast`} className="flex rounded-l-[25px] border-secondary-deep border-l-[1px] border-y-[1px] bg-white p-3 "><div>{`${emoji} ${detail.type}: ${detail.text}`}</div> </div>
}

const NotificationsFC: FC<{ details: NotificationDetail[] }> = ({ details }) => {
  return <div id="notifications" className="absolute right-0">{
    details.map((detail) => {
      return <NotificationFC detail={detail} key={detail.uuid} />
    })
  }</div>

}

export const DefaultLayout = () => {
  const notificationDetails = useAppSelector(s => s.state.notification.items)

  return (
    <div id="app-entry" className="flex   h-screen w-screen flex-col ">
      <header id="nav-bar" className="sticky top-0 ">
        <Header />
        <NotificationsFC details={notificationDetails} />
      </header>
      <main
        id="default-layout-outlet-wrapper"
        className="flex-1 overflow-y-scroll w-full min-h-max border-1"
      >
        <Outlet />
      </main>


    </div>
  );
};
