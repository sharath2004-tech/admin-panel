import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

import '../../../const/setting.dart';

class HeaderShimmer extends StatelessWidget {
  const HeaderShimmer({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey.shade100,
      highlightColor: Colors.grey.shade200,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 100,
              height: 26,
              decoration: BoxDecoration(
                  color: AppColor.grey.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(8.0)),
            ),
            Container(
              width: 40,
              height: 20,
              decoration: BoxDecoration(
                  color: AppColor.grey.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(6.0)),
            ),
          ],
        ),
      ),
    );
  }
}
