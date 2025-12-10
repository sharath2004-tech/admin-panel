/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useField, ErrorMessage } from "formik";
import { ErrorTextStyle } from "@/styles/TextStyles";
import { useTheme } from "@/hooks/useThemeContext";

interface SelectProps {
  label: string;
  name: string;
  options: any[]; // Replace 'any' with the type of your options array
  defaultValue?: any;
  isSearchable?: boolean;
  placeholder?: string;
  onChange: (value: any) => void;
  formatOptionLabel?: (option: any) => React.ReactNode;
  onBlur?: () => void;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  noOptionsMessage: () => string;
  disabled?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  value?: any;
}

const CreatableCustomSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  formatOptionLabel,
  isSearchable = false,
  placeholder,
  onChange,
  onBlur,
  noOptionsMessage,
  disabled,
  isLoading = false,
  isMulti = false,
  value,
}) => {
  const { currentTheme } = useTheme();
  const [, , helpers] = useField(name);
  // const { value } = meta;

  const { setValue, setTouched } = helpers;
  const handleSelectChange = (selectedOption: any) => {
    setValue(selectedOption);
    onChange(selectedOption);
  };
  const handleBlur = () => {
    setTouched(true);
    onBlur && onBlur();
  };

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const customStyles = (): StylesConfig => ({
    control: (base, state) => ({
      ...base,
      background:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#161c24"
          : "#fff", // Set background color to black for the dark theme
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#374151"
          : "#d1d5db",
      color:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#fff"
          : "#1D212E",
      padding: 2,
      fontWeight: "500",
    }),
    menu: (base) => ({
      ...base,
      color:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#fff"
          : "#1D212E",
      background: currentTheme === "light" ? "#fff" : "transparent",
      fontWeight: "500",
    }),
    menuList: (base) => ({
      ...base,
      background:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#161c24"
          : "#fff", // Set background color to black for the dark theme
      color:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#fff"
          : "#1D212E",
      fontWeight: "500",
    }),
    option: (base) => ({
      ...base,
      background:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#161c24"
          : "white",
      color:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "white"
          : "#111827",
      fontWeight: "500",
    }),
    multiValue: (base) => ({
      ...base,
      background:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "#f1c22e"
          : "#f1c22e",
      color:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "white"
          : "white", // You can set the text color to be light for both themes
    }),
    singleValue: (base) => ({
      ...base,
      color:
        currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
          ? "white"
          : "black", // Set the text color for the selected value
    }),
  });

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
           font-light 
           leading-3
           capitalize
         `}
      >
        {label}
      </label>
      <div className="mt-1">
        <CreatableSelect
          // {...field}
          // isClearable
          name={name}
          value={value}
          options={options}
          isMulti={isMulti}
          defaultValue={defaultValue}
          isSearchable={isSearchable}
          placeholder={placeholder}
          styles={customStyles()}
          onChange={handleSelectChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          onBlur={handleBlur}
          className="w-full font-medium"
          noOptionsMessage={noOptionsMessage}
          isDisabled={disabled}
          isLoading={isLoading}
          formatOptionLabel={formatOptionLabel}
          // isClearable={true}
        />
        <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
      </div>
    </div>
  );
};

export default CreatableCustomSelect;
