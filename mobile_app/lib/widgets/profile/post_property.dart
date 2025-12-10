import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../const/route.dart';
import '../../const/setting.dart';
import '../../controllers/auth.dart';

import '../../const/app.dart';
import '../../controllers/dark_mode.dart';

class PostPropertyWidget extends StatelessWidget {
  const PostPropertyWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: screenSize(context).width,
      decoration: BoxDecoration(
          color: Provider.of<DarkModeProvider>(context).isDarkMode
              ? AppColor.primaryColor.withOpacity(0.1)
              : Colors.white,
          borderRadius: BorderRadius.circular(10.0),
          boxShadow: Provider.of<DarkModeProvider>(context).isDarkMode
              ? null
              : customBoxShadow()),
      child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 12),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Image.asset(
                    AppAssets.mapMarker,
                    height: 40,
                    color: Provider.of<DarkModeProvider>(context, listen: false)
                            .isDarkMode
                        ? Colors.white
                        : AppColor.primaryColor,
                  ),
                  const SizedBox(width: 30),
                  Text(
                    "Looking to sell or rent out\nyou property?",
                    style: TextStyle(
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.semiBold),
                  ),
                ]),
            const SizedBox(height: 15),
            GestureDetector(
              onTap: () {
                if (Provider.of<AuthProvider>(context, listen: false).userId ==
                    null) {
                  Navigator.of(context).pushNamed(AppRoutes.login);
                } else {
                  Navigator.of(context).pushNamed(AppRoutes.requestToBeBroker);
                }
              },
              child: Center(
                child: Container(
                    height: 38,
                    width: screenSize(context).width - 60,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8.0),
                        color: AppColor.primaryColor.withOpacity(0.1)),
                    child: Text(
                      "Post property",
                      style: TextStyle(
                          color:
                              Provider.of<DarkModeProvider>(context).isDarkMode
                                  ? Colors.white
                                  : AppColor.primaryColor,
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.bold),
                    )),
              ),
            ),
            const SizedBox(height: 12),
          ]),
    );
  }
}
