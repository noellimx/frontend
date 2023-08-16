import { rest } from "msw";

export const getHandlers = (serverUrl: string) => {
  console.log(`firsthandlers ${serverUrl}`);

  return [
    // rest.get(
    //     url,
    //     (_, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json({
    //                 userId: 1,
    //                 id: 1,
    //                 title: "delectus aut autem",
    //                 completed: false,
    //             })
    //         );
    //     }
    // ),

    rest.post(
      // `${globalConfig.serverUrl}/api/user/login`,
      `${serverUrl}/api/user/login`,
      // `http://localhosts/api/user/login`,
      (_, res, ctx) => {
        console.log(
          `${serverUrl}/api/user/login`.localeCompare(
            `http://localhosts/api/user/login`,
          ),
        );
        console.log(`asd`);
        console.log(`http://localhosts/api/user/login`);
        return res(
          ctx.status(200),
          ctx.json({
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
          }),
        );
      },
    ),
  ];
};
