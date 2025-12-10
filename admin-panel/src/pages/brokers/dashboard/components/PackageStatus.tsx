import { getHeaders } from "@/config/apiConfig";
import { MainLoader } from "@/constants/Loader";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import ErrorBoundary from "@/components/ErrorBoundary";
const PackageStatus = () => {
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const packageStatusData = useFetchData(
    ["packageStatusDataApi", stateChange],
    `broker-packages/my-active-packages/${user?.broker}`,
    headers
  );
  return (
    <>
      {packageStatusData.isFetched && packageStatusData.isSuccess ? (
        <div className="md:col-span-2 lg:col-span-2 gap-3 bg-blue-bg p-4 rounded-md flex flex-col items-start justify-between">
          <div>
            <h4 className="font-bold text-white text-4xl">
              {packageStatusData?.data?.package
                ? packageStatusData?.data?.package?.remining
                : packageStatusData?.data?.freeListingQuotaRemaining}{" "}
              /
              {packageStatusData?.data?.package
                ? packageStatusData?.data?.package?.maxListingsAllowed
                : packageStatusData?.data?.freeListingQuota}
            </h4>
            <h2 className="font-medium text-gray-300">Listing Quota</h2>
          </div>
          <div className="flex flex-col items-start space-y-1 w-full">
            <section className="flex items-center justify-between w-full">
              <h2 className="font-medium text-gray-200 text-sm">
                {packageStatusData?.data?.package
                  ? packageStatusData?.data?.package?.remining
                  : packageStatusData?.data?.freeListingQuotaRemaining}{" "}
                avalable
              </h2>
              <h2 className="font-medium text-gray-200 text-sm">
                {packageStatusData?.data?.package
                  ? Math.floor(
                      (packageStatusData?.data?.package?.remining /
                        packageStatusData?.data?.package?.maxListingsAllowed) *
                        100
                    )
                  : Math.floor(
                      (packageStatusData?.data?.freeListingQuotaRemaining /
                        packageStatusData?.data?.freeListingQuota) *
                        100
                    )}
                %
              </h2>
            </section>
            <ProgressBar
              completed={
                packageStatusData?.data?.package
                  ? packageStatusData?.data?.package?.maxListingsAllowed -
                    packageStatusData?.data?.package?.remining
                  : packageStatusData?.data?.freeListingQuota -
                    packageStatusData?.data?.freeListingQuotaRemaining
              }
              className="w-full"
              height="10px"
              labelColor="#216fed"
              bgColor="#216fed"
              maxCompleted={
                packageStatusData?.data?.package
                  ? packageStatusData?.data?.package?.maxListingsAllowed
                  : packageStatusData?.data?.freeListingQuota
              }
            />
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
      {packageStatusData.isFetched && packageStatusData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </>
  );
};

export default PackageStatus;
