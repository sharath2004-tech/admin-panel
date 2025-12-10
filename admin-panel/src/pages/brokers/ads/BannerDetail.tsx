import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { AdsBannerStatus } from "@/types/Ads";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
const BannerDetail = () => {
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const { id } = useParams();
  const bannerAdsDetailData = useFetchData(
    ["bannerAdsDetailDataApi", id, stateChange],
    `ads/broker/get-ads-details/${id}`,
    headers
  );

  //payment information
  function PaymentInfo() {
    return (
      <div className="flex flex-col items-end justify-end w-full self-end">
        <div className="w-full grid grid-cols-1  divide-y divide-gray-400/20 items-center justify-center">
          <div className="flex items-center justify-between p-3 gap-2">
            <h3 className="font-semibold text-sm dark:text-gray-300">
              Price:{" "}
            </h3>
            <p className="font-medium text-sm dark:text-white">
              {bannerAdsDetailData?.data?.payment?.amount}
            </p>
          </div>
          <div className="flex items-center justify-between p-3 gap-2">
            <h3 className="font-semibold text-sm dark:text-gray-300">
              paymentMethod:{" "}
            </h3>
            <p className="font-medium text-sm dark:text-white">
              {bannerAdsDetailData?.data?.payment?.paymentMethod}
            </p>
          </div>
          <div className="flex items-center justify-between p-3 gap-2">
            <h3 className="font-semibold text-sm dark:text-gray-300">Reason</h3>
            <p className="font-medium text-sm dark:text-white">
              {bannerAdsDetailData?.data?.payment?.description}
            </p>
          </div>
          <div className="flex items-center justify-between p-3 gap-2">
            <h3 className="font-semibold text-sm dark:text-gray-300">
              Email Address
            </h3>
            <p className="font-medium text-sm dark:text-white">
              {bannerAdsDetailData?.data?.payment?.email_address}
            </p>
          </div>
          <div className="flex items-center justify-between p-3 gap-2">
            <h3 className="font-semibold text-sm dark:text-gray-300">
              currency :{" "}
            </h3>
            <p className="font-medium text-sm text-main-color">
              {bannerAdsDetailData?.data?.payment?.currency}
            </p>
          </div>
          <div className="flex items-center justify-between p-3 gap-2">
            <h3 className="font-semibold text-sm dark:text-gray-300">
              Status :{" "}
            </h3>
            <p
              className={`font-medium text-sm text-blue-color p-1 px-2 ${
                bannerAdsDetailData?.data?.payment?.status ===
                AdsBannerStatus.PENDING
                  ? "bg-amber-500/40 text-amber-500"
                  : bannerAdsDetailData?.data?.payment?.status ===
                    AdsBannerStatus.APPROVED
                  ? "bg-green-500/20 text-green-500"
                  : "bg-red-500/20 text-red-500"
              }`}
            >
              {bannerAdsDetailData?.data?.payment?.status}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-2  bg-white dark:bg-secondary-dark-bg rounded-md my-transition">
      {bannerAdsDetailData.isFetched && bannerAdsDetailData.isSuccess ? (
        <div className="w-full flex flex-col items-start space-y-2">
          <div className="flex items-end justify-end self-end w-full">
            <h4
              className={`font-medium text-xs text-blue-color p-1 px-2 w-fit ${
                bannerAdsDetailData?.data?.status === AdsBannerStatus.PENDING
                  ? "bg-amber-500/30 text-amber-500"
                  : bannerAdsDetailData?.data?.status ===
                    AdsBannerStatus.APPROVED
                  ? "bg-green-500/20 text-green-500"
                  : "bg-red-500/20 text-red-500"
              } rounded-md`}
            >
              {bannerAdsDetailData?.data?.status}
            </h4>
          </div>
          <img
            src={bannerAdsDetailData?.data?.image}
            alt="banner image"
            className="h-64 w-full object-contain"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full p-3">
            <section className="flex flex-col items-start space-y-1">
              <h2 className="font-semibold capitalize dark:text-gray-300">
                {bannerAdsDetailData?.data?.title}
              </h2>
              <div>
                <p className="font-normal  dark:text-gray-300">
                  start Date :{" "}
                  {format(
                    new Date(bannerAdsDetailData?.data?.startDate),
                    "yyyy-MM-dd"
                  )}
                </p>
                <p className="font-medium  dark:text-gray-300">
                  end Date :{" "}
                  {format(
                    new Date(bannerAdsDetailData?.data?.endDate),
                    "yyyy-MM-dd"
                  )}
                </p>
              </div>
            </section>
            <div className="flex flex-col items-start justify-end self-end w-full  space-y-2">
              <h3 className="font-semibold dark:text-white">
                Payment Information
              </h3>
              <PaymentInfo />
            </div>
          </div>
        </div>
      ) : (
        <MainLoader />
      )}

      {bannerAdsDetailData.isFetched && bannerAdsDetailData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default BannerDetail;
