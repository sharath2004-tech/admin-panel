import { Conversation } from "@/types/Chat";
import React from "react";
import { formatDistanceToNow } from "date-fns";
interface Props {
  chat: Conversation;
  setSelectedChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
}
const ConversationList: React.FC<Props> = ({ chat, setSelectedChat }) => {
  return (
    <div
      onClick={() => setSelectedChat(chat)}
      className="w-full flex items-center space-x-2  cursor-pointer hover:bg-main-bg dark:hover:bg-main-dark-bg "
    >
      <div key={chat._id} className=" p-3 w-full flex items-center space-x-1">
        <img
          src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          className="w-12 h-12 rounded-full object-cover"
          alt="profile"
        />
        <div className="w-full flex flex-col items-start  ">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-semibold capitalize dark:text-white">
              {chat?.members[0]?.firstName + " " + chat?.members[0]?.lastName}
            </h3>
            {chat?.unread_count && chat?.unread_count >= 1 && (
              <div className="flex items-center justify-center w-5 h-5 bg-blue-bg rounded-full">
                <p className="text-xs  text-white font-medium  text-center">
                  {chat.unread_count}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-gray-400 text-normal text-sm">
              {chat?.last_message?.message}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {formatDistanceToNow(new Date(chat?.last_message?.createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
