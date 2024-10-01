import { SOCIALMEDIAS } from "@/links/social-medias";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="z-[101] w-full bg-[black] pt-[50px] md:pt-[70px] xl:pt-[100px] pb-5"
    >
      <div className="w-full">
        <h1 className=" text-[25px] md:text-[40px] xl:text-[60px] text-[#c23631] poller font-normal leading-[72px] text-center">
          Contact Us
        </h1>
        {/* <p className=" text-base xl:text-lg mt-3 paytone font-normal text-[#EEEEEE] leading-6 text-center">
          Email us at{" "}
          <a href="#" className="text-[#c23631]">
            support@sponge.io
          </a>{" "}
          for any <br /> queries or support
        </p> */}
        <div className="flex pb-[30px] justify-center gap-x-6 mt-[28px]">
          {SOCIALMEDIAS.map((media, index) => (
            <a
              key={index}
              href={media.link}
              target="_blank"
              className="w-[40.39px] transition-all duration-500 footer_icon_hover hover:text-[white] h-[40.39px] rounded-full border border-[#c23631] text-[#c23631] hover:border-[white] flex justify-center items-center"
            >
              {media.icon}
            </a>
          ))}
        </div>
        <div className="w-full h-[1px] footer_line" />
        <p className="text-center text-xs xl:text-base text-[#8C8B8B] font-normal leading-6  mt-[27px] paytone">
          All rights reserved by Tron X &copy; 2024 
        </p>
      </div>
    </section>
  );
};
