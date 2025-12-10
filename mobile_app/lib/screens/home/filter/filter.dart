import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/const/route.dart';
import 'package:real_estate/controllers/dark_mode.dart';
import 'package:real_estate/controllers/owners.dart';
import 'package:real_estate/utils/toast.dart';
import 'package:real_estate/widgets/home/filter/bed_bath.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';
import 'package:basic_utils/basic_utils.dart' as bu;
import '../../../const/app.dart';
import '../../../const/setting.dart';
import '../../../controllers/properties.dart';

class FilterScreen extends StatefulWidget {
  const FilterScreen({super.key});

  @override
  State<FilterScreen> createState() => _FilterScreenState();
}

class _FilterScreenState extends State<FilterScreen> {
  int? selectedPropertyTypeindex;
  int? selectedOwnerindex;
  String? selectedPropertyType;
  String? selectedOwner;
  String selectedLookingFor = "Rent";
  SfRangeValues _priceRange = const SfRangeValues(3000000.0, 15000000.0);

  int bed = 1;
  int bath = 1;
  int area = 50;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 1.0,
        centerTitle: true,
        automaticallyImplyLeading: false,
        title: Text(
          "Filter",
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
        leading: GestureDetector(
          onTap: () => Navigator.pop(context),
          child: const Icon(
            Icons.close,
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: GestureDetector(
                onTap: () {
                  setState(() {
                    selectedPropertyTypeindex = null;
                    selectedPropertyType = null;
                    selectedOwnerindex = null;
                    selectedOwner = null;
                    selectedLookingFor = "Rent";
                    _priceRange = const SfRangeValues(3000000, 15000000);

                    bed = 1;
                    bath = 1;
                    area = 50;
                  });
                },
                child: Align(
                  alignment: Alignment.center,
                  child: Text(
                    "Reset",
                    style: TextStyle(
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.semiBold),
                  ),
                )),
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            //
            //
            //
            const SizedBox(height: 30),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  //
                  //
                  //
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Looking For",
                        style: TextStyle(
                            fontSize: AppTextSize.headerSize - 1,
                            fontFamily: AppFonts.semiBold),
                      ),
                      Text(
                        "Choose Buy or Sale",
                        style: TextStyle(
                            fontSize: AppTextSize.subTextSize,
                            fontFamily: AppFonts.regular,
                            color: AppColor.grey.withOpacity(.75)),
                      )
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            selectedLookingFor = "Rent";
                          });
                        },
                        child: Container(
                          height: 38.0,
                          width: 90,
                          alignment: Alignment.center,
                          decoration: selectedLookingFor == "Rent"
                              ? BoxDecoration(
                                  borderRadius: BorderRadius.circular(8.0),
                                  color: AppColor.primaryColor)
                              : BoxDecoration(
                                  borderRadius: BorderRadius.circular(8.0),
                                  border: Border.all(
                                      color: AppColor.grey.withOpacity(0.3))),
                          child: Text(
                            "Rent",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                fontSize: 13.5,
                                color: Provider.of<DarkModeProvider>(context)
                                        .isDarkMode
                                    ? Colors.white
                                    : selectedLookingFor == "Rent"
                                        ? Colors.white
                                        : Colors.black,
                                fontFamily: AppFonts.semiBold),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            selectedLookingFor = "Sale";
                          });
                        },
                        child: Container(
                          height: 36,
                          width: 90,
                          alignment: Alignment.center,
                          decoration: selectedLookingFor == "Sale"
                              ? BoxDecoration(
                                  borderRadius: BorderRadius.circular(8.0),
                                  color: AppColor.primaryColor)
                              : BoxDecoration(
                                  borderRadius: BorderRadius.circular(8.0),
                                  border: Border.all(
                                      color: AppColor.grey.withOpacity(0.3))),
                          child: Text(
                            "Sale",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                fontSize: 13.5,
                                color: Provider.of<DarkModeProvider>(context)
                                        .isDarkMode
                                    ? Colors.white
                                    : selectedLookingFor == "Sale"
                                        ? Colors.white
                                        : Colors.black,
                                fontFamily: AppFonts.semiBold),
                          ),
                        ),
                      )
                    ],
                  )
                ],
              ),
            ),

            const SizedBox(height: 20),
            header("Property Type"),
            const SizedBox(height: 15),
            Consumer<PropertiesProvider>(
              builder: (context, value, _) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                  child: GridView.builder(
                    shrinkWrap: true,
                    itemCount: value.propertType.length,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                            childAspectRatio: 2.4,
                            crossAxisCount: 4,
                            mainAxisSpacing: 8,
                            crossAxisSpacing: 8),
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          setState(() {
                            selectedPropertyTypeindex = index;
                            selectedPropertyType = value.propertType[index].id;
                          });
                        },
                        child: Container(
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(8.0),
                              border: selectedPropertyTypeindex == index
                                  ? Border.all(
                                      color: AppColor.primaryColor, width: 2)
                                  : Border.all(
                                      color: AppColor.grey.withOpacity(0.3))),
                          child: Center(
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 8.0),
                              child: Text(
                                  bu.StringUtils.capitalize(
                                      value.propertType[index].name,
                                      allWords: true),
                                  maxLines: 1,
                                  style: selectedPropertyTypeindex == index
                                      ? TextStyle(
                                          color: AppColor.primaryColor,
                                          fontSize: AppTextSize.titleSize - 1,
                                          overflow: TextOverflow.ellipsis,
                                          fontFamily: AppFonts.semiBold)
                                      : TextStyle(
                                          fontSize: AppTextSize.titleSize - 1,
                                          overflow: TextOverflow.ellipsis,
                                          fontFamily: AppFonts.medium)),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
            //
            //
            //
            Consumer<OwnersProvider>(
              builder: (context, value, _) {
                if (value.owners.isEmpty) {
                  return Container();
                } else {
                  return Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 20),
                        header("Owner"),
                        const SizedBox(height: 15),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 12.0),
                          child: GridView.builder(
                            shrinkWrap: true,
                            itemCount: value.owners.length,
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate:
                                const SliverGridDelegateWithFixedCrossAxisCount(
                                    childAspectRatio: 3,
                                    crossAxisCount: 3,
                                    mainAxisSpacing: 8,
                                    crossAxisSpacing: 8),
                            itemBuilder: (context, index) {
                              return GestureDetector(
                                onTap: () {
                                  setState(() {
                                    selectedOwnerindex = index;
                                    selectedOwner = value.owners[index].id;
                                  });
                                },
                                child: Container(
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(8.0),
                                      border: selectedOwnerindex == index
                                          ? Border.all(
                                              color: AppColor.primaryColor,
                                              width: 2)
                                          : Border.all(
                                              color: AppColor.grey
                                                  .withOpacity(0.3))),
                                  child: Center(
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 8.0),
                                      child: Text(
                                          bu.StringUtils.capitalize(
                                              value.owners[index].name,
                                              allWords: true),
                                          maxLines: 1,
                                          style: selectedOwnerindex == index
                                              ? TextStyle(
                                                  color: AppColor.primaryColor,
                                                  fontSize:
                                                      AppTextSize.titleSize - 1,
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  fontFamily: AppFonts.semiBold)
                                              : TextStyle(
                                                  fontSize:
                                                      AppTextSize.titleSize - 1,
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  fontFamily: AppFonts.medium)),
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ]);
                }
              },
            ),
            //
            //
            //
            const SizedBox(height: 20),
            header("Price Range"),
            const SizedBox(height: 15),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(priceFormat.format(_priceRange.start),
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize,
                            color: AppColor.grey,
                            fontFamily: AppFonts.medium)),
                    Text(priceFormat.format(_priceRange.end),
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize,
                            color: AppColor.grey,
                            fontFamily: AppFonts.medium)),
                  ]),
            ),
            SfRangeSlider(
                values: _priceRange,
                min: 0,
                max: 30000000,
                showLabels: false,
                showTicks: true,
                enableTooltip: false,
                stepSize: 1000000,
                activeColor: AppColor.primaryColor,
                tooltipTextFormatterCallback:
                    (dynamic actualValue, String formattedText) {
                  return actualValue.toStringAsFixed(0);
                },
                onChanged: (dynamic newValue) {
                  setState(() {
                    _priceRange = newValue;
                  });
                }),

            //
            //
            //
            const SizedBox(height: 30),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  //
                  //
                  //
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Bedroom",
                        style: TextStyle(
                          fontSize: AppTextSize.headerSize - 1,
                          fontFamily: AppFonts.semiBold,
                        ),
                      ),
                      Text(
                        "Amount of bedroom",
                        style: TextStyle(
                            fontSize: AppTextSize.subTextSize,
                            fontFamily: AppFonts.regular,
                            color: AppColor.grey.withOpacity(.75)),
                      )
                    ],
                  ),
                  BedBathFilterWidget(
                    value: bed.toString(),
                    onPressedminus: () {
                      setState(() {
                        if (bed == 1) {
                        } else if (bed <= 6) {
                          bed -= 1;
                        }
                      });
                    },
                    onPressedplus: () {
                      setState(() {
                        if (bed == 6) {
                        } else if (bed >= 1) {
                          bed += 1;
                        }
                      });
                    },
                  ),
                ],
              ),
            ),

            //
            //
            //
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  //
                  //
                  //
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Bathroom",
                        style: TextStyle(
                          fontSize: AppTextSize.headerSize - 1,
                          fontFamily: AppFonts.semiBold,
                        ),
                      ),
                      Text(
                        "Amount of bathroom",
                        style: TextStyle(
                            fontSize: AppTextSize.subTextSize,
                            fontFamily: AppFonts.regular,
                            color: AppColor.grey.withOpacity(.75)),
                      )
                    ],
                  ),
                  BedBathFilterWidget(
                    value: bath.toString(),
                    onPressedminus: () {
                      setState(() {
                        if (bath == 1) {
                        } else if (bath <= 6) {
                          bath -= 1;
                        }
                      });
                    },
                    onPressedplus: () {
                      setState(() {
                        if (bath == 6) {
                        } else if (bath >= 1) {
                          bath += 1;
                        }
                      });
                    },
                  ),
                ],
              ),
            ),
            //
            //
            //
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  //
                  //
                  //
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Area",
                        style: TextStyle(
                          fontSize: AppTextSize.headerSize - 1,
                          fontFamily: AppFonts.semiBold,
                        ),
                      ),
                      Text(
                        "Area Size(Sqft)",
                        style: TextStyle(
                            fontSize: AppTextSize.subTextSize,
                            fontFamily: AppFonts.regular,
                            color: AppColor.grey.withOpacity(.75)),
                      )
                    ],
                  ),
                  BedBathFilterWidget(
                    value: area.toString(),
                    onPressedminus: () {
                      setState(() {
                        if (area == 50) {
                        } else if (area == 100) {
                          area -= 50;
                        } else if (area <= 1000) {
                          area -= 100;
                        } else if (area <= 2000) {
                          area -= 250;
                        }
                      });
                    },
                    onPressedplus: () {
                      setState(() {
                        if (area == 2000) {
                        } else if (area >= 1000) {
                          area += 250;
                        } else if (area == 50) {
                          area += 50;
                        } else if (area >= 100) {
                          area += 100;
                        }
                      });
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),

            Center(
              child: GestureDetector(
                onTap: () {
                  if (selectedPropertyType == null) {
                    showErrorResponse(
                        context: context,
                        message: "Property Type not Selected");
                  } else if (selectedOwner == null) {
                    showErrorResponse(
                        context: context,
                        message: "Property Owners not Selected");
                  } else {
                    Navigator.of(context)
                        .pushNamed(AppRoutes.filteredProps, arguments: [
                      selectedLookingFor.toLowerCase(),
                      selectedPropertyType,
                      selectedOwner,
                      _priceRange.start,
                      _priceRange.end,
                      bath,
                      bed,
                      area
                    ]);
                  }
                },
                child: Container(
                  height: 46,
                  width: screenSize(context).width - 24,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.0),
                      color: AppColor.primaryColor),
                  child: Text(
                    "Filter",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: AppTextSize.headerSize,
                        fontFamily: AppFonts.bold),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }

//
//
//

  // void selectedBedRoom(ENUMbedRoom num) {
  //   if (num == ENUMbedRoom.one) {
  //     if (FilterBedRoomColors.firstPropertTypeColor ==
  //         FilterBedRoomColors.selectedColor) {
  //     } else {
  //       setState(() {
  //         _bedRoomValue.text = "1";
  //         FilterBedRoomColors.firstPropertTypeColor =
  //             FilterBedRoomColors.selectedColor;
  //         FilterBedRoomColors.anyPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //         FilterBedRoomColors.secondPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //         FilterBedRoomColors.thirdPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //       });
  //     }
  //   } else if (num == ENUMbedRoom.two) {
  //     if (FilterBedRoomColors.secondPropertTypeColor ==
  //         FilterBedRoomColors.selectedColor) {
  //     } else {
  //       setState(() {
  //         _bedRoomValue.text = "2";
  //         FilterBedRoomColors.secondPropertTypeColor =
  //             FilterBedRoomColors.selectedColor;
  //         FilterBedRoomColors.anyPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //         FilterBedRoomColors.firstPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //         FilterBedRoomColors.thirdPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //       });
  //     }
  //   } else {
  //     if (FilterBedRoomColors.thirdPropertTypeColor ==
  //         FilterBedRoomColors.selectedColor) {
  //     } else {
  //       setState(() {
  //         _bedRoomValue.text = "3";
  //         FilterBedRoomColors.thirdPropertTypeColor =
  //             FilterBedRoomColors.selectedColor;
  //         FilterBedRoomColors.anyPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //         FilterBedRoomColors.firstPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //         FilterBedRoomColors.secondPropertTypeColor =
  //             FilterBedRoomColors.unselectedColors;
  //       });
  //     }
  //   }
  // }

  // void selectedBathRoom(ENUMbathRoom num) {
  //   if (num == ENUMbathRoom.one) {
  //     if (FilterBathRoomColors.firstPropertTypeColor ==
  //         FilterBathRoomColors.selectedColor) {
  //     } else {
  //       setState(() {
  //         _bathRoomValue.text = "1";
  //         FilterBathRoomColors.firstPropertTypeColor =
  //             FilterBathRoomColors.selectedColor;
  //         FilterBathRoomColors.anyPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //         FilterBathRoomColors.secondPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //         FilterBathRoomColors.thirdPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //       });
  //     }
  //   } else if (num == ENUMbathRoom.two) {
  //     if (FilterBathRoomColors.secondPropertTypeColor ==
  //         FilterBathRoomColors.selectedColor) {
  //     } else {
  //       setState(() {
  //         _bathRoomValue.text = "2";
  //         FilterBathRoomColors.secondPropertTypeColor =
  //             FilterBathRoomColors.selectedColor;
  //         FilterBathRoomColors.anyPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //         FilterBathRoomColors.firstPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //         FilterBathRoomColors.thirdPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //       });
  //     }
  //   } else {
  //     if (FilterBathRoomColors.thirdPropertTypeColor ==
  //         FilterBathRoomColors.selectedColor) {
  //     } else {
  //       setState(() {
  //         _bathRoomValue.text = "3";
  //         FilterBathRoomColors.thirdPropertTypeColor =
  //             FilterBathRoomColors.selectedColor;
  //         FilterBathRoomColors.anyPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //         FilterBathRoomColors.firstPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //         FilterBathRoomColors.secondPropertTypeColor =
  //             FilterBathRoomColors.unselectedColors;
  //       });
  //     }
  //   }
  // }
}
