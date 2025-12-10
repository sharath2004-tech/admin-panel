// ignore_for_file: deprecated_member_use, use_build_context_synchronously

import 'package:basic_utils/basic_utils.dart' as bu;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../const/setting.dart';
import '../../controllers/dark_mode.dart';
import '../../model/chat/all_messages.dart';
import '../../utils/exception.dart';
import '../../utils/toast.dart';

import '../../const/app.dart';
import '../../controllers/auth.dart';
import '../../controllers/chat.dart';
import '../../widgets/chat/individual.dart';

class IndividualChatScreen extends StatefulWidget {
  final String agentID;
  final String agentName;
  final String propertyID;

  final dynamic agentPhone;

  const IndividualChatScreen(
      {super.key,
      required this.agentID,
      required this.agentName,
      required this.propertyID,
      required this.agentPhone});

  @override
  State<IndividualChatScreen> createState() => _IndividualChatScreenState();
}

class _IndividualChatScreenState extends State<IndividualChatScreen> {
  FocusNode focusNode = FocusNode();
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  bool _sendButton = false;
  bool _sendLoading = false;

  @override
  void didChangeDependencies() {
    // if (widget.propertyID != "") {
    Provider.of<ChatProvider>(context, listen: false).getSingleChatMessages(
        userID: Provider.of<AuthProvider>(context, listen: false).userId!,
        agentID: widget.agentID);
    // }
    super.didChangeDependencies();
  }

  void setMessage(
      {required String message,
      required String senderID,
      required String receiverID,
      required dynamic property}) {
    AllMessagesModel messageModel = AllMessagesModel(
        id: "",
        conversation: "",
        property: null,
        sender: senderID,
        receiver: receiverID,
        message: message,
        readAt: null,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        v: 2);
    Provider.of<ChatProvider>(context, listen: false)
        .appendNewMessages(messageModel);
  }

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        automaticallyImplyLeading: false,
        centerTitle: true,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
            Provider.of<ChatProvider>(context, listen: false).getConversations(
                userID:
                    Provider.of<AuthProvider>(context, listen: false).userId!);
            // Provider.of<ChatProvider>(context, listen: false)
            //     .getSingleChatMessages(
            //         userID: Provider.of<AuthProvider>(context, listen: false)
            //             .userId!,
            //         agentID: widget.agentID);
            Provider.of<ChatProvider>(context, listen: false).getAllMessages(
                userID:
                    Provider.of<AuthProvider>(context, listen: false).userId!);
          },
          icon: const Icon(Icons.arrow_back_ios, size: 20),
        ),
        title: Text(
          bu.StringUtils.capitalize(widget.agentName, allWords: true),
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
        // actions: const [
        //   Padding(
        //     padding: EdgeInsets.only(right: 12.0),
        //     child: Icon(
        //       Icons.more_vert,
        //       color: Colors.black,
        //     ),
        //   )
        // ],
      ),
      body: WillPopScope(
        onWillPop: () async {
          Provider.of<ChatProvider>(context, listen: false).getConversations(
              userID:
                  Provider.of<AuthProvider>(context, listen: false).userId!);
          // Provider.of<ChatProvider>(context, listen: false).getAllMessages(
          //     userID:
          //         Provider.of<AuthProvider>(context, listen: false).userId!);
          // Provider.of<ChatProvider>(context, listen: false)
          //     .getSingleChatMessages(
          //         userID:
          //             Provider.of<AuthProvider>(context, listen: false).userId!,
          //         agentID: widget.agentID);
          return true;
        },
        child: SafeArea(
          child: Stack(children: [
            Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    //
                    //Chat Background
                    //
                    child: Container(
                      decoration: BoxDecoration(
                        color: Provider.of<DarkModeProvider>(context).isDarkMode
                            ? AppColor.primaryColor.withOpacity(0.1)
                            : Colors.white,
                        // image: DecorationImage(
                        //     image: AssetImage("assets/chatBg.jpg"),
                        //     fit: BoxFit.cover)
                      ),
                      child: Padding(
                          padding:
                              EdgeInsets.only(bottom: _sendLoading ? 25 : 0.0),
                          child: IndividualChatWidget(
                              scrollController: _scrollController,
                              agentID: widget.agentID)),
                    ),
                  ),
                  Container(
                    width: screenSize(context).width,
                    height: 58,
                    decoration: BoxDecoration(
                        color: Provider.of<DarkModeProvider>(context).isDarkMode
                            ? AppColor.primaryColor.withOpacity(0.1)
                            : Colors.grey.shade50),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        //
                        //Text Field
                        //
                        Container(
                          height: 44,
                          width: screenSize(context).width * 0.8,
                          margin: const EdgeInsets.symmetric(horizontal: 12.0),
                          decoration: BoxDecoration(
                              color: Provider.of<DarkModeProvider>(context)
                                      .isDarkMode
                                  ? AppColor.darkModeColor
                                  : Colors.white,
                              borderRadius: BorderRadius.circular(50.0),
                              boxShadow: Provider.of<DarkModeProvider>(context)
                                      .isDarkMode
                                  ? null
                                  : [
                                      BoxShadow(
                                        blurRadius: 4.0,
                                        spreadRadius: 2.0,
                                        color: AppColor.primaryColor
                                            .withOpacity(0.1),
                                        offset: const Offset(1, 1),
                                      ),
                                      BoxShadow(
                                        blurRadius: 3.0,
                                        spreadRadius: 1.0,
                                        color: Colors.grey.withOpacity(0.2),
                                        offset: const Offset(-1, -1),
                                      ),
                                    ]),
                          child: TextField(
                            controller: _messageController,
                            keyboardType: TextInputType.multiline,
                            focusNode: focusNode,
                            autocorrect: false,
                            cursorWidth: 1.25,
                            maxLines: null,
                            onChanged: (value) {
                              if (value.trim().isNotEmpty ||
                                  _messageController.text.trim().isNotEmpty) {
                                setState(() {
                                  _sendButton = true;
                                });
                              } else {
                                setState(() {
                                  _sendButton = false;
                                });
                              }
                            },
                            textAlignVertical: TextAlignVertical.center,
                            decoration: InputDecoration(
                              isDense: true,
                              hintText: "Type a message",
                              hintStyle: TextStyle(
                                  fontSize: AppTextSize.titleSize,
                                  fontFamily: AppFonts.medium),
                              contentPadding:
                                  const EdgeInsets.only(left: 12.0, top: 10),
                              border: InputBorder.none,
                              focusedBorder: const UnderlineInputBorder(
                                borderSide:
                                    BorderSide(color: Colors.transparent),
                              ),
                            ),
                          ),
                        ),
                        //
                        //Send Icon
                        //
                        CircleAvatar(
                            radius: 21,
                            backgroundColor: AppColor.primaryColor,
                            //
                            //Send Text Messages
                            //
                            child: _sendButton
                                ? GestureDetector(
                                    onTap: () async {
                                      if (_scrollController.hasClients) {
                                        _scrollController.animateTo(
                                          _scrollController
                                              .position.minScrollExtent,
                                          duration:
                                              const Duration(milliseconds: 400),
                                          curve: Curves.easeOut,
                                        );
                                      }
                                      String message =
                                          _messageController.text.trim();
                                      setMessage(
                                          message: message,
                                          senderID: Provider.of<AuthProvider>(
                                                  context,
                                                  listen: false)
                                              .userId!,
                                          receiverID: widget.agentID,
                                          property: widget.propertyID);
                                      try {
                                        setState(() {
                                          _sendLoading = true;
                                          _sendButton = false;
                                        });

                                        _messageController.clear();
                                        await Provider.of<ChatProvider>(context,
                                                listen: false)
                                            .sendMessage(
                                                message: message,
                                                senderID:
                                                    Provider.of<AuthProvider>(
                                                            context,
                                                            listen: false)
                                                        .userId!,
                                                receiverID: widget.agentID,
                                                property: widget.propertyID)
                                            .then((_) {
                                          setState(() {
                                            _sendLoading = false;
                                          });
                                        });
                                      } on CustomException catch (e) {
                                        showErrorResponse(
                                            context: context,
                                            message: e.toString());
                                        setState(() {
                                          _sendLoading = false;
                                        });
                                      } catch (e) {
                                        showErrorResponse(
                                            context: context,
                                            message: e.toString());
                                        setState(() {
                                          _sendLoading = false;
                                        });
                                      }
                                    },
                                    child: const Icon(
                                      Icons.send,
                                      color: Colors.white,
                                    ))
                                : GestureDetector(
                                    onTap: () async {
                                      final Uri phonelaunch = Uri(
                                        scheme: 'tel',
                                        path: widget.agentPhone,
                                      );

                                      await launchUrl(phonelaunch);
                                    },
                                    child: const Icon(
                                      Icons.phone,
                                      color: Colors.white,
                                    ),
                                  ))
                      ],
                    ),
                  ),
                ]),
            _sendLoading
                ? Positioned(
                    bottom: 70,
                    right: 5,
                    child: Transform.scale(
                      alignment: Alignment.bottomCenter,
                      scale: 0.25,
                      child: const CircularProgressIndicator(),
                    ))
                : Container(),
          ]),
        ),
      ),
    );
  }
}
