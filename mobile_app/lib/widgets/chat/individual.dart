import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/widgets/chat/property.dart';
import '../../const/app.dart';
import '../../const/setting.dart';
import '../../controllers/auth.dart';
import '../../controllers/chat.dart';
import '../../controllers/dark_mode.dart';

class IndividualChatWidget extends StatelessWidget {
  const IndividualChatWidget({
    super.key,
    required this.scrollController,
    required this.agentID,
  });

  final ScrollController scrollController;
  final String agentID;

  @override
  Widget build(BuildContext context) {
    return Consumer<ChatProvider>(
      builder: (context, value, _) {
        if (value.messages
            .where((element) {
              return element.sender == agentID || element.receiver == agentID;
            })
            .toList()
            .isEmpty) {
          return const Center(child: Text("No Messages Yet"));
        }
        return ListView.builder(
            shrinkWrap: true,
            reverse: true,
            padding: const EdgeInsets.only(top: 10, bottom: 5),
            controller: scrollController,
            physics: const BouncingScrollPhysics(),
            itemCount: value.messages
                .where((element) {
                  return element.sender == agentID ||
                      element.receiver == agentID;
                })
                .toList()
                .length,
            itemBuilder: (context, index) {
              bool isSender = value.messages
                      .where((element) =>
                          element.sender == agentID ||
                          element.receiver == agentID)
                      .toList()[index]
                      .sender ==
                  Provider.of<AuthProvider>(context, listen: false).userId!;
              return Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                child: Align(
                  alignment:
                      (isSender ? Alignment.centerRight : Alignment.centerLeft),
                  child: value.messages
                              .where((element) =>
                                  element.sender == agentID ||
                                  element.receiver == agentID)
                              .toList()[index]
                              .property !=
                          null
                      ? Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: isSender
                              ? CrossAxisAlignment.end
                              : CrossAxisAlignment.start,
                          children: [
                            Container(
                              height: 180,
                              width: screenSize(context).width * 0.4,
                              margin: const EdgeInsets.only(bottom: 12),
                              decoration: BoxDecoration(
                                  borderRadius: const BorderRadius.only(
                                      topLeft: Radius.circular(15.0),
                                      topRight: Radius.circular(15.0),
                                      bottomLeft: Radius.circular(15.0)),
                                  color: Provider.of<DarkModeProvider>(context)
                                          .isDarkMode
                                      ? AppColor.grey.withOpacity(0.5)
                                      : AppColor.primaryColor.withOpacity(0.1)),
                              child: ChatPropertyWidget(
                                  agentID: agentID, index: index, value: value),
                            ),
                            Container(
                              padding: const EdgeInsets.all(12),
                              margin: EdgeInsets.only(
                                left: isSender
                                    ? screenSize(context).width * 0.15
                                    : 0,
                                right: isSender
                                    ? 0.0
                                    : screenSize(context).width * 0.15,
                              ),
                              decoration: BoxDecoration(
                                  borderRadius: isSender
                                      ? const BorderRadius.only(
                                          topLeft: Radius.circular(15.0),
                                          topRight: Radius.circular(15.0),
                                          bottomLeft: Radius.circular(15.0),
                                        )
                                      : const BorderRadius.only(
                                          topLeft: Radius.circular(15.0),
                                          topRight: Radius.circular(15.0),
                                          bottomRight: Radius.circular(15.0),
                                        ),
                                  color: isSender
                                      ? Provider.of<DarkModeProvider>(context)
                                              .isDarkMode
                                          ? AppColor.grey.withOpacity(0.5)
                                          : AppColor.primaryColor
                                              .withOpacity(0.1)
                                      : Colors.indigo),
                              child: Text(
                                value.messages
                                    .where((element) =>
                                        element.sender == agentID ||
                                        element.receiver == agentID)
                                    .toList()[index]
                                    .message,
                                textAlign: value.messages
                                            .where((element) =>
                                                element.sender == agentID ||
                                                element.receiver == agentID)
                                            .toList()[index]
                                            .property !=
                                        null
                                    ? TextAlign.left
                                    : TextAlign.right,
                                style: TextStyle(
                                  fontSize: AppTextSize.titleSize,
                                  fontFamily: AppFonts.medium,
                                  color: isSender
                                      ? Provider.of<DarkModeProvider>(context)
                                              .isDarkMode
                                          ? Colors.white
                                          : Colors.black
                                      : Provider.of<DarkModeProvider>(context)
                                              .isDarkMode
                                          ? Colors.white
                                          : Colors.white,
                                ),
                              ),
                            ),
                          ],
                        )
                      : Container(
                          padding: const EdgeInsets.all(12),
                          margin: EdgeInsets.only(
                            left:
                                isSender ? screenSize(context).width * 0.15 : 0,
                            right: isSender
                                ? 0.0
                                : screenSize(context).width * 0.15,
                          ),
                          decoration: BoxDecoration(
                              borderRadius: isSender
                                  ? const BorderRadius.only(
                                      topLeft: Radius.circular(15.0),
                                      topRight: Radius.circular(15.0),
                                      bottomLeft: Radius.circular(15.0),
                                    )
                                  : const BorderRadius.only(
                                      topLeft: Radius.circular(15.0),
                                      topRight: Radius.circular(15.0),
                                      bottomRight: Radius.circular(15.0),
                                    ),
                              color: isSender
                                  ? Provider.of<DarkModeProvider>(context)
                                          .isDarkMode
                                      ? AppColor.grey.withOpacity(0.5)
                                      : AppColor.primaryColor.withOpacity(0.1)
                                  : Colors.indigo),
                          child: Text(
                            value.messages
                                .where((element) =>
                                    element.sender == agentID ||
                                    element.receiver == agentID)
                                .toList()[index]
                                .message,
                            textAlign: value.messages
                                        .where((element) =>
                                            element.sender == agentID ||
                                            element.receiver == agentID)
                                        .toList()[index]
                                        .property !=
                                    null
                                ? TextAlign.left
                                : TextAlign.right,
                            style: TextStyle(
                              fontSize: AppTextSize.titleSize,
                              fontFamily: AppFonts.medium,
                              color: isSender
                                  ? Provider.of<DarkModeProvider>(context)
                                          .isDarkMode
                                      ? Colors.white
                                      : Colors.black
                                  : Provider.of<DarkModeProvider>(context)
                                          .isDarkMode
                                      ? Colors.white
                                      : Colors.white,
                            ),
                          ),
                        ),
                ),
              );
            });
        //
      },
    );
  }
}
