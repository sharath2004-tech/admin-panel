// To parse this JSON data, do
//
//     final activeSubscriptionModel = activeSubscriptionModelFromJson(jsonString);

import 'dart:convert';

ActiveSubscriptionModel activeSubscriptionModelFromJson(String str) =>
    ActiveSubscriptionModel.fromJson(json.decode(str));

String activeSubscriptionModelToJson(ActiveSubscriptionModel data) =>
    json.encode(data.toJson());

class ActiveSubscriptionModel {
  String id;
  Packagee package;
  Broker broker;
  bool isActive;
  String status;

  ActiveSubscriptionModel({
    required this.id,
    required this.package,
    required this.broker,
    required this.isActive,
    required this.status,
  });

  factory ActiveSubscriptionModel.fromJson(Map<String, dynamic> json) =>
      ActiveSubscriptionModel(
        id: json["_id"],
        package: Packagee.fromJson(json["package"]),
        broker: Broker.fromJson(json["broker"]),
        isActive: json["isActive"],
        status: json["status"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "package": package.toJson(),
        "broker": broker.toJson(),
        "isActive": isActive,
        "status": status,
      };
}

class Broker {
  int freeListingQuotaRemaining;
  String id;
  String name;
  String logo;
  String address;
  int phone;
  String email;
  int freeListingQuota;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  Broker({
    required this.freeListingQuotaRemaining,
    required this.id,
    required this.name,
    required this.logo,
    required this.address,
    required this.phone,
    required this.email,
    required this.freeListingQuota,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory Broker.fromJson(Map<String, dynamic> json) => Broker(
        freeListingQuotaRemaining: json["freeListingQuotaRemaining"],
        id: json["_id"],
        name: json["name"],
        logo: json["logo"],
        address: json["address"],
        phone: json["phone"],
        email: json["email"],
        freeListingQuota: json["freeListingQuota"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "freeListingQuotaRemaining": freeListingQuotaRemaining,
        "_id": id,
        "name": name,
        "logo": logo,
        "address": address,
        "phone": phone,
        "email": email,
        "freeListingQuota": freeListingQuota,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class Packagee {
  String name;
  String description;
  dynamic maxListingsAllowed;
  dynamic remining;
  dynamic price;
  String id;
  DateTime createdAt;
  DateTime updatedAt;

  Packagee({
    required this.name,
    required this.description,
    required this.maxListingsAllowed,
    required this.remining,
    required this.price,
    required this.id,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Packagee.fromJson(Map<String, dynamic> json) => Packagee(
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
