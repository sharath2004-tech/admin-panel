import { Message } from "@/types/Chat";
import React from "react";
import { format } from "date-fns";
interface Props {
  message: Message;
  own: boolean;
}
const MessageList: React.FC<Props> = ({ message, own }) => {
  return (
    <div
      className={`flex flex-col w-full ${
        own ? "items-end justify-end self-end " : ""
      }`}
    >
      <div className="flex ">
        <div className={` ${own ? "rounded-l-lg bg-blue-bg pl-5" : "rounded-r-lg bg-rose-500 pr-5"} flex flex-col w-fit  rounded-md items-end p-2 `}>
          <p className="p-[2px]  text-sm rounded-lg  text-white max-w-xs flex items-center justify-start">
            {message.message}
          </p>
          <p className="text-xs font-light text-gray-200 ">
            {" "}
            {format(new Date(message?.createdAt), "H:mm a", {
              useAdditionalDayOfYearTokens: false,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
