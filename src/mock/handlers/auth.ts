import { rest } from "msw";
import { Endpoints } from "../../types/endpoints";

export const mockCredentials = {
  username: "mu",
  password: "mp",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJNb2NrIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.No9v9MP9TnSLkuoctBe18NyNbM6isixc-92-1Kf1IBY"
};

export const getHandlers = (serverUrl: string) => {
  return [
    rest.post(`${serverUrl}${Endpoints.login}`, async (req, res, ctx) => {
      const form: { username: string; password: string } = await req.json();
      if (
        form.username === mockCredentials.username &&
        form.password === mockCredentials.password
      ) {
        return res(
          ctx.status(200),
          ctx.json({
            token: mockCredentials.token,
          }),
        );
      }

      return res(ctx.status(401));
    }),
  ];
};
