import 'package:flutter/material.dart';
import 'package:real_estate/const/app.dart';
import 'package:real_estate/const/setting.dart';

class ColoredPercentageContainer extends StatelessWidget {
  final double percentage;
  final String count;
  const ColoredPercentageContainer(
      {super.key, required this.count, required this.percentage});

  @override
  Widget build(BuildContext context) {
    // Ensure the percentage is within the valid range of 0 to 100.
    final validPercentage = percentage.clamp(0, 100);

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          count,
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.black54),
        ),
        const SizedBox(width: 15),
        Container(
          width: screenSize(context).width * 0.5,
          height: 10.0,
          decoration: BoxDecoration(
              color: Colors.grey.withOpacity(0.3),
              borderRadius: BorderRadius.circular(8.0)),
          child: Stack(
            children: [
              Container(
                width:
                    (validPercentage / 100) * screenSize(context).width * 0.5,
                decoration: BoxDecoration(
                    color: AppColor.primaryColor,
                    borderRadius: BorderRadius.circular(8.0)),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
