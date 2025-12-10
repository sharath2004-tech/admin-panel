import 'package:basic_utils/basic_utils.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../const/app.dart';
import '../../../const/route.dart';
import '../../../const/setting.dart';
import '../../../controllers/dark_mode.dart';

class BrokerWidget extends StatelessWidget {
  final String name;
  final String logo;
  final String address;

  const BrokerWidget({
    super.key,
    required this.name,
    required this.logo,
    required this.address,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      child: Container(
        decoration: BoxDecoration(
            color: Provider.of<DarkModeProvider>(context).isDarkMode
                ? AppColor.primaryColor.withOpacity(0.1)
                : Colors.white,
            borderRadius: BorderRadius.circular(8.0),
            boxShadow: Provider.of<DarkModeProvider>(context).isDarkMode
                ? null
                : customBoxShadow()),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 15),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(width: 15),
                Container(
                  height: 55,
                  width: 55,
                  decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppColor.primaryColor.withOpacity(0.1),
                      image: DecorationImage(
                          image: CachedNetworkImageProvider(logo))),
                ),
                const SizedBox(width: 15),
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(StringUtils.capitalize(name, allWords: true),
                        maxLines: 1,
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize,
                            overflow: TextOverflow.ellipsis,
                            fontFamily: AppFonts.semiBold)),
                    const SizedBox(height: 2),
                    Text(StringUtils.capitalize(address, allWords: true),
                        maxLines: 1,
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize - 2,
                            overflow: TextOverflow.ellipsis,
                            fontFamily: AppFonts.regular)),
                  ],
                )
              ],
            ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}

class ViewBrokerPropertiesWidget extends StatelessWidget {
  final String id;
  final String name;

  const ViewBrokerPropertiesWidget(
      {super.key, required this.id, required this.name});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, AppRoutes.brokerProperties,
          arguments: [id, name, true]),
      child: Center(
        child: Container(
          height: 50,
          width: screenSize(context).width * 0.7,
          alignment: Alignment.center,
          decoration: BoxDecoration(
              color: Provider.of<DarkModeProvider>(context).isDarkMode
                  ? AppColor.primaryColor.withOpacity(0.1)
                  : Colors.white,
              borderRadius: BorderRadius.circular(10.0),
              border: Border.all(color: AppColor.primaryColor),
              boxShadow: Provider.of<DarkModeProvider>(context).isDarkMode
                  ? null
                  : customBoxShadow()),
          child: Text(
            "View Broker Properties",
            style: TextStyle(
                fontSize: AppTextSize.titleSize, fontFamily: AppFonts.medium),
          ),
        ),
      ),
    );
  }
}
