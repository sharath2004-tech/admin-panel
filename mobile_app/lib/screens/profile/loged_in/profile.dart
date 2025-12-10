import "package:flutter/material.dart";
import "package:provider/provider.dart";

import "../../../const/app.dart";
import "../../../controllers/auth.dart";
import "../../../controllers/profile.dart";
import "../../../widgets/profile/profile.dart";

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _isInit = true;
  late Future _profileData;
  @override
  void didChangeDependencies() {
    if (_isInit) {
      _profileData = Provider.of<ProfileProvider>(context, listen: false)
          .getProfile(
              context: context,
              userID:
                  Provider.of<AuthProvider>(context, listen: false).userId!);
      _isInit = false;
    }
    super.didChangeDependencies();
  }

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
      body: Provider.of<ProfileProvider>(context, listen: false).user.isNotEmpty
          ? const ProfileWidget()
          : FutureBuilder(
              future: _profileData,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                      child: Transform.scale(
                    scale: 0.7,
                    child: const CircularProgressIndicator.adaptive(),
                  ));
                } else {
                  if (snapshot.hasError) {
                    return const Center(child: Text("Unknown Error"));
                  } else {
                    return const ProfileWidget();
                  }
                }
              }),
    );
  }
}
