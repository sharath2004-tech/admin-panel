import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controllers/bookmark.dart';

import '../../controllers/auth.dart';
import '../../controllers/properties.dart';
import '../../widgets/property_detail/property_detail.dart';

class PropertyDetailScreen extends StatefulWidget {
  final String propertyID;

  const PropertyDetailScreen({super.key, required this.propertyID});

  @override
  State<PropertyDetailScreen> createState() => _PropertyDetailScreenState();
}

class _PropertyDetailScreenState extends State<PropertyDetailScreen> {
  bool isInit = true;
  late Future propertyData;
  @override
  void didChangeDependencies() {
    if (isInit) {
      Provider.of<AuthProvider>(context, listen: false).userId != null
          ? Provider.of<BookmarkProvider>(context, listen: false)
              .getFavouriteProperties(
                  userID:
                      Provider.of<AuthProvider>(context, listen: false).userId!)
          : null;

      propertyData = Provider.of<PropertiesProvider>(context, listen: false)
          .getPropertyDetail(propID: widget.propertyID);
      isInit = false;
    }
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    Future.delayed(
        Duration.zero,
        () => Provider.of<BookmarkProvider>(context, listen: false)
            .removeFavourite(widget.propertyID));
    return Scaffold(
      body: SafeArea(
          child: FutureBuilder(
              future: propertyData,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                      child: Transform.scale(
                    scale: 0.7,
                    child: const CircularProgressIndicator.adaptive(),
                  ));
                } else {
                  if (snapshot.hasError) {
                    return const Center(child: Text("Error"));
                  } else {
                    return Consumer<PropertiesProvider>(
                        builder: (context, data, _) {
                      return PropertyDetailWidget(
                        id: data.propertyDetail[0].property.id,
                        propertyName: data.propertyDetail[0].property.name,
                        price: data.propertyDetail[0].property.price,
                        paymentStatus:
                            data.propertyDetail[0].property.paymentDescription,
                        isFurnished:
                            data.propertyDetail[0].property.isFurnished,
                        city: data.propertyDetail[0].property.address.city,
                        currency: data.propertyDetail[0].property.currency,
                        ownerName: data.propertyDetail[0].property.owner.name,
                        ownerID: data.propertyDetail[0].property.owner.id,
                        imgUrls: data.propertyDetail[0].property.images,
                        videoUrl: data.propertyDetail[0].property.videoTour,
                        bathRoom:
                            data.propertyDetail[0].property.details.bathroom,
                        bedRoom:
                            data.propertyDetail[0].property.details.bedroom,
                        yearBuilt:
                            data.propertyDetail[0].property.details.yearBuilt,
                        description:
                            data.propertyDetail[0].property.description,
                        area: data.propertyDetail[0].property.details.area
                            .toString(),
                        broker: data.propertyDetail[0].property.broker,
                        address:
                            data.propertyDetail[0].property.address.location,
                        propertyHomeType: data
                            .propertyDetail[0].property.propertyHomeType.name,
                        propertyFor:
                            data.propertyDetail[0].property.propertyType,
                        longtitude:
                            data.propertyDetail[0].property.address.loc[1],
                        latitude:
                            data.propertyDetail[0].property.address.loc[0],
                        agent: data.propertyDetail[0].property.agent,

                        facilities: data.propertyDetail[0].property.facilities,
                        amenties: data.propertyDetail[0].property.amenities,
                        review: data.propertyDetail[0].propertyRating,
                        relatedProperties: data.propertyDetail[0].related,
                        // companyNameForAgent: data.agentCompanyData,
                      );
                    });
                  }
                }
              })),
    );
  }
}
