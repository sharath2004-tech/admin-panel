// ignore_for_file: must_be_immutable

import 'package:cached_network_image/cached_network_image.dart';

import 'package:flutter/material.dart';
import 'package:photo_view/photo_view.dart';
import 'package:photo_view/photo_view_gallery.dart';
import 'package:provider/provider.dart';

import '../const/setting.dart';
import '../controllers/dark_mode.dart';
import '../model/property_detail.dart';

class ShowMoreFullImageScreen extends StatelessWidget {
  final PageController pageController;
  List<ImageModel> images;
  int indexx;
  ShowMoreFullImageScreen(
      {super.key, required this.images, required this.indexx})
      : pageController = PageController(initialPage: indexx);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: AppColor.lightBackground,
      appBar: AppBar(
        backgroundColor: Provider.of<DarkModeProvider>(context).isDarkMode
            ? AppColor.darkModeColor
            : AppColor.lightBackground,
        elevation: 0.0,
        leading: GestureDetector(
          onTap: () => Navigator.pop(context),
          child: const Icon(Icons.arrow_back_ios, size: 20),
        ),
      ),
      body: PhotoViewGallery.builder(
        // backgroundDecoration: BoxDecoration(color: Colors.black),

        itemCount: images.length,
        pageController: pageController,
        backgroundDecoration: BoxDecoration(
          color: Provider.of<DarkModeProvider>(context).isDarkMode
              ? AppColor.darkModeColor
              : AppColor.lightBackground,
        ),
        builder: (context, index) {
          return PhotoViewGalleryPageOptions(
            minScale: PhotoViewComputedScale.contained * 0.8,
            imageProvider: CachedNetworkImageProvider(images[index].url),
          ); //NetworkImage(images[index])
        },
      ),
    );
  }
}
