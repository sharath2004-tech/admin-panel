import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/screens/home/view_all/featured.dart';

import '../../const/app.dart';
import '../../const/route.dart';
import '../../const/setting.dart';
import '../../controllers/properties.dart';
import 'package:basic_utils/basic_utils.dart' as bu;

import 'header.dart';

class FeaturedProperties extends StatelessWidget {
  const FeaturedProperties({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<PropertiesProvider>(builder: (context, data, _) {
      return data.featuredProp.isEmpty
          ? const SizedBox()
          : Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const PropertyHeader(
                  header: "Featured Properties",
                  ontap: ViewAllFeaturedProperties(name: "Featured Propertie"),
                ),
                SizedBox(
                  height: screenSize(context).height * 0.245,
                  child: ListView.builder(
                      shrinkWrap: true,
                      scrollDirection: Axis.horizontal,
                      physics: const BouncingScrollPhysics(),
                      itemCount: data.featuredProp.length,
                      itemBuilder: (ctx, index) {
                        // data.sortFeaturedPropertiesByTime();
                        return FeaturedPropertyWidget(
                          id: data.featuredProp[index].id,
                          propertyName: data.featuredProp[index].name,
                          bedroom: data.featuredProp[index].details.bedroom,
                          bathroom: data.featuredProp[index].details.bathroom,
                          area: data.featuredProp[index].details.area,
                          address: data.featuredProp[index].address.location,
                          type: data.featuredProp[index].propertyType,
                          imgUrl: data.featuredProp[index].images[0].url,
                        );
                      }),
                ),
              ],
            );
    });
  }
}

class FeaturedPropertyWidget extends StatelessWidget {
  final String id;
  final String propertyName;
  final int bedroom;
  final int bathroom;
  final int area;
  final String address;
  final String type;
  final String imgUrl;

  const FeaturedPropertyWidget(
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
        margin: const EdgeInsets.only(left: 10),
        width: screenSize(context).width * 0.5,
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
                      fit: BoxFit.cover),
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

// ignore: must_be_immutable
class HomeAmentiesWidget extends StatelessWidget {
  String bedRoom;
  String bathRoom;
  String propertyArea;

  HomeAmentiesWidget(
      {super.key,
      required this.bathRoom,
      required this.bedRoom,
      required this.propertyArea});

  var textsize =
      TextStyle(fontSize: AppTextSize.subTextSize, fontFamily: AppFonts.medium);

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    return Padding(
      padding: const EdgeInsets.only(left: 0),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(
          children: [
            Row(
              children: [
                AppIcons.bedIcon,
                Padding(
                  padding: EdgeInsets.only(left: screenSize.width * 0.008),
                  child: Text(
                    bedRoom,
                    style: textsize,
                  ),
                ),
              ],
            ),
            const SizedBox(width: 8),
            // Padding(
            //   padding: EdgeInsets.only(
            //       left: screenSize.width * 0.014,
            //       right: screenSize.width * 0.014),
            //   child: Container(
            //     height: screenSize.height * 0.015,
            //     decoration: BoxDecoration(
            //         border: Border.all(width: 0.5, color: Colors.black54)),
            //   ),
            // ),
            Row(
              children: [
                AppIcons.bathIcon,
                Padding(
                  padding: EdgeInsets.only(left: screenSize.width * 0.008),
                  child: Text(
                    bathRoom,
                    style: textsize,
                  ),
                ),
              ],
            ),

            const SizedBox(width: 8),
            // Padding(
            //   padding: EdgeInsets.only(
            //       left: screenSize.width * 0.014,
            //       right: screenSize.width * 0.014),
            //   child: Container(
            //     height: screenSize.height * 0.015,
            //     decoration: BoxDecoration(
            //       border: Border.all(width: 0.5, color: Colors.black54),
            //     ),
            //   ),
            // ),
            Row(
              children: [
                AppIcons.areaIcon,
                Padding(
                  padding: EdgeInsets.only(left: screenSize.width * 0.008),
                  child: Text(
                    "$propertyArea Sq.M",
                    style: textsize,
                  ),
                ),
              ],
            ),
          ],
        ),
      ]),
    );
  }
}
