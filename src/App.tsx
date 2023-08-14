import PageHome from "./pages/home";
// import PageCounter from "./pages/counter";

import {
  /**BrowserRouter, Routes, Route, */ createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/hi2",
    element: <div>Hello 2!</div>,
  },
]);


const Logo = () => {

  return <div className="flex p-3 items-center justify-start	">


    <div className="flex h-full"><div className="flex">



      <img
        className="rounded-full object-cover object-center border-1 border-b-2"
        src="./public/assets/forager-logo.jpeg"
        alt="logo"
      /></div> </div>





    <div className="flex "> Forager </div>
  </div>
}
const Header = () => {
  return (
    <div className="flex h-16 w-screen  bg-white border-b-4 border-delimiter">

      <Logo />
    </div>
  );
};
function App() {
  return (
    <div className="flex  bg-red-50 h-screen w-screen flex-col">
      <Header />
      <div id="app-body">
        <RouterProvider
          router={router}
        // fallbackElement={<BigSpinner />}
        />
      </div>
    </div>
  );
}

export default App;
