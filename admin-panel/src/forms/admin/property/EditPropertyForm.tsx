/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/lib/ui/Input";
import Textarea from "@/lib/ui/Textarea";
import { Formik, Form, FieldArray } from "formik";
import {
  currencyOption,
  nearByFacility,
  propertyAmenity,
  propertyFurnishedType,
  propertyTypeOption,
} from "@/constants/Property";
import { InputLabelStyle } from "@/styles/TextStyles";
import MultipleDropZone from "@/lib/ui/MultiDropZone";
import CustomSelect from "@/lib/ui/Select";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { useFetchData } from "@/hooks/useFetchData";
import Autocomplete from "@/lib/ui/Autocomplete";
import ReusableDropzone from "@/lib/ui/DropZone";
import { useState } from "react";
import ProgressDialog from "@/containers/ProgressDialog";
import { toast } from "@/hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { editPropertyValidationSchema } from "@/yup-validation/admin/Property";
import * as z from "zod";
import { createPropertySchema } from "@/validation/property";
import CreatableCustomSelect from "@/lib/ui/CreatableSelect";
import Header from "@/lib/ui/Header";
import { MainLoader } from "@/constants/Loader";
import { MdDelete } from "react-icons/md";

type propertyValidationValue = z.infer<typeof createPropertySchema>;
const EditPropertyForm = () => {
  const { token, user } = useAuth();
  const [progress, setProgress] = useState<number>(1);
  const [isProgressModalOpen, setIsProgressModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const headers = getHeaders({ token: token, type: "FormData" });
  const jsonHeader = getHeaders({ token: token, type: "Json" });
  const [stateChange, setStateChange] = useState(false);
  const createPropertyMutation = useDynamicMutation();
  const [customAmenity, setCustomAmenity] = useState<string[]>([]);
  const [addAmenity, setAddAmenity] = useState<boolean>(false);
  const [amenityValue, setAmenityValue] = useState<string>("");
  //fetch THE EDITED PROPERTY status
  const propertyData = useFetchData(
    ["propertyDataApi", id, stateChange],
    `property/find/detail/${id}`,
    headers
  );
  console.log(propertyData?.data?.property);
  const initialValues: propertyValidationValue = {
    name: propertyData?.data?.property?.name,
    images: [],
    price: propertyData?.data?.property?.price,
    currency: propertyData?.data?.property?.currency,
    videoTour: undefined,
    description: propertyData?.data?.property?.description,
    paymentDescription: propertyData?.data?.property?.paymentDescription,
    propertyType:
      propertyData?.data?.property?.propertyType === "sell" ? "sell" : "rent",
    propertyHomeType: propertyData?.data?.property?.propertyHomeType?._id,
    details: {
      area: propertyData?.data?.property?.details?.area,
      bathroom: propertyData?.data?.property?.details?.bathroom,
      bedroom: propertyData?.data?.property?.details?.bedroom,
      floor: propertyData?.data?.property?.details?.floor ?? undefined,
      yearBuilt: propertyData?.data?.property?.details?.yearBuilt,
    },
    owner: propertyData?.data?.property?.owner?._id,
    agent: propertyData?.data?.property?.agent?._id,
    address: {
      city: propertyData?.data?.property?.address?.city,
      location: propertyData?.data?.property?.address?.location,
      loc: propertyData?.data?.property?.address?.loc,
    },
    isFeatured: propertyData?.data?.property?.isFeatured,
    isFurnished: propertyData?.data?.property?.isFurnished,
    amenities: propertyData?.data?.property?.amenities ?? [],
    facilities: propertyData?.data?.property?.facilities ?? [
      {
        facility: "",
        distance: undefined,
      },
      {
        facility: "",
        distance: undefined,
      },
      {
        facility: "",
        distance: undefined,
      },
    ],
  };

  //post data

  const updatePropertySubmitHandler = async (
    values: propertyValidationValue
  ) => {
    try {
      await createPropertyMutation.mutateAsync({
        url: `property/admin/update/${id}`,
        method: "PUT",
        headers,
        body: {
          broker: user?.broker,
          name: values.name,
          poster: user?._id,
          price: values.price,
          currency: values.currency,
          description: values.description,
          paymentDescription: values.paymentDescription,
          images: values.images && values.images,
          videoTour: values.videoTour,
          propertyType: values.propertyType, //sell or rent
          propertyHomeType: values.propertyHomeType,
          details: values.details,
          owner: values.owner,
          agent: values.agent,
          address: {
            city: values.address.city,
            location: values.address.location,
            loc: values.address.loc,
          },
          amenities: values.amenities.concat(customAmenity),
          isFurnished: values.isFurnished,
          isFeatured: values.isFeatured,
          facilities: values.facilities,
        },
        onSuccess: () => {
          setIsProgressModalOpen(false);
          navigate(-1);
          toast({
            title: "Success!.",
            description: "Property Create Successfully",
            variant: "success",
          });
        },
        onError: (err) => {
          toast({
            title: "Error.",
            description: err?.response?.data?.message,
            variant: "danger",
          });
          setIsProgressModalOpen(false);
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total !== undefined) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  //fetch agents
  const inHouseAgents = useFetchData(
    ["inHouseAgentApi"],
    `agents/admin/in-house-agents/all`,
    headers
  );
  const ownersData = useFetchData(["ownersDataApi"], `owner/all`, headers);

  const propertyTypeData = useFetchData(
    ["propertyTypeDataApi"],
    `property-type`,
    headers
  );

  const onSubmit = (values: propertyValidationValue) => {
    setIsProgressModalOpen(true);
    updatePropertySubmitHandler(values);
  };

  //delete image Delete request
  const handeleRemoveImage = async (_id: string) => {
    try {
      await createPropertyMutation.mutateAsync({
        url: `property/find-image/delete`,
        method: "DELETE",
        headers: jsonHeader,
        body: {
          id,
          imageId: _id,
        },
        onSuccess: () => {
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Image Deleted Successfully",
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
    <>
      <div className="bg-white dark:bg-secondary-dark-bg p-3 rounded-md my-transtion">
        <Header title="Edit Property" />
        {propertyData.isFetched && propertyData.isSuccess ? (
          <Formik
            initialValues={initialValues}
            validationSchema={editPropertyValidationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldTouched, values, setFieldValue, errors }) => {
              console.log(errors);
              return (
                <Form className="grid grid-cols-1 md:grid-cols-5 gap-3 ">
                  <div className="md:col-span-3 flex flex-col items-start space-y-2 ">
                    <Input name="name" label="Title" />
                    <Textarea name="description" label="description" />
                    <Textarea
                      name="paymentDescription"
                      label="paymentDescription"
                    />
                    <MultipleDropZone
                      name="images"
                      maxFiles={10}
                      label="property images"
                      showImages={true}
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                      {propertyData?.data?.property?.images?.map(
                        (image: { url: string; _id: string }) => (
                          <div className="relative" key={image._id}>
                            <img
                              src={image?.url}
                              alt=""
                              className="h-24 w-full object-contain"
                            />
                            {propertyData?.data?.property?.images?.length >
                              1 && (
                              <div
                                className="red-500 rounded-l-lg p-1 text-sm bg-white hover:bg-white/50
                 absolute top-1 right-0 cursor-pointer"
                                onClick={() => handeleRemoveImage(image._id)}
                              >
                                <MdDelete size={20} className="text-red-500" />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <ReusableDropzone
                      name="videoTour"
                      label="videoTour"
                      accept={{
                        "video/mp4": [".mp4"],
                        "video/webm": [".webm"],
                      }}
                    />

                    <div className="md:col-span-2 w-full">
                      <Autocomplete
                        name={[
                          "address.location",
                          "address.loc",
                          "address.city",
                        ]}
                        label="select city"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 flex flex-col items-start space-y-2  w-full">
                    <div className="md:col-span-2 w-full">
                      <Input name="price" label="price" type="number" />
                      <CustomSelect
                        name="currency"
                        label="currency"
                        options={currencyOption}
                        defaultValue={currencyOption?.find(
                          (item) =>
                            item.value ===
                            propertyData?.data?.property?.currency
                        )}
                        onChange={(selectedOption) => {
                          setFieldValue("currency", selectedOption.value);
                        }}
                        placeholder="select currency type"
                        getOptionValue={(currency: any) => currency?.value}
                        getOptionLabel={(currency: any) => currency?.label}
                        noOptionsMessage={() => "currency type here"}
                      />
                    </div>
                    {/* details */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Input
                        name="details.area"
                        label={`area in sq2`}
                        type="number"
                      />
                      <Input
                        name="details.bathroom"
                        label="bathroom"
                        type="number"
                      />
                      <Input
                        name="details.bedroom"
                        label="bedroom"
                        type="number"
                      />
                      <Input name="details.floor" label="floor" type="number" />
                      <Input
                        name="details.yearBuilt"
                        label="year Built"
                        type="number"
                      />
                    </div>

                    <CustomSelect
                      name="isFurnished"
                      label="is Furnished"
                      options={propertyFurnishedType}
                      defaultValue={
                        propertyData?.data?.property?.isFurnished
                          ? propertyFurnishedType[0]
                          : propertyFurnishedType[1]
                      }
                      onChange={(selectedOption) => {
                        setFieldValue("isFurnished", selectedOption.value);
                      }}
                      placeholder="select furnished type"
                      getOptionValue={(furnished: any) => furnished?.value}
                      getOptionLabel={(furnished: any) => furnished?.label}
                      noOptionsMessage={() => "furnished type here"}
                    />
                    <CustomSelect
                      name="propertyType"
                      label="property Type"
                      options={propertyTypeOption}
                      defaultValue={propertyTypeOption?.find(
                        (item) =>
                          item.value ===
                          propertyData?.data?.property?.propertyType
                      )}
                      onChange={(selectedOption) => {
                        setFieldValue("propertyType", selectedOption.value);
                      }}
                      placeholder="select property type"
                      getOptionValue={(furnished: any) => furnished?.value}
                      getOptionLabel={(furnished: any) => furnished?.label}
                      noOptionsMessage={() => "property type here"}
                    />
                    <CustomSelect
                      name="propertyHomeType"
                      label="property Home Type"
                      options={propertyTypeData?.data}
                      defaultValue={
                        propertyData?.data?.property?.propertyHomeType
                      }
                      onChange={(selectedOption) => {
                        setFieldValue("propertyHomeType", selectedOption._id);
                      }}
                      placeholder="select property type"
                      getOptionValue={(type: any) => type?._id}
                      getOptionLabel={(type: any) => type?.name}
                      noOptionsMessage={() => "property Home type here"}
                    />
                    {/* owner */}
                    <CustomSelect
                      name="owner"
                      label="owner"
                      options={ownersData?.data}
                      defaultValue={propertyData?.data?.property?.owner}
                      onChange={(selectedOption) => {
                        setFieldValue("owner", selectedOption._id);
                      }}
                      placeholder="select property owner"
                      getOptionValue={(owner: any) => owner?._id}
                      getOptionLabel={(owner: any) => owner?.name}
                      noOptionsMessage={() => "property owners appear here"}
                    />
                    {/* agent */}
                    <CustomSelect
                      name="agent"
                      label="agent"
                      options={inHouseAgents?.data}
                      defaultValue={propertyData?.data?.property?.agent}
                      onChange={(selectedOption) => {
                        setFieldValue("agent", selectedOption._id);
                      }}
                      placeholder="select agent"
                      getOptionValue={(agent: any) => agent._id}
                      getOptionLabel={(agent: any) =>
                        agent?.user?.firstName + " " + agent?.user?.lastName
                      }
                      noOptionsMessage={() => "agents appear here"}
                    />
                  </div>

                  {/* amenity */}
                  <div className="md:col-span-5 w-full flex flex-col items-start space-y-3 p-2 border border-gray-700 rounded-md border-dashed">
                    <label className={InputLabelStyle}>Amenities</label>
                    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
                      {propertyAmenity?.map((item) => (
                        <div
                          className="flex items-center w-full gap-2 cursor-pointer"
                          key={item}
                          onClick={() => {
                            let amenityItems: string[] = [...values.amenities];
                            if (!values.amenities.includes(item)) {
                              amenityItems.push(item);
                            } else {
                              amenityItems = amenityItems.filter(
                                (data) => data !== item
                              );
                            }
                            setFieldValue("amenities", amenityItems);
                            console.log(values.amenities.includes(item));
                          }}
                        >
                          <input
                            type="checkbox"
                            // color="info"
                            // {...label}
                            checked={values.amenities.includes(item)}
                            onBlur={() =>
                              setFieldTouched("amenities", true, true)
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const isChecked = e.target.checked;
                              let amenityItems: string[] = [
                                ...values.amenities,
                              ];

                              if (isChecked) {
                                amenityItems.push(item);
                              } else {
                                amenityItems = amenityItems.filter(
                                  (data) => data !== item
                                );
                              }
                              setFieldValue("amenities", amenityItems);
                            }}
                          />
                          <p
                            className="
      block 
      text-sm 
      font-medium 
      leading-6 
      text-gray-900
      capitalize
      dark:text-gray-300
    "
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-start space-y-1">
                      <p
                        className="
      block 
      text-sm 
      font-medium 
      leading-6 
      text-gray-900
      capitalize
      dark:text-gray-300
    "
                      >
                        Didn't find Amenity ?
                        <span
                          onClick={() => setAddAmenity(true)}
                          className="cursor-pointer hover:underline font-semibold text-main-color "
                        >
                          Add Custom
                        </span>
                      </p>
                    </div>
                    {customAmenity.length > 0 && (
                      <div className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide">
                        {customAmenity.map((amenity) => (
                          <div
                            className="flex items-center w-full gap-2 cursor-pointer"
                            key={amenity}
                            onClick={() => {
                              //remove the custome amenity

                              setCustomAmenity((prev) =>
                                prev.filter(
                                  (item) =>
                                    item.toLocaleLowerCase() !==
                                    amenity.toLocaleLowerCase()
                                )
                              );
                            }}
                          >
                            <input
                              type="checkbox"
                              // color="info"
                              // {...label}
                              checked
                            />
                            <p
                              className="
      block 
      text-sm 
      font-medium 
      leading-6 
      text-gray-900
      capitalize
      dark:text-gray-300
    "
                            >
                              {amenity}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {addAmenity && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className={`bg-transparent 
            font-normal p-[6px] 
             focus:ring-2
              ring-blue-500
              dark:ring-gray-600
              rounded-sm border
               border-gray-300
               dark:bg-main-dark-bg 
               dark:border-gray-700
               dark:text-white
               focus:outline-none ring-0`}
                          placeholder="Write Amenity"
                          value={amenityValue}
                          onChange={(e) => setAmenityValue(e.target.value)}
                          required
                        />
                        <Button
                          type="submit"
                          disabled={!amenityValue}
                          onClick={() => {
                            if (
                              !customAmenity
                                .map((item) => item.toLocaleLowerCase())
                                .includes(amenityValue.toLocaleLowerCase()) &&
                              !propertyAmenity
                                .map((item) => item.toLocaleLowerCase())
                                .includes(amenityValue.toLocaleLowerCase())
                            ) {
                              setCustomAmenity((prev) => [
                                ...prev,
                                amenityValue,
                              ]);
                              setAmenityValue("");
                            } else {
                              toast({
                                title: "",
                                description:
                                  "Amenity Already There or it Exists on Common Amenity!",
                                variant: "info",
                              });
                            }
                          }}
                        >
                          Add
                        </Button>
                        <Button
                          secondary
                          onClick={() => setAddAmenity(false)}
                          type="button"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* facilities */}
                  <div className="md:col-span-5 w-full flex flex-col items-start space-y-3 p-2 border border-gray-700 rounded-md border-dashed">
                    <FieldArray name="facilities">
                      {({ push, remove }: any) => (
                        <div className="w-full flex flex-col items-start space-y-5">
                          <label className={InputLabelStyle}>
                            Facilities(optional)
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                            {values.facilities?.map((_, index) => (
                              <div
                                className="flex flex-col w-full items-start space-y-2"
                                key={index}
                              >
                                <div className="w-full flex flex-col items-start space-y-1">
                                  <CreatableCustomSelect
                                    isSearchable
                                    name={`facilities.${index}.facility`}
                                    label="facility"
                                    placeholder={"select facility"}
                                    options={nearByFacility}
                                    getOptionLabel={(facility: any) =>
                                      facility.label
                                    }
                                    getOptionValue={(facility: any) =>
                                      facility.value
                                    }
                                    onChange={(selectedOption: any) => {
                                      setFieldValue(
                                        `facilities.${index}.facility`,
                                        selectedOption.value
                                      );
                                    }}
                                    noOptionsMessage={() =>
                                      "Facilities type appears here"
                                    }
                                  />
                                </div>
                                {/* quantity */}
                                <div className="w-full flex flex-col items-start space-y-1">
                                  <Input
                                    name={`facilities.${index}.distance`}
                                    label="Distance from the property in(Km)"
                                    type="number"
                                  />
                                </div>

                                <Button danger onClick={() => remove(index)}>
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-end justify-end w-full">
                            <Button
                              secondary
                              onClick={() =>
                                push({
                                  facility: "",
                                  distance: "",
                                })
                              }
                            >
                              Add facility
                            </Button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  <div className="md:col-span-5 flex items-end justify-end w-full gap-2">
                    <Button type={"submit"}>
                      {createPropertyMutation.isLoading
                        ? "loading"
                        : "Post Property"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <MainLoader />
        )}
        <ProgressDialog
          isProgressModalOpen={isProgressModalOpen}
          setIsProgressModalOpen={setIsProgressModalOpen}
          progress={progress}
        />
      </div>
    </>
  );
};

export default EditPropertyForm;
