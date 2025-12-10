import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

import '../../const/app.dart';
import '../../const/setting.dart';

class ByTypeShimmers extends StatefulWidget {
  const ByTypeShimmers({super.key});

  @override
  State<ByTypeShimmers> createState() => _ByTypeShimmersState();
}

class _ByTypeShimmersState extends State<ByTypeShimmers> {
  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey.shade100,
      highlightColor: Colors.grey.shade200,
      child: ListView.builder(
          itemCount: 7,
          shrinkWrap: true,
          physics: const ScrollPhysics(),
          padding: const EdgeInsets.all(0),
          itemBuilder: (ctx, index) {
            return Container(
              margin: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 5),
              height: screenSize(context).height * 0.2,
              width: screenSize(context).width,
              decoration: BoxDecoration(
                  color: AppColor.grey,
                  borderRadius: BorderRadius.circular(8.0)),
            );
          }),
    );
  }
}
