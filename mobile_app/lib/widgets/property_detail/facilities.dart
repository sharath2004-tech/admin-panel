import 'package:basic_utils/basic_utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/dark_mode.dart';

import '../../const/app.dart';
import '../../const/setting.dart';
import '../../model/property_detail.dart';

class NearByFacilitiesWidget extends StatelessWidget {
  const NearByFacilitiesWidget({
    super.key,
    required this.facilities,
  });

  final List<Facility> facilities;

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      shrinkWrap: true,
      crossAxisCount: 4,
      childAspectRatio: 0.8,
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      children: List.generate(facilities.length, (index) {
        // print(facilities[index].facility);
        return Align(
            alignment: Alignment.center,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                    height: 60,
                    width: 60,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppColor.primaryColor.withOpacity(0.1)),
                    child: AppNearByAssets.nearByLocations
                            .contains(facilities[index].facility)
                        ? Padding(
                            padding: const EdgeInsets.all(18),
                            child: Image.asset(
                                "assets/near_by/${facilities[index].facility}.png",
                                color: Provider.of<DarkModeProvider>(context,
                                            listen: false)
                                        .isDarkMode
                                    ? Colors.white
                                    : AppColor.primaryColor))
                        : Icon(Icons.aspect_ratio,
                            color: Provider.of<DarkModeProvider>(context,
                                        listen: false)
                                    .isDarkMode
                                ? Colors.white
                                : AppColor.primaryColor)),
                const SizedBox(height: 2),
                Container(
                  width: screenSize(context).width * 0.24,
                  alignment: Alignment.center,
                  child: Text(
                    StringUtils.capitalize(facilities[index].facility,
                        allWords: true),
                    maxLines: 1,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        overflow: TextOverflow.ellipsis,
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.medium),
                  ),
                ),
                Text(
                  "${facilities[index].distance} Km",
                  maxLines: 1,
                  style: TextStyle(
                      color: AppColor.grey,
                      overflow: TextOverflow.ellipsis,
                      fontSize: AppTextSize.subTextSize,
                      fontFamily: AppFonts.medium),
                ),
              ],
            ));
      }),
    );
  }
}
