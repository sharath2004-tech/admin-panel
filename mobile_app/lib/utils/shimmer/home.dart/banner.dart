import 'package:flutter/material.dart';
import 'package:real_estate/const/setting.dart';
import 'package:shimmer/shimmer.dart';

class BannerShimmer extends StatelessWidget {
  const BannerShimmer({super.key});

  @override
  Widget build(BuildContext context) {
    // double ratio = screenSize(context).height / screenSize(context).width;
    return Shimmer.fromColors(
      baseColor: Colors.grey.shade100,
      highlightColor: Colors.grey.shade200,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10.0),
        child: Container(
          decoration: BoxDecoration(
              color: AppColor.grey.withOpacity(0.5),
              borderRadius: BorderRadius.circular(16.0)),
        ),
      ),
    );
  }
}
