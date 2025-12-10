import 'package:basic_utils/basic_utils.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../const/route.dart';
import '../../controllers/chat.dart';
import '../home/featured.dart';

// ignore: must_be_immutable
class ChatPropertyWidget extends StatelessWidget {
  ChatPropertyWidget(
      {super.key,
      required this.agentID,
      required this.value,
      required this.index});

  final String agentID;
  final ChatProvider value;
  int index;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, AppRoutes.propertyDetail,
          arguments: value.messages
              .where((element) =>
                  element.sender == agentID || element.receiver == agentID)
              .toList()[index]
              .property!
              .id),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 100,
            child: ClipRRect(
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(15.0)),
                child: CachedNetworkImage(
                  imageUrl: value.messages
                      .where((element) =>
                          element.sender == agentID ||
                          element.receiver == agentID)
                      .toList()[index]
                      .property!
                      .images[0]
                      .url,
                  width: screenSize(context).width,
                  placeholder: (context, url) => imagePlaceHolder(),
                  errorWidget: (context, url, error) => const Icon(Icons.error),
                  fit: BoxFit.cover,
                )),
          ),
          const SizedBox(height: 5),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Text(
              StringUtils.capitalize(
                  value.messages
                      .where((element) =>
                          element.sender == agentID ||
                          element.receiver == agentID)
                      .toList()[index]
                      .property!
                      .name,
                  allWords: true),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                  fontSize: AppTextSize.titleSize, fontFamily: AppFonts.medium),
            ),
          ),
          const SizedBox(height: 5),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: HomeAmentiesWidget(
              bathRoom: value.messages
                  .where((element) =>
                      element.sender == agentID || element.receiver == agentID)
                  .toList()[index]
                  .property!
                  .details
                  .bathroom
                  .toString(),
              bedRoom: value.messages
                  .where((element) =>
                      element.sender == agentID || element.receiver == agentID)
                  .toList()[index]
                  .property!
                  .details
                  .bedroom
                  .toString(),
              propertyArea: value.messages
                  .where((element) =>
                      element.sender == agentID || element.receiver == agentID)
                  .toList()[index]
                  .property!
                  .details
                  .area
                  .toString(),
            ),
          ),
        ],
      ),
    );
  }
}
