import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/signin_logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex max-w-7xl gap-16 mx-auto justify-center items-center">
      <div className="w-[50%] space-y-4">
        <h1 className="text-[36px] text-secondary font-givonic-bold">
          Glad You're Here
        </h1>
        <img src={logo} alt="" />
        <div className="space-y-4">
          <p className="font-givonic-regular text-[#494949] text-[20px]">
            Welcome to One Star Oil Lube Shop and Oil Change! Sign in to
            experience top-notch automotive care. Our expert team ensures quick,
            efficient, and reliable oil changes and lubrication services to keep
            your vehicle running smoothly.
          </p>
          <p className="font-givonic-regular text-[#494949] text-[20px]">
            Join us today for a seamless and hassle-free experience!
          </p>
        </div>
      </div>
      <div className="w-[50%]">
        <h1 className="text-[40px] text-secondary mb-4 font-givonic-bold">
          SignIn
        </h1>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[20px] text-[#373737] font-givonic-regular">
              Username/Email
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
        </div>

        <div className="mt-6 flex items-center gap-16">
          <div className="space-x-2">
            <input type="checkbox" />
            <span className="text-[#373737] text-[18px] font-givonic-regular">
              Remember me
            </span>
          </div>
          <span
            onClick={() => navigate("/verify")}
            className="text-[#373737] text-[18px] cursor-pointer font-givonic-regular"
          >
            Forget Password
          </span>
        </div>

        <button className="w-[185px] mt-6 h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary font-givonic-semibold">
          Login
        </button>

        <div className="mt-6 flex items-center gap-2">
          <p className="text-[#373737] text-[18px] font-givonic-regular">
            Get Started Now!
          </p>
          <p
            onClick={() => navigate("/sign-up")}
            className="text-secondary text-[18px] cursor-pointer font-givonic-semibold"
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
