import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Payment } from "@/types/Payment";
import { PaymentStatus } from "@/types/Common";

import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsPinMapFill } from "react-icons/bs";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import { AdsBannerStatus } from "@/types/Ads";
const FeaturedPropertyRequestDetail = () => {
  const navigate = useNavigate();
  const propertyMutation = useDynamicMutation();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const { id } = useParams();
  const propertyAdsDetailData = useFetchData(
    ["propertyAdsDetailDataApi", id, stateChange],
    `featured-property/detail/${id}`,
    headers
  );

  //payment information
  function PaymentInfo() {
    return (
      <div className="flex flex-col items-end justify-end w-full self-end">
        {propertyAdsDetailData?.data?.payment.map((payment: Payment) => (
          <div className="w-full grid grid-cols-1  divide-y divide-gray-400/20 items-center justify-center">
            <div className="flex items-center justify-between p-3 gap-2">
              <h3 className="font-semibold text-sm dark:text-gray-300">
                Price:{" "}
              </h3>
              <p className="font-medium text-sm dark:text-white">
                {payment?.amount}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 gap-2">
              <h3 className="font-semibold text-sm dark:text-gray-300">
                paymentMethod:{" "}
              </h3>
              <p className="font-medium text-sm dark:text-white">
                {payment?.paymentMethod}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 gap-2">
              <h3 className="font-semibold text-sm dark:text-gray-300">
                Reason
              </h3>
              <p className="font-medium text-sm dark:text-white">
                {payment?.description}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 gap-2">
              <h3 className="font-semibold text-sm dark:text-gray-300">
                Email Address
              </h3>
              <p className="font-medium text-sm dark:text-white">
                {payment?.email_address}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 gap-2">
              <h3 className="font-semibold text-sm dark:text-gray-300">
                currency :{" "}
              </h3>
              <p className="font-medium text-sm text-main-color">
                {payment?.currency}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 gap-2">
              <h3 className="font-semibold text-sm dark:text-gray-300">
                Status :{" "}
              </h3>
              <p
                className={`font-medium text-sm text-blue-color p-1 px-2 ${
                  payment?.status === PaymentStatus.PENDING
                    ? "bg-amber-500/40 text-amber-500"
                    : payment?.status === PaymentStatus.APPROVED
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                {payment?.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  function PropertyDetail() {
    return (
      <div className=" w-full flex flex-col space-y-2 flex-shrink-0 overflow-x-scroll scrollbar-hide">
        <h1 className="font-semibold text-dark-gray">Properties</h1>
        <table className="border-collapse flex-shrink-0 border border-gray-200 w-full ">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2 w-24 text-blue-color text-sm dark:text-white font-normal">
                Image
              </th>
              <th className="border border-gray-200 p-2 w-fit text-blue-color text-sm dark:text-white font-normal text-left">
                title
              </th>
              <th className="border border-gray-200 p-2 w-28 text-blue-color text-sm dark:text-white font-normal">
                price
              </th>
              <th className="border border-gray-200 p-2 w-28 text-blue-color text-sm dark:text-white font-normal">
                currency
              </th>
              <th className="border border-gray-200 p-2 w-24 text-blue-color text-sm dark:text-white font-normal">
                type
              </th>

              <th className="border border-gray-200 p-2 min-w-36 text-blue-color text-sm dark:text-white font-normal">
                Detail
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-gray-300 p-3 w-24">
                <img
                  src={propertyAdsDetailData?.data?.property.images[0].url}
                  alt=""
                  className="h-10 w-16 object-cover"
                />
              </td>
              <td className="border  border-gray-300 dark:text-white p-3 font-medium text-blue-color">
                {propertyAdsDetailData?.data?.property?.name}
              </td>
              <td className="border border-gray-300 dark:text-white p-3 text-enter font-medium text-blue-color  items-center">
                {propertyAdsDetailData?.data?.property?.price}
              </td>
              <td className="border border-gray-300 dark:text-white p-3 text-enter font-medium text-blue-color  items-center">
                {propertyAdsDetailData?.data?.property?.currency}
              </td>
              <td className="border border-gray-300 dark:text-white p-3 font-medium text-blue-color">
                {propertyAdsDetailData?.data?.property?.propertyType}
              </td>

              <td className="border border-gray-300 p-3 font-medium text-blue-color">
                {/* {item?.quantity * item?.product?.price} */}
                <Button
                  onClick={() =>
                    navigate(
                      `/properties/detail/${propertyAdsDetailData?.data?.property._id}`
                    )
                  }
                >
                  View Property Detail
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  //approve request
  const approveRequestSubmitHandler = async () => {
    try {
      await propertyMutation.mutateAsync({
        url: `featured-property/approve/admin/${id}`,
        method: "PUT",
        headers,
        body: {
          property: propertyAdsDetailData?.data?.property?._id,
        },
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Property status changed Successfully",
            variant: "success",
          });
          setStateChange((prev) => !prev);
          setIsConfirmModalOpen(false);
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
    <div className="p-2  bg-white dark:bg-secondary-dark-bg rounded-md my-transition">
      {propertyAdsDetailData.isFetched && propertyAdsDetailData.isSuccess ? (
        <div className="w-full flex flex-col items-start space-y-2">
          <div
            className={`flex items-center justify-end self-end font-medium text-xs text-blue-color p-1 px-2 w-fit ${
              propertyAdsDetailData?.data?.status === AdsBannerStatus.PENDING
                ? "bg-amber-500/40 text-amber-500"
                : propertyAdsDetailData?.data?.status ===
                  AdsBannerStatus.APPROVED
                ? "bg-green-500/20 text-green-500"
                : "bg-red-500/20 text-red-500"
            }`}
          >
            <p>{propertyAdsDetailData?.data?.status}</p>
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-5 dark:divide-gray-700 divide-y md:divide-y-0 md:divide-x">
            <div className="flex items-start gap-2 md:gap-4">
              <img
                src={propertyAdsDetailData?.data?.broker?.logo}
                alt="broker logo"
                className="h-20 md:h-28 rounded-md  object-contain "
              />
              <div className="flex flex-col items-start space-y-1">
                <h3 className="font-bold text-xl dark:text-gray-300 capitalize">
                  {propertyAdsDetailData?.data?.broker?.name}
                </h3>

                <div className="flex items-center gap-1">
                  <MdEmail className="text-main-color" />
                  <p className="font-normal dark:text-gray-300">
                    {propertyAdsDetailData?.data?.broker?.email}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <BsFillTelephoneFill className="text-main-color" />
                  <p className="font-normal dark:text-gray-300">
                    {propertyAdsDetailData?.data?.broker?.phone}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <BsPinMapFill className="text-main-color" />
                  <p className="font-normal dark:text-gray-300">
                    {propertyAdsDetailData?.data?.broker?.address}
                  </p>
                </div>
              </div>
            </div>
            {/* user */}
            <div className="flex items-start gap-2 md:gap-4 md:justify-center pt-2 md:pt-0">
              <img
                src={propertyAdsDetailData?.data?.user?.profile_image}
                alt="broker logo"
                className="h-20 md:h-28 rounded-md  object-contain "
              />
              <div className="flex flex-col items-start space-y-1">
                <h3 className="font-bold text-xl dark:text-gray-300 capitalize">
                  {propertyAdsDetailData?.data?.user?.firstName +
                    " " +
                    propertyAdsDetailData?.data?.user?.lastName}
                </h3>
                <div className="flex items-center gap-1">
                  <MdEmail className="text-main-color" />
                  <p className="font-normal dark:text-gray-300">
                    {propertyAdsDetailData?.data?.user?.email}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <BsFillTelephoneFill className="text-main-color" />
                  <p className="font-normal dark:text-gray-300">
                    {propertyAdsDetailData?.data.user?.phone}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <PropertyDetail />
          {/* payment */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold dark:text-white">
                ViewCount :{" "}
                <span>{propertyAdsDetailData?.data?.viewCount}</span>
              </h3>
            </div>
            <div className="flex flex-col space-y-1 items-start justify-end">
              <h2 className="font-semibold dark:text-white">Payment History</h2>
              <PaymentInfo />
            </div>
          </section>
          {/* actions */}
          <div className="w-full flex items-center self-end pt-3 justify-end ">
            {propertyAdsDetailData?.data?.status ===
              AdsBannerStatus.PENDING && (
              <Button onClick={() => setIsConfirmModalOpen(true)}>
                Approve Ad
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">loading</div>
      )}
      {propertyAdsDetailData.isError && !propertyAdsDetailData.isRefetching && (
        <div className="flex flex-col items-center space-y-2">
          <h4 className={"ErrorTextMessageStyle"}>unknown error occurred!.</h4>

          <Button secondary onClick={() => setStateChange((prev) => !prev)}>
            Try Again
          </Button>
        </div>
      )}
      <ConfirmDialogBox
        title={" Are you Sure To Approve This Property Ad?"}
        description={`this actions is undone`}
        onClick={approveRequestSubmitHandler}
        isLoading={propertyMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      />
    </div>
  );
};

export default FeaturedPropertyRequestDetail;
