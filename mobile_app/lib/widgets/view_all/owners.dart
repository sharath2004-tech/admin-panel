
import 'package:basic_utils/basic_utils.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../const/route.dart';

// ignore: must_be_immutable
class ViewAllPropertyOwnersWidget extends StatelessWidget {
  String id;
  String name;
  String imgUrl;

  ViewAllPropertyOwnersWidget(
      {super.key, required this.id, required this.name, required this.imgUrl});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, AppRoutes.ownerProperties,
          arguments: [id, name]),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: customBoxShadow(),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              height: 70,
              width: screenSize(context).width * 0.3,
              decoration: BoxDecoration(
                image: DecorationImage(
                    image: CachedNetworkImageProvider(imgUrl),
                    fit: BoxFit.contain),
              ),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              child: Text(
                StringUtils.capitalize(name, allWords: true),
                maxLines: 2,
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontSize: AppTextSize.titleSize,
                    fontFamily: AppFonts.medium,
                    overflow: TextOverflow.ellipsis),
              ),
            )
          ],
        ),
      ),
    );
  }
}
