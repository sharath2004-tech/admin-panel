import { FaBuysellads, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import { useParams } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { RiHome4Fill, RiHome6Fill } from "react-icons/ri";
import { BiSolidDollarCircle } from "react-icons/bi";
const BrokerInfoCount = () => {
  const { id } = useParams();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const infoCountData = useFetchData(
    ["BrokerInfoCountDataApi", stateChange, id],
    `analytics/broker-detail/${id}`,
    headers
  );

  const CountView = ({
    icon,
    title,
    count,
  }: {
    icon: React.ReactNode;
    title: string;
    count: number;
  }) => {
    return (
      <div className="bg-white dark:bg-secondary-dark-bg px-5  py-3  flex-col  justify-between  rounded-md my-transition flex items-start border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-start space-y-1">
          <h3 className="font-normal text-sm dark:text-gray-400 capitalize">
            {title}
          </h3>
          <h3 className="font-bold text-xl dark:text-gray-300">{count}</h3>
        </div>

        {icon}
      </div>
    );
  };
  return (
    <section className="flex flex-col space-y-4 w-full">
      {infoCountData.isSuccess && infoCountData.isFetched ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <CountView
            icon={
              <div className="bg-emerald-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <RiHome4Fill className="text-emerald-500" />
              </div>
            }
            title="Properties"
            count={infoCountData?.data?.totalPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-emerald-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <RiHome4Fill className="text-emerald-500" />
              </div>
            }
            title="Featured Properties"
            count={infoCountData?.data?.featuredPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-blue-bg/40 rounded-full p-2 flex items-end justify-end self-end">
                <FaUserAlt className="text-blue-500" />
              </div>
            }
            title="Agents"
            count={infoCountData?.data?.agentsCount}
          />
          <CountView
            icon={
              <div className="bg-indigo-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <RiHome6Fill className="text-indigo-500" />
              </div>
            }
            title="Sold Properties"
            count={infoCountData?.data?.soldPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-rose-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <FaUserAlt className="text-rose-500" />
              </div>
            }
            title="rented Properties"
            count={infoCountData?.data?.rentedPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-fuchsia-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <FaBuysellads className="text-fuchsia-500" />
              </div>
            }
            title="Ads"
            count={infoCountData?.data?.adsCount}
          />
          <CountView
            icon={
              <div className="bg-rose-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <FaUserAlt className="text-rose-500" />
              </div>
            }
            title="Packages"
            count={infoCountData?.data?.totalPackagesCount}
          />
          <CountView
            icon={
              <div className="bg-green-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <BiSolidDollarCircle className="text-green-500" />
              </div>
            }
            title="$ Money Spent"
            count={infoCountData?.data?.totalMoneySpent[0]?.totalAmount ?? 0}
          />
        </div>
      ) : (
        <div
          className="md:col-span-2 flex items-center w-full  justify-center"
          onClick={() => setStateChange((prev) => !prev)}
        >
          <MainLoader />
        </div>
      )}

      {infoCountData.isFetched && infoCountData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </section>
  );
};

export default BrokerInfoCount;
