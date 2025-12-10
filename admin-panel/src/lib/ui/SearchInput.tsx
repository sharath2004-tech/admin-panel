import React from "react";

interface SearchInputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onChange }) => {
  return (
    <div className="py-1">
      <input
        placeholder={placeholder}
        type="search"
        className=" bg-transparent dark:text-white font-normal p-[6px] text-gray-800 focus:ring-2
        ring-blue-500 rounded-sm border border-gray-300  focus:outline-none ring-0"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
