import { getHandlers as getFirstHandlers } from "./first";

export const getHandlers = (serverUrl: string) => {
  const firstHandlers = getFirstHandlers(serverUrl);
  return [...firstHandlers];
};
