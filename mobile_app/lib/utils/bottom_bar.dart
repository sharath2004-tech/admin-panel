// ignore: must_be_immutable
// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:flutter_offline/flutter_offline.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/screens/chat/conversation.dart';
import 'package:real_estate/screens/home/home.dart';
import 'package:real_estate/utils/auth_status.dart';

// import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';

import '../const/setting.dart';
import '../controllers/bottom_bar.dart';
import '../screens/bookmark.dart';
import '../screens/no_connection.dart';

/*
  UpgradeAlert(
      // upgrader: Upgrader(
      //     showIgnore: false,
      //     showLater: false,
      //     canDismissDialog: false,
      //     debugDisplayAlways: true,
      //     durationUntilAlertAgain: const Duration(days: 0),
          // dialogStyle: Platform.isIOS
          //     ? UpgradeDialogStyle.cupertino
          //     : UpgradeDialogStyle.material),
 */

class BottomNavagationScreen extends StatefulWidget {
  const BottomNavagationScreen({super.key});

  @override
  State<BottomNavagationScreen> createState() => _BottomNavagationScreenState();
}

class _BottomNavagationScreenState extends State<BottomNavagationScreen> {
  final List<Widget> _allScreens = [
    const HomeScreen(),
    const ConversationScreen(),
    const BookmarkScreen(),
    const ProfileAuthStatus()
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: OfflineBuilder(
          connectivityBuilder: (context, connection, child) {
            bool isconnected = connection != ConnectivityResult.none;
            return isconnected
                ? _allScreens.elementAt(
                    Provider.of<BottomNavBarProvider>(context, listen: false)
                        .selectedIndex)
                : const ConnectionError();
          },
          child: const SizedBox()),

      bottomNavigationBar: SizedBox(
        height: 44,
        child: BottomNavigationBar(
            elevation: 0.0,
            type: BottomNavigationBarType.fixed,
            fixedColor: AppColor.primaryColor,
            // iconSize: 24,
            unselectedLabelStyle: const TextStyle(fontSize: 0.0),
            selectedLabelStyle: const TextStyle(fontSize: 0.0),
            currentIndex:
                Provider.of<BottomNavBarProvider>(context).selectedIndex,
            onTap: (index) {
              Provider.of<BottomNavBarProvider>(context, listen: false)
                  .onChangeIndex(index);
            },
            items: [
              BottomNavigationBarItem(
                  icon: SvgPicture.asset("assets/icons/home.svg",
                      height: 19,
                      color: Provider.of<BottomNavBarProvider>(context)
                                  .selectedIndex ==
                              0
                          ? AppColor.primaryColor
                          : AppColor.grey),
                  label: ""),
              BottomNavigationBarItem(
                  icon: SvgPicture.asset("assets/icons/chat.svg",
                      height: 19,
                      color: Provider.of<BottomNavBarProvider>(context)
                                  .selectedIndex ==
                              1
                          ? AppColor.primaryColor
                          : AppColor.grey),
                  label: ""),
              BottomNavigationBarItem(
                  icon: SvgPicture.asset("assets/icons/bookmark.svg",
                      height: 19,
                      color: Provider.of<BottomNavBarProvider>(context)
                                  .selectedIndex ==
                              2
                          ? AppColor.primaryColor
                          : AppColor.grey),
                  label: ""),
              BottomNavigationBarItem(
                  icon: SvgPicture.asset("assets/icons/user.svg",
                      height: 19,
                      color: Provider.of<BottomNavBarProvider>(context)
                                  .selectedIndex ==
                              3
                          ? AppColor.primaryColor
                          : AppColor.grey),
                  label: ""),
            ]),
      ),
      // bottomNavigationBar: SizedBox(
      //   child: SalomonBottomBar(
      // currentIndex:
      //     Provider.of<BottomNavBarProvider>(context).selectedIndex,
      // onTap: (newIndex) =>
      //     Provider.of<BottomNavBarProvider>(context, listen: false)
      //         .onChangeIndex(newIndex),
      //     items: [
      //       SalomonBottomBarItem(
      // icon: SvgPicture.asset(
      //   "assets/icons/home.svg",
      //   height: 18,
      //           color: const Color.fromARGB(255, 43, 42, 42),
      //         ),
      //         title: Text(
      //           "Listing",
      //           style: TextStyle(
      //               fontSize: AppTextSize.titleSize - 2,
      //               fontFamily: AppFonts.bold),
      //         ),
      //       ),

      //       // Chat
      //       SalomonBottomBarItem(
      //         //icon: const Icon(Icons.chat),
      //         icon: SvgPicture.asset(
      //           "assets/icons/building.svg",
      //           height: 18,
      //           color: const Color.fromARGB(255, 43, 42, 42),
      //         ),
      //         title: Text(
      //           "Chat",
      //           textAlign: TextAlign.center,
      //           style: TextStyle(
      //               fontSize: AppTextSize.titleSize - 2,
      //               fontFamily: AppFonts.bold),
      //         ),
      //       ),

      //       /// bookmark
      //       SalomonBottomBarItem(
      //         //icon: const Icon(Icons.bookmark),
      //         icon: SvgPicture.asset(
      //           "assets/icons/bookmark.svg",
      //           height: 18,
      //           color: const Color.fromARGB(255, 43, 42, 42),
      //         ),
      //         title: Text(
      //           "Bookmark",
      //           style: TextStyle(
      //               fontSize: AppTextSize.titleSize - 2,
      //               fontFamily: AppFonts.bold),
      //         ),
      //       ),

      //       /// Profile
      //       SalomonBottomBarItem(
      //         icon: SvgPicture.asset(
      //           "assets/icons/user.svg",
      //           height: 18,
      //           color: const Color.fromARGB(255, 43, 42, 42),
      //         ),
      //         title: Text(
      //           "Profile",
      //           style: TextStyle(
      //               fontSize: AppTextSize.titleSize - 2,
      //               fontFamily: AppFonts.bold),
      //         ),
      //       ),
      //     ],
      //   ),
      // ),
    );
  }
}
