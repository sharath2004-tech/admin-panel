import 'package:basic_utils/basic_utils.dart';
import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../const/setting.dart';

class AmenitiesWidget extends StatelessWidget {
  const AmenitiesWidget({
    super.key,
    required this.amenities,
  });

  final List<String> amenities;

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      shrinkWrap: true,
      crossAxisCount: 2,
      childAspectRatio: 4,
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      children: List.generate(amenities.length, (index) {
        return Align(
            alignment: Alignment.centerLeft,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Icon(
                  Icons.check_circle_outline_outlined,
                  color: AppColor.primaryColor,
                  size: 22,
                ),
                const SizedBox(width: 5),
                SizedBox(
                  width: screenSize(context).width * 0.28,
                  child: Text(
                    StringUtils.capitalize(amenities[index], allWords: true),
                    maxLines: 2,
                    style: TextStyle(
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.semiBold),
                  ),
                ),
              ],
            ));
      }),
    );
  }
}
