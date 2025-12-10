/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import * as Yup from "yup";
import * as z from "zod";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { adsValidationSchema } from "@/validation/banner";
import { Form, Formik } from "formik";
import Input from "@/lib/ui/Input";
import DatePicker from "@/lib/ui/DateInput";
import ReusableDropzone from "@/lib/ui/DropZone";
import Button from "@/lib/ui/Button";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import useDynamicMutation from "@/hooks/usePostData";
import { format } from "date-fns";
import { toast } from "@/hooks/useToast";
import { useFetchData } from "@/hooks/useFetchData";
import { calculateDaysDifference } from "@/utils/Function";
import LoadingDialog from "@/containers/LoadingDialog";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
type adValues = z.infer<typeof adsValidationSchema>;
const PostBannerForm = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const headers = getHeaders({ token: token, type: "FormData" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const makeOrderMutation = useDynamicMutation();
  // const initialOptions = {
  //   clientId: import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID,
  //   currency: "USD",
  //   intent: "capture",
  // };
  const [hasInfo, setHasInfo] = React.useState<boolean>(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("ads title is required"),
    startDate: Yup.date()
      .min(
        new Date(new Date().setDate(new Date().getDate() - 1)),
        "Date must be tomorrow or later"
      )
      .required("start date is required"),
    endDate: Yup.date()
      .min(
        new Date(new Date().setDate(new Date().getDate()) + 1),
        "Date must be tomorrow or later"
      )
      .required("end date is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const initialValues: adValues = {
    title: "",
    startDate: undefined,
    endDate: undefined,
    image: undefined,
  };
  const [formValues, setFormValues] = React.useState<adValues>(initialValues);
  const onApprove = (_: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      setIsLoading(true);
      createBannerAdMutationHandler(details);
    });
  };

  const onError = (err: any) => {
    console.log("Error: ", err);
  };
  const postAdBanner = async (_: any, actions: any) => {
    try {
      const order = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value:
                calculateDaysDifference(
                  formValues.startDate!,
                  formValues.endDate!
                ) * settingData?.data?.bannedAdPrice,
              currency_code: "USD",
            },
            description: "Ad Banner",
          },
        ],
      });

      return order;
    } catch (error) {
      console.error("Error creating the order:", error);
    }
  };

  //fetch global setting like price of the day
  const settingData = useFetchData(
    ["settingDataApi", stateChange],
    `global-settings/broker`,
    headers
  );
  const createBannerAdMutationHandler = async (details: any) => {
    try {
      await makeOrderMutation.mutateAsync({
        url: `ads/post-ad`,
        method: "POST",
        headers,
        body: {
          user: user?._id,
          title: formValues?.title,
          broker: user?.broker,
          owner: user?.broker,
          startDate: formValues?.startDate,
          endDate: formValues?.endDate,
          image: formValues?.image,
          amount:
            calculateDaysDifference(
              formValues.startDate!,
              formValues.endDate!
            ) * settingData?.data?.bannedAdPrice,
          description: details?.purchase_units[0]?.description,
          email_address: details?.purchase_units[0]?.payee?.email_address,
          currency: details?.purchase_units[0]?.amount?.currency_code,
          paymentMethod: "Paypal",
          paymentId: details?.id,
          timestamp: details?.create_time,
        },
        onSuccess: () => {
          setIsLoading(false);
          toast({
            title: "Success!.",
            description: "payment Created Successfully",
            variant: "success",
          });
          navigate(-1);
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
    <div className="p-3 bg-white dark:bg-secondary-dark-bg rounded-md">
      {settingData.isFetched && settingData.isSuccess ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(val) => {
            setHasInfo(true);
            setFormValues(val);
          }}
        >
          {({ values }) => (
            <Form>
              {!hasInfo ? (
                <div className="flex flex-col space-y-3">
                  {" "}
                  <Input name="title" label="Ad Title" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePicker name="startDate" label="Start Date" />
                    <DatePicker name="endDate" label="End Date" />
                  </div>
                  <ReusableDropzone name="image" label="image" maxFiles={1} />
                  <div className="flex items-end justify-end self-end">
                    <Button type="submit">Proceed to Payment</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col items-start space-y-2">
                    <h2 className="font-medium dark:text-white text-xl">
                      Checkout
                    </h2>
                    <div className="w-full">
                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="Ad Image"
                        className="h-44 w-full object-cover"
                      />
                      <p className="font-normal dark:text-white capitalize">
                        Ads Title:{" "}
                        <span className="font-normal">{values.title}</span>
                      </p>
                      <p className="font-normal capitalize dark:text-white">
                        Start Date:{" "}
                        <span>
                          {values?.startDate
                            ? format(new Date(values.startDate), "yyyy-MM-dd")
                            : "N/A"}
                        </span>
                      </p>
                      <p className="font-normal capitalize dark:text-white">
                        End Date:{" "}
                        <span>
                          {values?.endDate
                            ? format(new Date(values.endDate), "yyyy-MM-dd")
                            : "N/A"}
                        </span>
                      </p>
                      <div className="">
                        <Button onClick={() => setHasInfo(false)}>Back</Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-medium dark:text-white text-xl">
                      Payment Info
                    </h2>
                    {values.startDate && values.endDate && (
                      <div>
                        <p className="text-light dark:text-white">
                          Price for one Day:{" "}
                          <span className="text-main-color text-xl font-bold">
                            {settingData?.data?.bannedAdPrice} $
                          </span>
                        </p>
                        <p className="text-light dark:text-white">
                          Ads total day:{" "}
                          <span className="text-main-color text-xl font-bold">
                            {" "}
                            {calculateDaysDifference(
                              values.startDate,
                              values.endDate
                            )}
                          </span>
                        </p>
                        <h3 className="text-light dark:text-white">
                          Price :{" "}
                          <span className="text-main-color text-xl font-bold">
                            {calculateDaysDifference(
                              values.startDate,
                              values.endDate
                            ) * settingData?.data?.bannedAdPrice}{" "}
                            $
                          </span>
                        </h3>
                      </div>
                    )}
                    <PayPalButtons
                      // style={{ layout: "horizontal" }}
                      style={{
                        color: "silver",
                        layout: "horizontal",
                        height: 48,
                        tagline: false,
                        shape: "pill",
                      }}
                      createOrder={postAdBanner}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      ) : (
        <MainLoader />
      )}
      {settingData.isFetched && settingData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <LoadingDialog isModalOpen={isLoading} setIsModalOpen={setIsLoading} />
    </div>
  );
};

export default PostBannerForm;
