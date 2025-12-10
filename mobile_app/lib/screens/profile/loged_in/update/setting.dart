import 'package:flutter/material.dart';
import 'package:real_estate/controllers/profile.dart';

import '../../../../const/app.dart';
import '../../../../const/route.dart';
import '../../../../widgets/profile/list_tile.dart';

class SettingScreen extends StatefulWidget {
  final ProfileProvider profileData;

  const SettingScreen({super.key, required this.profileData});
  @override
  State<SettingScreen> createState() => _SettingScreenState();
}

class _SettingScreenState extends State<SettingScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        automaticallyImplyLeading: false,
        centerTitle: true,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios, size: 20),
        ),
        title: Text(
          "Profile",
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              GestureDetector(
                onTap: () => Navigator.of(context).pushNamed(
                    AppRoutes.updateProfile,
                    arguments: widget.profileData),
                child: const CustomListTileWidget(
                  icon: Icons.person_outline,
                  title: "Update Profile",
                  arrow: false,
                ),
              ),
              blackLineForProfile(context),
              GestureDetector(
                onTap: () =>
                    Navigator.of(context).pushNamed(AppRoutes.updatePassword),
                child: const CustomListTileWidget(
                  icon: Icons.password_outlined,
                  title: "Change Password",
                  arrow: false,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
