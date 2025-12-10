import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useFetchData } from "@/hooks/useFetchData";
import { ButtonLoader, MainLoader } from "@/constants/Loader";
import Input from "@/lib/ui/Input";
import ReusableDropzone from "@/lib/ui/DropZone";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import Button from "@/lib/ui/Button";
import Header from "@/lib/ui/Header";
import React from "react";

interface CompanyProfileInfo {
  email: string;
  name: string;
  phone: string;
  address: string;
  logo: File | undefined;
  coverImage: File | undefined;
}

const UpdateCompanyInfo: React.FC = () => {
  const updateProfileMutation = useDynamicMutation();
  const [stateChange, setStateChange] = React.useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "FormData", token });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("company name is required"),
    email: Yup.string().email().required("company email is required"),
    phone: Yup.string().required("company email is required"),
    address: Yup.string().required("company address is required"),
    logo: Yup.mixed().optional(),
    comverImage: Yup.mixed().optional(),
  });
  const companyDataApi = useFetchData(
    ["companyDataApi", stateChange],
    `brokers/detail/${user?.broker}`,
    headers
  );
  const initialValues: CompanyProfileInfo = {
    name: companyDataApi?.data?.name,
    email: companyDataApi?.data?.email,
    address: companyDataApi?.data?.address,
    logo: undefined,
    phone: companyDataApi?.data?.phone,
    coverImage: undefined,
  };

  //UPDATE PROFILE
  const updateProfileInfoHandler = async (values: CompanyProfileInfo) => {
    try {
      await updateProfileMutation.mutateAsync({
        url: `brokers/update-info/${user?.broker}`,
        method: "PUT",
        headers,
        body: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          logo: values.logo && values.logo,
          coverImage: values.coverImage && values.coverImage,
        },
        onSuccess: () => {
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Company Profile Updated Successfully",
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
    <div className="max-w-2xl mx-auto p-3 flex flex-col items-start space-y-4 w-full">
      {companyDataApi.isFetched && companyDataApi.isSuccess ? (
        <div className="w-full">
          <Header title="Update Profile" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateProfileInfoHandler}
          >
            {({ values }) => (
              <Form className="w-full flex flex-col items-center gap-3">
                <Input name="name" label=" Company Name" />
                <Input name="email" label="email" disabled />
                <Input name="phone" label="phone" type="number" />
                <Input name="address" label="address" />

                <div className="w-full">
                  <ReusableDropzone name="logo" label="Company Logo" />
                  {!values.logo && (
                    <img
                      src={companyDataApi?.data?.logo}
                      alt="Profile image"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  )}
                </div>
                <div className="w-full">
                  <ReusableDropzone
                    name="coverImage"
                    label="Company cover Image"
                  />
                  {!values.coverImage && (
                    <img
                      src={companyDataApi?.data?.coverImage}
                      alt="coverImage"
                      className="w-full h-44 object-cover "
                    />
                  )}
                </div>
                <div className="md:col-span-2 lex items-end justify-end self-end gap-3 pt-5">
                  <Button type={"submit"}>
                    {updateProfileMutation.isLoading ? (
                      <ButtonLoader />
                    ) : (
                      "Update Information"
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
  );
};

export default UpdateCompanyInfo;
