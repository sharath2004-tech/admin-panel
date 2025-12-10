import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

import '../../const/app.dart';
import '../../const/setting.dart';

class PropertiesDetailsShimmer extends StatelessWidget {
  const PropertiesDetailsShimmer({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: screenSize(context).width,
      height: screenSize(context).height,
      color: Colors.grey.withOpacity(0.1),
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Shimmer.fromColors(
              baseColor: Colors.grey.shade100,
              highlightColor: Colors.grey.shade200,
              child: Container(
                  height: screenSize(context).height * 0.5,
                  width: screenSize(context).width,
                  color: Colors.green),
            ),
            const SizedBox(height: 10),
            Container(
              height: 120,
              width: screenSize(context).width,
              padding: const EdgeInsets.symmetric(horizontal: 15.0),
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16.0),
                  color: AppColor.grey.withOpacity(0.05)),
              child: Shimmer.fromColors(
                baseColor: Colors.grey.shade100,
                highlightColor: Colors.grey.shade200,
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 15.0, vertical: 5),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Container(
                                      height: 25,
                                      width: screenSize(context).width * 0.7,
                                      decoration: BoxDecoration(
                                          color: Colors.grey,
                                          borderRadius:
                                              BorderRadius.circular(10.0)),
                                    ),
                                    const SizedBox(height: 10),
                                    Container(
                                      height: 16,
                                      width: screenSize(context).width * 0.4,
                                      decoration: BoxDecoration(
                                          color: Colors.grey,
                                          borderRadius:
                                              BorderRadius.circular(10.0)),
                                    ),
                                    const SizedBox(height: 10),
                                    Container(
                                      height: 12,
                                      width: screenSize(context).width * 0.3,
                                      decoration: BoxDecoration(
                                          color: Colors.grey,
                                          borderRadius:
                                              BorderRadius.circular(10.0)),
                                    ),
                                  ])
                            ]),
                      ]),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Shimmer.fromColors(
              baseColor: Colors.grey.shade100,
              highlightColor: Colors.grey.shade200,
              child: Container(
                  height: screenSize(context).height * 0.2,
                  width: screenSize(context).width,
                  color: Colors.green),
            ),
          ],
        ),
      ),
    );
  }
}
