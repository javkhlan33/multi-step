import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  showForwardArrow?: boolean;
  showBackArrow?: boolean;
};

export function Button({
  children,
  variant = "primary",
  showForwardArrow = false,
  showBackArrow = false,
  className = "",
  disabled,
  type,
  ...props
}: ButtonProps) {
  if (variant === "secondary") {
    return (
      <button
        type={type ?? "button"}
        disabled={disabled}
        className={`flex items-center justify-center w-32 h-[44px] gap-x-3 rounded-md border border-[#CBD5E1] bg-white text-[#121316] transition-all duration-300 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-[#0CA5E9] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {showBackArrow && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/icons/back-arrow-icon.svg"
            width={7}
            height={12}
            alt=""
            aria-hidden
          />
        )}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      type={type ?? "submit"}
      disabled={disabled}
      className={`flex flex-1 items-center justify-center h-[44px] gap-x-3 rounded-md bg-[#121316] text-white transition-all duration-300 hover:opacity-80 focus:outline focus:outline-2 focus:outline-[#0CA5E9] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
      {showForwardArrow && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/icons/forward-arrow-icon.svg"
          width={7}
          height={12}
          alt=""
          aria-hidden
        />
      )}
    </button>
  );
}
