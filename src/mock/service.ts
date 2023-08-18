import { getHandlers } from "./handlers";
// import { setupServer } from "msw/node";
import { setupWorker } from "msw";

const initMSW = (serverUrl: string) => {
  console.log(`initMSW:: server url:: ${serverUrl}`);

  const handlers = getHandlers(serverUrl);
  const client = setupWorker(...handlers);

  return { client };
};

export default initMSW;
