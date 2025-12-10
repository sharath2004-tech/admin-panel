import 'package:flutter/material.dart';
import 'package:real_estate/const/setting.dart';
import 'package:real_estate/utils/shimmer/home.dart/header.dart';
import 'package:shimmer/shimmer.dart';

import '../../../const/app.dart';

class RecentListingShimmer extends StatelessWidget {
  const RecentListingShimmer({super.key});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey.shade100,
      highlightColor: Colors.grey.shade200,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const HeaderShimmer(),
          GridView.builder(
            itemCount: 10,
            shrinkWrap: true,
            physics: const ScrollPhysics(),
            scrollDirection: Axis.vertical,
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
              childAspectRatio: 0.97,
              maxCrossAxisExtent: screenSize(context).width * 0.5,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
            ),
            itemBuilder: (context, index) {
              return Container(
                // width: screenSize(context).width * 0.5,
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(8),
                    topRight: Radius.circular(8),
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      height: screenSize(context).height * 0.15,
                      width: screenSize(context).width * 0.5,
                      decoration: BoxDecoration(
                          color: AppColor.grey.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(8.0)),
                    ),
                    //
                    //Property Name
                    //
                    const SizedBox(height: 5),
                    Container(
                      height: 18,
                      width: screenSize(context).width * 0.4,
                      decoration: BoxDecoration(
                          color: AppColor.grey.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(8.0)),
                    ),
                    const SizedBox(height: 6),
                    Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            height: 16,
                            width: screenSize(context).width * 0.12,
                            decoration: BoxDecoration(
                                color: AppColor.grey.withOpacity(0.5),
                                borderRadius: BorderRadius.circular(6.0)),
                          ),
                          const SizedBox(width: 5),
                          Container(
                            height: 16,
                            width: screenSize(context).width * 0.12,
                            decoration: BoxDecoration(
                                color: AppColor.grey.withOpacity(0.5),
                                borderRadius: BorderRadius.circular(6.0)),
                          ),
                          const SizedBox(width: 5),
                          Container(
                            height: 16,
                            width: screenSize(context).width * 0.12,
                            decoration: BoxDecoration(
                                color: AppColor.grey.withOpacity(0.5),
                                borderRadius: BorderRadius.circular(6.0)),
                          )
                        ]),

                    const SizedBox(height: 8),
                    Container(
                      height: 16,
                      width: screenSize(context).width * 0.2,
                      decoration: BoxDecoration(
                          color: AppColor.grey.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(6.0)),
                    )
                    // const SizedBox(height: 5),
                    // Container(
                    //   height: screenSize(context).height * 0.15,
                    //   width: screenSize(context).width * 0.5,
                    //   color: AppColor.grey.withOpacity(0.5),
                    // ),
                  ],
                ),
              );
            },
          )
        ],
      ),
    );
  }
}
