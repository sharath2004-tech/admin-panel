// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/const/app.dart';
import 'package:real_estate/const/route.dart';
import 'package:real_estate/controllers/auth.dart';
import 'package:real_estate/controllers/dark_mode.dart';
import 'package:real_estate/controllers/profile.dart';
import 'package:real_estate/utils/shimmer/home.dart/featured.dart';
import 'package:real_estate/utils/shimmer/home.dart/recent_listing.dart';
import 'package:real_estate/widgets/profile/post_property.dart';

import '../../controllers/banner.dart';
import '../../controllers/notification/notification.dart';
import '../../controllers/owners.dart';
import '../../controllers/properties.dart';
import '../../utils/shimmer/home.dart/banner.dart';
import '../../utils/shimmer/home.dart/types.dart';
import '../../widgets/home/banner.dart';
import '../../widgets/home/featured.dart';
import '../../widgets/home/recent_listing.dart';
import '../../widgets/home/types.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool isInit = true;
  late Future bannerData;
  late Future typesData;
  late Future featuredData;
  late Future recentListing;
  late Future ownersData;

  @override
  void didChangeDependencies() {
    if (isInit) {
      initMethod();

      isInit = false;
    }
    super.didChangeDependencies();
  }

  void initMethod() {
    if (Provider.of<AuthProvider>(context, listen: false).userId != null) {
      Provider.of<NotificationProvider>(context, listen: false).getNotification(
          context, Provider.of<AuthProvider>(context, listen: false).userId!);
    }

    bannerData =
        Provider.of<BannerProvider>(context, listen: false).getBanners();
    typesData = Provider.of<PropertiesProvider>(context, listen: false)
        .getPropertyTypes();
    ownersData =
        Provider.of<OwnersProvider>(context, listen: false).getOwners();
    featuredData = Provider.of<PropertiesProvider>(context, listen: false)
        .getFeaturedProperties(page: 1, isFromHome: true);
    recentListing = Provider.of<PropertiesProvider>(context, listen: false)
        .getRecentListings(page: 1, isFromHome: true);
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () {
        Provider.of<BannerProvider>(context, listen: false).clearBanner();
        Provider.of<PropertiesProvider>(context, listen: false)
            .clearPropertiesType();
        Provider.of<PropertiesProvider>(context, listen: false).clearFeatured();
        Provider.of<PropertiesProvider>(context, listen: false)
            .clearRecentListings();
        return Future(() {
          setState(() {
            initMethod();
          });
        });
      },
      child: Scaffold(
        appBar: PreferredSize(
            preferredSize: Size(screenSize(context).width, 56),
            child: const HomeAppBar()),
        body: SafeArea(
          child: SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  //
                  //Banner
                  //
                  SizedBox(
                    height: screenSize(context).height * 0.21,
                    width: screenSize(context).width,
                    child:
                        Provider.of<BannerProvider>(context).banners.isNotEmpty
                            ? const BannerWidget()
                            : FutureBuilder(
                                future: bannerData,
                                builder: (context, snapshot) {
                                  if (snapshot.connectionState ==
                                      ConnectionState.waiting) {
                                    return const BannerShimmer();
                                  } else if (snapshot.hasError) {
                                    return const Center(
                                      child: Text("Unknown Error"),
                                    );
                                  } else {
                                    return const BannerWidget();
                                  }
                                }),
                  ),
                  //
                  //Real Estates
                  //
                  // const PropertyHeader(
                  //     header: "Real Estates",
                  //     ontap: ViewAllPropertyOwnersScreen()),
                  // SizedBox(
                  //     height: screenSize(context).height * 0.13,
                  // child: Provider.of<OwnersProvider>(context, listen: false)
                  //         .owners
                  //         .isNotEmpty
                  //         ? const OwnersWidget()
                  //         : FutureBuilder(
                  //             future: ownersData,
                  //             builder: (context, snapshot) {
                  //               if (snapshot.connectionState ==
                  //                   ConnectionState.waiting) {
                  //                 return Container();
                  //               } else {
                  //                 if (snapshot.hasError) {
                  //                   return const Center(
                  //                     child: Text("Unknown Error"),
                  //                   );
                  //                 } else {
                  // return const OwnersWidget();
                  //                 }
                  //               }
                  //             })),

                  //
                  //Properies types
                  //

                  Provider.of<PropertiesProvider>(context)
                          .propertType
                          .isNotEmpty
                      ? PropertiesTypeWidget(
                          data: Provider.of<PropertiesProvider>(context,
                                  listen: false)
                              .propertType)
                      : FutureBuilder(
                          future: ownersData,
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              return const PropertiesTypesShimmer();
                            } else {
                              if (snapshot.hasError) {
                                return const Center(
                                  child: Text("Unknown Error"),
                                );
                              } else {
                                return Consumer<PropertiesProvider>(
                                  builder: (context, value, _) {
                                    return PropertiesTypeWidget(
                                        data: value.propertType);
                                  },
                                );
                              }
                            }
                          }),

                  //
                  //Featured Properties
                  //
                  Provider.of<PropertiesProvider>(context, listen: false)
                          .featuredProp
                          .isNotEmpty
                      ? const FeaturedProperties()
                      : FutureBuilder(
                          future: recentListing,
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              return const FeaturedShimmer();
                            } else {
                              if (snapshot.hasError) {
                                return const Center(
                                    child: Text("Unknown Error"));
                              } else {
                                return const FeaturedProperties();
                              }
                            }
                          }),

                  //
                  //Post Property
                  //

                  Consumer<ProfileProvider>(
                    builder: (context, value, child) {
                      if (value.user.isEmpty) {
                        if (Provider.of<AuthProvider>(context, listen: false)
                                .role ==
                            null) {
                          return const Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(height: 15),
                                Padding(
                                  padding:
                                      EdgeInsets.symmetric(horizontal: 10.0),
                                  child: PostPropertyWidget(),
                                ),
                                SizedBox(height: 10),
                              ]);
                        } else {
                          return Container();
                        }
                      } else {
                        if (value.user[0].role == "User") {
                          return const Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(height: 15),
                                Padding(
                                  padding:
                                      EdgeInsets.symmetric(horizontal: 10.0),
                                  child: PostPropertyWidget(),
                                ),
                                SizedBox(height: 10),
                              ]);
                        } else {
                          return Container();
                        }
                      }
                    },
                  ),
                  // Provider.of<AuthProvider>(context, listen: false).role ==
                  //             "User" ||
                  //         Provider.of<AuthProvider>(context, listen: false)
                  //                 .role ==
                  //             null
                  //     ?
                  //
                  //Recent Listings
                  //

                  Provider.of<PropertiesProvider>(context, listen: false)
                          .recentListings
                          .isNotEmpty
                      ? const RecentListingWidget()
                      : FutureBuilder(
                          future: recentListing,
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              return const RecentListingShimmer();
                            } else {
                              if (snapshot.hasError) {
                                return const Center(
                                    child: Text("Unknown Error"));
                              } else {
                                return const RecentListingWidget();
                              }
                            }
                          }),
                ]),
          ),
        ),
      ),
    );
  }
}

class HomeAppBar extends StatelessWidget {
  const HomeAppBar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      elevation: 0.0,
      actions: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                    child: GestureDetector(
                        onTap: () =>
                            Navigator.pushNamed(context, AppRoutes.filter),
                        child: SvgPicture.asset(
                          "assets/icons/filter.svg",
                          height: 28,
                          color:
                              Provider.of<DarkModeProvider>(context).isDarkMode
                                  ? Colors.white
                                  : Colors.black,
                        ))),
                const SizedBox(width: 5),
                GestureDetector(
                  onTap: () =>
                      Navigator.pushNamed(context, AppRoutes.notification),
                  child: Consumer<NotificationProvider>(
                      builder: (context, value, _) {
                    return Stack(children: [
                      const Center(
                        child: Padding(
                          padding: EdgeInsets.only(right: 3.0),
                          child: Icon(
                            Icons.notifications_outlined,
                            size: 25,
                          ),
                        ),
                      ),
                      value.unreadNotificationCount != 0
                          ? Positioned(
                              top: 10.0,
                              right: 0.0,
                              child: Container(
                                height: 18,
                                width: 18,
                                alignment: Alignment.center,
                                decoration: const BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: Colors.red,
                                ),
                                child: Text(
                                  value.unreadNotificationCount.toString(),
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontFamily: AppFonts.medium,
                                      fontSize: AppTextSize.subTextSize - 1),
                                ),
                              ))
                          : Container()
                    ]);
                  }),
                )
              ]),
        )
      ],
    );
  }
}
