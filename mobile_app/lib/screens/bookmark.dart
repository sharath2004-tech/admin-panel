import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/screens/no_property.dart';
import '../controllers/bookmark.dart';
import '../widgets/list_view.dart';

import '../const/app.dart';
import '../controllers/auth.dart';

class BookmarkScreen extends StatefulWidget {
  const BookmarkScreen({super.key});

  @override
  State<BookmarkScreen> createState() => _BookmarkScreenState();
}

class _BookmarkScreenState extends State<BookmarkScreen> {
  late Future favouriteData;
  bool isInit = true;

  @override
  void didChangeDependencies() {
    if (isInit) {
      Provider.of<AuthProvider>(context, listen: false).userId != null
          ? favouriteData =
              Provider.of<BookmarkProvider>(context, listen: false)
                  .getFavouriteProperties(
                      userID: Provider.of<AuthProvider>(context, listen: false)
                          .userId!)
          : null;
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
        title: Text(
          "Bookmark",
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
      ),
      body: SafeArea(
          child: Provider.of<AuthProvider>(context, listen: false).userId ==
                  null
              ? const Center(
                  child: NoPropertyFound(text: "You Are Not Loged In"))
              : Provider.of<BookmarkProvider>(context)
                      .favouritePropertyData
                      .isNotEmpty
                  ? const BookmarkPropertiesWidget()
                  : FutureBuilder(
                      future: favouriteData,
                      builder: (context, snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return Center(
                              child: Transform.scale(
                            scale: 0.7,
                            child: const CircularProgressIndicator.adaptive(),
                          ));
                        } else if (snapshot.hasError) {
                          return const Center(child: Text("Try Again"));
                        } else {
                          return const BookmarkPropertiesWidget();
                        }
                      },
                    )),
    );
  }
}

class BookmarkPropertiesWidget extends StatelessWidget {
  const BookmarkPropertiesWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<BookmarkProvider>(builder: (context, data, _) {
      if (data.favouritePropertyData.isEmpty) {
        return const Center(
            child: NoPropertyFound(text: "No Bookmarked Properties"));
      } else {
        return ListView.builder(
            shrinkWrap: true,
            scrollDirection: Axis.vertical,
            padding: const EdgeInsets.only(top: 5),
            physics: const BouncingScrollPhysics(),
            itemCount: data.favouritePropertyData.length,
            itemBuilder: (ctx, index) {
              return ListViewWidget(
                id: data.favouritePropertyData[index].id,
                propertyName: data.favouritePropertyData[index].name,
                price: data.favouritePropertyData[index].price,
                bedroom: data.favouritePropertyData[index].details.bedroom,
                bathroom: data.favouritePropertyData[index].details.bathroom,
                area: data.favouritePropertyData[index].details.area,
                address: data.favouritePropertyData[index].address.city,
                type: data.favouritePropertyData[index].propertyType,
                imgUrl: data.favouritePropertyData[index].images[0].url,
              );
            });
      }
    });
  }
}
