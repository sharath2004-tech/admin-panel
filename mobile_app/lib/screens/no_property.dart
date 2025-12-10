import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import '../const/app.dart';

class NoPropertyFound extends StatelessWidget {
  final String text;

  const NoPropertyFound({super.key, required this.text});
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
            height: screenSize(context).width * 0.25,
            child: SvgPicture.asset(AppAssets.noFavourite)),
        const SizedBox(height: 14),
        Text(
          text,
          style: TextStyle(
              fontSize: AppTextSize.titleSize, fontFamily: AppFonts.semiBold),
        ),
      ],
    );
  }
}
