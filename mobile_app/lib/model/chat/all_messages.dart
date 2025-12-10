// To parse this JSON data, do
//
//     final allMessagesModel = allMessagesModelFromJson(jsonString);

import 'dart:convert';

import 'package:real_estate/model/property_detail.dart';

List<AllMessagesModel> allMessagesModelFromJson(String str) =>
    List<AllMessagesModel>.from(
        json.decode(str).map((x) => AllMessagesModel.fromJson(x)));

String allMessagesModelToJson(List<AllMessagesModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class AllMessagesModel {
  String id;
  String conversation;
  Property? property;
  String sender;
  String receiver;
  dynamic readAt;
  String message;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  AllMessagesModel({
    required this.id,
    required this.conversation,
    required this.property,
    required this.sender,
    required this.receiver,
    required this.readAt,
    required this.message,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory AllMessagesModel.fromJson(Map<String, dynamic> json) =>
      AllMessagesModel(
        id: json["_id"],
        conversation: json["conversation"],
        property: json["property"] != null
            ? Property.fromJson(json["property"])
            : null,
        sender: json["sender"]["_id"],
        receiver: json["receiver"]["_id"],
        readAt: json["readAt"],
        message: json["message"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "conversation": conversation,
        "property": property!.toJson(),
        "sender": sender,
        "receiver": receiver,
        "readAt": readAt,
        "message": message,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class Property {
  String id;
  String? broker;
  String poster;
  String name;
  List<ImageModel> images;
  dynamic videoTour;
  int price;
  String currency;
  String description;
  String paymentDescription;
  String propertyType;
  String propertyHomeType;
  String owner;
  String agent;
  Details details;
  dynamic views;
  Address address;
  List<Facility> facilities;
  List<String> amenities;
  bool isFeatured;
  bool isRented;
  bool isFurnished;
  bool isSoldOut;
  bool isInHouseProperty;
  bool isHide;
  bool isApproved;
  bool? isRemoved;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  Property({
    required this.id,
    required this.broker,
    required this.poster,
    required this.name,
    required this.images,
    required this.videoTour,
    required this.price,
    required this.currency,
    required this.description,
    required this.paymentDescription,
    required this.propertyType,
    required this.propertyHomeType,
    required this.owner,
    required this.agent,
    required this.details,
    required this.views,
    required this.address,
    required this.facilities,
    required this.amenities,
    required this.isFeatured,
    required this.isRented,
    required this.isFurnished,
    required this.isSoldOut,
    required this.isInHouseProperty,
    required this.isHide,
    required this.isApproved,
    required this.isRemoved,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory Property.fromJson(Map<String, dynamic> json) => Property(
        id: json["_id"],
        broker: json["broker"] ?? "",
        poster: json["poster"],
        name: json["name"],
        images: List<ImageModel>.from(
            json["images"].map((x) => ImageModel.fromJson(x))),
        videoTour: json["VideoTour"],
        price: json["price"],
        currency: json["currency"],
        description: json["description"],
        paymentDescription: json["paymentDescription"],
        propertyType: json["propertyType"],
        propertyHomeType: json["propertyHomeType"],
        owner: json["owner"],
        agent: json["agent"],
        details: Details.fromJson(json["details"]),
        views: json["views"],
        address: Address.fromJson(json["address"]),
        facilities: List<Facility>.from(
            json["facilities"].map((x) => Facility.fromJson(x))),
        amenities: List<String>.from(json["amenities"].map((x) => x)),
        isFeatured: json["isFeatured"],
        isRented: json["isRented"],
        isFurnished: json["isFurnished"],
        isSoldOut: json["isSoldOut"],
        isInHouseProperty: json["isInHouseProperty"],
        isHide: json["isHide"],
        isApproved: json["isApproved"],
        isRemoved: json["isRemoved"] ?? false,
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "broker": broker,
        "poster": poster,
        "name": name,
        "images": List<dynamic>.from(images.map((x) => x.toJson())),
        "VideoTour": videoTour,
        "price": price,
        "currency": currency,
        "description": description,
        "paymentDescription": paymentDescription,
        "propertyType": propertyType,
        "propertyHomeType": propertyHomeType,
        "owner": owner,
        "agent": agent,
        "details": details.toJson(),
        "views": views,
        "address": address.toJson(),
        "facilities": List<dynamic>.from(facilities.map((x) => x.toJson())),
        "amenities": List<dynamic>.from(amenities.map((x) => x)),
        "isFeatured": isFeatured,
        "isRented": isRented,
        "isFurnished": isFurnished,
        "isSoldOut": isSoldOut,
        "isInHouseProperty": isInHouseProperty,
        "isHide": isHide,
        "isApproved": isApproved,
        "isRemoved": isRemoved,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class Address {
  String city;
  String location;
  List<double> loc;

  Address({
    required this.city,
    required this.location,
    required this.loc,
  });

  factory Address.fromJson(Map<String, dynamic> json) => Address(
        city: json["city"],
        location: json["location"],
        loc: List<double>.from(json["loc"].map((x) => x?.toDouble())),
      );

  Map<String, dynamic> toJson() => {
        "city": city,
        "location": location,
        "loc": List<dynamic>.from(loc.map((x) => x)),
      };
}

class Details {
  int area;
  int bedroom;
  int bathroom;
  int yearBuilt;
  int? floor;
  String id;

  Details({
    required this.area,
    required this.bedroom,
    required this.bathroom,
    required this.yearBuilt,
    required this.floor,
    required this.id,
  });

  factory Details.fromJson(Map<String, dynamic> json) => Details(
        area: json["area"],
        bedroom: json["bedroom"],
        bathroom: json["bathroom"],
        yearBuilt: json["yearBuilt"],
        floor: json["floor"] ?? 0,
        id: json["_id"],
      );

  Map<String, dynamic> toJson() => {
        "area": area,
        "bedroom": bedroom,
        "bathroom": bathroom,
        "yearBuilt": yearBuilt,
        "floor": floor,
        "_id": id,
      };
}

class Facility {
  String facility;
  dynamic distance;
  String id;

  Facility({
    required this.facility,
    required this.distance,
    required this.id,
  });

  factory Facility.fromJson(Map<String, dynamic> json) => Facility(
        facility: json["facility"],
        distance: json["distance"]?.toDouble(),
        id: json["_id"],
      );

  Map<String, dynamic> toJson() => {
        "facility": facility,
        "distance": distance,
        "_id": id,
      };
}

class Receiver {
  String profileImage;
  String id;
  String? broker;
  String firstName;
  String lastName;
  String email;
  String phone;
  bool isVerified;
  bool isAccountSuspended;
  String role;
  List<dynamic> permissions;
  int v;

  Receiver({
    required this.profileImage,
    required this.id,
    required this.broker,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phone,
    required this.isVerified,
    required this.isAccountSuspended,
    required this.role,
    required this.permissions,
    required this.v,
  });

  factory Receiver.fromJson(Map<String, dynamic> json) => Receiver(
        profileImage: json["profile_image"] ?? "",
        id: json["_id"] ?? "",
        broker: json["broker"] ?? "",
        firstName: json["firstName"] ?? "",
        lastName: json["lastName"] ?? "",
        email: json["email"] ?? "",
        phone: json["phone"] ?? "",
        isVerified: json["isVerified"] ?? "",
        isAccountSuspended: json["isAccountSuspended"] ?? "",
        role: json["role"],
        permissions: List<dynamic>.from(json["permissions"].map((x) => x)),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "profile_image": profileImage,
        "_id": id,
        "broker": broker,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phone": phone,
        "isVerified": isVerified,
        "isAccountSuspended": isAccountSuspended,
        "role": role,
        "permissions": List<dynamic>.from(permissions.map((x) => x)),
        "__v": v,
      };
}
