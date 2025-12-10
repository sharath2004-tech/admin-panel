import { systemTheme } from "@/constants/Color";
import { useTheme } from "@/hooks/useThemeContext";
import { ErrorTextStyle } from "@/styles/TextStyles";
import clsx from "clsx";
import { useField, ErrorMessage } from "formik";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
interface PasswordInputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}
const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  disabled,
  name,
}) => {
  const [field] = useField(name);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { currentTheme } = useTheme();
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
        <div className="flex w-full bg-white font-medium dark:border-gray-700 dark:bg-main-dark-bg  text-gray-800  rounded-sm border border-gray-300  items-center">
          <input
            type={showPassword ? "text" : "password"}
            {...field}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
              `w-full bg-transparent 
              font-medium p-[6px] 
               focus:ring-2
                ring-main-color 
                dark:ring-gray-600
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
          <div
            className="px-2 h-fit cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <AiFillEyeInvisible
                size={22}
                className={`  ${
                  currentTheme === "dark" ||
                  (currentTheme === "dark" && systemTheme)
                    ? "text-white "
                    : "text-gray-900"
                }text-light-gray-color`}
              />
            ) : (
              <AiFillEye
                size={22}
                className={`  ${
                  currentTheme === "dark" ||
                  (currentTheme === "dark" && systemTheme)
                    ? "text-white "
                    : "text-gray-900"
                }text-light-gray-color`}
              />
            )}
          </div>
        </div>
        <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
      </div>
    </div>
  );
};

export default PasswordInput;

//   <div className="mt-1 flex items-center w-full border border-gray-300 rounded-sm ">
//     <input
//       ref={passwordRef}
//       type={showPassword ? "text" : "password"}
//       placeholder="Password"
//       className="w-full p-[10px] focus:outline-none ring-0 font-medium text-gray-color"
//       required
//     />
// <div
//   className="px-2 h-fit cursor-pointer"
//   onClick={() => setShowPassword(!showPassword)}
// >
//   {!showPassword ? (
//     <AiFillEyeInvisible size={22} className="text-light-gray-color" />
//   ) : (
//     <AiFillEye size={22} className="text-light-gray-color" />
//   )}
// </div>
//   </div>
