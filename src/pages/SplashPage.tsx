import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import RightSplashBackground from "../assets/images/right-splash.svg";
import leftSplashBackground from "../assets/images/left-splash.svg";

const SplashPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <img
        src={RightSplashBackground}
        alt="right-icon"
        className="absolute top-0 right-0"
      />
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <img src={logo} alt="app-logo" />
        <div className="mt-12">
          <button
            onClick={() => navigate("/sign-in")}
            className="w-[185px] h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary text-[18px] font-givonic-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
      <img
        src={leftSplashBackground}
        alt="Left-icon"
        className="absolute bottom-0 left-0"
      />
    </div>
  );
};

export default SplashPage;
