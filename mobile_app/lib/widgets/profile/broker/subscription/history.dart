import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../const/app.dart';
import '../../../../const/setting.dart';
import '../../../../controllers/dark_mode.dart';
import '../../../../controllers/profile.dart';

class SubscriptionHistoryWidget extends StatelessWidget {
  final ProfileProvider value;
  const SubscriptionHistoryWidget({super.key, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 15),
          header("Subscription History"),
          const SizedBox(height: 10),
          ListView.builder(
            shrinkWrap: true,
            itemCount: value.subscriptionHistory[0].pagination.data.length,
            physics: const NeverScrollableScrollPhysics(),
            padding: const EdgeInsets.only(bottom: 10),
            itemBuilder: (context, index) {
              return Container(
                height: 120,
                width: screenSize(context).width,
                margin:
                    const EdgeInsets.symmetric(horizontal: 12.0, vertical: 5),
                decoration: BoxDecoration(
                    color: Provider.of<DarkModeProvider>(context).isDarkMode
                        ? AppColor.primaryColor.withOpacity(0.1)
                        : Colors.white,
                    borderRadius: BorderRadius.circular(10.0),
                    boxShadow: Provider.of<DarkModeProvider>(context).isDarkMode
                        ? null
                        : customBoxShadow()),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 12.0, vertical: 12),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        //
                        //
                        //
                        Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                value.subscriptionHistory[0].pagination
                                    .data[index].package.name,
                                style: TextStyle(
                                    fontSize: AppTextSize.headerSize - 1,
                                    fontFamily: AppFonts.semiBold),
                              ),
                              Text(
                                value.subscriptionHistory[0].pagination
                                    .data[index].package.description,
                                style: TextStyle(
                                    fontSize: AppTextSize.titleSize,
                                    fontFamily: AppFonts.medium),
                              ),
                              const SizedBox(height: 5),
                              Text(
                                "${value.subscriptionHistory[0].pagination.data[index].payment.currency} ${value.subscriptionHistory[0].pagination.data[index].package.price.toString()}",
                                style: TextStyle(
                                    fontSize: AppTextSize.titleSize,
                                    fontFamily: AppFonts.semiBold,
                                    color: Colors.green),
                              ),
                              const Spacer(),
                              value.subscriptionHistory[0].pagination
                                          .data[index].status ==
                                      "PENDING"
                                  ? Text(
                                      "PENDING",
                                      style: TextStyle(
                                          fontSize: AppTextSize.titleSize - 1,
                                          fontFamily: AppFonts.semiBold,
                                          color: Colors.yellow),
                                    )
                                  : value.subscriptionHistory[0].pagination
                                              .data[index].status ==
                                          "APPROVED"
                                      ? Text(
                                          "APPROVED",
                                          style: TextStyle(
                                              fontSize:
                                                  AppTextSize.titleSize - 1,
                                              fontFamily: AppFonts.semiBold,
                                              color: Colors.green),
                                        )
                                      : Text(
                                          "REJECTED",
                                          style: TextStyle(
                                              fontSize:
                                                  AppTextSize.titleSize - 1,
                                              fontFamily: AppFonts.semiBold,
                                              color: Colors.red),
                                        ),
                            ]),
                        //
                        //
                        //

                        Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            const Text(""),
                            const Icon(Icons.keyboard_arrow_right_sharp,
                                size: 28),
                            value.subscriptionHistory[0].pagination.data[index]
                                        .isActive ==
                                    true
                                ? Text(
                                    "Active",
                                    style: TextStyle(
                                        fontSize: AppTextSize.titleSize - 1,
                                        fontFamily: AppFonts.semiBold,
                                        color: Colors.green),
                                  )
                                : Text(
                                    "Inactive",
                                    style: TextStyle(
                                        fontSize: AppTextSize.titleSize - 1,
                                        fontFamily: AppFonts.semiBold,
                                        color: Colors.red),
                                  ),
                          ],
                        )
                      ]),
                ),
              );
            },
          )
        ]);
  }
}
