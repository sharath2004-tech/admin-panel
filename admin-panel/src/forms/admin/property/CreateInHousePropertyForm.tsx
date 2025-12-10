/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/lib/ui/Input";
import Textarea from "@/lib/ui/Textarea";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import {
  currencyOption,
  nearByFacility,
  propertyAmenity,
  propertyFurnishedType,
  propertyTypeOption,
} from "@/constants/Property";
import { ErrorTextStyle, InputLabelStyle } from "@/styles/TextStyles";
import MultipleDropZone from "@/lib/ui/MultiDropZone";
import CustomSelect from "@/lib/ui/Select";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { useFetchData } from "@/hooks/useFetchData";
import AutocompleteComponent from "@/lib/ui/Autocomplete";
import { useState } from "react";
import ProgressDialog from "@/containers/ProgressDialog";
import { toast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { createPropertyValidationSchema } from "@/yup-validation/admin/Property";
import * as z from "zod";
import { createPropertySchema } from "@/validation/property";
import CreatableCustomSelect from "@/lib/ui/CreatableSelect";
import { MainColor } from "@/constants/Color";
import ReusableVideoInput from "@/lib/ui/VideoInput";
import { Switch } from "@headlessui/react";
import MapPickerComponent from "@/lib/ui/MapPickerComponent";

type propertyValidationValue = z.infer<typeof createPropertySchema>;
const CreateInHousePropertyForm = () => {
  const { token, user } = useAuth();
  const [progress, setProgress] = useState<number>(1);
  const [isProgressModalOpen, setIsProgressModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const headers = getHeaders({ token: token, type: "FormData" });
  const createPropertyMutation = useDynamicMutation();
  const [customAmenity, setCustomAmenity] = useState<string[]>([]);
  const [addAmenity, setAddAmenity] = useState<boolean>(false);
  const [amenityValue, setAmenityValue] = useState<string>("");
  const [addedFacility, setAddedFacility] = useState<any[]>([]); //for facilities
  const initialValues: propertyValidationValue = {
    name: "",
    images: [],
    price: undefined,
    currency: "",
    videoTour: undefined,
    description: "",
    paymentDescription: "",
    propertyType: "",
    propertyHomeType: "",
    details: {
      area: undefined,
      bathroom: undefined,
      bedroom: undefined,
      floor: undefined,
      yearBuilt: undefined,
    },
    owner: "",
    agent: "",
    address: {
      city: "",
      location: "",
      loc: [],
    },
    isFeatured: false,
    isFurnished: undefined,
    amenities: [],
    facilities: [
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

  const createOwnerSubmitHandler = async (values: propertyValidationValue) => {
    try {
      await createPropertyMutation.mutateAsync({
        url: `property/admin/create`,
        method: "POST",
        headers,
        body: {
          name: values.name,
          poster: user?._id,
          price: values.price,
          currency: values.currency,
          description: values.description,
          paymentDescription: values.paymentDescription,
          images: values.images,
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
          facilities: [...new Set(values.facilities)],
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
    createOwnerSubmitHandler(values);
  };
  return (
    <div className="bg-white dark:bg-secondary-dark-bg p-3 rounded-md my-transtion">
      <Formik
        initialValues={initialValues}
        validationSchema={createPropertyValidationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldTouched, values, setFieldValue }) => {
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
                <ReusableVideoInput name="videoTour" label="videoTour" />
                <div className="md:col-span-2 w-full">
                  <AutocompleteComponent
                    name={["address.location", "address.loc", "address.city"]}
                    label="select city"
                  />
                </div>
                {values.address.loc.length > 0 && (
                  <MapPickerComponent name="address.loc" label="address" />
                )}
              </div>
              <div className="md:col-span-2 flex flex-col items-start space-y-2  w-full">
                <div className="md:col-span-2 w-full space-y-2">
                  <Input name="price" label="price" type="number" />
                  <CustomSelect
                    name="currency"
                    label="currency"
                    options={currencyOption}
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
                  <Input name="details.bedroom" label="bedroom" type="number" />
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
                  defaultValue={inHouseAgents?.data?.find(
                    (agent: any) => agent?.user?._id == user?._id
                  )}
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
                <div className="w-full">
                  <p className={InputLabelStyle}>Is Featured</p>
                  <div className="bg-main-bg dark:bg-main-dark-bg p-2 rounded-md w-full flex items-center space-x-2">
                    <Switch
                      checked={values.isFeatured}
                      onChange={() =>
                        setFieldValue("isFeatured", !values.isFeatured)
                      }
                      className={`${
                        values.isFeatured
                          ? "bg-blue-bg"
                          : "bg-gray-200 dark:bg-secondary-dark-bg"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        className={`${
                          values.isFeatured ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                    {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
                  </div>
                </div>
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
                        onBlur={() => setFieldTouched("amenities", true, true)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const isChecked = e.target.checked;
                          let amenityItems: string[] = [...values.amenities];

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
                        className="peer data-[state=checked]:text-main-color  data-[state=checked]:bg-blue-bg 
                        checked:bg-main-color
                        dark:checked:bg-main-color
      block 
      text-xs 
      font-medium 
      leading-6 
      text-gray-900
      capitalize
      dark:text-gray-300
    "
                        color={MainColor}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="amenities"
                  component="div"
                  className={ErrorTextStyle}
                />
                <div className="flex flex-col items-start space-y-1">
                  <p
                    className="
      block 
      text-xs
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
              ring-main-color
              dark:ring-main-color
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
                          setCustomAmenity((prev) => [...prev, amenityValue]);
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
                        Near By Facilities
                      </label>
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                                options={nearByFacility.filter(
                                  (item) => !addedFacility.includes(item.value)
                                )}
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
                                  setAddedFacility((prev) => [
                                    ...prev,
                                    selectedOption.value,
                                  ]);
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

                            {index > 2 && (
                              <Button danger onClick={() => remove(index)}>
                                Remove
                              </Button>
                            )}
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
                <Button type={"submit"}>Create</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ProgressDialog
        isProgressModalOpen={isProgressModalOpen}
        setIsProgressModalOpen={setIsProgressModalOpen}
        progress={progress}
      />
    </div>
  );
};

export default CreateInHousePropertyForm;
