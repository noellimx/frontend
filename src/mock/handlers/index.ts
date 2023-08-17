import { getHandlers as getFirstHandlers } from "./auth";

export const getHandlers = (serverUrl: string) => {
    const firstHandlers = getFirstHandlers(serverUrl);
    return [...firstHandlers];
};
