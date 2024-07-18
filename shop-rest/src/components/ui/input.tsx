import cn from "classnames";
import React, { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline" | "line";
  dimension?: "small" | "medium" | "big";
}

const variantClasses = {
  border_less: 'border w-32 rounded mx-auto bg-gray-100 text-xl',
  normal:
    "bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-blue-600",
  solid:
    "bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-blue-600",
  outline: "border border-border-base rounded focus:border-accent",
  line: "ps-0 border-b border-border-base rounded-none focus:border-accent",
  rounded: ' bg-gray-100 focus:shadow focus:bg-light focus:border-gray-400 rounded-full',
  border: 'border-2 border-gray-400 rounded',
  simple: 'border  ml-4 w-[91%] h-[40px] bg-[#eee]',
};

const sizeClasses = {
  small: "text-sm h-10",
  medium: "h-12",
  big: "h-14",
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      pattern,
      className,
      maxLength,
      label,
      name,
      error,
      children,
      variant = "normal",
      dimension = "medium",
      shadow = false,
      disabled = false,
      type = "text",
      inputClassName,
      ...rest
    },
    ref
  ) => { 
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="block text-gray-700 font-semibold text-sm lg:text-md tracking-wide leading-none mb-3"
          >
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          inputMode={type === "number" ? "numeric" : 'text'}
          ref={ref}
          pattern={pattern}
          className={cn(
            "px-2 lg:px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm sm:text-sm focus:outline-none focus:ring-0",
            shadow && "focus:shadow",
            variantClasses[variant],
            sizeClasses[dimension],
            disabled && "bg-gray-100 cursor-not-allowed",
            inputClassName
          )}
          
          maxlength={maxLength}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="on"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Input;
