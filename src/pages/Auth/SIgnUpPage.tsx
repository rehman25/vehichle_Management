import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/login-logo.svg";

const SIgnUpPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cover bg-center bg-signup-bg w-full flex flex-col justify-center items-center">
      <div className="container flex items-center justify-between bg-black/85 p-10 rounded-[20px]">
        <div className="w-[60%] space-y-4">
          <h1 className="text-[36px] text-secondary font-givonic-bold">
            Welcome to
          </h1>
          <img src={logo} alt="signup-logo" />
          <div className="space-y-4">
            <p className="font-givonic-regular text-[#ffffff] text-[20px] w-[80%]">
              Sign up for One Star Oil Lube Shop and Oil Change today! Become a
              member to enjoy exclusive benefits, special offers, and
              personalized service reminders.
            </p>
            <p className="font-givonic-regular text-[#ffffff] text-[20px] w-[80%]">
              Our expert team is dedicated to providing fast, efficient, and
              reliable oil changes and lubrication services to keep your vehicle
              in top condition
            </p>
            <p className="font-givonic-regular text-[#ffffff] text-[20px] w-[80%]">
              Join us now for exceptional automotive care!
            </p>
          </div>
        </div>
        <div className="w-[40%]">
          <h1 className="text-[40px] text-secondary mb-4">SignUp</h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[20px] text-[#ffffff] font-givonic-regular">
                Full Name
              </p>
              <input
                type="text"
                className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular outline-none"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[20px] text-[#ffffff] font-givonic-regular">
                Email Address
              </p>
              <input
                type="text"
                className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular outline-none"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[20px] text-[#ffffff] font-givonic-regular">
                Username
              </p>
              <input
                type="text"
                className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular outline-none"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[20px] text-[#ffffff] font-givonic-regular">
                Password
              </p>
              <input
                type="text"
                className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular outline-none"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[20px] text-[#ffffff] font-givonic-regular">
                Confirm Password
              </p>
              <input
                type="text"
                className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-16">
            <div className="space-x-2">
              <input type="checkbox" />
              <span className="text-[#ffffff] text-[18px] font-givonic-regular">
                Remember me
              </span>
            </div>

            <div className="space-x-2">
              <span className="text-[#ffffff] text-[18px]">
                Already a user?{" "}
                <span
                  onClick={() => navigate("/sign-in")}
                  className="text-secondary cursor-pointer font-givonic-semibold"
                >
                  Login
                </span>
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-[185px] mt-6 h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary font-givonic-semibold bg-white"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SIgnUpPage;
