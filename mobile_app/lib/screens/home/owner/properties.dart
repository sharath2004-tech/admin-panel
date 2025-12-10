import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../const/app.dart';
import '../../../controllers/owners.dart';
import '../../../widgets/list_view.dart';

class OwnerPropertiesScreen extends StatefulWidget {
  final String ownerID;
  final String ownerName;

  const OwnerPropertiesScreen({
    super.key,
    required this.ownerID,
    required this.ownerName,
  });

  @override
  State<OwnerPropertiesScreen> createState() => _OwnerPropertiesScreenState();
}

class _OwnerPropertiesScreenState extends State<OwnerPropertiesScreen> {
  late Future ownerData;

  @override
  void didChangeDependencies() {
    ownerData = Provider.of<OwnersProvider>(context, listen: false)
        .getOwnersProperties(ownerID: widget.ownerID);
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
          icon: const Icon(Icons.arrow_back_ios, size: 20, color: Colors.black),
        ),
        title: Text(
          widget.ownerName,
          style: TextStyle(
            color: Colors.black,
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
      ),
      body: FutureBuilder(
          future: ownerData,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(), // Show loading indicator
              );
            } else {
              if (snapshot.hasError) {
                return Center(
                  child: Text("Error: ${snapshot.error}"), // Show error message
                );
              } else {
                return Consumer<OwnersProvider>(builder: (context, value, _) {
                  if (value.ownersProperties.isEmpty) {
                    return const Center(
                      child: Text(
                        "No Data",
                        textAlign: TextAlign.center,
                      ),
                    );
                  } else {
                    return ListView.builder(
                        shrinkWrap: true,
                        scrollDirection: Axis.vertical,
                        padding: const EdgeInsets.only(top: 10),
                        physics: const BouncingScrollPhysics(),
                        itemCount: value.ownersProperties.length,
                        itemBuilder: (ctx, index) {
                          return ListViewWidget(
                            id: value.ownersProperties[index].id,
                            propertyName: value.ownersProperties[index].name,
                            price: value.ownersProperties[index].price,
                            bedroom:
                                value.ownersProperties[index].details.bedroom,
                            bathroom:
                                value.ownersProperties[index].details.bathroom,
                            area: value.ownersProperties[index].details.area,
                            address: value.ownersProperties[index].address.city,
                            type: value.ownersProperties[index].propertyType,
                            imgUrl: value.ownersProperties[index].images[0].url,
                          );
                        });
                  }
                });
              }
            }
          }),
    );
  }
}


/*


SingleChildScrollView(
        child: Consumer<OwnersProvider>(
          builder: (context, value, _) {
            return Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // value.ownersProperties.isEmpty
                  //     ? Container()
                  //     : Padding(
                  //         padding: const EdgeInsets.symmetric(
                  //             horizontal: 12.0, vertical: 10),
                  //         child: Row(
                  //           mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  //           children: [
                  //             _filterByPrice
                  //                 ? GestureDetector(
                  //                     onTap: () => setState(() {
                  //                       _filterByPrice = !_filterByPrice;
                  //                     }),
                  //                     child: Container(
                  //                       height: 32,
                  //                       width: 120,
                  //                       alignment: Alignment.center,
                  //                       decoration: BoxDecoration(
                  //                         color: Colors.black,
                  //                         borderRadius:
                  //                             BorderRadius.circular(10),
                  //                       ),
                  //                       child: Text(
                  //                         "Filter by price",
                  //                         style: TextStyle(
                  //                             fontSize: AppTextSize.titleSize,
                  //                             color: Colors.white,
                  //                             fontFamily: AppFonts.medium),
                  //                       ),
                  //                     ),
                  //                   )
                  //                 : GestureDetector(
                  //                     onTap: () => setState(() {
                  //                       _filterByPrice = !_filterByPrice;
                  //                     }),
                  //                     child: Container(
                  //                       height: 32,
                  //                       width: 120,
                  //                       alignment: Alignment.center,
                  //                       decoration: BoxDecoration(
                  //                         color: Colors.grey.shade300,
                  //                         borderRadius:
                  //                             BorderRadius.circular(10),
                  //                       ),
                  //                       child: Text(
                  //                         "Filter by price",
                  //                         style: TextStyle(
                  //                             fontSize: AppTextSize.titleSize,
                  //                             color: Colors.black,
                  //                             fontFamily: AppFonts.medium),
                  //                       ),
                  //                     ),
                  //                   ),
                  //             _isListView
                  //                 ? GestureDetector(
                  //                     onTap: () => setState(() {
                  //                       _isListView = false;
                  //                     }),
                  //                     child: const Icon(
                  //                       Icons.grid_view_sharp,
                  //                       size: 25,
                  //                     ),
                  //                   )
                  //                 : GestureDetector(
                  //                     onTap: () => setState(() {
                  //                       _isListView = true;
                  //                     }),
                  //                     child: const Icon(
                  //                       Icons.menu,
                  //                       size: 28,
                  //                     ),
                  //                   )
                  //           ],
                  //         ),
                  //       ),
                  FutureBuilder(
                    future: ownerData,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Container(
                          height: (screenSize(context).height) - 56,
                          child: const Center(
                            child:
                                CircularProgressIndicator(), // Show loading indicator
                          ),
                        );
                      } else {
                        if (snapshot.hasError) {
                          return Center(
                            child: Text(
                                "Error: ${snapshot.error}"), // Show error message
                          );
                        } else {
                          if (value.ownersProperties.isEmpty) {
                            return Container(
                              alignment: Alignment.center,
                              height: (screenSize(context).height) - 56,
                              child: const Text(
                                "No Data",
                                textAlign: TextAlign.center,
                              ),
                            );
                          } else {
                            return _isListView
                                ? ListView.builder(
                                    shrinkWrap: true,
                                    scrollDirection: Axis.vertical,
                                    padding: const EdgeInsets.only(top: 13),
                                    physics: const ScrollPhysics(),
                                    itemCount: value.ownersProperties.length,
                                    itemBuilder: (ctx, index) {
                                      return ListViewWidget(
                                        id: value.ownersProperties[index].id,
                                        propertyName:
                                            value.ownersProperties[index].name,
                                        price:
                                            value.ownersProperties[index].price,
                                        bedroom: value.ownersProperties[index]
                                            .details.bedroom,
                                        bathroom: value.ownersProperties[index]
                                            .details.bathroom,
                                        area: value.ownersProperties[index]
                                            .details.area,
                                        address: value.ownersProperties[index]
                                            .address.city,
                                        type: value.ownersProperties[index]
                                            .propertyType,
                                        imgUrl: value.ownersProperties[index]
                                            .images[index].url,
                                      );
                                    })
                                : GridView.builder(
                                    shrinkWrap: true,
                                    itemCount: value.ownersProperties.length,
                                    physics: const BouncingScrollPhysics(),
                                    scrollDirection: Axis.vertical,
                                    padding: const EdgeInsets.only(
                                        left: 12, right: 12, top: 10.0),
                                    gridDelegate:
                                        SliverGridDelegateWithMaxCrossAxisExtent(
                                      childAspectRatio: 0.96,
                                      maxCrossAxisExtent:
                                          screenSize(context).width * 0.5,
                                      mainAxisSpacing:
                                          screenSize(context).width * 0.02,
                                      crossAxisSpacing:
                                          screenSize(context).width * 0.02,
                                    ),
                                    itemBuilder: (ctx, index) {
                                      return GridViewWidget(
                                        id: value.ownersProperties[index].id,
                                        propertyName:
                                            value.ownersProperties[index].name,
                                        bedroom: value.ownersProperties[index]
                                            .details.bedroom,
                                        bathroom: value.ownersProperties[index]
                                            .details.bathroom,
                                        area: value.ownersProperties[index]
                                            .details.area,
                                        address: value.ownersProperties[index]
                                            .address.city,
                                        type: value.ownersProperties[index]
                                            .propertyType,
                                        imgUrl: value.ownersProperties[index]
                                            .images[0].url,
                                      );
                                    });
                          }
                        }
                      }
                    },
                  ),
                ]);
          },
        ),
      ),



 */