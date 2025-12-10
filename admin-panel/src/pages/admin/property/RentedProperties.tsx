import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import BrokersPropertyTable from "./brokers/components/BrokersPropertyTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/Option";
import { FeaturedPropertyFilterType } from "@/utils/filter.enum";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";

const RentedProperties: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [filterType, setFilterType] = useState<FeaturedPropertyFilterType>(
    FeaturedPropertyFilterType.All
  ); // ["All", "Brokers", "InHouses"
  const { currentTheme } = useTheme();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const rentedProperties = useFetchData(
    ["rentedPropertyDataApi", currentPage, perPage, stateChange, filterType],
    `property/rented/admin/all?page=${currentPage}&perPage=${perPage}&type=${filterType}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Sold Properties">
        <Select
          onValueChange={(e: FeaturedPropertyFilterType) => setFilterType(e)}
        >
          <SelectTrigger className="w-[150px] bg-gray-300 p-2 border border-gray-300 dark:border-gray-700 dark:bg-main-dark-bg my-transition dark:text-white">
            <SelectValue placeholder={FeaturedPropertyFilterType.All} />
          </SelectTrigger>
          <SelectContent
            className={`${
              currentTheme === "dark" ||
              (currentTheme === "dark" && systemTheme)
                ? "text-white bg-main-dark-bg border-gray-700"
                : "bg-white"
            }`}
          >
            <SelectItem value={FeaturedPropertyFilterType.All}>All</SelectItem>
            <SelectItem value={FeaturedPropertyFilterType.Brokers}>
              Brokers
            </SelectItem>
            <SelectItem value={FeaturedPropertyFilterType.InHouses}>
              Inhouses
            </SelectItem>
          </SelectContent>
        </Select>
      </HeaderContainer>
      <div className="w-full">
        {rentedProperties.isFetched && rentedProperties.isSuccess ? (
          <div className="w-full">
            <BrokersPropertyTable
              data={rentedProperties?.data?.pagination}
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
      {rentedProperties.isFetched && rentedProperties.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default RentedProperties;
