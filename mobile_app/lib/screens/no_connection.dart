import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:real_estate/const/setting.dart';

import '../const/app.dart';

class ConnectionError extends StatelessWidget {
  const ConnectionError({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
      child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
                height: screenSize(context).width * 0.4,
                child: SvgPicture.asset(AppAssets.noConnection)),
            const SizedBox(height: 14),
            Text(
              "Ooops!",
              style: TextStyle(
                  fontSize: AppTextSize.headerSize,
                  fontFamily: AppFonts.semiBold),
            ),
            const SizedBox(height: 2),
            Text(
              "No Internet Connection Found",
              textAlign: TextAlign.center,
              style: TextStyle(
                  fontSize: AppTextSize.titleSize,
                  color: AppColor.grey,
                  fontFamily: AppFonts.semiBold),
            )
          ]),
    ));
  }
}
