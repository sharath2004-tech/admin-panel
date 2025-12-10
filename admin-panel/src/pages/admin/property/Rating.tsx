import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
import { PropertyRate } from "@/types/Property";
import ReactStars from "react-stars";
import { format } from "date-fns";
import { MainColor } from "@/constants/Color";
import Button from "@/lib/ui/Button";
import { useTheme } from "@/hooks/useThemeContext";
interface Props {
  id: string | undefined;
}
const Rating = ({ id }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const headers = getHeaders({ type: "Json", token });
  const ratingsData = useFetchData(
    ["propertyReatesDataApi", currentPage, id, stateChange],
    `rating/property/all/${id}?page=${currentPage}&perPage=${10}`,
    headers
  );

  return (
    <div>
      <div className="w-full">
        {ratingsData.isFetched && ratingsData.isSuccess ? (
          <div className="w-full flex flex-col items-start space-y-1 dvide-y-2 divide-gray-500">
            {ratingsData?.data?.pagination?.data?.map((rate: PropertyRate) => (
              <div
                key={rate._id}
                className="flex items-start flex-col space-y-1 dvide-y-2 divide-gray-500"
              >
                <div className="flex items-center space-x-1 w-full">
                  <img
                    src={rate.user.profile_image}
                    alt="user profile"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <h3
                    className={`${
                      currentTheme === "dark" ||
                      (currentTheme === "dark" && systemTheme)
                        ? "text-white "
                        : "text-dark-color"
                    } font-medium text-sm`}
                  >
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

                <p
                  className={`${
                    currentTheme === "dark" ||
                    (currentTheme === "dark" && systemTheme)
                      ? "text-white "
                      : "text-dark-color"
                  } font-light text-sm`}
                >
                  {rate.review}
                </p>
              </div>
            ))}
            <div className="flex items-center gap-2 justify-center">
              {ratingsData?.data?.pagination?.hasPrevPage && (
                <Button onClick={() => setCurrentPage((prev) => prev - 1)}>
                  {" "}
                  Prev
                </Button>
              )}
              {ratingsData?.data?.pagination?.hasNextPage && (
                <Button onClick={() => setCurrentPage((prev) => prev + 1)}>
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : (
          <MainLoader />
        )}
      </div>
      {ratingsData.isFetched && ratingsData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default Rating;
