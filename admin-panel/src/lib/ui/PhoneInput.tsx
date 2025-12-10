import { ErrorTextStyle } from "@/styles/TextStyles";
import clsx from "clsx";
import { useField, ErrorMessage } from "formik";
interface PhoneInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  type = "tel",
  placeholder,
  disabled,
  name,
}) => {
  const [field] = useField(name);
  return (
    <div className="w-full">
      <label
        className="  block 
            text-sm 
            font-medium 
            leading-6 
            text-gray-900
            capitalize
            dark:text-light-gray"
      >
        {label}
      </label>
      <div className="mt-1">
        <div className="flex w-full bg-white dark:bg-transparent font-medium  text-gray-800  rounded-sm border dark:border-gray-700 border-gray-300  items-center">
          <span
            className="border-r border-gray-300 dark:border-gray-700 text-dark-gray dark:text-light-gray font-semibold text-sm
                h-full flex flex-grow text-center px-2 items-center justify-center "
          >
            251
          </span>
          <input
            type={type}
            {...field}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
              `w-full h-full p-[6px] focus:ring-2 ring-blue-500  dark:ring-gray-600  bg-transparent dark:text-white focus:outline-none ring-0 font-normal`,
              disabled && "opacity-50 cursor-default"
            )}
          />
        </div>
        <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
      </div>
    </div>
  );
};

export default PhoneInput;
