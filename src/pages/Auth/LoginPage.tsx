import React from "react";
import logo from "./assets/signin_logo.svg";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex max-w-7xl gap-16 mx-auto justify-center items-center">
      <div className="w-[50%] space-y-4">
        <h1 className="font-bold text-[36px] text-secondary">
          Glad You're Here
        </h1>
        <img src={logo} alt="" />
        <div className="space-y-4 text-[#373737] text-[20px]">
        <p>
          Welcome to One Star Oil Lube Shop and Oil Change! Sign in to
          experience top-notch automotive care. Our expert team ensures quick,
          efficient, and reliable oil changes and lubrication services to keep
          your vehicle running smoothly.
        </p>
        <p>Join us today for a seamless and hassle-free experience!</p>
        </div>
      </div>
      <div className="w-[50%]">
        <h1 className="text-[40px] text-secondary mb-4">SignIn</h1>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737]">Username/Email</p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px]"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737]">Password</p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px]"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-16">
          <div className="space-x-2">
            <input type="checkbox" />
            <span className="text-[#373737] text-[18px]">Remember me</span>
          </div>
          <span className="text-[#373737] text-[18px]">Forget Password</span>
        </div>

        <button className="w-[185px] mt-6 h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary">
          Login
        </button>

        <div className="mt-6 flex items-center gap-2">
          <p className="text-[#373737] text-[18px]">Get Started Now!</p>
          <p className="text-secondary text-[18px]">Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
