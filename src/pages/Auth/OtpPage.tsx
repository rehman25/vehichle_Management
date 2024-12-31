import { useState } from "react";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const navigate = useNavigate();
  const handleChange = (value: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const previousInput = document.getElementById(
        `otp-input-${index - 1}`
      ) as HTMLInputElement;
      if (previousInput) previousInput.focus();
    }
  };

  return (
    <div>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-[40px] text-secondary mb-4 font-givonic-bold">
          Enter OTP Code
        </h1>

        <div className="flex gap-2 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-[67px] h-[60px] border-[1px] rounded-[10px] text-center text-lg border-supporting_blue focus:outline-none font-givonic-regular"
            />
          ))}
        </div>
        <div className="flex items-center mt-5">
          <p className="text-[20px] text-[#373737] font-givonic-regular">
            Didn't Receive Code?
          </p>
          <p className="text-[20px] text-secondary ps-3 cursor-pointer font-givonic-semibold">
            Resend
          </p>
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-[185px] h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary text-[18px] font-givonic-semibold"
          >
            Verify Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
