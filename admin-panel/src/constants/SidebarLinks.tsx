import { MdOutlineDashboardCustomize } from "react-icons/md";

import { AiFillSetting } from "react-icons/ai";
import {
  RiAdvertisementFill,
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiCoupon4Line,
} from "react-icons/ri";

import { MdHomeWork, MdNotifications } from "react-icons/md";

import { ImOffice } from "react-icons/im";
import { IoMdGitBranch } from "react-icons/io";
import { BsDot } from "react-icons/bs";

export const AdminLinks = [
  {
    id: 1,
    hasSubMenu: false,
    title: "dashboard",
    name: "dashboard",
    link: "dashboard",
    icon: <MdOutlineDashboardCustomize size={15} className=" text-[#bdcadf]" />,
  },
  {
    id: 2,
    hasSubMenu: true,
    title: "Property Management",
    name: "Properties",
    icon: <MdHomeWork size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "inHouse Properties",
        link: "properties/in-house",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "Featured Properties",
        link: "properties/featured",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "brokers properties",
        link: "properties/brokers",
        icon: <BsDot size={19} className=" text-[#bdcadf]" />,
      },
      {
        name: "sold properties",
        link: "properties/sold-out",
        icon: <BsDot size={19} className=" text-[#bdcadf]" />,
      },
      {
        name: "rented properties",
        link: "properties/rented",
        icon: <BsDot size={19} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 3,
    hasSubMenu: true,
    title: "User Management",
    name: "Users",
    icon: <IoMdGitBranch size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "users",
        link: "users",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "inhouse agents",
        link: "agents/in-house",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "brokers",
        link: "brokers",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 4,
    hasSubMenu: true,
    title: "ads management",
    name: "Ads",
    icon: <RiAdvertisementFill size={13} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "banner",
        link: "ads/banner",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "property",
        link: "ads/property",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 5,
    hasSubMenu: true,
    title: "company Management",
    name: "companies",
    icon: <ImOffice size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "Real estates(owners)",
        link: "owners",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "brokers",
        link: "brokers",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 7,
    hasSubMenu: true,
    title: "Request & reports",
    name: "requests",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "featured properties",
        link: "requests/featured-property",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "banner ads",
        link: "requests/banner-ads",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "Brokers Requests",
        link: "brokers-requests",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "listing packages",
        link: "listing-packages",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "reported properties",
        link: "reported-properties",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 8,
    hasSubMenu: true,
    title: "Setting",
    name: "Settings",
    icon: <AiFillSetting size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        link: "general-settings",
        name: "general settings",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        link: "property-types",
        name: "property-types",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 9,
    hasSubMenu: true,
    title: "Quota & Billings",
    name: "packages",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "packages",
        link: "packages",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "billings",
        link: "billings",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 10,
    hasSubMenu: true,
    title: "Notification & chat",
    name: "Notifications",
    icon: <MdNotifications size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        link: "chat",
        name: "chat",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        link: "notifications",
        name: "notifications",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        link: "send-notification",
        name: "send notification",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
];

export const BrokerLinks = [
  {
    id: 1,
    hasSubMenu: false,
    title: "dashboard",
    name: "dashboard",
    link: "dashboard",
    icon: <MdOutlineDashboardCustomize size={15} className=" text-[#bdcadf]" />,
  },
  {
    id: 2,
    hasSubMenu: true,
    title: "Property Management",
    name: "Properties",
    icon: <MdHomeWork size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "properties",
        link: "properties/all",
        icon: <BsDot size={19} className=" text-[#bdcadf]" />,
      },
      {
        name: "Featured Properties",
        link: "properties/featured",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "sold properties",
        link: "properties/sold",
        icon: <BsDot size={19} className=" text-[#bdcadf]" />,
      },
      {
        name: "rented properties",
        link: "properties/rented",
        icon: <BsDot size={19} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 3,
    hasSubMenu: true,
    title: "User Management",
    name: "Users",
    icon: <IoMdGitBranch size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "agents",
        link: "agents",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 4,
    hasSubMenu: true,
    title: "ads management",
    name: "Ads",
    icon: <RiAdvertisementFill size={13} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "Banner",
        link: "ads/banner",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "Featured Property",
        link: "ads/featured-property",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 8,
    hasSubMenu: true,
    title: "chat",
    name: "chat",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "chat",
        link: "chat",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 9,
    hasSubMenu: true,
    title: "Quota & Billings",
    name: "packages",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "packages",
        link: "packages",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "my packages",
        link: "my-packages",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "billings",
        link: "billing-history",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 10,
    hasSubMenu: true,
    title: "Notification management",
    name: "Notifications",
    icon: <MdNotifications size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        link: "notifications",
        name: "notifications",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
];
