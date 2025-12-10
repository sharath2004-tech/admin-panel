import { NotificationData } from "@/types/Notifications";
import React from "react";
import { FaBuysellads } from "react-icons/fa";
import { format } from "date-fns";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import useDynamicMutation from "@/hooks/usePostData";
import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { toast } from "@/hooks/useToast";
interface Props {
  notifications: NotificationData[];
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const NotificationCard = ({ notifications, setStateChange }: Props) => {
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const notificationMutation = useDynamicMutation();
  const markAsReadSubmitHandler = async (id: string) => {
    try {
      await notificationMutation.mutateAsync({
        url: `notification/read/${id}`,
        method: "PUT",
        headers,
        body: {},
        onSuccess: () => {
          setStateChange((prevState) => !prevState);
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
    <div className="flex flex-col items-start space-y-1 divide-y divide-gray-200 dark:divide-gray-700">
      {notifications?.map((notification) => (
        <div
          key={notification._id}
          className="flex group items-center justify-between gap-2 w-full p-2 cursor-pointer hover:opacity-80"
        >
          <div className="flex items-center space-x-2 w-full">
            <div className="bg-red-500 flex items-center justify-center rounded-full  w-12 h-10">
              <FaBuysellads className="  text-white text-xl" />
            </div>
            <div>
              <h2 className="font-semibold dark:text-white ">
                {notification.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 ">
                {notification.body}
              </p>
              <p className="text-xs font-light dark:text-gray-500">
                {format(
                  new Date(notification.createdAt),
                  "MMMM dd yyyy, h:mm a"
                )}
              </p>
            </div>
          </div>
          {/* actions */}
          <div className="hidden group-hover:flex items-center gap-2 flex-wrap md:flex-nowrap">
            <div
              title="delete"
              className=" cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 "
            >
              <AiFillDelete className="text-red-500 text-xl" />
            </div>
            {!notification.readAt && <div
              onClick={() => markAsReadSubmitHandler(notification._id)}
              title="mark as read"
              className=" cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 "
            >
              <AiFillEye className="text-main-color text-xl" />
            </div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCard;
