import { Menu } from "@headlessui/react";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useHome } from "@/hooks/useHomeContext";
import { useTheme } from "@/hooks/useThemeContext";
import ReusableMenu from "@/lib/ui/Menu";
import { useAuth } from "@/hooks/useAuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/Popover";
import { MdNotifications } from "react-icons/md";
import { useState } from "react";
import { getHeaders } from "@/config/apiConfig";
import { useFetchData } from "@/hooks/useFetchData";
import { MainLoader } from "@/constants/Loader";
import Notification from "./Notification";
import ErrorBoundary from "../ErrorBoundary";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { Role } from "@/types/Auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/Option";
import { ThemeType } from "@/types/Theme";
const Navbar = () => {
  const { logout, user, token } = useAuth();
  const { currentTheme, setCurrentTheme } = useTheme();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const headers = getHeaders({ type: "Json", token });
  const navigate = useNavigate();
  const {
    setIsSideBarOpen,
    setActiveMenu,
    isSideBarOpen,
    isOpen,
    setIsOpen,
    isSmallScreen,
  } = useHome();

  const handleNav = () => {
    setIsOpen(!isOpen);
  };
  const toggleActiveMenu = () => {
    setActiveMenu((prevActiveMenu: boolean) => !prevActiveMenu);
  };
  const latestNotificationData = useFetchData(
    ["LatestNotificationsDataApi", stateChange],
    user?.role == Role.Admin
      ? `notification/dashboard/admin/${user?._id}`
      : `notification/dashboard/user/${user?._id}`,
    headers
  );
  function DropDown() {
    return (
      <div className=" flex items-end justify-end z-20">
        <ReusableMenu
          menuHeader={
            <div className="flex items-center space-x-1 z-20">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-gray-500 text-sm font-medium capitalize">
                  {user?.firstName + " " + user?.lastName}
                </p>
                <span className="text-gray-500 text-sm">{user?.email}</span>
              </div>
              <img
                src={user?.profile_image}
                alt="profile image"
                className="h-11 w-11 rounded-full"
              />
            </div>
          }
        >
          <Menu.Item>
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 p-2 pl-3 w-full hover:bg-main-bg/20  cursor-pointer"
            >
              <FaUserAlt size={13} className="text-main-color" />
              <span className={`capitalize font-medium text-sm text-gray-500`}>
                Profile
              </span>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              onClick={logout}
              className="flex items-center space-x-2 p-2 pl-3 w-full hover:bg-main-bg/20  cursor-pointer"
            >
              <FiLogOut size={13} className="text-main-color" />
              <span className={`capitalize font-medium text-sm text-gray-500`}>
                Log Out
              </span>
            </div>
          </Menu.Item>
        </ReusableMenu>
      </div>
    );
  }

  function changeThemeMode(data: ThemeType) {
    if (data === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem("themeMode", "dark");
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
        localStorage.setItem("themeMode", "light");
      }
      return;
    }
    if (data === "dark") {
      localStorage.setItem("themeMode", "dark");
      setCurrentTheme("dark");
      return;
    }
    if (data === "light") {
      setCurrentTheme("light");
      localStorage.setItem("themeMode", "light");
      return;
    }
  }

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  function ChangeTheme() {
    return (
      <Select onValueChange={(e: ThemeType) => changeThemeMode(e)}>
        <SelectTrigger className="w-[100px] bg-white p-2 border border-gray-300 dark:border-gray-700 dark:bg-secondary-dark-bg my-transition dark:text-white">
          <SelectValue placeholder={currentTheme} />
        </SelectTrigger>
        <SelectContent
          className={`${
            currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
              ? "text-white bg-secondary-dark-bg border-gray-700"
              : "bg-white"
          }`}
        >
          <SelectItem value={"light"}>Light</SelectItem>
          <SelectItem value={"dark"}>Dark</SelectItem>
          <SelectItem value={"system"}>System</SelectItem>
        </SelectContent>
      </Select>
    );
  }
  return (
    <div className="bg-white dark:bg-main-dark-bg transition-all duration-500 ease-in-out w-full  p-3 flex items-center justify-between md:px-5">
      <div className="flex items-center gap-2">
        {isSmallScreen && !isOpen ? (
          <HiMenuAlt1
            size={18}
            className=" text-stone-900 dark:text-gray-300 cursor-pointer"
            onClick={isSmallScreen ? toggleActiveMenu : handleNav}
          />
        ) : (
          <HiMenuAlt1
            size={18}
            className=" text-stone-900 dark:text-gray-300 cursor-pointer"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        )}
        <h2 className="hidden md:flex font-bold dark:text-white text-slate-800 text-lg">
          Hi, Welcome back 👋
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        {/* for larger screen notifications */}
        <div className="hidden md:flex items-center space-x-2">
          <Popover>
            <PopoverTrigger>
              {" "}
              <div className="relative">
                <MdNotifications className="text-xl text-gray-800 dark:text-gray-300 cursor-pointer my-transition" />
                {latestNotificationData?.data?.unreadNotfCount > 0 && (
                  <div className="bg-red-500 flex items-center justify-center rounded-full absolute -top-1 -right-1 w-4 h-4">
                    <p className="text-white text-center text-xs">
                      {latestNotificationData?.data?.unreadNotfCount}
                    </p>
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              className={`${
                currentTheme === "dark" ||
                (currentTheme === "dark" && systemTheme)
                  ? "text-white bg-secondary-dark-bg border  border-gray-700"
                  : "bg-white"
              } p-0`}
            >
              {latestNotificationData.isFetched &&
              latestNotificationData.isSuccess ? (
                latestNotificationData?.data?.notifications?.length > 0 ? (
                  <Notification
                    notifications={latestNotificationData?.data?.notifications}
                    setStateChange={setStateChange}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-20">
                    <p
                      className={` text-sm ${
                        currentTheme === "dark" ? "text-gray-400" : ""
                      }`}
                    >
                      No Notifications
                    </p>
                  </div>
                )
              ) : (
                <MainLoader />
              )}
              {latestNotificationData.isFetched &&
                latestNotificationData.isError && (
                  <ErrorBoundary
                    onClick={() => setStateChange((prev) => !prev)}
                  />
                )}
              {latestNotificationData?.data?.notifications?.length > 0 && (
                <div
                  className={` text-sm ${
                    currentTheme === "dark"
                      ? "border-gray-600"
                      : "border-gray-300"
                  } flex items-center justify-center w-full border-t p-2`}
                >
                  <p
                    className="text-sm text-center font-normal cursor-pointer dark:text-gray-600"
                    onClick={() => {
                      navigate("/notifications");
                      setOpen(false);
                    }}
                  >
                    View All
                  </p>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* for small screen */}
        <div
          className="flex md:hidden relative cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <MdNotifications className="text-xl text-gray-800 dark:text-gray-300 cursor-pointer my-transition" />
          {latestNotificationData?.data?.unreadNotfCount > 0 && (
            <div className="bg-red-500 flex items-center justify-center rounded-full absolute -top-1 -right-1 w-4 h-4">
              <p className="text-white text-center text-xs">
                {latestNotificationData?.data?.unreadNotfCount}
              </p>
            </div>
          )}
        </div>

        <ChangeTheme />
        <DropDown />
      </div>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => [440, maxHeight]}
        footer={
          <div className="px-2 pt-2 flex items-center justify-center w-full">
            <p
              className="text-md text-center font-medium cursor-pointer text-sm"
              onClick={() => {
                navigate("/notifications");
                setOpen(false);
              }}
            >
              View All
            </p>
          </div>
        }
        style={{ backgroundColor: "blue" }}
      >
        {latestNotificationData.isFetched &&
        latestNotificationData.isSuccess ? (
          latestNotificationData?.data?.notifications?.length > 0 ? (
            <Notification
              notifications={latestNotificationData?.data?.notifications}
              setStateChange={setStateChange}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-20">
              <p className="text-gray-500 text-sm">No Notifications</p>
            </div>
          )
        ) : (
          <MainLoader />
        )}
        {latestNotificationData.isFetched && latestNotificationData.isError && (
          <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
        )}
      </BottomSheet>
    </div>
  );
};

export default Navbar;
