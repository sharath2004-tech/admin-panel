import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import FileIcon from "@/assets/solar_gallery-linear.svg";
interface OpenCameraProps {
  name: string;
  label?: string;
  maxFiles?: number;
  showImages?: boolean;
  setOpenBottomSheet?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenCamera: React.FC<OpenCameraProps> = ({
  name,
  label,
  maxFiles = 1,
  showImages = true,
  setOpenBottomSheet,
}) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(name);
  const { value } = meta;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      if (maxFiles && maxFiles > 1) {
        const filesArray = Array.from(files);
        setFieldValue(name, [
          ...(value || []),
          ...filesArray.slice(0, maxFiles || filesArray.length),
        ]);
      } else {
        setFieldValue(name, files[0]);
      }
    }
    if (setOpenBottomSheet) {
      setOpenBottomSheet(false);
    }
  };
  return (
    <div className="w-full">
      <label className="font-medium text-xs text-gray-color capitalize">
        {label}
      </label>
      <label>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
        <div
          className="border-dashed 
            rounded-md cursor-pointer w-full p-8 flex 
            items-center space-x-3 justify-center bg-zinc-100 dark:bg-[#2C3345]"
        >
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src={FileIcon}
                alt="Upload Image Icon"
                className="h-16 w-full object-contain"
              />
              <h2 className="text-emerald-500 text-[16px] font-medium">
                Camera
              </h2>
            </div>
          </div>
        </div>
      </label>
      {value && showImages && !Array.isArray(value) && (
        <div className="pt-2">
          <img
            src={FileIcon}
            alt="Upload Image Icon"
            className="h-16 w-full object-contain"
          />
        </div>
      )}
      {/* if max file is greater than one */}
      {value && showImages && Array.isArray(value) && (
        <div className="pt-2">
          {value.map(( i: number) => (
            <img
              key={i}
              src={FileIcon}
              alt="Upload Image Icon"
              className="h-16 w-full object-contain"
            />
          ))}
        </div>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className={"text-xs capitalize text-red-500"}
      />
    </div>
  );
};

export default OpenCamera;
