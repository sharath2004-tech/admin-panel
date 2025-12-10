import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:provider/provider.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:real_estate/controllers/dark_mode.dart';
import 'package:real_estate/controllers/properties.dart';
import 'package:basic_utils/basic_utils.dart' as bu;
import '../../../const/app.dart';
import '../../../widgets/list_view.dart';
import '../../no_property.dart';

class FilteredPropertiesScreen extends StatefulWidget {
  final String lookingFor;
  final String propType;
  final String owner;
  final dynamic minPrice;
  final dynamic maxPrice;
  final int bath;
  final int bed;
  final int area;

  const FilteredPropertiesScreen(
      {super.key,
      required this.lookingFor,
      required this.propType,
      required this.owner,
      required this.minPrice,
      required this.maxPrice,
      required this.bath,
      required this.bed,
      required this.area});

  @override
  State<FilteredPropertiesScreen> createState() =>
      _FilteredPropertiesScreenState();
}

class _FilteredPropertiesScreenState extends State<FilteredPropertiesScreen> {
  bool _isInit = true;
  int currentPage = 1;

  // int sortBy = 0;

  final RefreshController _refreshController = RefreshController();
  late Future _data;

  @override
  void didChangeDependencies() {
    if (_isInit) {
      Provider.of<PropertiesProvider>(context, listen: false).clearFiltered();
      _data = Provider.of<PropertiesProvider>(context, listen: false)
          .filterProperties(
              page: currentPage,
              lookingFor: widget.lookingFor,
              propType: widget.propType,
              owner: widget.owner,
              minPrice: widget.minPrice,
              maxPrice: widget.maxPrice,
              bath: widget.bath,
              bed: widget.bed,
              area: widget.area);
      _isInit = false;
    }

    super.didChangeDependencies();
  }

  Future _onLoading() async {
    if (Provider.of<PropertiesProvider>(context, listen: false)
        .filterProps
        .isNotEmpty) {
      if (currentPage <
          Provider.of<PropertiesProvider>(context, listen: false).totalPage) {
        try {
          await Provider.of<PropertiesProvider>(context, listen: false)
              .filterProperties(
                  page: ++currentPage,
                  lookingFor: widget.lookingFor,
                  propType: widget.propType,
                  owner: widget.owner,
                  minPrice: widget.minPrice,
                  maxPrice: widget.maxPrice,
                  bath: widget.bath,
                  bed: widget.bed,
                  area: widget.area)
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
          bu.StringUtils.capitalize("Filtered Properties"),
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
                  return Padding(
                    padding:
                        EdgeInsets.only(top: screenSize(context).height * 0.36),
                    child: Provider.of<DarkModeProvider>(context, listen: false)
                            .isDarkMode
                        ? Center(
                            child: Transform.scale(
                                scale: 0.7,
                                child:
                                    const CircularProgressIndicator.adaptive()))
                        : Lottie.asset('assets/searching.json'),
                  );
                } else if (snapshot.hasError) {
                  return const Center(child: Text("Has Error"));
                } else {
                  return Consumer<PropertiesProvider>(
                    builder: (context, value, _) {
                      if (value.filterProps.isEmpty) {
                        return Padding(
                            padding: EdgeInsets.only(
                                top: screenSize(context).height * 0.31),
                            child: const NoPropertyFound(
                                text: "No Properties Found."));
                      }

                      return Column(
                        children: [
                          ListView.builder(
                              shrinkWrap: true,
                              scrollDirection: Axis.vertical,
                              padding: const EdgeInsets.only(top: 5),
                              physics: const BouncingScrollPhysics(),
                              itemCount: value.filterProps.length,
                              itemBuilder: (ctx, index) {
                                return ListViewWidget(
                                  id: value.filterProps[index].id,
                                  propertyName: value.filterProps[index].name,
                                  price: value.filterProps[index].price,
                                  bedroom:
                                      value.filterProps[index].details.bedroom,
                                  bathroom:
                                      value.filterProps[index].details.bathroom,
                                  area: value.filterProps[index].details.area,
                                  address:
                                      value.filterProps[index].address.city,
                                  type: value.filterProps[index].propertyType,
                                  imgUrl:
                                      value.filterProps[index].images[0].url,
                                );
                              }),
                          const SizedBox(height: 10),
                          //
                          //Properties By Type
                          //
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
}
