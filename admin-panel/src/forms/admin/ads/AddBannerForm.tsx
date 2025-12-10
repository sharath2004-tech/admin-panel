/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as Yup from "yup";
import * as z from "zod";
import { adsValidationSchema } from "@/validation/banner";
import { Form, Formik } from "formik";
import Input from "@/lib/ui/Input";
import DatePicker from "@/lib/ui/DateInput";
import ReusableDropzone from "@/lib/ui/DropZone";
import Button from "@/lib/ui/Button";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import { ButtonLoader } from "@/constants/Loader";
import Header from "@/lib/ui/Header";
type adValues = z.infer<typeof adsValidationSchema>;

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}
const AddBannerForm: React.FC<Props> = ({ setIsModalOpen, setStateChange }) => {
  const { token, user } = useAuth();
  const headers = getHeaders({ token: token, type: "FormData" });
  const makeOrderMutation = useDynamicMutation();
  const validationSchema = Yup.object({
    title: Yup.string().required('title is required'),
    startDate: Yup.date()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Date must be tomorrow or later"
    )
      .required("start date is required"),
    endDate: Yup.date()
      .min(
        new Date(new Date().setDate(new Date().getDate())),
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
  const createBannerAdMutationHandler = async (values: adValues) => {
    try {
      await makeOrderMutation.mutateAsync({
        url: `ads/admin/post-ad`,
        method: "POST",
        headers,
        body: {
          user: user?._id,
          title: values?.title,
          startDate: values?.startDate,
          endDate: values?.endDate,
          image: values?.image,
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Ad Created Successfully",
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
      <Header title="Create Banner Ad" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createBannerAdMutationHandler}
      >
        {() => (
          <Form>
            <div className="flex flex-col space-y-3">
              {" "}
              <Input name="title" label="Ad Title" />
              <DatePicker name="startDate" label="Start Date" />
              <DatePicker name="endDate" label="End Date" />
              <ReusableDropzone name="image" label="image" maxFiles={1} />
              <Button
                disabled={makeOrderMutation.isLoading}
                fullWidth
                type="submit"
              >
                {makeOrderMutation.isLoading ? <ButtonLoader /> : "Create"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBannerForm;
