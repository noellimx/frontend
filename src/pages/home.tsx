import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/hi2");
      }}
    >
      Hello world!
    </div>
  );
};

export default Page;
