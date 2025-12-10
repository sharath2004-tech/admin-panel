import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/const/setting.dart';

import '../../../../const/app.dart';
import '../../../../controllers/dark_mode.dart';
import '../../../../controllers/profile.dart';

class CurrentSubscriptionWidget extends StatelessWidget {
  final ProfileProvider value;
  const CurrentSubscriptionWidget({super.key, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120,
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
                value.activeSubscription[0].package.name,
                style: TextStyle(
                    fontSize: AppTextSize.headerSize - 1,
                    fontFamily: AppFonts.semiBold),
              ),
              const SizedBox(height: 2),
              Text(
                value.activeSubscription[0].package.description,
                style: TextStyle(
                    fontSize: AppTextSize.titleSize,
                    fontFamily: AppFonts.medium),
              ),
              // const SizedBox(height: 5),
              // Text(
              //   "AED ${value.activeSubscription[0].package.price.toString()}",
              //   style: TextStyle(
              //       fontSize: AppTextSize.titleSize,
              //       fontFamily: AppFonts.semiBold,
              //       color: Colors.green),
              // ),
              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  value.activeSubscription[0].isActive == true
                      ? Text(
                          "Active",
                          style: TextStyle(
                              fontSize: AppTextSize.titleSize,
                              fontFamily: AppFonts.semiBold,
                              color: Colors.green),
                        )
                      : Text(
                          "Inactive",
                          style: TextStyle(
                              fontSize: AppTextSize.titleSize,
                              fontFamily: AppFonts.semiBold,
                              color: Colors.red),
                        ),
                  Text(
                    "Remaining : ${value.activeSubscription[0].package.remining.toString()} / ${value.activeSubscription[0].package.maxListingsAllowed.toString()}",
                    style: TextStyle(
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.medium),
                  ),
                ],
              )
            ]),
      ),
    );
  }
}
