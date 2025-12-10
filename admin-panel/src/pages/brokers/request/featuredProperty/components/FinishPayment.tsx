/* eslint-disable @typescript-eslint/no-explicit-any */
import { Property } from "@/types/Property";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { getHeaders } from "@/config/apiConfig";
import { toast } from "@/hooks/useToast";
import { useFetchData } from "@/hooks/useFetchData";
import { useEffect, useState } from "react";
import { MainLoader } from "@/constants/Loader";
import LoadingDialog from "@/containers/LoadingDialog";
import { useNavigate } from "react-router-dom";

interface Props {
  selectedProperties: Property | null;
}
const FinishPayment = ({ selectedProperties }: Props) => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const headers = getHeaders({ token: token, type: "Json" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const makeOrderMutation = useDynamicMutation();
  // const initialOptions = {
  //   clientId: import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID,
  //   currency: "USD",
  //   intent: "capture",
  // };
  //fetch global setting like price of the featured ads
  const onSuccess = () => {
  };
  const settingData = useFetchData(
    ["settingDataApi"],
    `global-settings/broker`,
    headers,
    onSuccess
  );
  const [viewCount, setViewCount] = useState<number>(
    settingData?.data?.propertyAdViewRange
  );

  useEffect(() => {
    localStorage.setItem("viewCount", viewCount ? viewCount.toString() : "0");
  }, [viewCount]);
  const [selectedRange, setSelectedRange] = useState<number>(0);
  const createOrder = async (_: any, actions: any, value: number) => {
    try {
      const order = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: value,
              currency_code: "USD",
            },
            description: "Featured Property",
          },
        ],
      });

      return order;
    } catch (error) {
      console.error("Error creating the order:", error);
    }
  };

  // ...

  const onApprove = (_: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      setIsLoading(true);
      makePaymentSubmitHandler(details);
    });
  };

  const onError = (err: any) => {
    console.log("Error: ", err);
  };
  const makePaymentSubmitHandler = async (details: any) => {
    try {
      await makeOrderMutation.mutateAsync({
        url: `featured-property/request`,
        method: "POST",
        headers,
        body: {
          property: selectedProperties?._id,
          user: user?._id,
          viewCount: Number(
            selectedRange + 1 * settingData?.data?.propertyAdViewRange
          ),
          broker: user?.broker,
          amount:
            viewCount && viewCount > 1
              ? (viewCount * settingData?.data?.propertyAdPrice) /
                settingData?.data?.propertyAdViewRange
              : (settingData?.data?.propertyAdViewRange *
                  settingData?.data?.propertyAdPrice) /
                settingData?.data?.propertyAdViewRange,
          description: details?.purchase_units[0]?.description,
          email_address: details?.purchase_units[0]?.payee?.email_address,
          currency: details?.purchase_units[0]?.amount?.currency_code,
          paymentMethod: "Paypal",
          paymentId: details?.id,
          timestamp: details?.create_time,
        },
        onSuccess: () => {
          setIsLoading(false);
          navigate(-1);
          toast({
            title: "Success!.",
            description: "payment Created Successfully",
            variant: "success",
          });
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
    <div className="bg-white dark:bg-secondary-dark-bg p-3 rounded-md">
      {settingData.isFetched && settingData.isSuccess ? (
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 ">
          <section className="flex w-full flex-col items-start space-y-2">
            <h2 className="font-semibold dark:text-white">Selected Property</h2>
            <div className="flex flex-col items-start space-y-2 w-full divide-y divide-gray-400/50">
              <div
                key={selectedProperties?._id}
                className="flex items-center space-x-2 w-full pt-1"
              >
                <img
                  src={selectedProperties?.images[0]?.url}
                  alt="property image"
                  className="h-20 w-20 object-cover"
                />
                <div className="flex flex-col items-start space-y-1">
                  <h3 className="font-medium line-clamp-1 dark:text-gray-300">
                    {selectedProperties?.name}
                  </h3>
                  <p className="font-semibold text-main-color">
                    {selectedProperties?.price}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* payment */}
          <div className="grid grid-cols-1 gap-1 w-full">
            <h2 className="font-medium dark:text-white text-xl">
              Payment Info
            </h2>
            <p className="font-medium capitalize dark:text-white">
              price for {settingData?.data?.propertyAdViewRange} View :{" "}
              <span className="text-main-color">
                {" "}
                {settingData?.data?.propertyAdPrice} $
              </span>
            </p>
            <div className="bg-gray-300 dark:bg-main-dark-bg w-full p-2 flex flex-col items-start space-y-1">
              <p className="text-sm font-normal dark:text-white">
                Please Select Ads View Range
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {Array(20)
                  .fill(1)
                  .map((_, index) => (
                    <div
                      onClick={() => {
                        setSelectedRange(index);
                        setViewCount(
                          settingData?.data?.propertyAdViewRange * (index + 1)
                        );
                      }}
                      className={`${
                        selectedRange == index
                          ? "bg-main-color"
                          : "border border-main-color   "
                      } cursor-pointer text-black font-medium p-2 h-8 flex items-center justify-center rounded-sm dark:text-white`}
                    >
                      <p className="text-sm">
                        {(index + 1) * settingData?.data?.propertyAdViewRange}
                      </p>
                    </div>
                  ))}
              </div>
              <p className="text-sm font-normal dark:text-white">
                {viewCount > 1
                  ? viewCount
                  : settingData?.data?.propertyAdViewRange}{" "}
                Views
              </p>
            </div>

            <h4 className="font-medium capitalize dark:text-white text-lg">
              {" "}
              Total price :{" "}
              <span className="text-main-color font-semibold">
                {" "}
                {viewCount && viewCount > 1
                  ? (viewCount * settingData?.data?.propertyAdPrice) /
                    settingData?.data?.propertyAdViewRange
                  : (settingData?.data?.propertyAdViewRange *
                      settingData?.data?.propertyAdPrice) /
                    settingData?.data?.propertyAdViewRange}
                $
              </span>
            </h4>
            <PayPalButtons
              style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill",
              }}
              createOrder={(data, actions) =>
                createOrder(
                  data,
                  actions,
                  Number(localStorage.getItem("viewCount")) &&
                    Number(localStorage.getItem("viewCount")) > 1
                    ? (Number(localStorage.getItem("viewCount")) *
                        settingData?.data?.propertyAdPrice) /
                        settingData?.data?.propertyAdViewRange
                    : (settingData?.data?.propertyAdViewRange *
                        settingData?.data?.propertyAdPrice) /
                        settingData?.data?.propertyAdViewRange
                )
              }
              onApprove={onApprove}
              onError={onError}
            />
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
      <LoadingDialog isModalOpen={isLoading} setIsModalOpen={setIsLoading} />
    </div>
  );
};

export default FinishPayment;
