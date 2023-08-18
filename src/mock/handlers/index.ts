import { getHandlers as getFirstHandlers } from "./auth";
import { getHandlers as getDashboardAllHandlers } from "./dashboard";

export const getHandlers = (serverUrl: string) => {
  const firstHandlers = getFirstHandlers(serverUrl);

  const dashboardAllHandlers = getDashboardAllHandlers(serverUrl);
  return [...firstHandlers, ...dashboardAllHandlers];
};
