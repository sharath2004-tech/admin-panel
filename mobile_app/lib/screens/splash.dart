import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/const/app.dart';
import 'package:real_estate/const/setting.dart';

import '../const/route.dart';
import '../controllers/auth.dart';

//

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    Timer(Duration.zero, () {
      Provider.of<AuthProvider>(context, listen: false).getUserAndToken();
    });
    Timer(const Duration(seconds: 2), () {
      Navigator.pushReplacementNamed(context, AppRoutes.bottomNavigator);
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.primaryColor,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            height: screenSize(context).width * 0.5,
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/launcher/app_logo.png"),
                fit: BoxFit.contain,
              ),
            ),
          ),
          Text(AppConst.appName,
              style: TextStyle(
                  color: Colors.white,
                  fontSize: AppTextSize.headerSize + 2,
                  fontWeight: FontWeight.bold))
        ],
      ),
    );
  }
}
