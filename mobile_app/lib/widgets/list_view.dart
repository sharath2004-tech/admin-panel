import 'package:basic_utils/basic_utils.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../const/app.dart';
import '../const/route.dart';
import '../const/setting.dart';
import 'home/featured.dart';

// import 'package:badges/badges.dart' as bd;

// ignore: must_be_immutable
class ListViewWidget extends StatelessWidget {
  String id;
  String propertyName;
  dynamic price;
  int bedroom;
  int bathroom;
  int area;
  String address;
  String type;
  String imgUrl;

  ListViewWidget(
      {super.key,
      required this.id,
      required this.propertyName,
      required this.price,
      required this.bedroom,
      required this.bathroom,
      required this.area,
      required this.type,
      required this.address,
      required this.imgUrl});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.of(context)
          .pushNamed(AppRoutes.propertyDetail, arguments: id),
      child: Container(
        height: screenSize(context).height * 0.15,
        width: screenSize(context).width,
        margin: const EdgeInsets.only(left: 10, right: 10, bottom: 12),
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(8), bottomLeft: Radius.circular(8)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(children: [
              SizedBox(
                width: screenSize(context).width * 0.5,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: CachedNetworkImage(
                      imageUrl: imgUrl,
                      placeholder: (ctx, _) => imagePlaceHolder(),
                      errorWidget: (context, url, error) =>
                          const Icon(Icons.error),
                      fit: BoxFit.cover),
                ),
              ),
              //
              //Positioned Widget For Sale And Rent
              //
              rentSale(type, context)
            ]),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(left: 10),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      StringUtils.capitalize(propertyName, allWords: true),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.semiBold,
                      ),
                    ),
                    const SizedBox(height: 5),
                    HomeAmentiesWidget(
                      bathRoom: bathroom.toString(),
                      bedRoom: bedroom.toString(),
                      propertyArea: area.toString(),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      address,
                      maxLines: 1,
                      style: TextStyle(
                          fontSize: AppTextSize.subTextSize,
                          color: Colors.grey.shade700,
                          overflow: TextOverflow.ellipsis,
                          fontFamily: AppFonts.medium),
                    ),
                    const Spacer(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(bottom: 3.0, right: 4),
                          child: Text(
                            "\$ ${priceFormat.format(price)}",
                            style: const TextStyle(
                                fontSize: 16,
                                fontFamily: AppFonts.bold,
                                color: AppColor.primaryColor,
                                fontWeight: FontWeight.w700),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
