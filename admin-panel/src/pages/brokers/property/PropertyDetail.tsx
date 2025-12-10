import { useState } from "react";
import Carousel from "@/lib/ui/Carausel";
import { useParams } from "react-router-dom";
import { BiArea } from "react-icons/bi";
import { MdBathtub, MdBed } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { format } from "date-fns";
import { useFetchData } from "@/hooks/useFetchData";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import ReactStars from "react-stars";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import { HeaderStyle } from "@/styles/TextStyles";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
import MapPreview from "@/lib/ui/MapPreview";
import { PropertyRate } from "@/types/Property";
import { MainColor } from "@/constants/Color";
import ProgressBar from "@ramonak/react-progress-bar";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import Button from "@/lib/ui/Button";

enum ActionType {
  ChangeStatus = "ChangeStatus",
  RePost = "RePost",
}
const PropertyDetail = () => {
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>(
    ActionType.ChangeStatus
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const changePropertyMutation = useDynamicMutation();
  const { id } = useParams();
  const PropertyDetailData = useFetchData(
    ["PropertyDetailDataApi", id, stateChange],
    `property/find/detail/${id}`,
    headers
  );

  //change status
  const changePropertyStatusSubmitHandler = async () => {
    try {
      await changePropertyMutation.mutateAsync({
        url: `property/make-rent-or-sold/${id}`,
        method: "PUT",
        headers,
        body: {},
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Property status changed Successfully",
            variant: "success",
          });
          setIsConfirmModalOpen(false);
          setStateChange((prev) => !prev);
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
  // re post rented property again
  const rePostPropertySubmitHandler = async () => {
    try {
      await changePropertyMutation.mutateAsync({
        url: `property/make-rented-back/${id}`,
        method: "PUT",
        headers,
        body: {},
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Property RePublished Successfully",
            variant: "success",
          });
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
      {PropertyDetailData.isFetched && PropertyDetailData.isSuccess ? (
        <div>
          <div className="h-44 md:h-80 relative">
            <img
              src={PropertyDetailData?.data?.property?.images[0]?.url}
              alt=""
              className="h-full rounded-md w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black  to-transparent opacity-75  " />
            <div className="absolute top-0 left-0 bg-blue-bg  px-6 p-2">
              <h1 className="font-medium   text-sm text-white  capitalize">
                for {PropertyDetailData?.data?.property?.propertyType}
              </h1>
            </div>
            <div className="absolute bottom-2 w-full flex flex-col items-center justify-center ">
              <h1 className="font-medium md:text-xl text-white text-center">
                {PropertyDetailData?.data.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MdBathtub
                    size={16}
                    className=" font-medium text-main-color"
                  />
                  <h1 className=" font-medium text-white">
                    {PropertyDetailData?.data?.property?.details.bathroom}
                  </h1>
                </div>
                <div className="flex items-center space-x-1">
                  <MdBed size={16} className=" font-medium text-main-color" />
                  <h1 className=" font-medium text-white">
                    {PropertyDetailData?.data?.property?.details.bedroom}
                  </h1>
                </div>
                <div className="flex items-center space-x-1">
                  <BiArea size={16} className=" font-medium text-main-color" />
                  <h1 className=" font-medium text-white">
                    {PropertyDetailData?.data?.property?.details.area}{" "}
                    <span className="text-xs">sq</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* views */}
          <div className="flex items-center justify-end w-full space-x-1 text-dark-color pt-1">
            <AiFillEye size={20} className="text-main-color" />
            <p className="font-medium text-sm text-dark-color dark:text-gray-300">
              {PropertyDetailData?.data?.property?.views}
            </p>
          </div>
          {/*  */}
          <div className="pt-5 grid grid-cols-1 md:grid-cols-12 w-full gap-3">
            <div className="md:col-span-4 flex flex-col items-start space-y-2 w-full">
              <div className="w-full">
                <h1 className={HeaderStyle}>Owner</h1>
                <div className="bg-blue-bg p-5 rounded-md">
                  <h1 className="font-bold text-white text-xl md:text-2xl capitalize">
                    {PropertyDetailData?.data?.property?.owner?.name}
                  </h1>
                </div>
              </div>
              <h1 className={HeaderStyle}>Price</h1>
              <div className="bg-blue-bg p-5 rounded-md w-full">
                <h1 className="font-bold text-white text-xl md:text-3xl">
                  {PropertyDetailData?.data?.property?.price}{" "}
                  {PropertyDetailData?.data?.property?.currency}
                </h1>
              </div>
              {/* poster */}
              <div className="w-full border-b pb-2 border-gray-200 dark:border-gray-700">
                <h1 className={HeaderStyle}>Poster</h1>
                <div>
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        PropertyDetailData?.data?.property?.poster
                          ?.profile_image
                      }
                      alt=""
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium text-dark-color dark:text-gray-300 text-sm">
                        {PropertyDetailData?.data?.property?.poster?.firstName +
                          " " +
                          PropertyDetailData?.data?.property?.poster?.lastName}
                      </p>
                      <div className="flex flex-col items-start ">
                        <p className="font-normal text-dark-gray dark:text-gray-300 text-sm">
                          {PropertyDetailData?.data?.property?.poster?.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* agent */}
              <div className="w-full border-b pb-2 border-gray-200 dark:border-gray-700">
                <h1 className={HeaderStyle}>Agent</h1>
                <div>
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        PropertyDetailData?.data?.property?.agent?.user
                          .profile_image
                      }
                      alt="agent progile image"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium text-dark-color dark:text-gray-300 text-sm">
                        {PropertyDetailData?.data?.property?.agent?.user
                          ?.firstName +
                          " " +
                          PropertyDetailData?.data?.property?.agent?.user
                            ?.lastName}
                      </p>
                      <div className="flex flex-col items-start ">
                        <p className="font-normal text-dark-gray dark:text-gray-300 text-sm">
                          {
                            PropertyDetailData?.data?.property?.agent?.user
                              ?.phone
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* rAatings */}
              <div className="flex flex-col items-start space-y-1  ">
                <h3 className={HeaderStyle}>Ratings and reviews</h3>
                {PropertyDetailData?.data?.propertyRating?.getAllRatings
                  ?.length > 0 && (
                  <div className="flex items-center space-x-2 w-full">
                    <div className="flex flex-col items-center w-20">
                      <h2 className="font-bold text-dark-color text-3xl dark:text-gray-300">
                        {PropertyDetailData?.data?.propertyRating?.average}
                      </h2>
                      <ReactStars
                        count={5}
                        value={
                          PropertyDetailData?.data?.propertyRating?.average
                        }
                        size={14}
                        className="cursor-default whitespace-nowrap"
                        half={true}
                        color2={MainColor}
                      />
                      <p className="font-medium text-dark-gray text-sm dark:text-gray-300">
                        {PropertyDetailData?.data?.propertyRating?.totalRatings}
                      </p>
                    </div>
                    <div className="flex flex-col items-start space-y-2 w-full">
                      {Object.values<number>(
                        PropertyDetailData?.data?.propertyRating?.counts
                      )
                        ?.reverse()
                        ?.map((value: number, index: number) => (
                          <div className="flex items-center space-x-1 w-full">
                            <p className="text-sm dark:text-gray-300">
                              {Object.values<number>(
                                PropertyDetailData?.data?.propertyRating?.counts
                              )?.length - index}
                            </p>
                            <ProgressBar
                              completed={value}
                              className="w-full"
                              height="10px"
                              labelColor="#216fed"
                              bgColor="#216fed"
                              baseBgColor="#E5E7EB"
                              maxCompleted={Object.values<number>(
                                PropertyDetailData?.data?.propertyRating?.counts
                              )?.reduce((a: number, b: number) => a + b, 0)}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {PropertyDetailData?.data?.propertyRating?.getAllRatings
                  ?.length > 0 ? (
                  PropertyDetailData?.data?.propertyRating?.getAllRatings?.map(
                    (rate: PropertyRate) => (
                      <div
                        key={rate._id}
                        className="flex items-start flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-1 w-full">
                          <img
                            src={rate.user.profile_image}
                            alt="user profile"
                            className="h-14 w-14 rounded-full object-cover"
                          />
                          <h3 className="font-medium text-dark-color dark:text-gray-300 text-sm">
                            {rate.user.firstName + " " + rate.user.lastName}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1 w-full">
                          <ReactStars
                            count={5}
                            value={rate?.rate}
                            size={14}
                            className="cursor-default"
                            half={true}
                            color2={MainColor}
                          />
                          <p className="font-normal text-dark-gray text-sm dark:text-gray-300">
                            {format(new Date(rate.createdAt), "M/d/yy")}
                          </p>
                        </div>

                        <p className="font-normal normal-case text-dark-gray text-sm dark:text-gray-300">
                          {rate.review}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <h3
                    className={
                      "font-normal text-dark-color dark:text-gray-300 text-sm py-2 text-center"
                    }
                  >
                    No Ratings & Reviews
                  </h3>
                )}
              </div>
            </div>
            {/* second grid */}
            <div className="md:col-span-8 flex flex-col space-y-2">
              <h1 className={HeaderStyle}>Description</h1>
              <p className="font-normal text-dark-gray text-sm dark:text-gray-300">
                {PropertyDetailData?.data?.property?.description}
              </p>
              <div className="border border-gray-300 dark:border-gray-700 w-fit p-2 rounded-md">
                <p className="font-medium capitalize text-dark-gray text-sm dark:text-gray-300">
                  {PropertyDetailData?.data?.property?.propertyHomeType?.name}
                </p>
              </div>
              <h1 className={HeaderStyle}>Payment Description</h1>
              <p className="font-normal text-dark-gray text-sm dark:text-gray-300">
                {PropertyDetailData?.data?.property?.paymentDescription}
              </p>
              {/* carousel */}
              <div className="">
                <h1 className={HeaderStyle}>Gallery</h1>
                <Carousel>
                  {PropertyDetailData?.data?.property?.images?.map(
                    (image: { url: string; _id: string }) => (
                      <img
                        src={image.url}
                        key={image._id}
                        className="max-w-[500px] max-h-[200px] h-full w-full object-cover rounded-md"
                      />
                    )
                  )}
                </Carousel>
              </div>
              {/* location */}
              <h1 className={HeaderStyle}>Location</h1>
              <MapPreview
                lat={PropertyDetailData?.data?.property?.address?.loc[0]}
                lng={PropertyDetailData?.data?.property?.address?.loc[1]}
              />

              {/* amenities */}
              <h1 className={HeaderStyle}>Amenities</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-3">
                {PropertyDetailData?.data?.property?.amenities?.length > 0 ? (
                  PropertyDetailData?.data?.property?.amenities?.map(
                    (amenity: string) => (
                      <div
                        className="flex items-center space-x-2"
                        key={amenity}
                      >
                        <BsFillPatchCheckFill className="text-green-500" />
                        <p className="font-semibold text-sm capitalize text-dark-color dark:text-gray-300 ">
                          {amenity}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <div className="md:col-span-3">
                    <p className="font-normal text-sm text-dark-color w-full dark:text-gray-300 capitalize text-center">
                      Property has no Amenity!
                    </p>
                  </div>
                )}
              </div>
              {/* facilities */}
              <h1 className={HeaderStyle}>Facilities</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-3">
                {PropertyDetailData?.data?.property?.facilities?.length > 0 ? (
                  PropertyDetailData?.data?.property?.facilities?.map(
                    (facility: {
                      facility: string[];
                      distance: number;
                      _id: string;
                      name: string;
                    }) => (
                      <div
                        className="flex items-center space-x-2"
                        key={facility?._id}
                      >
                        <BsFillPatchCheckFill className="text-green-500" />
                        <p className="font-semibold text-sm capitalize text-dark-color dark:text-gray-300 ">
                          {facility.facility[0]}{" "}
                          <span>{facility?.distance} km away</span>
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <div className="md:col-span-3">
                    <p className="font-normal text-sm text-dark-color w-full dark:text-gray-300 capitalize text-center">
                      Property has no facility!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* actions */}
          {!PropertyDetailData?.data?.property?.isSoldOut &&
            !PropertyDetailData?.data?.property?.isRented && (
              <div className="flex items-center self-end pt-3 justify-end ">
                <Button
                  onClick={() => {
                    setIsConfirmModalOpen(true);
                    setActionType(ActionType.ChangeStatus);
                  }}
                >
                  {" "}
                  {PropertyDetailData?.data?.property?.propertyType === "rent"
                    ? "Add to Rented Properties"
                    : " Add to Sold Properties"}
                </Button>
              </div>
            )}
          {/* if it is rented he can make it back  */}
          {!PropertyDetailData?.data?.property?.isSoldOut &&
            PropertyDetailData?.data?.property?.isRented && (
              <div className="flex items-center self-end pt-3 justify-end ">
                <Button
                  onClick={() => {
                    setIsConfirmModalOpen(true);
                    setActionType(ActionType.RePost);
                  }}
                >
                  Re Post Property
                </Button>
              </div>
            )}
        </div>
      ) : (
        <MainLoader />
      )}
      {PropertyDetailData.isFetched && PropertyDetailData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <ConfirmDialogBox
        title={
          actionType === ActionType.RePost
            ? "Are you sure this property is Available for Rent"
            : PropertyDetailData?.data?.property?.propertyType === "rent"
            ? "Are you sure this property is Rented"
            : "Are you sure this property is Sold Out"
        }
        description={
          actionType === ActionType.RePost
            ? "This action can be undone. This will permanently show the Property to customers."
            : PropertyDetailData?.data?.property?.propertyType === "rent"
            ? `This action can be done,This will temprorary hide the property from customers you can chnage the status`
            : ` This action can be undone. This will permanently hide  
      the Property from customers.`
        }
        onClick={
          actionType === ActionType.RePost
            ? rePostPropertySubmitHandler
            : changePropertyStatusSubmitHandler
        }
        isLoading={changePropertyMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      />
    </div>
  );
};

export default PropertyDetail;
