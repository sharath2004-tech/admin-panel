import 'package:basic_utils/basic_utils.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/dark_mode.dart';

import 'package:url_launcher/url_launcher.dart';

import '../../../const/app.dart';
import '../../../const/route.dart';
import '../../../const/setting.dart';
import '../../../controllers/auth.dart';

class AgentWidget extends StatelessWidget {
  final String id;
  final String? brokerID;
  final String propertyID;
  final String name;
  final String logo;
  final String address;
  final String phoneNo;

  final String whatsup;

  const AgentWidget(
      {super.key,
      required this.id,
      required this.brokerID,
      required this.propertyID,
      required this.name,
      required this.logo,
      required this.address,
      required this.phoneNo,
      required this.whatsup});

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
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                GestureDetector(
                  onTap: () async {
                    if (Provider.of<AuthProvider>(context, listen: false)
                            .userId ==
                        null) {
                      Navigator.of(context).pushNamed(AppRoutes.login);
                    } else if (Provider.of<AuthProvider>(context, listen: false)
                            .brokerID ==
                        brokerID) {
                    } else {
                      final Uri phonelaunch = Uri(
                        scheme: 'tel',
                        path: phoneNo,
                      );

                      await launchUrl(phonelaunch);
                    }
                  },
                  child: const CallChatWidget(
                    icon: Icons.phone,
                    title: "CALL",
                  ),
                ),
                const SizedBox(width: 15),
                GestureDetector(
                  onTap: () {
                    if (Provider.of<AuthProvider>(context, listen: false)
                            .userId ==
                        null) {
                      Navigator.of(context).pushNamed(AppRoutes.login);
                    } else if (Provider.of<AuthProvider>(context, listen: false)
                            .brokerID ==
                        brokerID) {
                      // showErrorResponse(
                      //     context: context, message: "Trying to contact Self?");
                    } else {
                      Navigator.pushNamed(context, AppRoutes.individualChat,
                          arguments: [id, propertyID, name, phoneNo]);
                    }
                  },
                  child: const CallChatWidget(
                    icon: Icons.message,
                    title: "CHAT",
                  ),
                ),
                const SizedBox(width: 15),
                GestureDetector(
                  onTap: () async {
                    if (Provider.of<AuthProvider>(context, listen: false)
                            .userId ==
                        null) {
                      Navigator.of(context).pushNamed(AppRoutes.login);
                    } else if (Provider.of<AuthProvider>(context, listen: false)
                            .brokerID ==
                        brokerID) {
                      // showErrorResponse(
                      //     context: context, message: "Trying to contact Self?");
                    } else {
                      final Uri whatsApp = Uri(
                        scheme: 'https',
                        path: "wa.me/$whatsup",
                      );

                      await launchUrl(whatsApp);
                    }
                  },
                  child: Container(
                    height: 36,
                    width: 110,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10.0),
                        color: AppColor.primaryColor),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Icon(Icons.wechat, size: 19, color: Colors.white),
                        const SizedBox(width: 6),
                        Text("WHATSAPP",
                            style: TextStyle(
                                fontSize: AppTextSize.subTextSize,
                                color: Colors.white,
                                fontFamily: AppFonts.semiBold)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 15),
          ],
        ),
      ),
    );
  }
}

class CallChatWidget extends StatelessWidget {
  final IconData icon;
  final String title;

  const CallChatWidget({super.key, required this.icon, required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 36,
      width: 75,
      alignment: Alignment.center,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          color: AppColor.primaryColor),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(icon, size: 19, color: Colors.white),
          const SizedBox(width: 6),
          Text(title,
              style: TextStyle(
                  fontSize: AppTextSize.subTextSize,
                  color: Colors.white,
                  fontFamily: AppFonts.semiBold)),
        ],
      ),
    );
  }
}

class ViewAgentPropertiesWidget extends StatelessWidget {
  final String id;
  final String name;

  const ViewAgentPropertiesWidget(
      {super.key, required this.id, required this.name});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, AppRoutes.brokerProperties,
          arguments: [id, name, false]),
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
                : customBoxShadow(),
          ),
          child: Text(
            "View Agent Properties",
            style: TextStyle(
                fontSize: AppTextSize.titleSize, fontFamily: AppFonts.medium),
          ),
        ),
      ),
    );
  }
}
