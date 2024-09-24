import VerticalDash from "../assets/vertical-dash.svg";
import GetStartedToday from "../assets/get-started-today.svg";
import { NotificationManager } from "react-notifications";

const heroLinks = [
  {
    id: 1,
    title: "Tutorial",
    href: "https://www.youtube.com/@Sol_Adz/videos",
  },
  {
    id: 2,
    title: "Marketing Material",
    href: "#",
  },
  {
    id: 3,
    title: "Socials",
    href: "https://www.instagram.com/sol_adz",
  },
  {
    id: 4,
    title: "Top Sponsor",
    href: "#",
  },
];

export const SubHeader = () => {
  return (
    <div className="flex gap-2 md:gap-2 flex-col md:flex-row justify-center md:justify-between items-center">
      <nav className="text-black flex gap-3 mt-4 md:mt-0">
        {heroLinks.map((val, index) => {
          if (val.href === "#") {
            return (
              <div
                key={val.id}
                className="flex items-center gap-3"
                onClick={() => {
                  NotificationManager.info(
                    "Coming soon.",
                    "",
                    3000
                  );
                  return;
                }}
              >
                <p className="uppercase font-medium text-[10px] sm:text-sm md:text-[15px] lg:text-2xl hover:text-white/80 transition-all duration-300 cursor-pointer">
                  {val.title}
                </p>
                {index !== heroLinks.length - 1 && (
                  <img src={VerticalDash} alt="vertical-dash" />
                )}
              </div>
            );
          } else {
            return (
              <div key={val.id} className="flex items-center gap-3">
                <a
                  href={val.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase font-medium text-[10px] sm:text-sm md:text-[15px] lg:text-2xl hover:text-white/80 transition-all duration-300 cursor-pointer"
                >
                  {val.title}
                </a>
                {index !== heroLinks.length - 1 && (
                  <img src={VerticalDash} alt="vertical-dash" />
                )}
              </div>
            );
          }
        })}
      </nav>
      <button>
        <img src={GetStartedToday} className="w-full md:w-[180px] lg:w-full" alt="Get Started Today" />
      </button>
    </div>
  );
};
