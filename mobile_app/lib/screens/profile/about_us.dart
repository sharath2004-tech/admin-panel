import 'package:flutter/material.dart';
import 'package:real_estate/const/setting.dart';

import '../../const/app.dart';

class AboutUsScreen extends StatelessWidget {
  const AboutUsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        automaticallyImplyLeading: false,
        centerTitle: true,
        leading: IconButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            icon: const Icon(Icons.arrow_back_ios, size: 20)),
        title: Text(
          "About Us",
          style: TextStyle(
              fontSize: AppTextSize.headerSize, fontFamily: AppFonts.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Text(
                AppConst.aboutUs,
                style: TextStyle(
                    fontSize: AppTextSize.titleSize,
                    fontFamily: AppFonts.medium),
              ),
              const SizedBox(height: 30)
            ],
          ),
        ),
      ),
    );
  }
}
