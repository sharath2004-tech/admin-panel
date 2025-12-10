// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:real_estate/utils/exception.dart';

import '../../const/setting.dart';
import '../../model/notification.dart';

class NotificationProvider with ChangeNotifier {
  final List<NotificationData> _notificationData = [];

  final List<NotificationData> _notReadedNotification = [];
  List<NotificationData> get notReadedNotification =>
      [..._notReadedNotification];

  final List<NotificationData> _readedNotification = [];
  List<NotificationData> get readedNotification => [..._readedNotification];
  dynamic _unreadNotificationCount = 0;
  int get unreadNotificationCount => _unreadNotificationCount;

  //
  //
  //
  Future getNotification(BuildContext context, String userID) async {
    var url = "${AppConst.baseUrl}/notification/user/$userID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      var decodedData = jsonDecode(response.body);
      if (response.statusCode != 200) {
        throw CustomException(message: decodedData["message"]);
      } else {
        var data = notificationModelFromJson(response.body);
        _notificationData.clear();
        _notReadedNotification.clear();
        _readedNotification.clear();
        _unreadNotificationCount = data.unreadNotifications;
        _notificationData.addAll(data.notifications);
        for (NotificationData a in _notificationData) {
          if (a.readAt == null) {
            _notReadedNotification.add(a);
          } else {
            _readedNotification.add(a);
          }
        }
        notifyListeners();
      }
    } catch (_) {
      rethrow;
    }
  }

  Future markAllAsRead(BuildContext context, String userID) async {
    String url = "${AppConst.baseUrl}/notification/read/all/$userID";
    try {
      http.Response response = await http.put(Uri.parse(url));
      var decodedData = jsonDecode(response.body);
      if (response.statusCode != 200) {
        throw CustomException(message: decodedData["message"]);
      } else {
        await getNotification(context, userID);
      }
    } catch (e) {
      rethrow;
    }
  }
}
