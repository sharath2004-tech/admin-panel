import ErrorBoundary from "@/components/ErrorBoundary";
import { getHeaders } from "@/config/apiConfig";
import { MainLoader } from "@/constants/Loader";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import ChangePassword from "@/pages/common/ChangePassword";
import UpdateProfile from "@/pages/common/UpdateProfile";
import { useState } from "react";

import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const Tabs = ["Profile", "Change Password"];
  const [stateChange, setStateChange] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const profileData = useFetchData(
    ["profileDataApi", stateChange],
    `users/profile/${user?._id}`,
    headers
  );
  return (
    <div className="flex flex-col items-start space-y-5 w-full">
      {profileData.isFetched && profileData.isSuccess ? (
        <div className="w-full">
          <div className="bg-white w-full dark:bg-secondary-dark-bg shadow-sm my-transition p-4 flex flex-col md:flex-row items-start gap-2 justify-between border border-gray-200 dark:border-gray-800">
            <div className="flex items-start space-x-2">
              <img
                src={profileData?.data?.profile_image}
                alt="profile image"
                className="h-20 w-20 md:w-44 object-cover md:h-32 lg:h-44 rounded-sm"
              />
              <div className="flex flex-col items-start space-y-2">
                <h2 className="text-xl font-bold dark:text-white">
                  {profileData?.data?.firstName +
                    " " +
                    profileData?.data?.lastName}
                </h2>

                <div className="flex items-center gap-2">
                  <BsTelephoneFill className="text-main-color" />
                  <h2 className="font-medium text-sm dark:text-gray-300">
                    {profileData?.data?.phone}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmail className="text-main-color" />
                  <h2 className="font-medium text-sm dark:text-gray-300">
                    {profileData?.data?.email}
                  </h2>
                </div>
                <div className="flex items-center bg-main-color/40 p-1 rounded-md">
                  <h2 className="font-medium text-xs text-main-color">
                    {profileData?.data?.role}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* tabs */}
          <div className="flex items-center gap-3 bg-white dark:bg-secondary-dark-bg p-4 font-medium">
            {Tabs.map((tab) => (
              <div
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={`${
                  tab === activeTab
                    ? "text-main-color border-b-2 border-main-color"
                    : "dark:text-gray-300"
                } font-semibold cursor-pointer transition duration-500 ease-out`}
              >
                <p>{tab}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center gap-3 bg-white dark:bg-secondary-dark-bg p-4 font-medium">
            {activeTab === Tabs[1] ? (
              <ChangePassword />
            ) : (
              <UpdateProfile
                setStateChange={setStateChange}
                stateChange={stateChange}
              />
            )}
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
      {profileData.isFetched && profileData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default Profile;
