// To parse this JSON data, do
//
//     final notificationModel = notificationModelFromJson(jsonString);

import 'dart:convert';

NotificationModel notificationModelFromJson(String str) =>
    NotificationModel.fromJson(json.decode(str));

String notificationModelToJson(NotificationModel data) =>
    json.encode(data.toJson());

class NotificationModel {
  List<NotificationData> notifications;
  dynamic unreadNotifications;

  NotificationModel({
    required this.notifications,
    required this.unreadNotifications,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) =>
      NotificationModel(
        notifications: List<NotificationData>.from(
            json["notifications"].map((x) => NotificationData.fromJson(x))),
        unreadNotifications: json["unreadNotifications"],
      );

  Map<String, dynamic> toJson() => {
        "notifications":
            List<dynamic>.from(notifications.map((x) => x.toJson())),
        "unreadNotifications": unreadNotifications,
      };
}

class NotificationData {
  dynamic featuredProperty;
  dynamic id;
  dynamic user;
  dynamic payment;
  dynamic property;
  dynamic ads;
  dynamic brokerRequest;
  dynamic brokerPackage;
  dynamic report;
  dynamic title;
  dynamic body;
  DateTime? readAt;
  List<dynamic> recipients;
  dynamic sender;
  dynamic priority;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  NotificationData({
    required this.featuredProperty,
    required this.id,
    required this.user,
    required this.payment,
    required this.property,
    required this.ads,
    required this.brokerRequest,
    required this.brokerPackage,
    required this.report,
    required this.title,
    required this.body,
    required this.readAt,
    required this.recipients,
    required this.sender,
    required this.priority,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory NotificationData.fromJson(Map<String, dynamic> json) =>
      NotificationData(
        featuredProperty: json["featuredProperty"],
        id: json["_id"],
        user: json["user"],
        payment: json["payment"],
        property: json["property"],
        ads: json["ads"],
        brokerRequest: json["broker_request"],
        brokerPackage: json["broker_package"],
        report: json["report"],
        title: json["title"],
        body: json["body"],
        readAt: json["readAt"] != null ? DateTime.parse(json["readAt"]) : null,
        recipients: List<dynamic>.from(json["recipients"].map((x) => x)),
        sender: json["sender"],
        priority: json["priority"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "featuredProperty": featuredProperty,
        "_id": id,
        "user": user,
        "payment": payment,
        "property": property,
        "ads": ads,
        "broker_request": brokerRequest,
        "broker_package": brokerPackage,
        "report": report,
        "title": title,
        "body": body,
        "readAt": readAt!.toIso8601String(),
        "recipients": List<dynamic>.from(recipients.map((x) => x)),
        "sender": sender,
        "priority": priority,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}
