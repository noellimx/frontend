import { Outlet, } from "react-router-dom";
import { FC, } from "react";
import axios from "axios";

import { globalConfig } from "../../initConfig";
import Header from "./header/header";
import { useAppSelector } from "../../store";
import { NotificationDetail } from "../../redux/store/slice/notification";

export const ping = () => {
  return <div className="flex" onClick={async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.get(
      `${globalConfig.serverUrl}`,

      config,
    );
  }}>ping</div>
}


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
    <div id="app-entry" className="flex h-screen w-screen flex-col ">
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
