import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
import { formatDistanceToNow } from "date-fns";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsPinMapFill } from "react-icons/bs";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import Button from "@/lib/ui/Button";
import clsx from "clsx";
import { useTheme } from "@/hooks/useThemeContext";
import { ReportPropertyAction } from "@/utils/filter.enum";
import ReusableCarausel from "@/lib/ui/Carausel";
import { ReportedProperty } from "@/types/Report";

enum ActionType {
  APPROVE = "APPROVE",
  Hide = "Hide",
}

const PropertyReportDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentTheme } = useTheme();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [actionType, setActionType] = useState<ActionType>(ActionType.Hide);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const requestMutation = useDynamicMutation();
  const reportDetailData = useFetchData(
    ["reportPropertyDetailDataApi", id, stateChange],
    `report/detail/${id}`,
    headers
  );

  const changeRequestStatusHandler = async () => {
    try {
      await requestMutation.mutateAsync({
        url:
          actionType === ActionType.APPROVE
            ? `report/visible-property/${id}`
            : `report/hide-property/${id}`,
        method: "PUT",
        headers,
        body: actionType === ActionType.APPROVE ? {} : { message },
        onSuccess: () => {
          toast({
            title: "Success!.",
            description:
              actionType === ActionType.APPROVE
                ? "Property Publicly Visible Now"
                : "Property Hidden Successfully",
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
  console.log(reportDetailData?.data?.relatedReport);
  return (
    <div className="bg-white  dark:bg-secondary-dark-bg p-3 rounded-md">
      <div className="w-full flex flex-col items-start gap-3">
        {reportDetailData.isFetched && reportDetailData.isSuccess ? (
          <div className="flex flex-col items-start w-full space-y-1">
            <div className="flex items-center justify-between w-full">
              {reportDetailData?.data?.relatedReport?.length > 0 && (
                <p className="font-medium dark:text-white text-sm md:whitespace-nowrap capitalize">
                  ({reportDetailData?.data?.relatedReport?.length + 1}) reports
                  on this property
                </p>
              )}
              <div className="flex flex-col items-end space-y-2 justify-end w-full">
                <h4
                  className={`font-medium text-xs text-blue-color p-1 px-2 w-fit ${
                    reportDetailData?.data?.report?.status ===
                    ReportPropertyAction.PENDING
                      ? "bg-amber-500/40 text-amber-500"
                      : reportDetailData?.data?.report?.status ===
                        ReportPropertyAction.CORRECTED
                      ? "bg-green-500/20 text-green-500"
                      : reportDetailData?.data?.report?.status ===
                        ReportPropertyAction.APPROVED
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  } rounded-md`}
                >
                  {reportDetailData?.data?.report?.status}
                </h4>
              </div>
            </div>
            {/* property */}
            <div className="group flex items-start flex-col md:flex-row gap-1 w-full">
              <img
                src={reportDetailData?.data?.report?.property?.images[0].url}
                alt="property image"
                className="h-44 w-full md:w-64 object-cover rounded-md"
              />
              <div className="group flex flex-col items-start space-y-1 w-full">
                <h3 className="font-semibold dark:text-white">
                  {reportDetailData?.data?.report?.property?.name}
                </h3>
                <p className="text-main-color font-bold">
                  {" "}
                  {reportDetailData?.data?.report?.property?.price}
                  {reportDetailData?.data?.report?.property?.currency}
                </p>
                <p className="text-green-500 font-normal bg-green-500/40 p-1 rounded-md text-sm ">
                  {" "}
                  {reportDetailData?.data?.report?.property?.propertyType}
                </p>
                <button
                  onClick={() =>
                    navigate(
                      `/properties/detail/${reportDetailData?.data?.report?.property?._id}`
                    )
                  }
                  className="hidden group-hover:flex border-2 text-sm  text-main-color font-medium p-2 rounded-full hover:bg-blue-bg/20 "
                >
                  View Full Detail
                </button>
              </div>
            </div>
            <div className="pb-5 grid grid-cols-1 md:grid-cols-2 items-center w-full gap-5 divide-y md:divide-y-0 md:divide-x dark:divide-gray-700">
              <div className="flex flex-col items-start justify-center space-y-2">
                <h2 className="font-medium dark:text-white">
                  {" "}
                  Property Owner(Broker)
                </h2>
                <section className="flex items-start gap-2 md:gap-4">
                  <img
                    src={reportDetailData?.data?.report?.property?.broker?.logo}
                    alt="broker logo"
                    className="h-16 md:h-28 rounded-md  object-contain "
                  />
                  <div className="flex flex-col items-start space-y-1">
                    <h4 className="font-bold text-xl dark:text-gray-300 capitalize">
                      {reportDetailData?.data?.report?.property?.broker?.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <MdEmail className="text-main-color" />
                      <p className="font-normal dark:text-gray-300">
                        {
                          reportDetailData?.data?.report?.property?.broker
                            ?.email
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <BsFillTelephoneFill className="text-main-color" />
                      <p className="font-normal dark:text-gray-300">
                        {
                          reportDetailData?.data?.report?.property?.broker
                            ?.email
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <BsPinMapFill className="text-main-color" />
                      <p className="font-normal dark:text-gray-300">
                        {
                          reportDetailData?.data?.report?.property?.broker
                            ?.address
                        }
                      </p>
                    </div>
                  </div>
                </section>
              </div>
              {/* user */}
              <div className="md:pl-5 flex flex-col items-start space-y-2">
                <h2 className="font-medium dark:text-white"> Reporter</h2>
                <section className="flex items-start gap-2 md:gap-4 justify-center">
                  <img
                    src={reportDetailData?.data?.report?.user?.profile_image}
                    alt="user profile image"
                    className="h-16 md:h-28 rounded-md  object-contain "
                  />
                  <div className="flex flex-col items-start space-y-1">
                    <h4 className="font-bold text-xl dark:text-gray-300 capitalize">
                      {reportDetailData?.data?.report.user?.firstName +
                        " " +
                        reportDetailData?.data?.report.user?.lastName}
                    </h4>
                    <div className="flex items-center gap-1">
                      <MdEmail className="text-main-color" />
                      <p className="font-normal dark:text-gray-300">
                        {reportDetailData?.data?.report?.user?.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <BsFillTelephoneFill className="text-main-color" />
                      <p className="font-normal dark:text-gray-300">
                        {reportDetailData?.data?.report.user?.phone}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {" "}
                      {formatDistanceToNow(
                        new Date(reportDetailData?.data?.report?.createdAt)
                      )}{" "}
                      ago
                    </p>
                  </div>
                </section>
                <p className="dark:text-white">
                  {reportDetailData?.data?.report?.discription}
                </p>
              </div>
            </div>
            {/* related reports */}
            {reportDetailData?.data?.relatedReport?.length > 0 && (
              <div className="w-full flex flex-col items-start space-y-1 border-t border-gray-200 dark:border-gray-700 pt-5">
                <h2 className="font-semibold dark:text-white">
                  Related Reports on this property
                </h2>
                <ReusableCarausel>
                  {reportDetailData?.data?.relatedReport?.map(
                    (report: ReportedProperty) => (
                      <div className="flex flex-col items-start space-y-1 w-full">
                        <section className=" flex items-start gap-2 md:gap-4 justify-center p-3">
                          <img
                            src={report?.user?.profile_image}
                            alt="user profile image"
                            className="h-20 rounded-md  object-contain "
                          />
                          <div className="flex flex-col items-start space-y-1">
                            <h4 className="font-bold text-xl dark:text-gray-300 capitalize">
                              {report.user?.firstName +
                                " " +
                                report.user?.lastName}
                            </h4>
                            <div className="flex items-center gap-1">
                              <MdEmail className="text-main-color" />
                              <p className="font-normal dark:text-gray-300">
                                {report?.user?.email}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <BsFillTelephoneFill className="text-main-color" />
                              <p className="font-normal dark:text-gray-300">
                                {report.user?.phone}
                              </p>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {formatDistanceToNow(new Date(report?.createdAt))}{" "}
                              ago
                            </p>
                          </div>
                        </section>
                        <p className="dark:text-white font-normal">
                          {reportDetailData?.data?.report?.discription}
                        </p>
                      </div>
                    )
                  )}
                </ReusableCarausel>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 w-full">
              {reportDetailData?.data?.report?.status ===
                ReportPropertyAction.NEW && (
                <Button
                  onClick={() => {
                    setActionType(ActionType.Hide);
                    setIsConfirmModalOpen(true);
                  }}
                >
                  Hide Property
                </Button>
              )}
              {reportDetailData?.data?.report?.status ===
                ReportPropertyAction.PENDING && (
                <Button
                  onClick={() => {
                    setActionType(ActionType.APPROVE);
                    setIsConfirmModalOpen(true);
                  }}
                >
                  Activate Property
                </Button>
              )}
            </div>
          </div>
        ) : (
          <MainLoader />
        )}
        {reportDetailData.isFetched && reportDetailData.isError && (
          <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
        )}
      </div>
      <ConfirmDialogBox
        title={
          actionType == ActionType.APPROVE
            ? "Are you Sure To Mkae this property publicly Available?"
            : " Are you Sure To Temporary Hide This Property?"
        }
        description={
          actionType == ActionType.APPROVE
            ? "This action cannot be undone. this action will will make the property publicky visible which is previously hidden do to report"
            : ` please write reason why you Hide this property and things to be corrected, this will send as notification to the broker. `
        }
        onClick={changeRequestStatusHandler}
        isLoading={requestMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      >
        {actionType == ActionType.Hide && (
          <div className="flex flex-col items-start space-y-1 w-full">
            <textarea
              disabled={requestMutation.isLoading}
              className={clsx(
                `w-full  font-normal 
                bg-transparent
                 p-[6px] 
                 focus:ring-2
                  ring-blue-500
                  dark:ring-gray-600
                  rounded-sm border
                   border-gray-300 
                   dark:border-gray-700
                   dark:text-white
                   outline-none
                   focus:outline-none ring-0`,
                requestMutation.isLoading && "opacity-50 cursor-default",
                currentTheme == "Dark" && "text-white"
              )}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            ></textarea>
          </div>
        )}
      </ConfirmDialogBox>
    </div>
  );
};

export default PropertyReportDetail;
