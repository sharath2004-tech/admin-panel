import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import React, { useState } from "react";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Role } from "@/types/Auth";
import NotificationCard from "./components/NotificationCard";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
const Notification: React.FC = () => {
  const notificationMutation = useDynamicMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const notificatioData = useFetchData(
    ["notificationDataApi", currentPage, stateChange],
    user?.role === Role.Admin
      ? `notification/admin/all/${user?._id}?page=${currentPage}`
      : `notification/user/all/${user?._id}?page=${currentPage}`,
    headers
  );
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
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Notifications">
        <p
          className="text-xs font-medium cursor-pointer dark:text-gray-400"
          onClick={markAllAsReadSubmitHandler}
        >
          Mark All As Read
        </p>
      </HeaderContainer>
      <div className="w-full ">
        {notificatioData.isFetched && notificatioData.isSuccess ? (
          <div className="w-full">
            {notificatioData?.data?.pagination?.data?.length > 0 ? (
              <NotificationCard
                notifications={notificatioData?.data?.pagination?.data}
                setStateChange={setStateChange}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-20">
                <p className="text-gray-500 text-sm">No Notifications</p>
              </div>
            )}
            <div className="flex items-center justify-center space-x-2">
              {notificatioData?.data?.pagination?.hasPrevPage && (
                <Button onClick={() => setCurrentPage((prev) => prev - 1)}>
                  Prev
                </Button>
              )}
              {notificatioData?.data?.pagination?.hasNextPage && (
                <Button onClick={() => setCurrentPage((prev) => prev + 1)}>
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : (
          <MainLoader />
        )}
      </div>

      {notificatioData.isFetched && notificatioData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default Notification;
