import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:real_estate/controllers/properties.dart';
import 'package:basic_utils/basic_utils.dart' as bu;
import '../../../const/app.dart';
import '../../../const/setting.dart';
import '../../../controllers/dark_mode.dart';
import '../../../widgets/list_view.dart';

class ViewAllRecentProperties extends StatefulWidget {
  final String name;
  const ViewAllRecentProperties({super.key, required this.name});

  @override
  State<ViewAllRecentProperties> createState() =>
      _ViewAllRecentPropertiesState();
}

class _ViewAllRecentPropertiesState extends State<ViewAllRecentProperties> {
  bool _isInit = true;
  int currentPage = 1;

  int sortBy = 0;

  final RefreshController _refreshController = RefreshController();
  late Future _data;

  @override
  void didChangeDependencies() {
    if (_isInit) {
      Provider.of<PropertiesProvider>(context, listen: false)
          .clearRecentListings();
      _data = Provider.of<PropertiesProvider>(context, listen: false)
          .getRecentListings(page: currentPage, isFromHome: false);
      _isInit = false;
    }

    super.didChangeDependencies();
  }

  Future _onLoading() async {
    if (Provider.of<PropertiesProvider>(context, listen: false)
        .recentListings
        .isNotEmpty) {
      if (currentPage <
          Provider.of<PropertiesProvider>(context, listen: false).totalPage) {
        try {
          await Provider.of<PropertiesProvider>(context, listen: false)
              .getRecentListings(page: ++currentPage, isFromHome: false)
              .then((_) {
            _refreshController.loadComplete();
          });
        } catch (_) {
          _refreshController.loadFailed();
        }
      } else {
        _refreshController.loadNoData();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 50,
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
      body: SmartRefresher(
        enablePullUp: true,
        enablePullDown: false,
        controller: _refreshController,
        onLoading: _onLoading,
        child: SafeArea(
          child: SingleChildScrollView(
            child: FutureBuilder(
              future: _data,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(
                              child: Transform.scale(
                            scale: 0.7,
                            child: const CircularProgressIndicator.adaptive(),
                          ));  } else if (snapshot.hasError) {
                  return const Center(child: Text("Has Error"));
                } else {
                  return Consumer<PropertiesProvider>(
                    builder: (context, value, _) {
                      if (value.recentListings.isEmpty) {
                        return const Center(child: Text("No Properties"));
                      }
                      sortBy == 0 ? value.sortByPopular(false, true) : null;
                      sortBy == 1 ? value.sortByNewest(false, true) : null;
                      sortBy == 2 ? value.sortByPriceLowest(false, true) : null;
                      sortBy == 3
                          ? value.sortByPriceHighest(false, true)
                          : null;
                      return Column(
                        children: [
                          SizedBox(
                            height: 50,
                            width: screenSize(context).width,
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 12.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  // Text(value.totalProperties.toString()),
                                  //
                                  //Sort
                                  //
                                  GestureDetector(
                                    onTap: () => sortProperty(
                                        context: context, setSortBy: sortBy),
                                    child: Container(
                                      height: 40,
                                      width: 80,
                                      decoration: BoxDecoration(
                                          color: Provider.of<DarkModeProvider>(
                                                      context)
                                                  .isDarkMode
                                              ? AppColor.primaryColor
                                                  .withOpacity(0.1)
                                              : Colors.white,
                                          borderRadius:
                                              BorderRadius.circular(10.0),
                                          boxShadow:
                                              Provider.of<DarkModeProvider>(
                                                          context)
                                                      .isDarkMode
                                                  ? null
                                                  : customBoxShadow()),
                                      child: Padding(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 5.0),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.center,
                                          children: [
                                            const Icon(Icons.sort,
                                                size: 20,
                                                color: AppColor.primaryColor),
                                            const SizedBox(width: 5),
                                            Text(
                                              "Sort",
                                              style: TextStyle(
                                                  fontSize:
                                                      AppTextSize.titleSize - 1,
                                                  fontFamily:
                                                      AppFonts.semiBold),
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 10),
                          //
                          //Properties By Type
                          //
                          ListView.builder(
                              shrinkWrap: true,
                              scrollDirection: Axis.vertical,
                              padding: const EdgeInsets.only(top: 5),
                              physics: const BouncingScrollPhysics(),
                              itemCount: value.recentListings.length,
                              itemBuilder: (ctx, index) {
                                return ListViewWidget(
                                  id: value.recentListings[index].id,
                                  propertyName:
                                      value.recentListings[index].name,
                                  price: value.recentListings[index].price,
                                  bedroom: value
                                      .recentListings[index].details.bedroom,
                                  bathroom: value
                                      .recentListings[index].details.bathroom,
                                  area:
                                      value.recentListings[index].details.area,
                                  address:
                                      value.recentListings[index].address.city,
                                  type:
                                      value.recentListings[index].propertyType,
                                  imgUrl:
                                      value.recentListings[index].images[0].url,
                                );
                              }),
                        ],
                      );
                    },
                  );
                }
              },
            ),
          ),
        ),
      ),
    );
  }

  void sortProperty({
    required BuildContext context,
    required int setSortBy,
  }) {
    showModalBottomSheet(
      backgroundColor: Colors.transparent,
      context: context,
      builder: (context) {
        return Container(
          padding: const EdgeInsets.only(top: 15, bottom: 5),
          decoration: BoxDecoration(
              color: Provider.of<DarkModeProvider>(context).isDarkMode
                  ? AppColor.darkModeColor
                  : Colors.white,
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(16))),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Center(
                child: Container(
                  height: 7,
                  width: 40,
                  decoration: BoxDecoration(
                      color: AppColor.grey,
                      borderRadius: BorderRadius.circular(15.0)),
                ),
              ),
              const SizedBox(height: 20),
              ...List.generate(sortChoices.length, (index) {
                return Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12.0, vertical: 5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        sortChoices[index],
                        GestureDetector(
                            onTap: () {
                              setState(() {
                                sortBy = index;
                              });
                              Navigator.pop(context);
                            },
                            child: sortBy == index
                                ? Container(
                                    width: 18.0,
                                    height: 18.0,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      border: Border.all(
                                        color: AppColor.primaryColor,
                                        width: 4.0,
                                      ),
                                    ),
                                  )
                                : Container(
                                    width: 16.0,
                                    height: 16.0,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      border: Border.all(
                                          color: Provider.of<DarkModeProvider>(
                                                      context)
                                                  .isDarkMode
                                              ? Colors.white
                                              : Colors.black),
                                    ),
                                  ))
                      ]),
                );
              })
            ],
          ),
        );
      },
    );
  }
}
