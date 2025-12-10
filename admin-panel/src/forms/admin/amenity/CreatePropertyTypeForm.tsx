import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/lib/ui/Input";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import Header from "@/lib/ui/Header";
import { useAuth } from "@/hooks/useAuthContext";
import * as z from "zod";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import { ButtonLoader } from "@/constants/Loader";
import { propertyTypeSchema } from "@/validation/propertyType";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}
type propertyTypeValues = z.infer<typeof propertyTypeSchema>;
const CreatePropertyTypeForm: React.FC<Props> = ({
  setIsModalOpen,
  setStateChange,
  // id,
}) => {
  const { token } = useAuth();
  const headers = getHeaders({ token: token, type: "Json" });
  const createPropertyMutation = useDynamicMutation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });
  const initialValues: propertyTypeValues = {
    name: "",
  };

  // const propertyTypeData = useFetchData(
  //   ["adBannerDataApi", id],
  //   `facilities/find/${id}`,
  //   headers
  // );
  const createPropertyTypeHandler = async (values: propertyTypeValues) => {
    try {
      await createPropertyMutation.mutateAsync({
        url: `property-type/create`,
        method: "POST",
        headers,
        body: {
          name: values.name,
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Property Type Created Successfully",
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
    <div className="flex flex-col items-start space-y-2 w-full">
      <Header title="Add New Property Type" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createPropertyTypeHandler}
      >
        {() => {
          return (
            <Form className="flex flex-col items-start space-y-3 w-full">
              <Input
                name="name"
                label=" Property Type Name"
                disabled={createPropertyMutation.isLoading}
              />

              <Button
                fullWidth
                type="submit"
                disabled={createPropertyMutation.isLoading}
              >
                {createPropertyMutation.isLoading ? <ButtonLoader /> : "Create"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreatePropertyTypeForm;
