import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:provider/provider.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'package:real_estate/controllers/properties.dart';

import '../../const/app.dart';
import '../../const/setting.dart';
import '../../utils/shimmer/by_type.dart';
import '../../widgets/property_detail/review/review/by_percent.dart';

class SeeAllReviewsScreen extends StatefulWidget {
  final String propertyID;

  const SeeAllReviewsScreen({super.key, required this.propertyID});

  @override
  State<SeeAllReviewsScreen> createState() => _SeeAllReviewsScreenState();
}

class _SeeAllReviewsScreenState extends State<SeeAllReviewsScreen> {
  final RefreshController _refreshController = RefreshController();
  bool _isInit = true;
  int currentPage = 1;
  late Future data;

  @override
  void didChangeDependencies() {
    if (_isInit) {
      Provider.of<PropertiesProvider>(context, listen: false).clearAllRating();
      data = Provider.of<PropertiesProvider>(context, listen: false)
          .getAllRatedAndReviews(
              page: currentPage, propertyID: widget.propertyID);
      _isInit = false;
    }

    super.didChangeDependencies();
  }

  Future _onLoading() async {
    if (Provider.of<PropertiesProvider>(context, listen: false)
        .allRating
        .isNotEmpty) {
      if (currentPage <
          Provider.of<PropertiesProvider>(context, listen: false).totalPage) {
        try {
          await Provider.of<PropertiesProvider>(context, listen: false)
              .getAllRatedAndReviews(
                  page: ++currentPage, propertyID: widget.propertyID)
              .then((_) {
            _refreshController.loadComplete();
          });
        } catch (_) {
          _refreshController.loadFailed();
        }
      } else {
        _refreshController.loadNoData();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 50,
        elevation: 0.0,
        automaticallyImplyLeading: false,
        centerTitle: true,
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: const Icon(Icons.arrow_back_ios, size: 20),
        ),
        title: Text(
          "Ratings and Reviews",
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
      ),
      body: SmartRefresher(
        enablePullUp: true,
        enablePullDown: false,
        controller: _refreshController,
        onLoading: _onLoading,
        child: SingleChildScrollView(
          child: FutureBuilder(
            future: data,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const ByTypeShimmers();
              } else {
                if (snapshot.hasError) {
                  return const Center(child: Text("Error"));
                } else {
                  return Consumer<PropertiesProvider>(
                    builder: (context, value, _) {
                      return Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 15),
                          Padding(
                            padding: const EdgeInsets.only(left: 12, right: 20),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    children: [
                                      Text(
                                        value.allRating[0].average
                                            .toStringAsFixed(1),
                                        style: TextStyle(
                                            fontSize:
                                                AppTextSize.headerSize + 20,
                                            fontFamily: AppFonts.medium),
                                      ),
                                      RatingBar.builder(
                                        initialRating:
                                            value.allRating[0].average,
                                        minRating: 1,
                                        direction: Axis.horizontal,
                                        allowHalfRating: true,
                                        unratedColor:
                                            AppColor.grey.withOpacity(0.2),
                                        itemCount: 5,
                                        itemSize: 18.0,
                                        ignoreGestures: true,
                                        itemPadding: const EdgeInsets.symmetric(
                                            horizontal: 0.0),
                                        itemBuilder: (context, _) => const Icon(
                                            Icons.star,
                                            color: AppColor.primaryColor),
                                        onRatingUpdate: (_) {},
                                      ),
                                      const SizedBox(height: 5),
                                      Text(
                                        "${value.allRating[0].pagination.totalRatings.toString()} review",
                                        style: TextStyle(
                                            fontSize: AppTextSize.titleSize,
                                            fontFamily: AppFonts.medium),
                                      ),
                                    ]),
                                Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      ColoredPercentageContainer(
                                          count: "5",
                                          percentage:
                                              (value.allRating[0].counts.five /
                                                      value
                                                          .allRating[0]
                                                          .pagination
                                                          .totalRatings) *
                                                  100),
                                      ColoredPercentageContainer(
                                          count: "4",
                                          percentage:
                                              (value.allRating[0].counts.four /
                                                      value
                                                          .allRating[0]
                                                          .pagination
                                                          .totalRatings) *
                                                  100),
                                      ColoredPercentageContainer(
                                          count: "3",
                                          percentage:
                                              (value.allRating[0].counts.three /
                                                      value
                                                          .allRating[0]
                                                          .pagination
                                                          .totalRatings) *
                                                  100),
                                      ColoredPercentageContainer(
                                          count: "2",
                                          percentage:
                                              (value.allRating[0].counts.two /
                                                      value
                                                          .allRating[0]
                                                          .pagination
                                                          .totalRatings) *
                                                  100),
                                      ColoredPercentageContainer(
                                          count: "1",
                                          percentage:
                                              (value.allRating[0].counts.one /
                                                      value
                                                          .allRating[0]
                                                          .pagination
                                                          .totalRatings) *
                                                  100),
                                    ]),
                              ],
                            ),
                          ),
                          const SizedBox(height: 20),
                          ListView.builder(
                              shrinkWrap: true,
                              scrollDirection: Axis.vertical,
                              physics: const BouncingScrollPhysics(),
                              itemCount:
                                  value.allRating[0].pagination.data.length,
                              itemBuilder: (context, index) {
                                return Container(
                                  margin: const EdgeInsets.only(
                                      left: 12.0, right: 12.0, bottom: 15),
                                  width: screenSize(context).width,
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          //
                                          //User Image
                                          //
                                          Container(
                                            height: 40,
                                            width: 40,
                                            decoration: BoxDecoration(
                                                color: AppColor.primaryColor
                                                    .withOpacity(0.2),
                                                shape: BoxShape.circle,
                                                image: DecorationImage(
                                                    image:
                                                        CachedNetworkImageProvider(
                                                            value
                                                                .allRating[0]
                                                                .pagination
                                                                .data[index]
                                                                .user
                                                                .profileImage),
                                                    fit: BoxFit.cover)),
                                          ),
                                          const SizedBox(width: 10),
                                          //
                                          //Username
                                          //
                                          Text(
                                            "${value.allRating[0].pagination.data[index].user.firstName} ${value.allRating[0].pagination.data[index].user.lastName}",
                                            style: TextStyle(
                                                fontSize: AppTextSize.titleSize,
                                                fontFamily: AppFonts.medium),
                                          ),
                                          // const Spacer(),
                                          // Provider.of<AuthProvider>(context,
                                          //                 listen: false)
                                          //             .userId !=
                                          //         null
                                          //     ? value
                                          //                 .allRating[0]
                                          //                 .pagination
                                          //                 .data[index]
                                          //                 .user
                                          //                 .id ==
                                          //             Provider.of<AuthProvider>(
                                          //                     context,
                                          //                     listen: false)
                                          //                 .userId!
                                          //         ? const Icon(Icons.more_vert)
                                          //         : Container()
                                          //     : Container()
                                        ],
                                      ),
                                      const SizedBox(height: 6),
                                      //
                                      //
                                      //
                                      Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.center,
                                          children: [
                                            //
                                            //User Image
                                            //
                                            Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: List.generate(5, (ind) {
                                                return Icon(
                                                    ind <
                                                            value
                                                                .allRating[0]
                                                                .pagination
                                                                .data[index]
                                                                .rate
                                                        ? Icons.star
                                                        : Icons.star_border,
                                                    color: Colors.amber,
                                                    size: 16);
                                              }),
                                            ),
                                            const SizedBox(width: 10),
                                            //
                                            //Username
                                            //

                                            Text(
                                              timeago.format(value
                                                  .allRating[0]
                                                  .pagination
                                                  .data[index]
                                                  .createdAt),
                                              style: TextStyle(
                                                  fontSize:
                                                      AppTextSize.subTextSize,
                                                  color: AppColor.grey,
                                                  fontFamily: AppFonts.medium),
                                            ),
                                          ]),
                                      const SizedBox(height: 6),
                                      Text(
                                        value.allRating[0].pagination
                                            .data[index].review,
                                        style: TextStyle(
                                            fontSize: AppTextSize.titleSize,
                                            fontFamily: AppFonts.medium),
                                      ),
                                    ],
                                  ),
                                );
                              }),
                        ],
                      );
                    },
                  );
                }
              }
            },
          ),
        ),
      ),
    );
  }
}
