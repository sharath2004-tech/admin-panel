import { format } from "date-fns";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import ReactApexChart from "react-apexcharts";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useTheme } from "@/hooks/useThemeContext";
import { MainColor } from "@/constants/Color";

interface Props {
  total: number;
  rented: number;
  sold: number;
}
const PropertyChart: React.FC<Props> = ({ total, rented, sold }) => {
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const headers = getHeaders({ type: "Json", token });
  const propertyAnalyticsData = useFetchData(
    ["propertyAnalyticsDataApi", stateChange],
    `property/broker/analytics/${user?.broker}`,
    headers
  );
  console.log(
    propertyAnalyticsData?.data?.monthlyTotalsSoldProperties?.map(
      (item: { month: string }) => format(new Date(item.month), "MMMM yyyy")
    )
  );
  const series = [
    {
      name: "Sold Properties",
      type: "area",
      data: propertyAnalyticsData?.data?.monthlyTotalsSoldProperties?.map(
        (item: { total: number }) => item.total
      ),
    },
    {
      name: "Rented Properties",
      type: "area",
      data: propertyAnalyticsData?.data?.monthlyTotalsRentedProperties?.map(
        (item: { total: number }) => item.total
      ),
    },
  ];
  return (
    <div className="lg:col-span-3 bg-white dark:bg-secondary-dark-bg  rounded-md  my-transition border border-gray-200 dark:border-gray-700 w-full">
      <div className="flex items-start w-full p-2">
        <p className="dark:text-white font-medium">Property Analytics</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3  border-y border-gray-300 dark:border-gray-700 border-dashed">
        <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-400 py-2 dark:border-gray-700 border-dashed">
          <h2 className="font-semibold dark:text-white">{total}</h2>
          <p className="whitespace-nowrap text-dark-gray font-medium dark:text-gray-300 text-sm">
            Total Properties
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-400 py-2 dark:border-gray-700 border-dashed">
          <h2 className="font-semibold dark:text-white">{sold}</h2>
          <p className="whitespace-nowrap text-dark-gray font-medium dark:text-gray-300 text-sm">
            Sold Properties
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2  py-2">
          <h2 className="font-semibold dark:text-white">{rented}</h2>
          <p className="whitespace-nowrap text-dark-gray font-medium dark:text-gray-300 text-sm">
            Rented Properties
          </p>
        </div>
      </div>
      {propertyAnalyticsData.isFetched && propertyAnalyticsData.isSuccess ? (
        <div id="chartContainer">
          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: "line",
                stacked: false,
                toolbar: {
                  tools: {
                    zoom: false,
                    zoomin: false,
                    reset: false,
                    download: false,
                    pan: false,
                    zoomout: false,
                  },
                },
                background: "transparent",
              },
              stroke: {
                width: [0, 2, 5],
                curve: "smooth",
              },
              plotOptions: {
                bar: {
                  columnWidth: "50%",
                },
              },
              grid: {
                show: false,
              },
              fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                  inverseColors: false,
                  shade: "light",
                  type: "vertical",
                  opacityFrom: 0.85,
                  opacityTo: 0.55,
                  stops: [0, 100, 100, 100],
                },
              },
              theme: {
                mode:
                  currentTheme === "dark" ||
                  (currentTheme === "dark" && systemTheme)
                    ? "dark"
                    : "light",
              },
              labels:
                propertyAnalyticsData?.data?.monthlyTotalsSoldProperties?.map(
                  (item: { month: string }) =>
                    format(new Date(item.month), "MMMM yyyy")
                ),
              markers: {
                size: 0,
              },
              xaxis: {
                type: "datetime",
                axisBorder: {
                  show: false,
                },
              },
              yaxis: {
                title: {
                  text: "Total",
                },
                min: 0,
              },
              colors: [MainColor],
            }}
            series={series}
            type="line"
            height={350}
          />
        </div>
      ) : (
        <MainLoader />
      )}
      {propertyAnalyticsData.isFetched && propertyAnalyticsData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default PropertyChart;
