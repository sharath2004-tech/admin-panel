import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import ReportedPropertiesTable from "./components/ReportedPropertiesTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/Option";
import { ReportPropertyAction } from "@/utils/filter.enum";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";

const PropertyReport: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [filterType, setFilterType] = useState<ReportPropertyAction>(
    ReportPropertyAction.All
  ); // ["All", "Brokers", "InHouses"
  const { currentTheme } = useTheme();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const reportedProperties = useFetchData(
    ["reportedPropertyDataApi", currentPage, perPage, stateChange, filterType],
    `report/admin/all?page=${currentPage}&perPage=${perPage}&type=${filterType}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Reported Properties">
        <Select onValueChange={(e: ReportPropertyAction) => setFilterType(e)}>
          <SelectTrigger className="w-[150px] bg-gray-300 p-2 border border-gray-300 dark:border-gray-700 dark:bg-main-dark-bg my-transition dark:text-white">
            <SelectValue placeholder={ReportPropertyAction.All} />
          </SelectTrigger>
          <SelectContent
            className={`${
              currentTheme === "dark" ||
              (currentTheme === "dark" && systemTheme)
                ? "text-white bg-main-dark-bg border-gray-700"
                : "bg-white"
            }`}
          >
            <SelectItem value={ReportPropertyAction.All}>All</SelectItem>
            <SelectItem value={ReportPropertyAction.NEW}>NEW</SelectItem>
            <SelectItem value={ReportPropertyAction.PENDING}>
              PENDING
            </SelectItem>
            <SelectItem value={ReportPropertyAction.CORRECTED}>
              CORRECTED
            </SelectItem>
          </SelectContent>
        </Select>
      </HeaderContainer>
      <div className="w-full">
        {reportedProperties.isFetched && reportedProperties.isSuccess ? (
          <div className="w-full">
            <ReportedPropertiesTable
              data={reportedProperties?.data?.pagination}
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
      {reportedProperties.isFetched && reportedProperties.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default PropertyReport;
