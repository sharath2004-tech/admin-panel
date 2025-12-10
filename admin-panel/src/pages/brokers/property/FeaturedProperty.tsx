import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import BrokersPropertyTable from "./components/BrokersPropertyTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
const FeaturedProperty: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(2);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const BrokersFeaturedPropertyData = useFetchData(
    ["BrokersFeaturedPropertyDataApi", currentPage, perPage, stateChange],
    `property/broker/featured/${user?.broker}?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 bg-white dark:bg-secondary-dark-bg my-transition flex flex-col items-start space-y-3 w-full">
      <HeaderContainer headerTitle="Featured Properties"></HeaderContainer>
      <div className="w-full">
        {BrokersFeaturedPropertyData.isFetched &&
        BrokersFeaturedPropertyData.isSuccess ? (
          <div className="w-full">
            <BrokersPropertyTable
              data={BrokersFeaturedPropertyData?.data?.pagination}
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
      </div>
      {BrokersFeaturedPropertyData.isFetched &&
        BrokersFeaturedPropertyData.isError && (
          <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
        )}
    </div>
  );
};

export default FeaturedProperty;
