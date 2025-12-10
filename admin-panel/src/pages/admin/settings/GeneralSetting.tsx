/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ButtonLoader, MainLoader } from "@/constants/Loader";
import HeaderContainer from "@/containers/HeaderContainer";
import * as z from "zod";
import { generalSettingSchema } from "@/validation/appSetting";
import { Formik, Form } from "formik";
import Input from "@/lib/ui/Input";
import Button from "@/lib/ui/Button";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import ReusableDropzone from "@/lib/ui/DropZone";
type GeneralSettingValues = z.infer<typeof generalSettingSchema>;
const GeneralSetting = () => {
  const settingMutation = useDynamicMutation();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "FormData", token });
  const globalSettingData = useFetchData(
    ["globalSettingDataApi", stateChange],
    `global-settings/all`,
    headers
  );

  console.log(globalSettingData?.data);
  const initalValues: GeneralSettingValues = {
    bannedAdPrice: globalSettingData?.data?.bannedAdPrice ?? "",
    propertyAdPrice: globalSettingData?.data?.propertyAdPrice ?? "",
    propertyAdViewRange: globalSettingData?.data?.propertyAdViewRange ?? "",
    appName: globalSettingData?.data?.appName ?? "",
    appLogo: undefined,
    dashboardUrl: globalSettingData?.data?.dashboardUrl ?? "",
  };

  //POST REQUEST TO SET GLOBAL SETTINGS
  const settingSubmitHandler = async (values: GeneralSettingValues) => {
    try {
      await settingMutation.mutateAsync({
        url: `global-settings/set`,
        method: "POST",
        headers,
        body: {
          bannedAdPrice: Number(values.bannedAdPrice),
          propertyAdPrice: Number(values.propertyAdPrice),
          propertyAdViewRange: Number(values.propertyAdViewRange),
          appName: values.appName,
          logo: values.appLogo && values.appLogo,
          dashboardUrl: values.dashboardUrl,
        },
        onSuccess: () => {
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Setting Updated Successfully...",
            variant: "success",
          });
        },
        onError: (err: any) => {
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
      <div className="w-full max-w-4xl mx-auto">
        {globalSettingData.isFetched && globalSettingData.isSuccess ? (
          <div className="w-full flex flex-col items-start space-y-1 dvide-y-2 divide-gray-500">
            <Formik
              initialValues={initalValues}
              onSubmit={settingSubmitHandler}
            >
              {({ values }) => (
                <Form className="w-full flex flex-col items-start space-y-5">
                  <div className="w-full flex flex-col items-start space-y-1">
                    <HeaderContainer headerTitle="Global Settings"></HeaderContainer>
                    <Input name="appName" label="App Name" />
                    <ReusableDropzone name="appLogo" label="App Logo" />
                    <div>
                      {!values.appLogo && (
                        <img
                          src={globalSettingData?.data?.appLogo}
                          alt="App Logo"
                          className="h-20 object-contain"
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-start space-y-1">
                    <HeaderContainer headerTitle="Ads Settings"></HeaderContainer>
                  </div>
                  <Input
                    name="bannedAdPrice"
                    label="banned ad price(in USD)"
                    type="number"
                  />
                  <Input
                    name="propertyAdPrice"
                    label="property ad price(in USD)"
                    type="number"
                  />
                  <Input
                    name="propertyAdViewRange"
                    label="property ad view range (recommended range 1000)"
                  />
                  <Input
                    name="dashboardUrl"
                    label="admin dashboard deployed URL"
                  />

                  <div className="w-ful flex items-end self-end justify-end">
                    <Button type="submit" disabled={settingMutation.isLoading}>
                      {settingMutation.isLoading ? (
                        <ButtonLoader />
                      ) : (
                        "Update Setting"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <MainLoader />
        )}
      </div>
      {globalSettingData.isFetched && globalSettingData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default GeneralSetting;
