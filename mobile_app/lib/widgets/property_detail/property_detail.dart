import 'package:basic_utils/basic_utils.dart' as bu;
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/dark_mode.dart';
import 'package:real_estate/widgets/property_detail/review/not_reviewed_yet.dart';
import '../../const/setting.dart';
import 'agent/agent.dart';
import 'review/review/review.dart';

import 'package:flutter/material.dart';
import 'facilities.dart';
import 'video_tour.dart';

import '../../const/app.dart';
import '../../model/property_detail.dart';
import '../../utils/google_maps.dart';
import '../home/featured.dart';
import 'broker/broker.dart';
import 'amenities.dart';
import 'app_bar.dart';
import 'description.dart';
import 'details.dart';
import 'gallery.dart';
import 'image_carousel.dart';
import 'location.dart';

class PropertyDetailWidget extends StatelessWidget {
  final String id;
  final String propertyName;
  final dynamic price;
  final String paymentStatus;
  final bool isFurnished;
  final String description;
  final String ownerName;
  final String ownerID;
  final String area;
  final dynamic videoUrl;
  final dynamic currency;
  final dynamic bedRoom;
  final dynamic bathRoom;
  final dynamic yearBuilt;
  final String propertyHomeType;
  final Broker? broker;
  final String propertyFor;
  final String city;
  final String address;
  final double latitude;
  final double longtitude;
  final List<ImageModel> imgUrls;
  final List<String> amenties;
  final Agent agent;

  final List<Facility> facilities;
  final PropertyRating review;
  final List<Related> relatedProperties;

  const PropertyDetailWidget({
    super.key,
    required this.id,
    required this.propertyName,
    required this.price,
    required this.paymentStatus,
    required this.isFurnished,
    required this.description,
    required this.ownerName,
    required this.ownerID,
    required this.area,
    required this.currency,
    required this.videoUrl,
    required this.broker,
    required this.bedRoom,
    required this.bathRoom,
    required this.yearBuilt,
    required this.propertyHomeType,
    required this.city,
    required this.propertyFor,
    required this.address,
    required this.latitude,
    required this.longtitude,
    required this.agent,
    required this.imgUrls,
    required this.amenties,
    required this.facilities,
    required this.review,
    required this.relatedProperties,
    // required this.companyNameForAgent,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          //
          //custom AppBar
          //
          PropertyDetailsAppBarWidget(id: id),
          // const SizedBox(height: 5),
          PropertyDetailImageCarousel(
            imgUrl: imgUrls,
            propertyFor: propertyFor,
          ),
          //
          //Property Name & Video Preview
          //

          const SizedBox(height: 15),
          Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                //
                //Property Name
                //
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Text(
                    bu.StringUtils.capitalize(propertyName, allWords: true),
                    maxLines: 2,
                    style: TextStyle(
                      fontSize: AppTextSize.headerSize - 1,
                      fontFamily: AppFonts.semiBold,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                const SizedBox(height: 15),
                //
                // Video Preview
                //
                videoUrl != null
                    ? Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            VideoPreview(
                                propertyName: propertyName,
                                imgUrls: imgUrls[0],
                                videoUrl: videoUrl),
                            Text(
                              "${priceFormat.format(price)} $currency",
                              style: TextStyle(
                                  fontSize: AppTextSize.headerSize,
                                  fontFamily: AppFonts.semiBold,
                                  color: AppColor.primaryColor),
                            ),
                          ],
                        ),
                      )
                    : Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              "${priceFormat.format(price)} $currency",
                              style: TextStyle(
                                  fontSize: AppTextSize.headerSize,
                                  fontFamily: AppFonts.semiBold,
                                  color: AppColor.primaryColor),
                            ),
                          ],
                        ),
                      ),
                const SizedBox(height: 15)
              ]),

          //
          //Details & Description
          //
          blackLine(context),
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 15),
              header("Details & Description"),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Owner",
                des: ownerName,
              ),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Address",
                des: address,
              ),

              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Bedrooms",
                des: bedRoom.toString(),
              ),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Bathrooms",
                des: bathRoom.toString(),
              ),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Property Size",
                des: "$area sq m",
              ),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Year Built",
                des: yearBuilt.toString(),
              ),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Property Type",
                des: propertyHomeType,
              ),
              // const SizedBox(height: 8),
              // DetailsViewerWidget(
              //   title: "Property For",
              //   des: propertyFor,
              // ),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Payment",
                des: paymentStatus,
              ),
              const SizedBox(height: 8),
              DetailsViewerWidget(
                title: "Furnished",
                des: isFurnished ? "Yes" : "No",
              ),
              const SizedBox(height: 20),
              //
              //Description
              //

              DescriptionWidget(description: description),
            ],
          ),
          const SizedBox(height: 15),

          blackLine(context),
          const SizedBox(height: 15),
          //
          //Gallery
          //
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              header("Gallery"),
              const SizedBox(height: 8),
              GalleryWidget(imgUrl: imgUrls),
              const SizedBox(height: 8),
            ],
          ),
          //
          //Amenities
          //

          amenties.isNotEmpty
              ? Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 15),
                    blackLine(context),
                    const SizedBox(height: 15),
                    header("Amenities"),
                    const SizedBox(height: 15),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12.0),
                      child: Container(
                        decoration: BoxDecoration(
                            color: Provider.of<DarkModeProvider>(context)
                                    .isDarkMode
                                ? AppColor.primaryColor.withOpacity(0.1)
                                : Colors.white,
                            borderRadius: BorderRadius.circular(8.0),
                            boxShadow: Provider.of<DarkModeProvider>(context)
                                    .isDarkMode
                                ? null
                                : customBoxShadow()),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            const SizedBox(height: 5),
                            AmenitiesWidget(amenities: amenties),
                            const SizedBox(height: 5),
                          ],
                        ),
                      ),
                    ),
                  ],
                )
              : Container(),

          //
          //Agent
          //
          const SizedBox(height: 15),
          header("Agent"),
          const SizedBox(height: 15),
          AgentWidget(
            id: agent.user.id,
            brokerID: agent.broker,
            propertyID: id,
            name: "${agent.user.firstName} ${agent.user.lastName}",
            logo: agent.user.profileImage,
            address: agent.user.email,
            phoneNo: agent.user.phone,
            whatsup: agent.whatsappNumber,
          ),
          const SizedBox(height: 20),
          ViewAgentPropertiesWidget(
            id: agent.id,
            name: "${agent.user.firstName} ${agent.user.lastName}",
          ),
          //
          //Near By
          //
          facilities.isNotEmpty
              ? Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 25),
                    header("Nearby Facilities"),
                    const SizedBox(height: 15),
                    NearByFacilitiesWidget(facilities: facilities),
                  ],
                )
              : Container(),

          //
          //View Location On Map
          //

          const SizedBox(height: 15),
          header("Location"),

          const SizedBox(height: 20),
          GestureDetector(
              onTap: () => showFullMap(context),
              child: const ViewLocationWidget()),

          broker != null
              ? Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                      const SizedBox(height: 15),
                      blackLine(context),
                      const SizedBox(height: 15),
                      header("Broker"),
                      const SizedBox(height: 15),
                      BrokerWidget(
                        name: broker!.name,
                        logo: broker!.logo,
                        address: broker!.address,
                      ),
                      const SizedBox(height: 20),
                      ViewBrokerPropertiesWidget(
                        id: broker!.id,
                        name: broker!.name,
                      ),
                    ])
              : Container(),

          propertyFor == "rent" || propertyFor == "Rent"
              ? review.getAllRatings.isNotEmpty
                  ? RatingAndReviewWidget(review: review, propertyID: id)
                  : NoReviewsYetWidget(porpertyID: id)
              : Container(),
          relatedProperties.isEmpty
              ? const SizedBox(height: 20)
              : Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 15),
                    blackLine(context),
                    const SizedBox(height: 15),
                    header("Related Listings"),
                    const SizedBox(height: 10),
                    //
                    //Related Listing
                    //
                    SizedBox(
                      height: screenSize(context).height * 0.245,
                      child: ListView.builder(
                          shrinkWrap: true,
                          scrollDirection: Axis.horizontal,
                          physics: const BouncingScrollPhysics(),
                          itemCount: relatedProperties.length,
                          itemBuilder: (ctx, index) {
                            // data.sortFeaturedPropertiesByTime();
                            return FeaturedPropertyWidget(
                              id: relatedProperties[index].id,
                              propertyName: relatedProperties[index].name,
                              bedroom: relatedProperties[index].details.bedroom,
                              bathroom:
                                  relatedProperties[index].details.bathroom,
                              area: relatedProperties[index].details.area,
                              address:
                                  relatedProperties[index].address.location,
                              type: relatedProperties[index].propertyType,
                              imgUrl: relatedProperties[index].images[0].url,
                            );
                          }),
                    ),
                  ],
                ),
        ],
      ),
    );
  }
//

  showFullMap(BuildContext context) {
    return showModalBottomSheet(
        isScrollControlled: true,
        context: context,
        builder: (ctx) {
          return Stack(children: [
            GoogleMapsItem(
              latitude: latitude,
              longtitude: longtitude,
            ),
            Positioned(
              top: screenSize(context).height * 0.06,
              left: screenSize(context).width * 0.05,
              child: navigatorPop(context),
            ),
          ]);
        });
  }
}
