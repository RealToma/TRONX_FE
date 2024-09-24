import MainBg from "../assets/solAdz-bg.png";

import { BottomStats } from "../components/BottomStats";
import { Header } from "@/components/Header";
import { Calculator } from "@/components/Calculator";
import { SubHeader } from "@/components/SubHeader";
import { ContentSection } from "@/components/ContentSection";

export const CryptoInnovationPage = () => {
  return (
    <div className="min-h-screen pb-12 relative h-full overflow-x-hidden">
      <img className="absolute top-0 left-0 w-full h-full object-fill" src={MainBg} alt="Bg Hero" />

      <div className="relative z-10">
        {/* Upper sections */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Header />
          <SubHeader />
        </div>

        {/* second section */}
        <ContentSection />

        {/* third calculator section */}
        <Calculator />
        {/*  bottom stats */}
        <BottomStats />
      </div>
    </div>
  );
};
