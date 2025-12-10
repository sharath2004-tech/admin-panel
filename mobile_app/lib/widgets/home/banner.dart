import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../const/app.dart';

import '../../const/setting.dart';
import '../../controllers/banner.dart';

class BannerWidget extends StatefulWidget {
  const BannerWidget({super.key});

  @override
  State<BannerWidget> createState() => _BannerWidgetState();
}

class _BannerWidgetState extends State<BannerWidget> {
  int currentIndex = 0;
  CarouselController carouselController = CarouselController();

  // int index;
  @override
  Widget build(BuildContext context) {
    return Consumer<BannerProvider>(
      builder: (context, data, _) {
        if (data.banners.isEmpty) {
          return const Center(child: Text("Banners Will be Avaliable Here."));
        }
        return Stack(
            fit: StackFit.expand,
            alignment: Alignment.center,
            children: [
              CarouselSlider.builder(
                carouselController: carouselController,
                itemCount: data.banners.length,
                options: CarouselOptions(
                    autoPlay: true,
                    viewportFraction: 1,
                    onPageChanged: (index, reason) {
                      setState(() {
                        currentIndex = index;
                      });
                    }),
                itemBuilder: (context, index, _) {
                  return GestureDetector(
                    onTap: () {},
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 10.0),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10.0),
                        child: CachedNetworkImage(
                          imageUrl: data.banners[index].image,
                          width: screenSize(context).width,
                          placeholder: (context, url) => imagePlaceHolder(),
                          errorWidget: (context, url, error) =>
                              const Icon(Icons.error),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  );
                },
              ),
              Positioned(
                  bottom: 8,
                  child: Wrap(
                    spacing: 8,
                    children: List.generate(data.banners.length, (index) {
                      return Container(
                        height: 3,
                        width: 10,
                        decoration: BoxDecoration(
                            color: index == currentIndex
                                ? AppColor.primaryColor
                                : Colors.white,
                            borderRadius: BorderRadius.circular(10.0),
                            border: Border.all(
                                color: AppColor.grey.withOpacity(0.25))),
                      );
                    }),
                  ))
            ]);
      },
    );
  }
}
