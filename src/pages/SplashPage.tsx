import React from "react";
import logo from "../assets/logo.svg";

const SplashPage = () => {
  return (
    <div>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <img src={logo} alt="" />
        <div className="mt-12">
          <button className="w-[185px] h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
