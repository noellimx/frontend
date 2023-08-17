import { FC } from "react";

const ButtonFC: FC<{
  text: string;
  extendClassName: string;
  onClick: () => void;
}> = ({ text = "util-button", onClick = () => {}, extendClassName = "" }) => {
  return (
    <div className={`flex items-center justify-between ${extendClassName}`}>
      <button
        onClick={onClick}
        className={`bg-white border border-primary-default hover:bg-primary-deep hover:text-white focus:border-white-1 text-primary-deep font-bold py-2 px-4 rounded-full w-full`}
        type="button"
      >
        {`${text}`}
      </button>
    </div>
  );
};

export default ButtonFC;
