// To parse this JSON data, do
//
//     final brokerPropertiesModel = brokerPropertiesModelFromJson(jsonString);

import 'dart:convert';

import 'package:real_estate/model/property_detail.dart';

BrokerPropertiesModel brokerPropertiesModelFromJson(String str) =>
    BrokerPropertiesModel.fromJson(json.decode(str));

String brokerPropertiesModelToJson(BrokerPropertiesModel data) =>
    json.encode(data.toJson());

class BrokerPropertiesModel {
  Pagination pagination;

  BrokerPropertiesModel({
    required this.pagination,
  });

  factory BrokerPropertiesModel.fromJson(Map<String, dynamic> json) =>
      BrokerPropertiesModel(
        pagination: Pagination.fromJson(json["pagination"]),
      );

  Map<String, dynamic> toJson() => {
        "pagination": pagination.toJson(),
      };
}

class Pagination {
  List<BrokerPropertiesData> data;
  int page;
  int perPage;
  int totalProperties;
  int totalPages;
  bool hasNextPage;
  bool hasPrevPage;

  Pagination({
    required this.data,
    required this.page,
    required this.perPage,
    required this.totalProperties,
    required this.totalPages,
    required this.hasNextPage,
    required this.hasPrevPage,
  });

  factory Pagination.fromJson(Map<String, dynamic> json) => Pagination(
        data: List<BrokerPropertiesData>.from(
            json["data"].map((x) => BrokerPropertiesData.fromJson(x))),
        page: json["page"],
        perPage: json["perPage"],
        totalProperties: json["totalProperties"],
        totalPages: json["totalPages"],
        hasNextPage: json["hasNextPage"],
        hasPrevPage: json["hasPrevPage"],
      );

  Map<String, dynamic> toJson() => {
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
        "page": page,
        "perPage": perPage,
        "totalProperties": totalProperties,
        "totalPages": totalPages,
        "hasNextPage": hasNextPage,
        "hasPrevPage": hasPrevPage,
      };
}

class BrokerPropertiesData {
  String id;
  String? broker;
  String name;
  List<ImageModel> images;
  dynamic price;
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
  List<String> amenities;
  bool isFeatured;
  bool isRented;
  bool isFurnished;
  bool isSoldOut;
  bool isInHouseProperty;
  bool isHide;
  bool isApproved;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  BrokerPropertiesData({
    required this.id,
    required this.broker,
    required this.name,
    required this.images,
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
    required this.amenities,
    required this.isFeatured,
    required this.isRented,
    required this.isFurnished,
    required this.isSoldOut,
    required this.isInHouseProperty,
    required this.isHide,
    required this.isApproved,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory BrokerPropertiesData.fromJson(Map<String, dynamic> json) =>
      BrokerPropertiesData(
        id: json["_id"],
        broker: json["broker"] ?? "",
        name: json["name"],
        images: List<ImageModel>.from(
            json["images"].map((x) => ImageModel.fromJson(x))),
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
        amenities: List<String>.from(json["amenities"].map((x) => x)),
        isFeatured: json["isFeatured"],
        isRented: json["isRented"],
        isFurnished: json["isFurnished"],
        isSoldOut: json["isSoldOut"],
        isInHouseProperty: json["isInHouseProperty"],
        isHide: json["isHide"],
        isApproved: json["isApproved"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "broker": broker,
        "name": name,
        "images": List<dynamic>.from(images.map((x) => x.toJson())),
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
        "amenities": List<dynamic>.from(amenities.map((x) => x)),
        "isFeatured": isFeatured,
        "isRented": isRented,
        "isFurnished": isFurnished,
        "isSoldOut": isSoldOut,
        "isInHouseProperty": isInHouseProperty,
        "isHide": isHide,
        "isApproved": isApproved,
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
  dynamic floor;
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
        floor: json["floor"],
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
