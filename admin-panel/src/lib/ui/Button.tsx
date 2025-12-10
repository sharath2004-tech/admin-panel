import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  px?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  px,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        ` 
        flex 
        justify-center 
        rounded-md 
        py-[10px] 
       text-xs md:text-sm 
        font-normal 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
        disabled && "opacity-50 cursor-default  ",
        fullWidth && "w-full ",
        !fullWidth && `px-[${px}]`,
        !px && !fullWidth && "px-8",
        secondary ? "text-white" : "text-white",
        danger && "bg-red-500  focus-visible:outline-red-600",
        !secondary && !danger && "bg-blue-bg ",
        secondary && "bg-stone-600 ",
        !disabled && " hover:opacity-90"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
