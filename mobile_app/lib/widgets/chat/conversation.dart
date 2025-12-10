import 'package:basic_utils/basic_utils.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../const/route.dart';

import '../../const/app.dart';
import '../../const/setting.dart';
import '../../controllers/chat.dart';
import '../../controllers/dark_mode.dart';

class ConversationWidget extends StatelessWidget {
  final ChatProvider value;
  const ConversationWidget({super.key, required this.value});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      child: ListView.builder(
        shrinkWrap: true,
        itemCount: value.conversations.length,
        physics: const ScrollPhysics(),
        padding: const EdgeInsets.only(left: 12.0),
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () => Navigator.pushNamed(context, AppRoutes.individualChat,
                arguments: [
                  value.conversations[index].members[0].id,
                  "",
                  "${value.conversations[index].members[0].firstName} ${value.conversations[index].members[0].lastName}",
                  value.conversations[index].members[0].phone
                ]),
            child: Container(
              height: 62,
              width: screenSize(context).width,
              margin: const EdgeInsets.only(right: 12),
              decoration: BoxDecoration(
                border: Border(
                  bottom: index == (value.conversations.length - 1)
                      ? BorderSide.none // Hide border for the last index
                      : BorderSide(
                          color:
                              Provider.of<DarkModeProvider>(context).isDarkMode
                                  ? Colors.white
                                  : Colors.black87,
                          width: 0.15,
                        ),
                ),
                color: Provider.of<DarkModeProvider>(context).isDarkMode
                    ? Colors.transparent
                    : Colors.white,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    height: 45,
                    width: 45,
                    decoration: BoxDecoration(
                        color: AppColor.primaryColor.withOpacity(0.2),
                        shape: BoxShape.circle,
                        image: DecorationImage(
                            image: CachedNetworkImageProvider(value
                                .conversations[index].members[0].profileImage),
                            fit: BoxFit.cover)),
                  ),
                  const SizedBox(width: 20),
                  Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          StringUtils.capitalize(
                              "${value.conversations[index].members[0].firstName} ${value.conversations[index].members[0].lastName}",
                              allWords: true),
                          style: TextStyle(
                              fontSize: AppTextSize.headerSize - 1,
                              fontFamily: AppFonts.medium),
                        ),
                        Text(
                          value.conversations[index].lastMessage.message,
                          style: TextStyle(
                              fontSize: AppTextSize.subTextSize + 1,
                              color: AppColor.grey,
                              fontFamily: AppFonts.medium),
                        ),
                      ]),
                  const Spacer(),
                  value.conversations[index].unreadCount != 0
                      ? UnReadCountWidget(
                          unreadCount: value.conversations[index].unreadCount)
                      : Container(),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class UnReadCountWidget extends StatelessWidget {
  final int? unreadCount;

  const UnReadCountWidget({super.key, required this.unreadCount});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 18,
      width: 18,
      alignment: Alignment.center,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.red,
      ),
      child: Text(
        unreadCount.toString(),
        style: TextStyle(
            color: Colors.white,
            fontFamily: AppFonts.medium,
            fontSize: AppTextSize.subTextSize - 1.5),
      ),
    );
  }
}
