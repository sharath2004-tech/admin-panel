import { DotPulse, DotSpinner } from "@uiball/loaders";
import { MainColor } from "./Color";
//default page loader
export const MainLoader = () => {
  return (
    <div className="flex items-center py-14 justify-center w-full ">
      <DotSpinner color={MainColor} size={60} speed={1.3} />
    </div>
  );
};

export const ButtonLoader = () => {
  return (
    <div className="py-2 px-4">
      <DotPulse color={"white"} size={30} />
    </div>
  );
};
