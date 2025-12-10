import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../const/app.dart';
import '../../controllers/properties.dart';
import '../../screens/home/view_all/recent.dart';
import '../grid_view.dart';
import 'header.dart';

class RecentListingWidget extends StatelessWidget {
  const RecentListingWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<PropertiesProvider>(builder: (context, data, _) {
      if (data.recentListings.isEmpty) {
        return const Padding(
          padding: EdgeInsets.symmetric(vertical: 20),
          child: Center(child: Text("Recent Listings will be avaliable here.")),
        );
      }
      return Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const PropertyHeader(
              header: "Recent Listings",
              ontap: ViewAllRecentProperties(name: "Recent Listings")),
          GridView.builder(
              shrinkWrap: true,
              physics: const ScrollPhysics(),
              itemCount: data.recentListings.length,
              scrollDirection: Axis.vertical,
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                childAspectRatio: 0.97,
                maxCrossAxisExtent: screenSize(context).width * 0.5,
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
              ),
              itemBuilder: (ctx, index) {
                return GridViewWidget(
                  id: data.recentListings[index].id,
                  propertyName: data.recentListings[index].name,
                  bedroom: data.recentListings[index].details.bedroom,
                  bathroom: data.recentListings[index].details.bathroom,
                  area: data.recentListings[index].details.area,
                  address: data.recentListings[index].address.city,
                  type: data.recentListings[index].propertyType,
                  imgUrl: data.recentListings[index].images[0].url,
                );
              }),
        ],
      );
      // return ListView.builder(
      //     shrinkWrap: true,
      //     physics: const NeverScrollableScrollPhysics(),
      //     itemCount: data.recentListings.length,
      //     padding: const EdgeInsets.only(top: 8.0),
      //     scrollDirection: Axis.vertical,
      //     itemBuilder: (ctx, index) {
      //       return RecentListingsWidget(
      //         id: data.recentListings[index].id,
      //         propertyName:
      //             data.recentListings[index].name,
      //         price: data.recentListings[index].price,
      //         bedroom: data
      //             .recentListings[index].details.bedroom,
      //         bathroom: data
      //             .recentListings[index].details.bathroom,
      //         area:
      //             data.recentListings[index].details.area,
      //         address: data
      //             .recentListings[index].address.location,
      //         type:
      //             data.recentListings[index].propertyType,
      //         imgUrl: data
      //             .recentListings[index].images[0].url,
      //       );
      //     });
    });
  }
}
