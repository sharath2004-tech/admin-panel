import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../const/setting.dart';

class ViewMyWidget extends StatelessWidget {
  final IconData icon;
  final String title;

  const ViewMyWidget({super.key, required this.icon, required this.title});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      width: MediaQuery.of(context).size.width * 0.4,
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8.0),
          boxShadow: customBoxShadow()),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          Icon(icon, size: 20, color: AppColor.grey),
          const SizedBox(height: 8),
          Text(
            title,
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: AppTextSize.titleSize, fontFamily: AppFonts.semiBold),
          ),
        ],
      ),
    );
  }
}
