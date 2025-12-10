// To parse this JSON data, do
//
//     final subscriptionHistoryModel = subscriptionHistoryModelFromJson(jsonString);

import 'dart:convert';

SubscriptionHistoryModel subscriptionHistoryModelFromJson(String str) =>
    SubscriptionHistoryModel.fromJson(json.decode(str));

String subscriptionHistoryModelToJson(SubscriptionHistoryModel data) =>
    json.encode(data.toJson());

class SubscriptionHistoryModel {
  Pagination pagination;

  SubscriptionHistoryModel({
    required this.pagination,
  });

  factory SubscriptionHistoryModel.fromJson(Map<String, dynamic> json) =>
      SubscriptionHistoryModel(
        pagination: Pagination.fromJson(json["pagination"]),
      );

  Map<String, dynamic> toJson() => {
        "pagination": pagination.toJson(),
      };
}

class Pagination {
  List<HistoryData> data;
  int page;
  int perPage;
  int totalPackages;
  int totalPages;
  bool hasNextPage;
  bool hasPrevPage;

  Pagination({
    required this.data,
    required this.page,
    required this.perPage,
    required this.totalPackages,
    required this.totalPages,
    required this.hasNextPage,
    required this.hasPrevPage,
  });

  factory Pagination.fromJson(Map<String, dynamic> json) => Pagination(
        data: List<HistoryData>.from(
            json["data"].map((x) => HistoryData.fromJson(x))),
        page: json["page"],
        perPage: json["perPage"],
        totalPackages: json["totalPackages"],
        totalPages: json["totalPages"],
        hasNextPage: json["hasNextPage"],
        hasPrevPage: json["hasPrevPage"],
      );

  Map<String, dynamic> toJson() => {
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
        "page": page,
        "perPage": perPage,
        "totalPackages": totalPackages,
        "totalPages": totalPages,
        "hasNextPage": hasNextPage,
        "hasPrevPage": hasPrevPage,
      };
}

class HistoryData {
  String id;
  Package package;
  String broker;
  Payment payment;
  String user;
  bool isActive;
  String status;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  HistoryData({
    required this.id,
    required this.package,
    required this.broker,
    required this.payment,
    required this.user,
    required this.isActive,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory HistoryData.fromJson(Map<String, dynamic> json) => HistoryData(
        id: json["_id"],
        package: Package.fromJson(json["package"]),
        broker: json["broker"],
        payment: Payment.fromJson(json["payment"]),
        user: json["user"],
        isActive: json["isActive"],
        status: json["status"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "package": package.toJson(),
        "broker": broker,
        "payment": payment.toJson(),
        "user": user,
        "isActive": isActive,
        "status": status,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class Package {
  String name;
  String description;
  dynamic maxListingsAllowed;
  dynamic remining;
  dynamic price;
  String id;
  DateTime createdAt;
  DateTime updatedAt;

  Package({
    required this.name,
    required this.description,
    required this.maxListingsAllowed,
    required this.remining,
    required this.price,
    required this.id,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Package.fromJson(Map<String, dynamic> json) => Package(
        name: json["name"],
        description: json["description"],
        maxListingsAllowed: json["maxListingsAllowed"],
        remining: json["remining"],
        price: json["price"],
        id: json["_id"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
      );

  Map<String, dynamic> toJson() => {
        "name": name,
        "description": description,
        "maxListingsAllowed": maxListingsAllowed,
        "remining": remining,
        "price": price,
        "_id": id,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
      };
}

class Payment {
  String id;
  String package;
  String user;
  String broker;
  String amount;
  String emailAddress;
  String description;
  String currency;
  String paymentMethod;
  String paymentId;
  DateTime timestamp;
  String status;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  Payment({
    required this.id,
    required this.package,
    required this.user,
    required this.broker,
    required this.amount,
    required this.emailAddress,
    required this.description,
    required this.currency,
    required this.paymentMethod,
    required this.paymentId,
    required this.timestamp,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory Payment.fromJson(Map<String, dynamic> json) => Payment(
        id: json["_id"],
        package: json["package"],
        user: json["user"],
        broker: json["broker"],
        amount: json["amount"],
        emailAddress: json["email_address"],
        description: json["description"],
        currency: json["currency"],
        paymentMethod: json["paymentMethod"],
        paymentId: json["paymentId"],
        timestamp: DateTime.parse(json["timestamp"]),
        status: json["status"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "package": package,
        "user": user,
        "broker": broker,
        "amount": amount,
        "email_address": emailAddress,
        "description": description,
        "currency": currency,
        "paymentMethod": paymentMethod,
        "paymentId": paymentId,
        "timestamp": timestamp.toIso8601String(),
        "status": status,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}
