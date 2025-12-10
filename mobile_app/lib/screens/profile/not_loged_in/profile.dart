import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_share/flutter_share.dart';
import 'package:provider/provider.dart';
import 'package:store_redirect/store_redirect.dart';
import 'package:system_settings/system_settings.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../const/app.dart';
import '../../../const/route.dart';
import '../../../const/setting.dart';
import '../../../controllers/dark_mode.dart';
import '../../../widgets/profile/list_tile.dart';

class ProfileScreenNotLogedIn extends StatefulWidget {
  const ProfileScreenNotLogedIn({super.key});

  @override
  State<ProfileScreenNotLogedIn> createState() =>
      _ProfileScreenNotLogedInState();
}

class _ProfileScreenNotLogedInState extends State<ProfileScreenNotLogedIn> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        centerTitle: true,
        title: Text(
          "Account",
          style: TextStyle(
              fontSize: AppTextSize.headerSize, fontFamily: AppFonts.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 25),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Log in",
                      style: TextStyle(
                          fontSize: AppTextSize.headerSize,
                          fontFamily: AppFonts.bold),
                    ),
                    Text(
                      "Log in to your account",
                      style: TextStyle(
                          fontSize: AppTextSize.titleSize,
                          color: AppColor.primaryColor,
                          fontFamily: AppFonts.semiBold),
                    )
                  ],
                ),
                Container(
                    height: 70,
                    width: 70,
                    padding: const EdgeInsets.all(18),
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                        color: AppColor.primaryColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(16.0)),
                    child: Image.asset(AppAssets.person))
              ],
            ),
            const SizedBox(height: 40),
            GestureDetector(
              onTap: () => SystemSettings.appNotifications(),
              child: const CustomListTileWidget(
                icon: Icons.notifications_active_outlined,
                title: "Notification",
                arrow: false,
              ),
            ),
            blackLineForProfile(context),
            Container(
                height: 50,
                width: screenSize(context).width,
                color: Colors.transparent,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Icon(Icons.dark_mode, color: AppColor.primaryColor),
                    const SizedBox(width: 10),
                    Text(
                      "Dark Mode",
                      style: TextStyle(
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.medium),
                    ),
                    const Spacer(),
                    Transform.scale(
                      scale: 0.8,
                      transformHitTests: false,
                      child: CupertinoSwitch(
                        value: Provider.of<DarkModeProvider>(context,
                                listen: false)
                            .isDarkMode,
                        onChanged: (value) {
                          setState(() {
                            Provider.of<DarkModeProvider>(context,
                                    listen: false)
                                .setDarkTheme = value;
                          });
                        },
                      ),
                    )
                  ],
                )),
            blackLineForProfile(context),
            GestureDetector(
              onTap: () async {
                String emailAddress = AppConst.contactUsEmail;
                String subject = '';

                String? encodeQueryParameters(Map<String, String> params) {
                  return params.entries
                      .map((MapEntry<String, String> e) =>
                          '${Uri.encodeComponent(e.key)}=${Uri.encodeComponent(e.value)}')
                      .join('&');
                }

                final Uri emailLaunchUri = Uri(
                  scheme: 'mailto',
                  path: emailAddress,
                  query: encodeQueryParameters(<String, String>{
                    'subject': subject,
                  }),
                );

                await launchUrl(emailLaunchUri);
              },
              child: const CustomListTileWidget(
                icon: Icons.contact_page_outlined,
                title: "Contact Us",
                arrow: false,
              ),
            ),
            blackLineForProfile(context),
            GestureDetector(
              onTap: () async {
                if (!await launchUrl(Uri.parse(AppConst.privacyPolicy))) {
                  throw Exception('Could not launch ');
                }
              },
              child: const CustomListTileWidget(
                icon: Icons.privacy_tip_outlined,
                title: "Privacy Policy",
                arrow: false,
              ),
            ),
            blackLineForProfile(context),
            GestureDetector(
              onTap: () async {
                // Set the app link and the message to be shared
                String appLink =
                    'https://play.google.com/store/apps/details?id=${AppConst.androidAppID}';

                // Share the app link and message using the share dialog
                await FlutterShare.share(
                    title: 'Share App', text: " ", linkUrl: appLink);
              },
              child: const CustomListTileWidget(
                icon: Icons.share,
                title: "Share App",
                arrow: false,
              ),
            ),
            blackLineForProfile(context),
            GestureDetector(
              onTap: () => StoreRedirect.redirect(
                  androidAppId: AppConst.androidAppID,
                  iOSAppId: AppConst.iosAppID),
              child: const CustomListTileWidget(
                icon: Icons.downloading_sharp,
                title: "Check For Update",
                arrow: false,
              ),
            ),
            blackLineForProfile(context),
            GestureDetector(
              onTap: () => Navigator.of(context).pushNamed(AppRoutes.aboutUs),
              child: const CustomListTileWidget(
                icon: Icons.groups_3_outlined,
                title: "About Us",
                arrow: false,
              ),
            ),
            const SizedBox(height: 30.0),
            GestureDetector(
              onTap: () => Navigator.pushNamed(context, AppRoutes.login),
              child: Container(
                height: 46,
                width: screenSize(context).width - 24,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    color: AppColor.primaryColor),
                child: Text(
                  "Login",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: AppTextSize.titleSize,
                      fontFamily: AppFonts.bold),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
