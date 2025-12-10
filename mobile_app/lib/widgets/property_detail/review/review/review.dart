// ignore_for_file: use_build_context_synchronously

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/widgets/property_detail/review/review/by_percent.dart';
import '../../../../const/route.dart';
import '../../../../const/setting.dart';
import '../../../../controllers/auth.dart';
import 'package:timeago/timeago.dart' as timeago;

import '../../../../const/app.dart';
import '../../../../controllers/dark_mode.dart';
import '../../../../controllers/properties.dart';
import '../../../../model/property_detail.dart';
import '../../../../utils/exception.dart';
import '../../../../utils/toast.dart';

class RatingAndReviewWidget extends StatefulWidget {
  const RatingAndReviewWidget(
      {super.key, required this.review, required this.propertyID});

  final PropertyRating review;
  final String propertyID;

  @override
  State<RatingAndReviewWidget> createState() => _RatingAndReviewWidgetState();
}

class _RatingAndReviewWidgetState extends State<RatingAndReviewWidget> {
  double userRating = 0.0;
  final reviewController = TextEditingController();

  @override
  void dispose() {
    reviewController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 15),
        blackLine(context),
        const SizedBox(height: 15),
        header("Ratings and Reviews"),
        const SizedBox(height: 15),
        Padding(
          padding: const EdgeInsets.only(left: 12, right: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      widget.review.average.toStringAsFixed(1),
                      style: TextStyle(
                          fontSize: AppTextSize.headerSize + 20,
                          fontFamily: AppFonts.medium),
                    ),
                    RatingBar.builder(
                      initialRating: widget.review.average,
                      minRating: 1,
                      direction: Axis.horizontal,
                      allowHalfRating: true,
                      unratedColor: AppColor.grey.withOpacity(0.2),
                      itemCount: 5,
                      itemSize: 18.0,
                      ignoreGestures: true,
                      itemPadding: const EdgeInsets.symmetric(horizontal: 0.0),
                      itemBuilder: (context, _) =>
                          const Icon(Icons.star, color: AppColor.primaryColor),
                      onRatingUpdate: (_) {},
                    ),
                    const SizedBox(height: 5),
                    Text(
                      "${widget.review.totalRatings.toString()} review",
                      style: TextStyle(
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.medium),
                    ),
                  ]),
              Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ColoredPercentageContainer(
                        count: "5",
                        percentage: (widget.review.counts.five /
                                widget.review.totalRatings) *
                            100),
                    ColoredPercentageContainer(
                        count: "4",
                        percentage: (widget.review.counts.four /
                                widget.review.totalRatings) *
                            100),
                    ColoredPercentageContainer(
                        count: "3",
                        percentage: (widget.review.counts.three /
                                widget.review.totalRatings) *
                            100),
                    ColoredPercentageContainer(
                        count: "2",
                        percentage: (widget.review.counts.two /
                                widget.review.totalRatings) *
                            100),
                    ColoredPercentageContainer(
                        count: "1",
                        percentage: (widget.review.counts.one /
                                widget.review.totalRatings) *
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
            itemCount: widget.review.getAllRatings.length > 5
                ? 5
                : widget.review.getAllRatings.length,
            itemBuilder: (context, index) {
              return Container(
                margin: EdgeInsets.only(
                    left: 12.0, right: 12.0, bottom: index == 5 ? 0 : 15),
                width: screenSize(context).width,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        //
                        //User Image
                        //
                        Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                              color: AppColor.primaryColor.withOpacity(0.2),
                              shape: BoxShape.circle,
                              image: DecorationImage(
                                  image: CachedNetworkImageProvider(widget
                                      .review
                                      .getAllRatings[index]
                                      .user
                                      .profileImage),
                                  fit: BoxFit.cover)),
                        ),
                        const SizedBox(width: 10),
                        //
                        //Username
                        //
                        Text(
                          "${widget.review.getAllRatings[index].user.firstName} ${widget.review.getAllRatings[index].user.lastName}",
                          style: TextStyle(
                              fontSize: AppTextSize.titleSize,
                              fontFamily: AppFonts.medium),
                        ),
                        // const Spacer(),
                        // Provider.of<AuthProvider>(context, listen: false)
                        //             .userId !=
                        //         null
                        //     ? widget.review.getAllRatings[index].user.id ==
                        //             Provider.of<AuthProvider>(context,
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
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          //
                          //User Image
                          //
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            children: List.generate(5, (ind) {
                              return Icon(
                                  ind < widget.review.getAllRatings[index].rate
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
                            timeago.format(
                                widget.review.getAllRatings[index].createdAt),
                            style: TextStyle(
                                fontSize: AppTextSize.subTextSize,
                                color: AppColor.grey,
                                fontFamily: AppFonts.medium),
                          ),
                        ]),
                    const SizedBox(height: 6),
                    Text(
                      widget.review.getAllRatings[index].review,
                      style: TextStyle(
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.medium),
                    ),
                  ],
                ),
              );
            }),
        const SizedBox(height: 20),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                GestureDetector(
                  onTap: () => Navigator.of(context).pushNamed(
                      AppRoutes.seeAllreviews,
                      arguments: widget.propertyID),
                  child: Text(
                    "See all reviews",
                    style: TextStyle(
                        fontFamily: AppFonts.semiBold,
                        color: AppColor.primaryColor,
                        fontSize: AppTextSize.titleSize),
                  ),
                ),
                GestureDetector(
                  onTap: () {
                    if (Provider.of<AuthProvider>(context, listen: false)
                            .userId ==
                        null) {
                      Navigator.of(context).pushNamed(AppRoutes.login);
                    } else {
                      _showReviewSheet(context);
                    }
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const Icon(Icons.input,
                          color: AppColor.primaryColor, size: 20),
                      const SizedBox(width: 10),
                      Text(
                        "Write a Review",
                        style: TextStyle(
                            fontFamily: AppFonts.semiBold,
                            color: AppColor.primaryColor,
                            fontSize: AppTextSize.titleSize),
                      )
                    ],
                  ),
                ),
              ]),
        ),
        const SizedBox(height: 15),
      ],
    );
  }

  void _showReviewSheet(BuildContext context) {
    showModalBottomSheet(
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      context: context,
      builder: (context) {
        return Container(
          height: screenSize(context).height * 0.9,
          padding: const EdgeInsets.only(left: 10, right: 10, top: 15),
          decoration: BoxDecoration(
              color: Provider.of<DarkModeProvider>(context).isDarkMode
                  ? AppColor.darkModeColor
                  : Colors.white,
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(16))),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  height: 7,
                  width: 40,
                  decoration: BoxDecoration(
                      color: AppColor.grey,
                      borderRadius: BorderRadius.circular(15.0)),
                ),
              ),
              const SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12.0),
                child: Text(
                  "Your review can help others make informed decisions. Share your experience with this property by writing a review below.",
                  style: TextStyle(
                      fontSize: AppTextSize.titleSize,
                      fontFamily: AppFonts.medium),
                ),
              ),
              const SizedBox(height: 15),
              Center(
                child: RatingBar.builder(
                    initialRating: 0,
                    minRating: 1,
                    direction: Axis.horizontal,
                    allowHalfRating: false,
                    unratedColor: Colors.amber.withOpacity(0.3),
                    itemCount: 5,
                    itemSize: 28.0,
                    itemPadding: const EdgeInsets.symmetric(horizontal: 0.0),
                    itemBuilder: (context, _) =>
                        const Icon(Icons.star, color: Colors.amber),
                    onRatingUpdate: (rating) {
                      setState(() {
                        userRating = rating;
                      });
                    },
                    updateOnDrag: true),
              ),
              const SizedBox(height: 8),
              Center(
                child: Text(
                  "Tap a star to rate",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      fontSize: AppTextSize.subTextSize + 1,
                      fontFamily: AppFonts.medium),
                ),
              ),
              const SizedBox(height: 15),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12.0),
                child: Container(
                  width: screenSize(context).width,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: TextField(
                    controller: reviewController,
                    keyboardType: TextInputType.text,
                    maxLines: 8,
                    textAlignVertical: TextAlignVertical.center,
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.only(left: 10, top: 10),
                        border: InputBorder.none,
                        hintText: "Write your review of the property here",
                        hintStyle:
                            TextStyle(color: AppColor.grey.withOpacity(0.8))),
                  ),
                ),
              ),
              const SizedBox(height: 30),
              GestureDetector(
                onTap: () async {
                  if (userRating == 0) {
                    showErrorResponse(
                        context: context,
                        message: "Please tap some stars to rate");
                  } else if (reviewController.text.isEmpty) {
                    showErrorResponse(
                        context: context, message: "Please write some review");
                  } else {
                    try {
                      FocusScope.of(context).unfocus();
                      context.loaderOverlay.show();
                      await Provider.of<PropertiesProvider>(context,
                              listen: false)
                          .rateProperty(
                              propertyID: widget.propertyID,
                              userID: Provider.of<AuthProvider>(context,
                                      listen: false)
                                  .userId!,
                              review: reviewController.text,
                              rate: userRating.toInt())
                          .then((value) async {
                        context.loaderOverlay.hide();
                        showSuccessResponse(
                            context: context, message: "Property Rated");

                        Navigator.pop(context);
                        Provider.of<PropertiesProvider>(context, listen: false)
                            .getPropertyDetail(propID: widget.propertyID);
                        userRating = 0;
                        reviewController.clear();
                      });
                    } on CustomException catch (e) {
                      context.loaderOverlay.hide();
                      showErrorResponse(
                          context: context, message: e.toString());
                    } catch (e) {
                      context.loaderOverlay.hide();

                      showErrorResponse(
                          context: context, message: e.toString());
                    }
                  }
                },
                child: Center(
                  child: Container(
                    height: 46,
                    width: 150,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10.0),
                        color: AppColor.primaryColor),
                    child: Text(
                      "Review",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.bold),
                    ),
                  ),
                ),
              )
            ],
          ),
        );
      },
    );
  }
}
