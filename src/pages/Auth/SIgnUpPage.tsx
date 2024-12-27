import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/signin_logo.svg";

const SIgnUpPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex max-w-7xl gap-16 mx-auto justify-center items-center">
      <div className="w-[50%] space-y-4">
        <h1 className="text-[36px] text-secondary font-givonic-bold">
          Welcome to
        </h1>
        <img src={logo} alt="" />
        <div className="space-y-4">
          <p className="font-givonic-regular text-[#494949] text-[20px]">
            Sign up for One Star Oil Lube Shop and Oil Change today! Become a
            member to enjoy exclusive benefits, special offers, and personalized
            service reminders.
          </p>
          <p className="font-givonic-regular text-[#494949] text-[20px]">
            Our expert team is dedicated to providing fast, efficient, and
            reliable oil changes and lubrication services to keep your vehicle
            in top condition.
          </p>
          <p className="font-givonic-regular text-[#494949] text-[20px]">
            Join us now for exceptional automotive care!
          </p>
        </div>
      </div>
      <div className="w-[50%]">
        <h1 className="text-[40px] text-secondary mb-4">SignUp</h1>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737] font-givonic-regular">
              Full Name
            </p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737] font-givonic-regular">
              Email Address
            </p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737] font-givonic-regular">
              Username
            </p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737] font-givonic-regular">
              Password
            </p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737] font-givonic-regular">
              Confirm Password
            </p>
            <input
              type="text"
              className="w-full border-[1px] border-supporting_blue px-2 py-4 rounded-[10px] font-givonic-regular"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-16">
          <div className="space-x-2">
            <input type="checkbox" />
            <span className="text-[#373737] text-[18px] font-givonic-regular">
              Remember me
            </span>
          </div>

          <div className="space-x-2">
            <span className="text-[#373737] text-[18px]">
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

        <button className="w-[185px] mt-6 h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary font-givonic-semibold">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SIgnUpPage;
