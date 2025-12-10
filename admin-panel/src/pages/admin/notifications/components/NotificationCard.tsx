import { NotificationData } from "@/types/Notifications";
import React from "react";
import { FaBuysellads, FaUserTie } from "react-icons/fa";
import { format } from "date-fns";
import { AiFillEye } from "react-icons/ai";
import useDynamicMutation from "@/hooks/usePostData";
import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { toast } from "@/hooks/useToast";
import { FiPackage } from "react-icons/fi";
import { MdReport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
interface Props {
  notifications: NotificationData[];
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const NotificationCard = ({ notifications, setStateChange }: Props) => {
  const { token } = useAuth();
  const navigate = useNavigate();
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
          onClick={() => {
            if (notification.broker_request) {
              navigate(
                `/brokers-requests/detail/${notification.broker_request}`
              );
            } else if (notification.broker_package) {
              navigate(
                `/listing-packages/detail/${notification.broker_package}`
              );
            } else if (notification.report) {
              navigate(`/reported-properties/detail/${notification.report}`);
            } else {
              // navigate(`/property/detail/${notification.property}`);
            }
          }}
        >
          <div className="flex items-center space-x-2 w-full">
            {notification.broker_request ? (
              <div className="bg-teal-500 flex items-center justify-center rounded-full  p-2">
                <FaUserTie className="  text-white" />
              </div>
            ) : notification.broker_package ? (
              <div className="bg-amber-500 flex items-center justify-center rounded-full  p-2">
                <FiPackage className="  text-white" />
              </div>
            ) : notification.report ? (
              <div className="bg-rose-500 flex items-center justify-center rounded-full  p-2">
                <MdReport className="  text-white" />
              </div>
            ) : (
              <div className="bg-blue-bg flex items-center justify-center rounded-full  p-2">
                <FaBuysellads className="  text-white" />
              </div>
            )}
            <div>
              <h2 className="font-semibold dark:text-white ">
                {notification.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 ">
                {notification.body}
              </p>
              {notification.priority === "HIGH" && (
                <span className="text-red-500 bg-red-500/20 text-[10px] p-1 rounded-md">
                  Action Required
                </span>
              )}
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
            {/* <div
              title="delete"
              className=" cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 "
            >
              <AiFillDelete className="text-red-500 text-xl" />
            </div> */}
            {!notification.readAt && (
              <div
                onClick={() => markAsReadSubmitHandler(notification._id)}
                title="mark as read"
                className=" cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 "
              >
                <AiFillEye className="text-main-color text-xl" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCard;
