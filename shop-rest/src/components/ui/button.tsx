import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "normal" | "outline" | "custom";
  size?: "big" | "medium" | "small";
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
}
const classes = {
  root: "inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700",
  normal:
    "bg-blue-500 text-light border border-transparent hover:bg-blue-600",
  custom: "border border-transparent",
  outline:
    "border border-border-400 bg-transparent text-lg  hover:text-light bg-magenta text-white hover:bg-red-600 hover:border-accent",
  loading:
    "h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin",
  disabled:
    "border border-border-base bg-gray-300 border-border-400 text-body cursor-not-allowed",
  disabledOutline: "border border-border-base text-muted cursor-not-allowed",
  small: "px-3 py-0 h-9 text-sm h-10",
  medium: "px-5 py-0 h-12",
  big: "px-10 py-0 h-14",
  rounded: 'bg-red-500 focus:shadow focus:bg-accent focus:border-gray-400 rounded-full',
  simple: 'border font-bold text-xl text-white border-[#2e6da4]  ml-4 w-[91%] h-[50px] mt-8 bg-[#337ab7]',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "normal",
      size = "medium",
      children,
      active,
      loading = false,
      disabled = false,
      ...rest
    } = props;
    const classesName = cn(
      classes.root,
      {
        [classes.normal]: !disabled && variant === "normal",
        [classes.disabled]: disabled && variant === "normal",
        [classes.outline]: !disabled && variant === "outline",
        [classes.disabledOutline]: disabled && variant === "outline",
        [classes.small]: size === "small",
        [classes.medium]: size === "medium",
        [classes.big]: size === "big",
      },
      className
    );

    return (
      <button
        aria-pressed={active}
        data-variant={variant}
        ref={ref}
        className={classesName}
        disabled={disabled}
        {...rest}
      >
        {children}
        {loading && (
          <span
            className={classes.loading}
            style={{
              borderTopColor:
                variant === "outline" ? "currentColor" : "#ffffff",
            }}
          />
        )}
      </button>
    );
  }
);

export default Button;
