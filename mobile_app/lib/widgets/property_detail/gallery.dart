import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../model/property_detail.dart';
import '../../utils/full_image.dart';

class GalleryWidget extends StatelessWidget {
  const GalleryWidget({
    super.key,
    required this.imgUrl,
  });

  final List<ImageModel> imgUrl;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: screenSize(context).height * 0.14,
      width: screenSize(context).width,
      child: ListView.builder(
          scrollDirection: Axis.horizontal,
          physics: const BouncingScrollPhysics(),
          itemCount: imgUrl.length > 4 ? 4 : imgUrl.length,
          itemBuilder: (ctx, index) {
            return GestureDetector(
              onTap: () => Navigator.of(context).push(CupertinoPageRoute(
                  builder: (context) => ShowMoreFullImageScreen(
                      images: imgUrl, indexx: imgUrl.indexOf(imgUrl[index])))),
              child: Container(
                width: screenSize(context).width * 0.22,
                margin: EdgeInsets.only(
                    top: 5, left: screenSize(context).width * 0.04),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: CachedNetworkImage(
                    imageUrl: imgUrl[index].url,
                    placeholder: (ctx, _) => imagePlaceHolder(),
                    errorWidget: (context, url, error) =>
                        const Icon(Icons.error),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            );
          }),
    );
  }
}
