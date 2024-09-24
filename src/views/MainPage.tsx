import MainBg from "../assets/hero-bg.png";
import TopLogo from "../assets/top-logo.png";
import { GradientButton } from "../components/common/GradientButton";
import { GradientBorderButton } from "../components/common/GradientBorderButton";
import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-white font-sans">
      {/* bg image */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={MainBg}
        alt="Bg Hero"
      />

      <div className="relative z-10 max-w-7xl px-4 mx-auto w-full py-6">
        <div className="flex justify-center mb-4">
          <img
            className="max-w-[120px] md:max-w-[177px] w-full"
            src={TopLogo}
            alt="top logo"
          />
        </div>

        <h1 className="mb-9 mt-8 text-[35px] sm:text-[45px] md:text-[60px] poller text-center font-bold leading-[1] text-stroke text-white">
          Welcome to SolAdz
        </h1>
        
        <p className="text-center text-[24px] md:text-[30px] font-medium leading-[1] max-w-[644px] mx-auto">
          The First Decentralized Advertising Network Community Fund
        </p>

        <p className="text-center text-base md:text-[20px]  leading-[1.3] mt-4 mb-[30px] md:mb-[50px] max-w-[645px] mx-auto">
          By Contributing To The Community Fund, You Will Get High Targeted
          Traffic Through The Advertising Network
        </p>

        <div className="flex items-center justify-center">
          <Link to={"innovation"}>
            <GradientButton text="Get Started" />
          </Link>
        </div>

        <div className="flex gap-5 md:gap-10 flex-wrap mt-10 md:mt-20 items-center justify-center">
          {/* <Link to={"innovation"}> */}
          <GradientBorderButton text="Tutorial" />
          {/* </Link> */}
          {/* <Link to={"innovation"}> */}
          <GradientBorderButton text="Marketing Material" />
          {/* </Link> */}
          {/* <Link to={"innovation"}> */}
          <GradientBorderButton text="Socials" />
          {/* </Link> */}
          {/* <Link to={"innovation"}> */}
          <GradientBorderButton text="Top Sponsor" />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
