import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import MyPackagesTable from "./components/MyPackagesTable";

import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
const MyPackages: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(4);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const BrokersPackagesData = useFetchData(
    ["BrokersPackagesHistoryDataApi", currentPage, perPage, stateChange],
    `broker-packages/broker/all/${user?.broker}?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 bg-white dark:bg-secondary-dark-bg my-transition flex flex-col items-start space-y-3 w-full">
      <HeaderContainer headerTitle="My Packages"></HeaderContainer>
      <div className="w-full">
        {BrokersPackagesData.isFetched && BrokersPackagesData.isSuccess ? (
          <div className="w-full">
            <MyPackagesTable
              data={BrokersPackagesData?.data?.pagination}
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
      {BrokersPackagesData.isFetched && BrokersPackagesData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default MyPackages;

// broker-packages
