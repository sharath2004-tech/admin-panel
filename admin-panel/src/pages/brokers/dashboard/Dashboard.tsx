import { FaBuysellads, FaUserAlt } from "react-icons/fa";
import PropertyChart from "./components/PropertyChart";
import PackageStatus from "./components/PackageStatus";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import CountView from "./components/CountView";
import { RiHome4Fill } from "react-icons/ri";
const Dashboard = () => {
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const dashbboardCountData = useFetchData(
    ["dashbboardCountDataApi", stateChange],
    `analytics/broker/${user?.broker}`,
    headers
  );

  return (
    <section className="flex flex-col space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <PackageStatus />

        {dashbboardCountData.isSuccess && dashbboardCountData.isFetched ? (
          <div className="grid grid-cols-2 gap-3 w-full md:col-span-2 lg:col-span-2">
            <CountView
              icon={
                <div className="bg-amber-500/40 rounded-full p-2 flex items-end justify-end self-end">
                  <RiHome4Fill className="text-amber-500" />
                </div>
              }
              title="Featured Properties"
              count={dashbboardCountData?.data?.featuredPropertyCount}
            />
            <CountView
              icon={
                <div className="bg-green-500/40 rounded-full p-2 flex items-end justify-end self-end">
                  <FaBuysellads className="text-green-500" />
                </div>
              }
              title="Ads"
              count={dashbboardCountData?.data?.adsCount}
            />
            <CountView
              icon={
                <div className="bg-blue-bg/40 rounded-full p-2 flex items-end justify-end self-end">
                  <FaUserAlt className="text-main-color" />
                </div>
              }
              title="Agents"
              count={dashbboardCountData?.data?.agentsCount}
            />
            <CountView
              icon={
                <div className="bg-rose-500/40 rounded-full p-2 flex items-end justify-end self-end">
                  <FaUserAlt className="text-rose-500" />
                </div>
              }
              title="Agents"
              count={dashbboardCountData?.data?.agents}
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
      </div>
      <div className="flex flex-col items-start space-y-2 w-full">
        <PropertyChart  total={dashbboardCountData?.data?.totalPropertyCount} rented={dashbboardCountData?.data?.rentedPropertyCount}
        sold={dashbboardCountData?.data?.soldPropertyCount}
        />
      </div>
    </section>
  );
};

export default Dashboard;
