import { useState } from "react";
import BrokerInfoCount from "./components/BrokerInfoCount";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";

const BrokerDetail = () => {
  const { id } = useParams();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const brokersDetailData = useFetchData(
    ["BrokersDetailDataApi", id, stateChange],
    `brokers/admin/single/${id}`,
    headers
  );


  return (
    <div>
      <div className="w-full flex flex-col items-start space-y-4">
        {brokersDetailData.isFetched && brokersDetailData.isSuccess ? (
          <div className="pb-10  w-full relative bg-white  dark:bg-secondary-dark-bg rounded-lg  border border-gray-200 dark:border-gray-500 overflow-hidden">
            <div className="relative h-44 md:h-64 w-full">
              {brokersDetailData?.data.coverImage ? (
                <img
                  src={brokersDetailData?.data.coverImage}
                  alt="broker cover image"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="h-full w-full bg-blue-bg object-cover hover:scale-105 transition-all
                     duration-500 flex items-center justify-center "
                ></div>
              )}
            </div>
            <div className="absolute bottom-7  left-5 p-1 bg-white dark:bg-secondary-dark-bg/80 my-transition shadow-sm rounded-md flex w-fit">
              <img
                src={brokersDetailData?.data?.logo}
                alt="broker logo"
                className=" h-12 rounded-md  object-contain "
              />
            </div>
            <div className="absolute bottom-3 pt-5 left-36">
              <h4 className="font-medium dark:text-gray-300 capitalize">
                {brokersDetailData?.data.name}
              </h4>
            </div>
          </div>
        ) : (
          <MainLoader />
        )}
         {brokersDetailData.isFetched && brokersDetailData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      </div>
      <div className="flex flex-col items-start space-y-1 py-5">
        <h3 className="font-semibold dark:text-white">Analytics</h3>
        <BrokerInfoCount />
      </div>
    </div>
  );
};

export default BrokerDetail;
