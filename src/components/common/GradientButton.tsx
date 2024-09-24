import React, { useState } from "react";

interface GradientButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  text = "Get Your Invitation Link",
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
          py-4 px-[30px] sm:px-[45px] md:px-[85px] rounded-[7px]
          text-base md:text-xl font-bold uppercase tracking-wide 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          relative overflow-hidden transition-transform transform duration-500 ease-in-out
          ${className}
        `}
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #a5e7f1, #866ffe)"
          : "linear-gradient(135deg, #866ffe, #a5e7f1)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 5s ease infinite",
        boxShadow: isHovered
          ? "0 4px 6px rgba(0, 0, 0, 0.5)"
          : "0 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span className="relative z-10 text-[#a5e7f1] mix-blend-overlay  animate-pulse-blur">
        {text}
      </span>
      <span
        className="absolute inset-0 z-0 animate-text-glow"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.3), transparent)",
          filter: "blur(12px)",
        }}
      />
    </button>
  );
};
