import React from "react";
import Spinner from "./Spinner";

const SpinnerTable = () => {
  return (
    <div
      className="absolute top-0 left-0 h-full
     w-full bg-secondary z-50 bg-opacity-70 flex justify-center items-center"
    >
      <Spinner diameter="w-[50px]" css="stroke-orange" />
    </div>
  );
};

export default SpinnerTable;
