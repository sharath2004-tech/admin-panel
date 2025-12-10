/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminLinks, BrokerLinks } from "@/constants/SidebarLinks";
import { useHome } from "@/hooks/useHomeContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "@/styles/DropDown.css";
import { useAuth } from "@/hooks/useAuthContext";
import { Role } from "@/types/Auth";
const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const { isSideBarOpen, setActiveMenu } = useHome();
  const activeLink = `flex items-center font-normal  ${
    !isSideBarOpen && "justify-center"
  } bg-white/10 gap-1 text-gray-400  p-2 w-full px-4 duration-500 transition-ease-out rounded-md`;

  const normalLink = `flex items-center   gap-1 ${
    isSideBarOpen ? "px-4" : "justify-center "
  } py-2 text-gray-400
      hover:text-white  w-full font-normal `;

  const activeMenuLink = `flex items-center   gap-1 duration-500 transition-ease-out rounded-md ${
    isSideBarOpen ? "px-8 " : "justify-center "
  } py-2 dark:text-gray-200  text-gray-300
          bg-white/10  w-full font-normal `;
  const normalMenuLink = `flex items-center   gap-1 duration-500 transition-ease-out rounded-md ${
    isSideBarOpen ? "px-8 " : "justify-center "
  } py-2 text-gray-400 
          hover:text-white  w-full font-normal `;
  const sidebarData =
    typeof user !== "string" && user?.role === Role.Admin
      ? AdminLinks
      : BrokerLinks;
  return (
    <div className="flex flex-col items-start px-2 w-full">
      <div className="flex flex-col w-full  ">
        {sidebarData.map((item: any) => (
          <div className="flex flex-col items-start w-full space-y-2 ">
            <h1
              className={`font-light  text-gray-400 capitalize p-2 ${
                isSideBarOpen ? "flex" : "hidden"
              }  text-xs`}
            >
              {item.title}
            </h1>
            {!item.hasSubMenu && (
              <NavLink
                key={item.name}
                to={`/${item.link}`}
                onClick={() => setActiveMenu(false)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {item.icon}
                <span
                  className={`${
                    isSideBarOpen ? "flex" : "hidden"
                  } capitalize font-normal text-sm text-gray-400 duration-500 ease-out`}
                >
                  {item.name}
                </span>
              </NavLink>
            )}
            {item.hasSubMenu && (
              <>
                <div
                  onClick={() =>
                    selectedMenu && selectedMenu == item.id
                      ? (setIsMenuOpened(!isMenuOpened), setSelectedMenu(null))
                      : (setSelectedMenu(item.id), setIsMenuOpened(true))
                  }
                  className="flex items-center justify-between w-full py-2 hover:text-white/5 cursor-pointer px-4 transition-all duration-500"
                >
                  <div className="flex items-center space-x-2 ">
                    {item.icon}
                    {isSideBarOpen && (
                      <span className="text-gray-400 font-medium text-sm">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {isMenuOpened && selectedMenu == item.id
                    ? item.iconOpened
                    : item.iconClosed}
                </div>
                <div
                  className={`expander ${
                    isMenuOpened && selectedMenu == item.id ? "expanded" : ""
                  } w-full`}
                >
                  <div className={`expander-content `}>
                    {item.menus?.map(
                      (item: { name: string; link: string; icon: any }) => (
                        <NavLink
                          key={item.name}
                          to={`/${item.link}`}
                          className={({ isActive }) =>
                            isActive ? activeMenuLink : normalMenuLink
                          }
                          onClick={() => setActiveMenu(false)}
                        >
                          {item.icon}
                          <span
                            className={`${
                              isSideBarOpen ? "flex" : "hidden"
                            } capitalize font-normal text-sm`}
                          >
                            {item.name}
                          </span>
                        </NavLink>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
