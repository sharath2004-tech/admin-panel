import { useTheme } from "@/hooks/useThemeContext";
import { ErrorTextStyle } from "@/styles/TextStyles";
import clsx from "clsx";
import { useField, ErrorMessage } from "formik";
interface TextareaProps {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  disabled,
  name,
  placeholder,
}) => {
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [field] = useField(name);
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
        <textarea
          {...field}
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
          cols={10}
          rows={5}
        ></textarea>
        <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
      </div>
    </div>
  );
};

export default Textarea;
