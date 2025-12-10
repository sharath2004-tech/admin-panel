import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:real_estate/const/app.dart';

import '../../../const/setting.dart';

// ignore: must_be_immutable
class BedBathFilterWidget extends StatelessWidget {
  String value;
  VoidCallback onPressedplus;
  VoidCallback onPressedminus;

  BedBathFilterWidget(
      {super.key,
      required this.value,
      required this.onPressedplus,
      required this.onPressedminus});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 36,
      width: 110,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8.0), color: Colors.white),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: onPressedminus,
            child: Container(
              height: 36,
              width: 30,
              decoration: BoxDecoration(
                shape: BoxShape.rectangle,
                color: AppColor.grey.withOpacity(0.1),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(8.0),
                  bottomLeft: Radius.circular(8.0),
                ),
              ),
              child: Icon(
                FontAwesomeIcons.minus,
                size: AppTextSize.subTextSize,
                color: Colors.black,
              ),
            ),
          ),
          SizedBox(
            child: Text(
              value,
              style: TextStyle(
                  fontSize: AppTextSize.headerSize,
                  color: Colors.black,
                  fontFamily: AppFonts.semiBold),
              textAlign: TextAlign.start,
            ),
          ),
          GestureDetector(
            onTap: onPressedplus,
            child: Container(
              height: 36,
              width: 30,
              decoration: BoxDecoration(
                shape: BoxShape.rectangle,
                color: AppColor.grey.withOpacity(0.1),
                borderRadius: const BorderRadius.only(
                  topRight: Radius.circular(8.0),
                  bottomRight: Radius.circular(8.0),
                ),
              ),
              child: Icon(
                FontAwesomeIcons.plus,
                size: AppTextSize.subTextSize,
                color: Colors.black,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
