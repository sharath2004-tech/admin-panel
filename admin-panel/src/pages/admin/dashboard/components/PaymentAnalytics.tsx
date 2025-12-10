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
const PaymentAnalytics = () => {
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const headers = getHeaders({ type: "Json", token });
  const paymentAnalyticsData = useFetchData(
    ["paymentAnalyticsDataApi", stateChange],
    `payment/admin/analytics`,
    headers
  );
  console.log(
    paymentAnalyticsData?.data?.map((item: { month: string }) =>
      format(new Date(item.month), "MMMM yyyy")
    )
  );
  //   month
  const series = [
    {
      name: "USD",
      type: "area",
      data: paymentAnalyticsData?.data?.map(
        (item: { totalAmount: number }) => item.totalAmount
      ),
    },
  ];
  return (
    <div className=" bg-white p-3 dark:bg-secondary-dark-bg  rounded-md  my-transition border border-gray-200 dark:border-gray-700 w-full">
      {" "}
      {paymentAnalyticsData.isFetched && paymentAnalyticsData.isSuccess ? (
        <div>
          <h2 className="font-medium dark:text-white">Payment Analytics</h2>
          <div id="chartContainer">
            <ReactApexChart
              options={{
                chart: {
                  height: 350,
                  type: "area",
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
                theme: {
                  mode:
                    currentTheme === "dark" ||
                    (currentTheme === "dark" && systemTheme)
                      ? "dark"
                      : "light",
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
                labels: paymentAnalyticsData?.data?.map(
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
                    text: "Total Amount",
                  },
                  min: 0,
                },
                colors: [MainColor],
              }}
              series={series}
              type="area"
              height={350}
            />
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
      {paymentAnalyticsData.isFetched && paymentAnalyticsData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default PaymentAnalytics;
