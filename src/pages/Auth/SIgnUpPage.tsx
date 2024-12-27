import React from "react";
import logo from "./assets/signin_logo.svg";

const SIgnUpPage = () => {
  return (
    <div className="min-h-screen w-full flex max-w-7xl gap-16 mx-auto justify-center items-center">
      <div className="w-[50%] space-y-4">
        <h1 className="font-bold text-[36px] text-secondary">Welcome to</h1>
        <img src={logo} alt="" />
        <div className="space-y-4 text-[#373737] text-[20px]">
          <p>
            Sign up for One Star Oil Lube Shop and Oil Change today! Become a
            member to enjoy exclusive benefits, special offers, and personalized
            service reminders.
          </p>
          <p>
            Our expert team is dedicated to providing fast, efficient, and
            reliable oil changes and lubrication services to keep your vehicle
            in top condition.
          </p>
          <p>Join us now for exceptional automotive care!</p>
        </div>
      </div>
      <div className="w-[50%]">
        <h1 className="text-[40px] text-secondary mb-4">SignUp</h1>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737]">Full Name</p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px]"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737]">Email Address</p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px]"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737]">Username</p>
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
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737]">Confirm Password</p>
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
        </div>

        <button className="w-[185px] mt-6 h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SIgnUpPage;
