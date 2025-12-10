// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../const/app.dart';
import '../../const/setting.dart';
import '../../controllers/dark_mode.dart';

class ViewLocationWidget extends StatelessWidget {
  const ViewLocationWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: 50,
        width: screenSize(context).width * 0.7,
        decoration: BoxDecoration(
          color: Provider.of<DarkModeProvider>(context).isDarkMode
              ? AppColor.primaryColor.withOpacity(0.1)
              : Colors.white,
          borderRadius: BorderRadius.circular(10.0),
          border: Border.all(color: AppColor.primaryColor),
          boxShadow: Provider.of<DarkModeProvider>(context).isDarkMode
              ? null
              : customBoxShadow(),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            AppIcons.locationPin,
            const SizedBox(width: 10),
            Text(
              "View Location on Map",
              style: TextStyle(
                  fontSize: AppTextSize.titleSize,
                  fontFamily: AppFonts.medium),
            )
          ],
        ),
      ),
    );
  }
}
