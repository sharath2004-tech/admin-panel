import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/utils/shimmer/by_type.dart';
import '../../const/app.dart';
import '../../controllers/properties.dart';
import 'package:basic_utils/basic_utils.dart' as bu;

import '../../widgets/list_view.dart';

class BrokerPropertiesScreen extends StatefulWidget {
  final String id;
  final String name;
  final bool isBroker;

  const BrokerPropertiesScreen(
      {super.key,
      required this.id,
      required this.name,
      required this.isBroker});
  @override
  State<BrokerPropertiesScreen> createState() => _BrokerPropertiesScreenState();
}

class _BrokerPropertiesScreenState extends State<BrokerPropertiesScreen> {
  late Future data;
  bool isInit = true;

  @override
  void didChangeDependencies() {
    if (isInit) {
      data = Provider.of<PropertiesProvider>(context, listen: false)
          .getBrokerProperties(propID: widget.id, isBroker: widget.isBroker);
      isInit = false;
    }
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        automaticallyImplyLeading: false,
        centerTitle: true,
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: const Icon(Icons.arrow_back_ios, size: 20),
        ),
        title: Text(
          bu.StringUtils.capitalize(widget.name),
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
      ),
      body: SafeArea(
          child: FutureBuilder(
              future: data,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const ByTypeShimmers();
                } else {
                  if (snapshot.hasError) {
                    return const Center(child: Text("Error"));
                  } else {
                    return Consumer<PropertiesProvider>(
                        builder: (context, data, _) {
                      return SingleChildScrollView(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            //
                            //Cover Image
                            //
                            // SizedBox(
                            //   height: 180,
                            //   width: screenSize(context).width,
                            //   child: Stack(
                            //     children: [
                            //       Container(
                            //         height: 140,
                            //         width: screenSize(context).width,
                            //         decoration: const BoxDecoration(
                            //             image: DecorationImage(
                            //                 image:
                            //                     AssetImage("assets/banner.png"),
                            //                 fit: BoxFit.cover)),
                            //       ),
                            //       Positioned(
                            //           left: 12,
                            //           top: 100,
                            //           child: Container(
                            //             height: 80,
                            //             width: 80,
                            //             decoration: BoxDecoration(
                            //                 shape: BoxShape.circle,
                            //                 color: AppColor.primaryColor
                            //                     .withOpacity(0.1),
                            //                 image: const DecorationImage(
                            //                     image: AssetImage(
                            //                         AppAssets.appLogo),
                            //                     fit: BoxFit.cover)),
                            //           ))
                            //     ],
                            //   ),
                            // ),

                            // const SizedBox(height: 20),
                            // Padding(
                            //   padding: const EdgeInsets.symmetric(
                            //       horizontal: 12.0, vertical: 10),
                            //   child: Text(
                            //     "Property Listings",
                            //     style: TextStyle(
                            //         fontSize: AppTextSize.headerSize - 1,
                            //         fontFamily: AppFonts.semiBold),
                            //   ),
                            // ),
                            ListView.builder(
                                shrinkWrap: true,
                                scrollDirection: Axis.vertical,
                                physics: const BouncingScrollPhysics(),
                                itemCount: data.brokerProperties.length,
                                itemBuilder: (ctx, index) {
                                  return ListViewWidget(
                                    id: data.brokerProperties[index].id,
                                    propertyName:
                                        data.brokerProperties[index].name,
                                    price: data.brokerProperties[index].price,
                                    bedroom: data.brokerProperties[index]
                                        .details.bedroom,
                                    bathroom: data.brokerProperties[index]
                                        .details.bathroom,
                                    area: data
                                        .brokerProperties[index].details.area,
                                    address: data
                                        .brokerProperties[index].address.city,
                                    type: data
                                        .brokerProperties[index].propertyType,
                                    imgUrl: data
                                        .brokerProperties[index].images[0].url,
                                  );
                                })
                          ],
                        ),
                      );
                    });
                  }
                }
              })),
    );
  }
}
