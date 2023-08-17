import { useAppDispatch } from "../../../store";
import ButtonFC from "../utils/Button";

import { login } from "../../../redux/store/slice/auth";

import { useState } from "react";
const Form = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatchLogin = () => {
    dispatch(login({ username, password }))
  };

  return (
    <>
      <div className=" flex  flex-row w-full min-h-full">
        <div id="landing-page-decor" className="flex basis-1/2 ">
          <div className="flex h-full items-center">
            <img
              id="landing-page-background-fill"
              className="h-full	 object-cover w-full"
              src="/assets/landing-picture-fill.jpeg"
              alt="logo"
            />
          </div>
        </div>
        <div
          id="landing-page-login"
          className="flex flex-col bg-center	 basis-1/2 p-[10%] w-full min-h-full justify-center items-center bg-logo-transparent bg-cover bg-blend-darken	bg-primary-light	"
        >
          <form className="bg-white bg-opacity-90 border-primary-deep border h-fit max-w-xs rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center w-full ">
              <ButtonFC
                onClick={() => {
                  console.log("clicked");
                  console.log(username);
                  dispatchLogin();
                }}
                text="login"
                extendClassName="w-full"
              ></ButtonFC>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
