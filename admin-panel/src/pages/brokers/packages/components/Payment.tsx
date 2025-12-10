/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Package } from "@/types/Package";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import { getHeaders } from "@/config/apiConfig";
import { useTheme } from "@/hooks/useThemeContext";
import { MainLoader } from "@/constants/Loader";
interface PackageProps {
  selectedPackage: Package | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Payment: React.FC<PackageProps> = ({
  selectedPackage,
  setIsModalOpen,
}) => {
  const { token, user } = useAuth();
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const headers = getHeaders({ token: token, type: "Json" });
  const makeOrderMutation = useDynamicMutation();
  // const initialOptions = {
  //   clientId: import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID,
  //   currency: "USD",
  //   intent: "capture",
  // };
  const createOrder = async (_: any, actions: any) => {
    try {
      const order = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: selectedPackage?.price.toString() ?? "1",
              currency_code: "USD",
            },
            description: "Listing Property",
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
        url: `broker-packages/buy-package`,
        method: "POST",
        headers,
        body: {
          package: selectedPackage?._id,
          user: user?._id,
          broker: user?.broker,
          amount: selectedPackage?.price,
          description: details?.purchase_units[0]?.description,
          email_address: details?.purchase_units[0]?.payee?.email_address,
          currency: details?.purchase_units[0]?.amount?.currency_code,
          paymentMethod: "Paypal",
          paymentId: details?.id,
          timestamp: details?.create_time,
        },
        onSuccess: () => {
          setIsLoading(false);
          setIsModalOpen(false);
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
    <div>
      {!isLoading ? (
        <div>
          <div>
            <h1
              className={`${
                currentTheme === "dark" ? "text-white" : ""
              } font-medium `}
            >
              Checkout
            </h1>
            <p className={`${currentTheme === "dark" ? "text-white" : ""}`}>
              price:{" "}
              <span className="text-main-color">
                {" "}
                {selectedPackage?.price} $
              </span>
            </p>
          </div>
          <PayPalButtons
            // style={{ layout: "horizontal" }}
            style={{
              color: "silver",
              layout: "horizontal",
              height: 48,
              tagline: false,
              shape: "pill",
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 text-center">
            Please don't close this we are processing your payment!
          </p>
          <MainLoader />
        </div>
      )}
    </div>
  );
};

export default Payment;
