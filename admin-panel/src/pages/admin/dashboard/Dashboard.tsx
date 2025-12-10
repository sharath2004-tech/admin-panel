import { FaBuysellads, FaUserAlt } from "react-icons/fa";
import { SiIobroker } from "react-icons/si";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import PaymentAnalytics from "./components/PaymentAnalytics";
import CountView from "./components/CountView";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  BiSolidDollarCircle,
  BiSolidHomeCircle,
  BiSolidHomeSmile,
} from "react-icons/bi";
import { RiHome4Fill, RiHome6Fill } from "react-icons/ri";
import { MdAddHome } from "react-icons/md";
const Dashboard = () => {
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const dashbboardCountData = useFetchData(
    ["dashbboardCountDataApi", stateChange],
    `analytics/admin-dashboard`,
    headers
  );

  const paymentCountLength =
    dashbboardCountData?.data?.paymentCount?.length || 0;
  const totalAmount =
    (dashbboardCountData?.data &&
      dashbboardCountData?.data?.paymentCount[0]?.totalAmount) ||
    0;

  const count = "$" + (paymentCountLength > 0 ? totalAmount : 0);
  return (
    <section className="flex flex-col space-y-4 w-full">
      {dashbboardCountData.isSuccess && dashbboardCountData.isFetched ? (
        <div className="grid grid-cols-2 gap-3 w-full lg:grid-cols-4">
          <CountView
            icon={
              <div className="bg-blue-bg/40 rounded-full p-2 flex items-end justify-end self-end">
                <FaUserAlt className="text-main-color" />
              </div>
            }
            title="Users"
            count={dashbboardCountData?.data?.usersCount}
          />
          <CountView
            icon={
              <div className="bg-rose-400/40 rounded-full p-2 flex items-end justify-end self-end">
                <FaBuysellads className="text-rose-400" />
              </div>
            }
            title="Agents"
            count={dashbboardCountData?.data?.agentsCount}
          />
          <CountView
            icon={
              <div className="bg-amber-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <SiIobroker className="text-amber-500" />
              </div>
            }
            title="Brokers"
            count={dashbboardCountData?.data?.brokersCount}
          />
          <CountView
            icon={
              <div className="bg-lime-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <BiSolidHomeSmile className="text-lime-500" />
              </div>
            }
            title="Owners"
            count={dashbboardCountData?.data?.ownersCount}
          />
          <CountView
            icon={
              <div className="bg-emerald-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <RiHome4Fill className="text-emerald-500" />
              </div>
            }
            title="InHouse Propeties"
            count={dashbboardCountData?.data?.inHousePropertyCount}
          />
          <CountView
            icon={
              <div className="bg-teal-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <RiHome6Fill className="text-teal-500" />
              </div>
            }
            title="Brokers Properties"
            count={dashbboardCountData?.data?.brokersPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-cyan-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <MdAddHome className="text-cyan-500" />
              </div>
            }
            title="Featured Properties"
            count={dashbboardCountData?.data?.featuredPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-sky-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <BiSolidHomeCircle className="text-sky-500" />
              </div>
            }
            title="Rented Properties"
            count={dashbboardCountData?.data?.getAllRentedPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-indigo-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <RiHome6Fill className="text-indigo-500" />
              </div>
            }
            title="Sold Properties"
            count={dashbboardCountData?.data?.getAllSoldPropertyCount}
          />
          <CountView
            icon={
              <div className="bg-fuchsia-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <FaBuysellads className="text-fuchsia-500" />
              </div>
            }
            title="Ads"
            count={dashbboardCountData?.data?.adsCount}
          />
          <CountView
            icon={
              <div className="bg-green-500/40 rounded-full p-2 flex items-end justify-end self-end">
                <BiSolidDollarCircle className="text-green-500" />
              </div>
            }
            title="Total Earnings"
            count={count}
          />
        </div>
      ) : (
        <div className="md:col-span-2 flex items-center w-full  justify-center">
          <MainLoader />
        </div>
      )}
      {dashbboardCountData.isFetched && dashbboardCountData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <section className="w-full grid grid-cols-1 gap-3">
        <PaymentAnalytics />
      </section>
      <div className=" flex flex-col items-start space-y-2 w-full"></div>
    </section>
  );
};

export default Dashboard;
