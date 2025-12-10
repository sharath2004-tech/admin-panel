import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../controllers/auth.dart';
import '../../controllers/chat.dart';

import '../../const/app.dart';
import '../../widgets/chat/conversation.dart';
import '../no_property.dart';

class ConversationScreen extends StatefulWidget {
  const ConversationScreen({super.key});

  @override
  State<ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends State<ConversationScreen> {
  bool isInit = true;
  late Future data;

  @override
  void didChangeDependencies() {
    if (isInit) {
      if (Provider.of<AuthProvider>(context, listen: false).userId != null) {
        data = Provider.of<ChatProvider>(context, listen: false)
            .getConversations(
                userID: Provider.of<AuthProvider>(context).userId!);
        Provider.of<ChatProvider>(context, listen: false)
            .getAllMessages(userID: Provider.of<AuthProvider>(context).userId!);
      }
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
          "Chat",
          style: TextStyle(
              fontSize: AppTextSize.headerSize, fontFamily: AppFonts.bold),
        ),
      ),
      body: SafeArea(
          child: Provider.of<AuthProvider>(context, listen: false).userId ==
                  null
              ? const Center(
                  child: NoPropertyFound(text: "You Are Not Loged In"))
              : Consumer<ChatProvider>(
                  builder: (context, value, _) {
                    if (value.conversations.isNotEmpty) {
                      return ConversationWidget(value: value);
                    } else {
                      return FutureBuilder(
                        future: data,
                        builder: (context, snapshot) {
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return Center(
                                child: Transform.scale(
                              scale: 0.7,
                              child: const CircularProgressIndicator.adaptive(),
                            ));
                          } else if (snapshot.hasError) {
                            return const Center(child: Text("Has Error"));
                          } else {
                            if (value.conversations.isEmpty) {
                              return const Center(
                                  child:
                                      NoPropertyFound(text: "No Chat Started"));
                            }
                            return ConversationWidget(value: value);
                          }
                        },
                      );
                    }
                  },
                )),
    );
  }
}
