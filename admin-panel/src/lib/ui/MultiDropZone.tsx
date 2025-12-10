/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import { BsFillImageFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { ErrorTextStyle } from "@/styles/TextStyles";
import { toast } from "@/hooks/useToast";
export interface Accept {
  [key: string]: string[];
}

interface ReusableDropzoneProps {
  name: string;
  maxFiles: number;
  label: string;
  accept?: Accept;
  showImages?: boolean;
  setOpenBottomSheet?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultipleDropZone: React.FC<ReusableDropzoneProps> = ({
  name,
  maxFiles,
  label,
  accept,
  showImages = true,
  setOpenBottomSheet,
}) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [meta] = useField(name);
  const { value } = meta;
  const [images, setImages] = React.useState<File[] | undefined>(undefined);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    const files = [...acceptedFiles, ...values[name]];
    setImages(files);
    setFieldValue(name, files.slice(0, maxFiles));
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setFieldValue(name, [
        ...(values[name] || []),
        ...files.slice(0, maxFiles),
      ]);
      setImages([...(images || []), ...files.slice(0, maxFiles)]);
    }
    if (setOpenBottomSheet) {
      setOpenBottomSheet(false);
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    maxSize: 3 * 1024 * 1024, // 30 MB
    maxFiles,
    onDrop: handleDrop,
    accept: accept
      ? accept
      : {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "image/webp": [".webp"], // Add webp file format
          // Add more file types if needed
        },
    onDropRejected() {
      toast({
        title: "",
        description: "Invalid File Format",
        variant: "info",
      });
    },
  };

  return (
    <div className="w-full">
      <label
        className="
      block 
      text-xs
      font-medium 
      leading-6 
      text-gray-900
      capitalize
      dark:text-gray-300
    "
      >
        {label}
      </label>
      <Dropzone {...dropzoneOptions}>
        {({ getRootProps, getInputProps, isDragReject, isDragActive }) => (
          <section className="w-full flex flex-col items-start space-y-2">
            <div
              {...getRootProps()}
              className={`border ${
                isDragActive
                  ? "border-main-color border-2 bg-main-green-bg"
                  : isDragReject
                  ? "border-red-500"
                  : "bg-zinc-100"
              } border-dashed 
              rounded-md cursor-pointer w-full p-8 flex 
              items-center space-x-3 justify-center bg-zinc-100 dark:bg-main-dark-bg`}
              onClick={handleClick}
            >
              <input
                {...getInputProps()}
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="flex flex-col items-center justify-center">
                <BsFillImageFill className="h-16 w-full object-contain dark:text-white" />
                <h2 className="text-main-color text-[16px] font-medium">
                  Images
                </h2>
                <p className="text-xs font-normal dark:text-gray-400">
                  Supported Images Formats include: jpeg, jpg, png, webp.
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {value && showImages && Array.isArray(value) && (
        <div className="flex items-center gap-2 flex-wrap">
          {value.map((file: File) => (
            <div className="relative">
              <img
                key={file.name}
                src={URL.createObjectURL(file)}
                alt=""
                className="h-24 w-full object-contain"
              />
              <div
                className="red-500 rounded-l-lg p-1 text-sm bg-white hover:bg-white/50
       absolute top-1 right-0 cursor-pointer"
                onClick={() => {
                  setFieldValue(
                    name,
                    values[name].filter((e: File) => e !== file)
                  );
                }}
              >
                <MdDelete size={20} className="text-red-500" />
              </div>
            </div>
          ))}
        </div>
      )}
      <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
    </div>
  );
};

export default MultipleDropZone;
