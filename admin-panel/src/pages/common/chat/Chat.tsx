import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { Conversation, Message } from "@/types/Chat";
import { useRef, useState } from "react";
import ConversationList from "./components/ConversationList";
import MessageList from "./components/MessageList";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import { MainLoader } from "@/constants/Loader";
import { BsArrowLeftShort, BsFillSendFill } from "react-icons/bs";
import NoChat from "@/assets/NoChat.svg";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import ErrorBoundary from "@/components/ErrorBoundary";
const Chat = () => {
  const messageMutation = useDynamicMutation();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [stateMessageChange, setMessageStateChange] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const { token, user } = useAuth();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const headers = getHeaders({ type: "Json", token });
  const conversationData = useFetchData(
    ["conversationDataApi", stateChange],
    `chat/get-my-chats/${user?._id}`,
    headers
  );
  const enabled = !!selectedChat;
  const messagesData = useFetchData(
    ["messagesDataApi", stateMessageChange, selectedChat],
    `messages/get-messages/${user?._id}/${selectedChat?.members[0]?._id}`,
    headers,
    undefined,
    undefined,
    enabled
  );

  //SEND MESSAGE POST REQUEST
  const sendMessageSubmitHandler = async () => {
    try {
      await messageMutation.mutateAsync({
        url: `messages/send-message`,
        method: "POST",
        headers,
        body: {
          message: messageText,
          sender: user?._id,
          receiver: selectedChat?.members[0]?._id,
        },
        onSuccess: () => {
          setMessageStateChange((prev) => !prev);
          scrollRef.current &&
            scrollRef?.current.scrollIntoView({ behavior: "smooth" });
        },
        onError: (err) => {
          toast({
            title: "Error.",
            description: err?.response?.data?.message,
            variant: "danger",
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-full relative">
    
        {conversationData.isFetched && conversationData.isSuccess ? (
          conversationData?.data?.length > 0 ? (
            <div className="hidden md:grid grid-cols-12 rounded-md bg-white dark:bg-secondary-dark-bg my-transition border dark:border-gray-700 ">
              <div className="col-span-4   flex flex-col items-start space-y-1 w-full border-r dark:border-gray-700 border-dashed">
                <h2 className="p-3  font-bold text-xl text-gray-700 dark:text-white">
                  Chats
                </h2>
                <SimpleBarReact className="h-[450px] w-full">
                  {conversationData?.data?.map((chat: Conversation) => (
                    <ConversationList
                      chat={chat}
                      setSelectedChat={setSelectedChat}
                    />
                  ))}
                </SimpleBarReact>
              </div>
              {/* message screen */}
              <div className="col-span-8 flex flex-col items-start space-y-1 w-full">
                {selectedChat ? (
                  <div className="flex flex-col items-start space-y-2 w-full">
                    <div className="p-2 w-full flex items-start space-x-2  dark:bg-main-dark-bg">
                      <img
                        src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                        className="w-12 h-12 rounded-full object-cover"
                        alt="profile"
                      />
                      <div>
                        <h3 className="font-semibold capitalize dark:text-white">
                          {selectedChat?.members[0]?.firstName +
                            " " +
                            selectedChat?.members[0]?.lastName}
                        </h3>
                        <p className="text-gray-400 text-xs">online</p>
                      </div>
                    </div>
                    <SimpleBarReact className="h-[375px] w-full">
                      {messagesData.isFetched && messagesData.isSuccess ? (
                        <div className="p-2 flex flex-col items-start space-y-3 w-full">
                          {messagesData?.data?.reverse()?.map((message: Message) => (
                            <div ref={scrollRef} className={`w-full  `}>
                              <MessageList
                                message={message}
                                own={message.sender?._id == user?._id}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-5 w-full">
                          <MainLoader />
                        </div>
                      )}
                    </SimpleBarReact>
                    <div className="p-1 flex items-center w-full bg-gray-200 dark:bg-secondary-dark-bg">
                      <div className="flex items-center bg-gray-100 dark:bg-main-dark-bg p-2 rounded-full w-full">
                        <input
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="flex h-8 flex-grow bg-transparent focus:outline-none dark:text-white pl-5"
                        />
                        <button
                          onClick={() => {
                            sendMessageSubmitHandler();
                            setMessageText("");
                          }}
                          disabled={!messageText || messageMutation.isLoading}
                          className={`disabled:cursor-not-allowed disabled:opacity-50 bg-blue-500 text-white  p-3 rounded-full`}
                        >
                          <BsFillSendFill />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="md:col-span-7 flex items-center justify-center w-full h-full bg-white dark:bg-secondary-dark-bg my-transition">
                    <p className="font-medium dark:text-gray-300">
                      Select Chat to start Messaging
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src={NoChat} alt="" className="h-80" />
              <h4 className="text-center font-semibold dark:text-gray-400 max-w-sm">
                You didn't start any chat with agents, once you connect your
                chats appers here!
              </h4>
            </div>
          )
        ) : (
          <MainLoader />
        )}

      {/* for mobile screen */}
      <div className="flex md:hidden w-full">
        {!selectedChat ? (
          <section className="  bg-white dark:bg-secondary-dark-bg my-transition w-full rounded-md flex flex-col items-start ">
            <h2 className="p-3  font-bold text-xl text-gray-700 dark:text-white">
              Chats
            </h2>
            {conversationData?.isFetched && conversationData.isSuccess ? (
              conversationData?.data?.map((chat: Conversation) => (
                <ConversationList
                  chat={chat}
                  setSelectedChat={setSelectedChat}
                />
              ))
            ) : (
              <MainLoader />
            )}
          </section>
        ) : (
          <section className="h-full relative  w-full flex flex-col items-start space-y-3 bg-white dark:bg-main-dark-bg my-transition  rounded-md">
            <button
              onClick={() => setSelectedChat(null)}
              className="inline-flex items-center bg-main-bg dark:bg-secondary-dark-bg p-2"
            >
              <BsArrowLeftShort className="dark:text-white" />
              <p className="font-medium dark:text-white">Back</p>
            </button>
            <div className="p-2 w-full flex items-start space-x-2 bg-white dark:bg-main-dark-bg">
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                className="w-12 h-12 rounded-full object-cover"
                alt="profile"
              />
              <div>
                <h3 className="font-semibold capitalize dark:text-white">
                  {selectedChat?.members[0]?.firstName +
                    " " +
                    selectedChat?.members[0]?.lastName}
                </h3>
                <p className="text-gray-400 text-xs">online</p>
              </div>
            </div>
            <SimpleBarReact className={`w-full  h-[calc(100vh-100px)] pb-20`}>
              {messagesData.isFetched && messagesData.isSuccess ? (
                <div className="p-2 flex flex-col items-start space-y-3 w-full">
                  {messagesData?.data?.reverse()?.map((message: Message) => (
                    <div ref={scrollRef} className={`w-full  `}>
                      <MessageList
                        message={message}
                        own={message.sender?._id == user?._id}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <MainLoader />
              )}
            </SimpleBarReact>
            {/* input */}
            <div className="fixed z-50 bottom-0 left-0 right-0 p-1 flex items-center w-full bg-gray-200 dark:bg-secondary-dark-bg">
              <div className="flex items-center bg-gray-100 dark:bg-main-dark-bg p-2 rounded-full w-full">
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex h-10 flex-grow bg-transparent focus:outline-none dark:text-white pl-5"
                />
                <button
                  onClick={() => {
                    sendMessageSubmitHandler();
                    setMessageText("");
                  }}
                  disabled={!messageText || messageMutation.isLoading}
                  className={`disabled:cursor-not-allowed disabled:opacity-50 bg-blue-500 text-white  p-3 rounded-full`}
                >
                  <BsFillSendFill />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
      {conversationData.isFetched && conversationData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default Chat;
