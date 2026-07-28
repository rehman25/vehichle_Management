import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router";

const VerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-[40px] text-secondary mb-4 font-givonic-bold">
          Two Factor Verification
        </h1>

        <div>
          <p className="text-[20px] text-[#373737] font-givonic-regular">
            Enter Phone Number
          </p>
          <div className="mt-2">
            <PhoneInput
              international
              defaultCountry="PK"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="w-[315px] h-[60px] border-[1px] rounded-[10px] border-supporting_blue text-secondary text-[18px] px-2 font-givonic-regular"
            />
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate("/otp")}
            className="w-[185px] h-[45px] border-[1px] rounded-[10px] border-supporting_blue text-secondary text-[18px] font-givonic-semibold"
          >
            Send Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
