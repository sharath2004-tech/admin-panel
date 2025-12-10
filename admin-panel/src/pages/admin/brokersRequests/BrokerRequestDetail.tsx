import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
import { BrokerRequestStatus } from "@/types/Common";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsPinMapFill } from "react-icons/bs";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import Button from "@/lib/ui/Button";
import clsx from "clsx";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";

enum ActionType {
  Accept = "Accept",
  Reject = "Reject",
}

const BrokerRequestDetail = () => {
  const { id } = useParams();
  const { currentTheme } = useTheme();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [freeListingQuota, setFreeListingQuota] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [actionType, setActionType] = useState<ActionType>(ActionType.Accept);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const requestMutation = useDynamicMutation();
  const requestDetailData = useFetchData(
    ["BrokersRequestDetailDataApi", id, stateChange],
    `broker-request/detail/${id}`,
    headers
  );
  const changeRequestStatusHandler = async () => {
    try {
      await requestMutation.mutateAsync({
        url:
          actionType === ActionType.Accept
            ? `broker-request/accept/${id}`
            : `broker-request/reject/${id}`,
        method: "PUT",
        headers,
        body:
          actionType === ActionType.Accept
            ? {
                freeListingQuota: Number(freeListingQuota),
                freeListingQuotaRemaining: Number(freeListingQuota),
              }
            : { message },
        onSuccess: () => {
          toast({
            title: "Success!.",
            description:
              actionType === ActionType.Accept
                ? "Request Accepted Successfully"
                : "Request Rejected Successfully",
            variant: "success",
          });
          setIsConfirmModalOpen(false);
          setStateChange((prev) => !prev);
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
    <div className="bg-white  dark:bg-secondary-dark-bg p-3 rounded-md">
      <div className="w-full flex flex-col items-start gap-3">
        {requestDetailData.isFetched && requestDetailData.isSuccess ? (
          <div className="flex flex-col items-start w-full space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-5 divide-y md:divide-y-0  md:divide-x">
              <section className="flex items-start gap-2 md:gap-4">
                <img
                  src={requestDetailData?.data?.logo}
                  alt="broker logo"
                  className="h-16 md:h-28 rounded-md  object-contain "
                />
                <div className="flex flex-col items-start space-y-1">
                  <h4 className="font-bold text-xl dark:text-gray-300 capitalize">
                    {requestDetailData?.data.companyName}
                  </h4>
                  <div className="flex items-center gap-1">
                    <MdEmail className="text-main-color" />
                    <p className="font-normal dark:text-gray-300">
                      {requestDetailData?.data.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsFillTelephoneFill className="text-main-color" />
                    <p className="font-normal dark:text-gray-300">
                      {requestDetailData?.data.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsPinMapFill className="text-main-color" />
                    <p className="font-normal dark:text-gray-300">
                      {requestDetailData?.data.address}
                    </p>
                  </div>
                </div>
              </section>
              {/* user */}
              <section className="flex items-start gap-2 md:gap-4 md:justify-center pt-2 md:pt-0">
                <img
                  src={requestDetailData?.data?.user?.profile_image}
                  alt="user profile image"
                  className="h-20 md:h-28 rounded-md  object-contain "
                />
                <div className="flex flex-col items-start space-y-1">
                  <h4 className="font-bold text-xl dark:text-gray-300 capitalize">
                    {requestDetailData?.data.user?.firstName +
                      " " +
                      requestDetailData?.data.user?.lastName}
                  </h4>
                  <div className="flex items-center gap-1">
                    <MdEmail className="text-main-color" />
                    <p className="font-normal dark:text-gray-300">
                      {requestDetailData?.data?.user?.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsFillTelephoneFill className="text-main-color" />
                    <p className="font-normal dark:text-gray-300">
                      {requestDetailData?.data.user?.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsPinMapFill className="text-main-color" />
                    <p className="font-normal dark:text-gray-300">
                      {requestDetailData?.data.address}
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="flex flex-col items-end space-y-2 justify-end w-full">
              <h4
                className={`font-medium text-xs text-blue-color p-1 px-2 w-fit ${
                  requestDetailData?.data?.status ===
                  BrokerRequestStatus.PENDING
                    ? "bg-amber-500/40 text-amber-500"
                    : requestDetailData?.data?.status ===
                      BrokerRequestStatus.APPROVED
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                } rounded-md`}
              >
                {requestDetailData?.data?.status}
              </h4>
            </div>

            {requestDetailData?.data?.status ===
              BrokerRequestStatus.PENDING && (
              <div className="flex items-center justify-end gap-2 w-full">
                <Button
                  onClick={() => {
                    setActionType(ActionType.Accept);
                    setIsConfirmModalOpen(true);
                  }}
                >
                  Accept Request
                </Button>

                <Button
                  onClick={() => {
                    setActionType(ActionType.Reject);
                    setIsConfirmModalOpen(true);
                  }}
                >
                  Reject Request
                </Button>
              </div>
            )}
          </div>
        ) : (
          <MainLoader />
        )}
        {requestDetailData.isFetched && requestDetailData.isError && (
          <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
        )}
      </div>
      <ConfirmDialogBox
        title={
          actionType == ActionType.Accept
            ? "Are you Sure To Accept This Request?"
            : " Are you Sure To Reject This Request?"
        }
        description={
          actionType == ActionType.Accept
            ? "This action cannot be undone. this action will create account for the broker"
            : ` please write reason ehy you reject the request, the reason you
            write will send as notification via email and push to the user`
        }
        onClick={changeRequestStatusHandler}
        isLoading={requestMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      >
        {actionType == ActionType.Reject && (
          <div className="flex flex-col items-start space-y-1 w-full">
            <textarea
              disabled={requestMutation.isLoading}
              className={clsx(
                `w-full  font-normal 
                bg-transparent
                 p-[6px] 
                 focus:ring-2
                  ring-main-color
                  dark:ring-gray-600
                  rounded-sm border
                   border-gray-300 
                   dark:border-gray-700
                   dark:text-white
                   outline-none
                   focus:outline-none ring-0`,
                requestMutation.isLoading && "opacity-50 cursor-default",
                currentTheme == "dark" ||
                  (currentTheme === "dark" &&
                    systemTheme &&
                    "text-white ring-gray-600")
              )}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            ></textarea>
          </div>
        )}
        {actionType == ActionType.Accept && (
          <div className="flex flex-col items-start space-y-1 w-full">
            <p
              className={`${
                currentTheme === "Light" ? "text-black" : "text-gray-300"
              } font-light text-xs`}
            >
              Would you like to give free listing qouta?
            </p>
            <input
              disabled={requestMutation.isLoading}
              className={clsx(
                `w-full bg-transparent 
                font-medium p-[6px] 
                 focus:ring-2
                  ring-main-color 
                  dark:ring-main-color 
                  rounded-sm border
                   border-gray-300
                   dark:border-gray-700
                   placeholder-gray-400
                   dark:placeholder-gray-700
                   dark:text-white
                   dark:bg-main-dark-bg
                   focus:outline-none ring-0
                   ${
                     currentTheme === "dark" ||
                     (currentTheme === "dark" && systemTheme)
                       ? "text-white bg-main-dark-bg border-gray-700 placeholder-gray-700 ring-gray-600"
                       : "text-gray-900"
                   }
                   `
              )}
              type="number"
              min={1}
              value={freeListingQuota}
              onChange={(e) => setFreeListingQuota(e.target.value)}
            />
          </div>
        )}
      </ConfirmDialogBox>
    </div>
  );
};

export default BrokerRequestDetail;
