import { NotificationData } from "@/types/Notifications";
import { FaBuysellads, FaUserTie } from "react-icons/fa";
import { format } from "date-fns";
import useDynamicMutation from "@/hooks/usePostData";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { toast } from "@/hooks/useToast";
import { FiPackage } from "react-icons/fi";
import { MdReport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useThemeContext";
interface Props {
  notifications: NotificationData[];
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const Notification = ({ notifications, setStateChange }: Props) => {
  const notificationMutation = useDynamicMutation();
  const { token, user } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const headers = getHeaders({ type: "Json", token });
  const markAllAsReadSubmitHandler = async () => {
    try {
      await notificationMutation.mutateAsync({
        url: `notification/read/all/${user?._id}`,
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
    <div
      className={` ${
        currentTheme === "dark" ? "divide-gray-600" : "divide-gray-200"
      } flex flex-col items-start   divide-y  w-full`}
    >
      <div className="px-2 pt-2 flex items-center justify-between w-full">
        <h4 className="font-Normal">Notifications</h4>
        <p
          className="text-xs font-light cursor-pointer "
          onClick={markAllAsReadSubmitHandler}
        >
          Mark All As Read
        </p>
      </div>
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className="flex items-center space-x-2 w-full p-2 cursor-pointer hover:opacity-50 duration-500"
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
            <h2 className="font-medium text-[15px]  dark:text-white line-clamp-1">
              {notification.title}
            </h2>
            <p
              className={`
            ${currentTheme === "dark" ? "text-gray-300" : "text-gray-800"}
             font-normal text-sm   line-clamp-1`}
            >
              {notification.body}
            </p>
            <p className="text-[10px] font-light dark:text-gray-500">
              {format(new Date(notification.createdAt), "MMMM dd yyyy, h:mm a")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
