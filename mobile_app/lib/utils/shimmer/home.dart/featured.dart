import 'package:flutter/material.dart';
import 'package:real_estate/const/setting.dart';
import 'package:real_estate/utils/shimmer/home.dart/header.dart';
import 'package:shimmer/shimmer.dart';

import '../../../const/app.dart';

class FeaturedShimmer extends StatelessWidget {
  const FeaturedShimmer({super.key});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey.shade100,
      highlightColor: Colors.grey.shade200,
      child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 10.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const HeaderShimmer(),
            SizedBox(
              height: screenSize(context).width > 370
                  ? screenSize(context).height * 0.24
                  : screenSize(context).height * 0.27,
              child: ListView.builder(
                itemCount: 6,
                shrinkWrap: true,
                physics: const ScrollPhysics(),
                scrollDirection: Axis.horizontal,
                itemBuilder: (context, index) {
                  return Container(
                    margin: const EdgeInsets.only(
                      left: 10,
                    ),
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
      
                        // const SizedBox(height: 8),
                        // Container(
                        //   height: 16,
                        //   width: screenSize(context).width * 0.2,
                        //   decoration: BoxDecoration(
                        //       color: AppColor.grey.withOpacity(0.5),
                        //       borderRadius: BorderRadius.circular(6.0)),
                        // )
                      ],
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
