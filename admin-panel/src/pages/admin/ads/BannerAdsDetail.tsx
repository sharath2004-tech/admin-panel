import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { AdsBannerStatus } from "@/types/Ads";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import { MainLoader } from "@/constants/Loader";
const BannerAdsDetail = () => {
  const adsMutation = useDynamicMutation();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
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

  //approve request
  //approve request
  const approveRequestSubmitHandler = async () => {
    try {
      await adsMutation.mutateAsync({
        url: `ads/find/delete/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Ads Deleted Successfully",
            variant: "success",
          });
          navigate(-1);
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
      {bannerAdsDetailData.isFetched && bannerAdsDetailData.isSuccess ? (
        <div className="w-full flex flex-col items-start space-y-2">
          <img
            src={bannerAdsDetailData?.data?.image}
            alt="banner image"
            className="h-44 w-full object-contain"
          />
          <h2 className="font-semibold capitalize dark:text-gray-300">
            {bannerAdsDetailData?.data?.title}
          </h2>
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="font-medium  dark:text-gray-300">
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
            {!bannerAdsDetailData?.data?.isInHouseAd && (
              <div className="flex flex-col items-start justify-end self-end w-full  space-y-2">
                <h3 className="font-semibold dark:text-white">
                  Payment Information
                </h3>
                <PaymentInfo />
              </div>
            )}
          </section>
          {/* actions */}
          {bannerAdsDetailData?.data?.isInHouseAd && (
            <div className="flex items-center self-end pt-3 justify-end ">
              <Button danger onClick={() => setIsConfirmModalOpen(true)}>
                Delete Ad
              </Button>
            </div>
          )}
        </div>
      ) : (
        <MainLoader />
      )}
      {bannerAdsDetailData.isError && !bannerAdsDetailData.isRefetching && (
        <div className="flex flex-col items-center space-y-2">
          <h4 className={"ErrorTextMessageStyle"}>unknown error occurred!.</h4>

          <Button secondary onClick={() => setStateChange((prev) => !prev)}>
            Try Again
          </Button>
        </div>
      )}
      <ConfirmDialogBox
        title=" Are you Sure To Delete This banner Ads?"
        description="This action cannot be undone. This will make the ads permannently remove from the server"
        onClick={approveRequestSubmitHandler}
        isLoading={adsMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      />
    </div>
  );
};
// 3db88b
export default BannerAdsDetail;
