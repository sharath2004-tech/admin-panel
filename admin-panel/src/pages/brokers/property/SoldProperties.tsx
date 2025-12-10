import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import BrokersPropertyTable from "./components/BrokersPropertyTable";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
const SoldProperties: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const BrokersSoldPropertyData = useFetchData(
    ["BrokersSoldPropertyDataApi", currentPage, perPage, stateChange],
    `property/broker/sold/${user?.broker}?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 bg-white dark:bg-secondary-dark-bg my-transition flex flex-col items-start space-y-3 w-full">
      <HeaderContainer headerTitle="Sold Properties"></HeaderContainer>
      <div className="w-full">
        {BrokersSoldPropertyData.isFetched &&
        BrokersSoldPropertyData.isSuccess ? (
          <div className="w-full">
            <BrokersPropertyTable
              data={BrokersSoldPropertyData?.data?.pagination}
              setCurrentPage={setCurrentPage}
              setPerPage={setPerPage}
              currentPage={currentPage}
              perPage={perPage}
              setStateChange={setStateChange}
            />
          </div>
        ) : (
          <MainLoader />
        )}
        {BrokersSoldPropertyData.isFetched &&
          BrokersSoldPropertyData.isError && (
            <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
          )}
      </div>
    </div>
  );
};

export default SoldProperties;
