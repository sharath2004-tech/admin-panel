/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Dropzone, { DropzoneOptions } from "react-dropzone";
// import FileIcon from "../../assets/solar_gallery-linear.svg";
import { ErrorTextStyle } from "@/styles/TextStyles";
import { BiSolidVideos } from "react-icons/bi";
import { useTheme } from "@/hooks/useThemeContext";
import { toast } from "@/hooks/useToast";
export interface Accept {
  [key: string]: string[];
}

interface ReusableVideoInputProps {
  name: string;
  maxFiles?: number;
  label: string;
  accept?: Accept;
}

const ReusableVideoInput: React.FC<ReusableVideoInputProps> = ({
  name,
  maxFiles = 1,
  label,
  accept,
}) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(name);
  const { value } = meta;
  const [, setImage] = React.useState<string | undefined>(undefined);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      setFieldValue(name, file);
      setImage(URL.createObjectURL(file));
    },
    [name, setFieldValue]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFieldValue(name, file);
      setImage(URL.createObjectURL(file));
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    maxSize: 3 * 1024 * 1024, // 30 MB
    maxFiles,
    onDrop: handleDrop,
    accept: accept
      ? accept
      : {
          "video/mp4": [".mp4"],
          "video/webm": [".webm"],
          "video/quicktime": [".mov"],
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
        className={`
    ${
      currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
        ? "text-white "
        : "text-gray-900"
    }
        block 
        text-xs
        font-medium 
        leading-6 
        capitalize
      `}
      >
        {label}
      </label>

      <Dropzone {...dropzoneOptions}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }: any) => (
          <section className="w-full flex flex-col items-start space-y-2 mt-1">
            <div
              {...getRootProps()}
              onClick={handleClick}
              className={`border ${
                isDragActive
                  ? "border-main-color border-2 bg-main-green-bg"
                  : isDragReject
                  ? "border-red-500"
                  : ""
              } border-dashed 
              rounded-md cursor-pointer w-full p-8 flex 
              items-center space-x-3 justify-center 
              
              ${
                currentTheme === "dark" ||
                (currentTheme === "dark" && systemTheme)
                  ? "text-white bg-main-dark-bg "
                  : "bg-zinc-100"
              }
              `}
            >
              <input
                {...getInputProps()}
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="flex flex-col items-center justify-center">
                <BiSolidVideos className="h-16 w-full object-contain dark:text-white" />
                <h2 className="text-main-color text-[16px] font-medium">
                  Video File
                </h2>
                <p className="text-xs font-normal dark:text-gray-400">
                  Supported Video Formts mp4,webm,mov and max
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {value && (
        <div className="pt-2">
          {/* <img
            src={URL.createObjectURL(value)}
            alt=""
            className="h-20 w-full object-contain"
          /> */}
          <video
            src={URL.createObjectURL(value)}
            autoPlay
            loop
            className="h-44 w-full"
          ></video>
        </div>
      )}
      <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
    </div>
  );
};

export default ReusableVideoInput;
``;
