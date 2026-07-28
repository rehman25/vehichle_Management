import { useNavigate } from "react-router";
import loginLogo from "../../assets/images/login-logo.svg";
import loginBg from "../../assets/images/Sign-In.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
      className="min-h-screen bg-cover bg-center w-full flex flex-col justify-center items-center"
    >
      <div className="container flex justify-end">
        <div className="w-[50%] bg-black/85 p-5 rounded-[20px]">
          <h1 className="text-[36px] text-secondary font-givonic-bold">
            Glad You're Here
          </h1>
          <img src={loginLogo} alt="loginLogo" />
          <p className="text-[#ffffff] text-[20px] font-givonic-regular mt-3">
            Welcome to One Star Oil Lube Shop and Oil Change! Sign in to
            experience top-notch automotive care. Our expert team ensures quick,
            efficient, and reliable oil changes and lubrication services to keep
            your vehicle running smoothly.
          </p>
          <p className="text-[#ffffff] text-[20px] font-givonic-regular mt-3">
            Join us today for a seamless and hassle-free experience!
          </p>

          <h1 className="text-[40px] text-secondary font-givonic-bold py-3">
            Sign In
          </h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[20px] text-[#ffffff] font-givonic-regular">
                Username/Email
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
          </div>

          <div className="mt-6 flex items-center gap-16">
            <div className="space-x-2">
              <input type="checkbox" />
              <span className="text-[#ffffff] text-[18px] font-givonic-regular">
                Remember me
              </span>
            </div>
            <span
              onClick={() => navigate("/verify")}
              className="text-[#ffffff] text-[18px] cursor-pointer font-givonic-regular"
            >
              Forget Password
            </span>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-[185px] mt-6 h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary font-givonic-semibold bg-white"
          >
            Login
          </button>

          <div className="mt-6 flex items-center gap-2">
            <p className="text-[#ffffff] text-[18px] font-givonic-regular">
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
    </div>
  );
};

export default LoginPage;
