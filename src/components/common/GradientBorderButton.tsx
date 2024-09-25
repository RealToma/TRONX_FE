import React from "react";

interface GradientBorderButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const GradientBorderButton: React.FC<GradientBorderButtonProps> = ({
  text,
  onClick,
  className = ""
}) => {
  return (
    <div
      className={`relative inline-block p-[2px] rounded-full ${className}`}
      style={{
        background: "linear-gradient(to right, #C23631, #000)", // Gradient border background
        borderRadius: "6px" // Ensures the outer wrapper is fully rounded
      }}
    >
      <button
        onClick={onClick}
        className={`
          relative bg-[#fff] hover:text-[#C23631] transition-all duration-300 rounded-full px-6 py-2 text-black font-medium 
          min-w-[254px] flex items-center justify-center
        `}
        style={{
          borderRadius: "6px" // Ensures the button itself is fully rounded
        }}
      >
        {text}
      </button>
    </div>
  );
};
