import 'package:basic_utils/basic_utils.dart' as bu;
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

// import 'package:badges/badges.dart' as bd;
import '../const/app.dart';
import '../const/route.dart';
import '../const/setting.dart';
import 'home/featured.dart';

// ignore: must_be_immutable
class GridViewWidget extends StatelessWidget {
  String id;
  String propertyName;
  int bedroom;
  int bathroom;
  int area;
  String address;
  String type;
  String imgUrl;

  GridViewWidget(
      {super.key,
      required this.id,
      required this.propertyName,
      required this.bedroom,
      required this.bathroom,
      required this.area,
      required this.address,
      required this.type,
      required this.imgUrl});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () =>
          Navigator.pushNamed(context, AppRoutes.propertyDetail, arguments: id),
      child: Container(
        // width: screenSize(context).width * 0.5,
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(8),
            topRight: Radius.circular(8),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(children: [
              SizedBox(
                height: screenSize(context).height * 0.15,
                width: screenSize(context).width * 0.5,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: CachedNetworkImage(
                    imageUrl: imgUrl,
                    placeholder: (ctx, _) => imagePlaceHolder(),
                    errorWidget: (context, url, error) =>
                        const Icon(Icons.error),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              //
              //Positioned Widget For Sale And Rent
              //
              rentSale(type, context)
            ]),
            //
            //Property Name
            //
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                bu.StringUtils.capitalize(propertyName, allWords: true),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                    fontSize: AppTextSize.titleSize,
                    fontFamily: AppFonts.semiBold),
              ),
            ),
            const SizedBox(height: 5),
            HomeAmentiesWidget(
              bathRoom: bathroom.toString(),
              bedRoom: bedroom.toString(),
              propertyArea: area.toString(),
            ),
            const SizedBox(height: 5),
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                AppIcons.locationPin,
                SizedBox(width: screenSize(context).width * 0.008),
                SizedBox(
                  width: screenSize(context).width * 0.38,
                  child: Text(
                    address,
                    maxLines: 1,
                    style: TextStyle(
                        fontSize: AppTextSize.subTextSize,
                        color: AppColor.grey,
                        overflow: TextOverflow.ellipsis,
                        fontFamily: AppFonts.medium),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
