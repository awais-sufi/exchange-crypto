"use client";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

export const PrimaryButton = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity" />
      <span className="relative flex items-center justify-center gap-2 text-white">
        {children}
      </span>
    </button>
  );
};

export const SuccessButton = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 hover:opacity-100 transition-opacity" />
      <span className="relative flex items-center justify-center gap-2 text-white">
        {children}
      </span>
    </button>
  );
};
