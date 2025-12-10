import 'package:flutter/material.dart';

import '../../const/app.dart';

class DetailsViewerWidget extends StatelessWidget {
  final String title;
  final String des;

  const DetailsViewerWidget({Key? key, required this.title, required this.des})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: 120,
              child: Text(
                title,
                style: TextStyle(
                    fontSize: AppTextSize.titleSize - 1,
                    fontFamily: AppFonts.medium),
              ),
            ),
            Flexible(
              child: Text(
                des,
                maxLines: 3,
                style: TextStyle(
                    fontSize: AppTextSize.titleSize - 1,
                    fontFamily: AppFonts.semiBold,
                    overflow: TextOverflow.ellipsis),
              ),
            ),
          ]),
    );
  }
}
