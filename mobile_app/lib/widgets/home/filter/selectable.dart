import 'package:flutter/material.dart';

import '../../../const/app.dart';

// ignore: must_be_immutable
class SelectableFilterWidget extends StatelessWidget {
  String name;
  Color activeColor;
  SelectableFilterWidget(
      {super.key, required this.name, required this.activeColor});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 34,
      width: 90,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: activeColor, width: 1.5),
      ),
      child: Text(
        name,
        textAlign: TextAlign.center,
        style: TextStyle(
            fontSize: 13.5, color: activeColor, fontFamily: AppFonts.semiBold),
      ),
    );
  }
}
