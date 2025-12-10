// ignore_for_file: deprecated_member_use, constant_identifier_names

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/const/setting.dart';

import '../controllers/dark_mode.dart';

class AppIcons {
  static var bedIcon = SvgPicture.asset("assets/icons/bed.svg",
      height: 13.5, color: AppColor.primaryColor);
  static var bathIcon = const Icon(FontAwesomeIcons.shower,
      size: 13.5, color: AppColor.primaryColor);
  static Icon areaIcon = const Icon(Icons.aspect_ratio_outlined,
      size: 13.5, color: AppColor.primaryColor);
  static var locationPin = SvgPicture.asset("assets/icons/loc_pin.svg",
      height: 13.5, color: AppColor.primaryColor);
  static var bookMarkOutlined = SvgPicture.asset("assets/icons/bookmark.svg",
      height: 18, color: AppColor.primaryColor);
  // static var filter = SvgPicture.asset("assets/icons/filter.svg", height: 28);
  static var bookMarkFilled = SvgPicture.asset(
      "assets/icons/bookmark_filled.svg",
      height: 18,
      color: AppColor.primaryColor);

  // static const String filter = "assets/icons/filter.svg";
}

class AppAssets {
  static const String appLogo = "assets/launcher/app_logo.png";
  static const String noConnection = "assets/images/noconn.svg";
  static const String noPropertyFound = "assets/images/nofav.svg";
  static const String noFavourite = "assets/images/nofav.svg";
  static const String searching = "assets/searching.json";
  static const String circularLoading = "assets/circular_loading.json";
  static const String mapMarker = "assets/images/mapMarker.png";
  static const String person = "assets/images/user.png";
  static const String login = "assets/images/login.svg";
  static const String register = "assets/images/register.svg";
  static const String walletEmpty = "assets/images/empty_wallet.jpg";
}

class AppNearByAssets {
  static List<String> nearByLocations = [
    "Church",
    "Mosque",
    "Temple",
    "Community Center",
    "Stadium",
    "Swimming Pool",
    "Public Transportation",
    "Hardware Store",
    "Dry Cleaner",
    "Hair Salon",
    "Public Parking",
    "Hospital",
    "Medical Center",
    "Pharmacy",
    "Post Office",
    "Police Station",
    "Gas Station",
    "Supermarket",
    "School",
    "Daycare",
    "Recreational Area",
    "Bank",
    "Shopping Mall",
    "Fitness Center",
    "Library",
    "Restaurants",
    "Cafes",
    "Movie Theater",
    "Veterinary Clinic",
    "Fire Station",
  ];
}

class AppPropTypesAssets {
  static List<String> propTypes = [
    "villa",
    "apartment",
    "condo",
    "townhouse",
    "single-family home",
    "duplex",
    "penthouse",
    "mobile home",
    "co-op (cooperative housing)",
    "ranch house",
    "bungalow",
    "cottage",
    "mansion",
    "studio apartment",
    "loft",
    "cabin",
  ];
}

class AppFonts {
  static const String title = "Fredoka-SemiBold";
  static const String black = "Montserrat-Black";
  static const String bold = "Montserrat-Bold";
  static const String extraLight = "Montserrat-ExtraLight";
  static const String light = "Montserrat-Light";
  static const String medium = "Montserrat-Medium";
  static const String regular = "Montserrat-Regular";
  static const String semiBold = "Montserrat-SemiBold";
  static const String thin = "Montserrat-Thin";
}

class AppTextSize {
  static double headerSize = 16.5;
  static double titleSize = 13.5;
  static double subTextSize = 11.5;
}

Size screenSize(BuildContext context) {
  return MediaQuery.of(context).size;
}

appBarStyle() {
  return TextStyle(
    fontFamily: AppFonts.title,
    fontSize: AppTextSize.headerSize,
  );
}

imagePlaceHolder() {
  return Container(
    color: Colors.grey.shade200,
    child: Center(
      child: Transform.scale(
        scale: 0.5,
        child: const CircularProgressIndicator.adaptive(),
      ),
    ),
  );
}

var priceFormat = NumberFormat("###,###.0#", "en_US");

Widget rentSale(String type, BuildContext context) {
  return Positioned(
    left: 0,
    top: 0,
    child: Container(
      alignment: Alignment.center,
      height: screenSize(context).height * 0.031,
      width: screenSize(context).width * 0.13,
      decoration: const BoxDecoration(
        color: AppColor.primaryColor,
        borderRadius: BorderRadius.only(
          bottomRight: Radius.circular(8),
          topLeft: Radius.circular(8),
        ),
      ),
      child: Text(
        type.replaceFirst("r", "R").replaceFirst("s", "S"),
        style: TextStyle(
            fontSize: screenSize(context).width * 0.032,
            color: Colors.white,
            fontWeight: FontWeight.w700),
      ),
    ),
  );
}

List<BoxShadow> customBoxShadow() {
  return [
    BoxShadow(
      blurRadius: 4.0,
      spreadRadius: 2.0,
      color: AppColor.primaryColor.withOpacity(0.1),
      offset: const Offset(3, 3),
    ),
    BoxShadow(
      blurRadius: 3.0,
      spreadRadius: 1.0,
      color: Colors.grey.withOpacity(0.2),
      offset: const Offset(-1, -1),
    ),
  ];
}

navigatorPop(BuildContext context) {
  return Container(
    height: 36,
    width: 36,
    decoration: const BoxDecoration(
      shape: BoxShape.circle,
      color: Colors.white,
    ),
    child: IconButton(
      onPressed: () => Navigator.pop(context),
      icon: const Icon(Icons.arrow_back_ios_new, color: Colors.black, size: 17),
    ),
  );
}

blackLineForProfile(BuildContext context) {
  return Container(
      margin: const EdgeInsets.only(left: 12),
      width: MediaQuery.of(context).size.width,
      color: Provider.of<DarkModeProvider>(context).isDarkMode
          ? Colors.white
          : Colors.black87,
      height: 0.175);
}

blackLine(context) {
  return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12),
      width: MediaQuery.of(context).size.width,
      color: Provider.of<DarkModeProvider>(context).isDarkMode
          ? Colors.white
          : Colors.black87,
      height: 0.1);
}

header(String title) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 12),
    child: Text(
      title,
      style: TextStyle(
          fontSize: AppTextSize.headerSize - 1, fontFamily: AppFonts.semiBold),
    ),
  );
}

sortTextStyle(String text) {
  return Text(
    text,
    style: TextStyle(
        fontSize: AppTextSize.headerSize, fontFamily: AppFonts.semiBold),
  );
}

List<Widget> sortChoices = [
  Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const Icon(Icons.star_outline, size: 20),
        const SizedBox(width: 5),
        sortTextStyle("Popular"),
      ]),
  Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const Icon(Icons.refresh, size: 20),
        const SizedBox(width: 5),
        sortTextStyle("Newest"),
      ]),
  Row(
    mainAxisAlignment: MainAxisAlignment.start,
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      const Icon(Icons.swap_vert, size: 20),
      const SizedBox(width: 5),
      sortTextStyle("Price(low to high)"),
    ],
  ),
  Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const Icon(Icons.swap_vert, size: 20),
        const SizedBox(width: 5),
        sortTextStyle("Price(high to low)"),
      ]),
];

class FilterPropertTypeColors {
  static Color anyPropertTypeColor = AppColor.primaryColor;
  static Color firstPropertTypeColor = AppColor.grey;
  static Color secondPropertTypeColor = AppColor.grey;
  static Color thirdPropertTypeColor = AppColor.grey;
  static Color selectedColor = AppColor.primaryColor;
  static Color unselectedColors = AppColor.grey;
}

class FilterBedRoomColors {
  static Color anyPropertTypeColor = AppColor.primaryColor;
  static Color firstPropertTypeColor = AppColor.grey;
  static Color secondPropertTypeColor = AppColor.grey;
  static Color thirdPropertTypeColor = AppColor.grey;
  static Color selectedColor = AppColor.primaryColor;
  static Color unselectedColors = AppColor.grey;
}

class FilterBathRoomColors {
  static Color anyPropertTypeColor = AppColor.primaryColor;
  static Color firstPropertTypeColor = AppColor.grey;
  static Color secondPropertTypeColor = AppColor.grey;
  static Color thirdPropertTypeColor = AppColor.grey;
  static Color selectedColor = AppColor.primaryColor;
  static Color unselectedColors = AppColor.grey;
}
