import { useTheme } from "@/hooks/useThemeContext";
import { ErrorTextStyle } from "@/styles/TextStyles";
import clsx from "clsx";
import { useField, ErrorMessage } from "formik";
interface InputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  disabled,
  name,
  placeholder,
}) => {
  const [field] = useField(name);
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <div className="w-full">
      <label
        className={`
        ${
          currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
            ? "text-white "
            : "text-gray-900"
        }
            block 
            text-xs 
            font-medium
            leading-3
            capitalize
          `}
      >
        {label}
      </label>
      <div className="mt-1">
        <input
        autoComplete="off"
          {...field}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            `w-full bg-transparent 
            font-medium p-[6px] 
             focus:ring-2
              ring-main-color 
              dark:ring-main-color 
              rounded-sm border
               border-gray-300
               dark:border-gray-700
               placeholder-gray-400
               dark:placeholder-gray-700
               dark:text-white
               dark:bg-main-dark-bg
               focus:outline-none ring-0
               ${
                 currentTheme === "dark" ||
                 (currentTheme === "dark" && systemTheme)
                   ? "text-white bg-main-dark-bg border-gray-700 placeholder-gray-700 ring-gray-600"
                   : "text-gray-900"
               }
               `
          )}
        />
        <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
      </div>
    </div>
  );
};

export default Input;
