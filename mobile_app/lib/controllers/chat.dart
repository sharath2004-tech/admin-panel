import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../const/setting.dart';
import '../model/chat/all_messages.dart';
import '../model/chat/conversation.dart';
import '../utils/exception.dart';

class ChatProvider with ChangeNotifier {
  //Conversations
  final List<ConversationModel> _conversations = [];
  List<ConversationModel> get conversations => [..._conversations];

  //All Messages
  final List<AllMessagesModel> _messages = [];
  List<AllMessagesModel> get messages => [..._messages];

  cleanChat() {
    _conversations.clear();
    _messages.clear();
  }

  void appendNewMessages(AllMessagesModel messageData) {
    _messages.insert(0, messageData);
    notifyListeners();
  }

  Future<void> getConversations({required String userID}) async {
    String url = "${AppConst.baseUrl}/chat/get-my-chats/$userID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      var decodedData = jsonDecode(response.body);

      if (response.statusCode == 200) {
        final data = conversationModelFromJson(response.body);
        _conversations.clear();
        _conversations.addAll(data);
        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (_) {
      rethrow;
    }
  }

  //
  Future<void> getAllMessages({required String userID}) async {
    String url = "${AppConst.baseUrl}/messages/all/$userID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      var decodedData = jsonDecode(response.body);

      if (response.statusCode == 200) {
        final data = allMessagesModelFromJson(response.body);
        _messages.clear();
        _messages.addAll(data);
        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (_) {
      rethrow;
    }
  }

  Future<void> getSingleChatMessages(
      {required String userID, required String agentID}) async {
    String url = "${AppConst.baseUrl}/messages/get-messages/$userID/$agentID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      var decodedData = jsonDecode(response.body);

      if (response.statusCode == 200) {
        final data = allMessagesModelFromJson(response.body);
        _messages.clear();
        _messages.addAll(data);
        notifyListeners();
      } else if (response.statusCode == 422) {
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (_) {
      rethrow;
    }
  }
  //

  Future sendMessage(
      {required String message,
      required String senderID,
      required String receiverID,
      required String property}) async {
    var url = "${AppConst.baseUrl}/messages/send-message";
    try {
      http.Response response = await http.post(
        Uri.parse(url),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "message": message,
          "sender": senderID,
          "receiver": receiverID,
          if (property != "") "property": property,
        }),
      );
      var decodedData = jsonDecode(response.body);
      if (response.statusCode != 201) {
        throw CustomException(message: decodedData['message']);
      } else {
        // await getAllMessageFromDatabase(senderID);
      }
    } catch (e) {
      rethrow;
    }
  }
}
