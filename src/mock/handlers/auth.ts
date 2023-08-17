import { rest } from "msw";




const mockCredentials = {
  username: "mu",
  password: "mp",
  token: "mocktokenstring"
}


export const getHandlers = (serverUrl: string) => {
  return [
    rest.post(
      `${serverUrl}/api/user/login`,
      async (req, res, ctx) => {

        const form: { username: string, password: string } = await req.json();

        console.log(form)
        if (form.username === mockCredentials.username && form.password === mockCredentials.password) {
          return res(
            ctx.status(200),
            ctx.json({
              "token": "mocktokenstring"
            }),
          );
        }

        return res(ctx.status(401))

      },
    ),
  ];
};
