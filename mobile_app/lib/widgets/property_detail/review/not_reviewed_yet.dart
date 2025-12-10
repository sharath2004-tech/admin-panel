// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/auth.dart';
import 'package:real_estate/controllers/properties.dart';
import 'package:real_estate/utils/exception.dart';
import 'package:real_estate/utils/toast.dart';

import '../../../const/app.dart';
import '../../../const/route.dart';
import '../../../const/setting.dart';
import '../../../controllers/dark_mode.dart';

class NoReviewsYetWidget extends StatefulWidget {
  final String porpertyID;
  const NoReviewsYetWidget({super.key, required this.porpertyID});
  @override
  State<NoReviewsYetWidget> createState() => _NoReviewsYetWidgetState();
}

class _NoReviewsYetWidgetState extends State<NoReviewsYetWidget> {
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
        const SizedBox(height: 25),
        Center(
            child: Text(
          "No Reviews Yet",
          style: TextStyle(
              fontSize: AppTextSize.headerSize, fontFamily: AppFonts.semiBold),
        )),
        const SizedBox(height: 8),
        Center(
            child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 25),
          child: Text(
            "Your review can help others make informed decisions. Share your experience with this property by writing a review below.",
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: AppTextSize.subTextSize + 1,
                fontFamily: AppFonts.medium,
                color: AppColor.grey),
          ),
        )),
        const SizedBox(height: 20),
        GestureDetector(
          onTap: () {
            if (Provider.of<AuthProvider>(context, listen: false).userId ==
                null) {
              Navigator.of(context).pushNamed(AppRoutes.login);
            } else {
              _showReviewSheet(context);
            }
          },
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              const Icon(Icons.input, color: AppColor.primaryColor),
              const SizedBox(width: 10),
              Padding(
                padding: const EdgeInsets.only(right: 25),
                child: Text(
                  "Write a Review",
                  style: TextStyle(
                      fontFamily: AppFonts.semiBold,
                      color: AppColor.primaryColor,
                      fontSize: AppTextSize.titleSize),
                ),
              )
            ],
          ),
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
                      color: AppColor.primaryColor,
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
              const SizedBox(height: 10),
              Center(
                child: RatingBar.builder(
                    initialRating: 0,
                    minRating: 1,
                    direction: Axis.horizontal,
                    allowHalfRating: false,
                    unratedColor: Colors.amber.withOpacity(0.5),
                    itemCount: 5,
                    itemSize: 25.0,
                    itemPadding: const EdgeInsets.symmetric(horizontal: 0.0),
                    itemBuilder: (context, _) => const Icon(Icons.star,
                        color: Color.fromARGB(255, 255, 191, 0)),
                    onRatingUpdate: (rating) {
                      setState(() {
                        userRating = rating;
                      });
                    },
                    updateOnDrag: true),
              ),
              const SizedBox(height: 5),
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
                    style: const TextStyle(color: Colors.black),
                    decoration: const InputDecoration(
                        contentPadding: EdgeInsets.only(left: 10, top: 10),
                        border: InputBorder.none,
                        hintText: "Write your review of the property here",
                        hintStyle: TextStyle(color: Colors.grey)),
                  ),
                ),
              ),
              const SizedBox(height: 30),
              GestureDetector(
                onTap: () async {
                  if (userRating == 0.0) {
                    showErrorResponse(
                        context: context, message: "Tap a star to rate");
                  } else if (reviewController.text.isEmpty) {
                    showErrorResponse(
                        context: context, message: "Write a review");
                  } else {
                    try {
                      FocusScope.of(context).unfocus();
                      context.loaderOverlay.show();
                      await Provider.of<PropertiesProvider>(context,
                              listen: false)
                          .rateProperty(
                              propertyID: widget.porpertyID,
                              userID: Provider.of<AuthProvider>(context,
                                      listen: false)
                                  .userId!,
                              review: reviewController.text,
                              rate: userRating.toInt())
                          .then((value) {
                        context.loaderOverlay.hide();
                        showSuccessResponse(
                            context: context, message: "Property Rated");
                        Navigator.pop(context);
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
