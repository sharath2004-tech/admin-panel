import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../const/app.dart';
import '../../../../const/setting.dart';
import '../../../../controllers/dark_mode.dart';
import '../../../../controllers/profile.dart';

class FreePlanWidget extends StatelessWidget {
  final ProfileProvider value;
  const FreePlanWidget({super.key, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      width: screenSize(context).width,
      margin: const EdgeInsets.symmetric(horizontal: 12.0),
      decoration: BoxDecoration(
          color: Provider.of<DarkModeProvider>(context).isDarkMode
              ? AppColor.primaryColor.withOpacity(0.1)
              : Colors.white,
          borderRadius: BorderRadius.circular(10.0),
          boxShadow: Provider.of<DarkModeProvider>(context).isDarkMode
              ? null
              : customBoxShadow()),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 12),
        child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Free Plan",
                style: TextStyle(
                  fontSize: AppTextSize.headerSize - 1,
                  fontFamily: AppFonts.semiBold,
                ),
              ),
              const SizedBox(height: 5),
              Text(
                "0.00",
                style: TextStyle(
                    fontSize: AppTextSize.titleSize,
                    fontFamily: AppFonts.semiBold,
                    color: Colors.green),
              ),
              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  // const Spacer(),
                  Text(
                    "Remaining : ${value.freeQuota[0].freeListingQuotaRemaining} / ${value.freeQuota[0].freeListingQuota}",
                    style: TextStyle(
                      fontSize: AppTextSize.titleSize,
                      fontFamily: AppFonts.medium,
                    ),
                  ),
                ],
              )
            ]),
      ),
    );
  }
}
