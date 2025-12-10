import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../const/setting.dart';

class CustomListTileWidget extends StatelessWidget {
  final IconData icon;
  final String title;
  final bool arrow;

  const CustomListTileWidget(
      {super.key,
      required this.icon,
      required this.title,
      required this.arrow});

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 50,
        width: screenSize(context).width,
        color: Colors.transparent,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(icon, color: AppColor.primaryColor),
            const SizedBox(width: 10),
            Text(
              title,
              style: TextStyle(
                  fontSize: AppTextSize.titleSize, fontFamily: AppFonts.medium),
            ),
            const Spacer(),
            arrow
                ? const Icon(Icons.arrow_forward_ios_sharp, size: 15)
                : Container()
          ],
        ));
  }
}
