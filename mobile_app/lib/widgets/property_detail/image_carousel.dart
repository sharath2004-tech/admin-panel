import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../model/property_detail.dart';
import '../../utils/full_image.dart';

class PropertyDetailImageCarousel extends StatelessWidget {
  const PropertyDetailImageCarousel(
      {super.key, required this.imgUrl, required this.propertyFor});

  final List<ImageModel> imgUrl;
  final String propertyFor;

  @override
  Widget build(BuildContext context) {
    return CarouselSlider(
      options: CarouselOptions(
        height: screenSize(context).height * 0.25,
        autoPlay: true,
        enlargeCenterPage: true,
      ),
      items: imgUrl
          .map(
            (item) => Stack(children: [
              GestureDetector(
                onTap: () => Navigator.of(context).push(CupertinoPageRoute(
                    builder: (context) => ShowMoreFullImageScreen(
                        images: imgUrl, indexx: imgUrl.indexOf(item)))),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8.0),
                  child: CachedNetworkImage(
                    imageUrl: item.url,
                    width: screenSize(context).width,
                    errorWidget: (context, url, error) =>
                        const Icon(Icons.error),
                    placeholder: (ctx, _) => imagePlaceHolder(),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              rentSale(propertyFor, context)
            ]),
          )
          .toList(),
    );
  }
}
