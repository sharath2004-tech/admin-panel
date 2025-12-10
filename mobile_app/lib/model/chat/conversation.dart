// To parse this JSON data, do
//
//     final conversationModel = conversationModelFromJson(jsonString);

import 'dart:convert';

List<ConversationModel> conversationModelFromJson(String str) =>
    List<ConversationModel>.from(
        json.decode(str).map((x) => ConversationModel.fromJson(x)));

String conversationModelToJson(List<ConversationModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class ConversationModel {
  String id;
  List<Member> members;
  LastMessage lastMessage;
  int unreadCount;

  ConversationModel({
    required this.id,
    required this.members,
    required this.lastMessage,
    required this.unreadCount,
  });

  factory ConversationModel.fromJson(Map<String, dynamic> json) =>
      ConversationModel(
        id: json["_id"],
        members:
            List<Member>.from(json["members"].map((x) => Member.fromJson(x))),
        lastMessage: LastMessage.fromJson(json["last_message"]),
        unreadCount: json["unread_count"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "members": List<dynamic>.from(members.map((x) => x.toJson())),
        "last_message": lastMessage.toJson(),
        "unread_count": unreadCount,
      };
}

class LastMessage {
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

  LastMessage({
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

  factory LastMessage.fromJson(Map<String, dynamic> json) => LastMessage(
        id: json["_id"],
        conversation: json["conversation"],
        property: json["property"] != null
            ? Property.fromJson(json["property"])
            : null,
        sender: json["sender"],
        receiver: json["receiver"],
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
  List<Image> images;
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
  bool isHiddenByAdmin;
  bool isApproved;
  bool isPublished;
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
    required this.isHiddenByAdmin,
    required this.isApproved,
    required this.isPublished,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory Property.fromJson(Map<String, dynamic> json) => Property(
        id: json["_id"],
        broker: json["broker"] ?? "",
        poster: json["poster"],
        name: json["name"],
        images: List<Image>.from(json["images"].map((x) => Image.fromJson(x))),
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
        isHiddenByAdmin: json["isHiddenByAdmin"],
        isApproved: json["isApproved"],
        isPublished: json["isPublished"],
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
        "isHiddenByAdmin": isHiddenByAdmin,
        "isApproved": isApproved,
        "isPublished": isPublished,
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

class Image {
  String url;
  String id;

  Image({
    required this.url,
    required this.id,
  });

  factory Image.fromJson(Map<String, dynamic> json) => Image(
        url: json["url"],
        id: json["_id"],
      );

  Map<String, dynamic> toJson() => {
        "url": url,
        "_id": id,
      };
}

class Member {
  String id;
  dynamic broker;
  String email;
  String profileImage;
  // bool isAccountSuspended;
  // String role;
  // List<dynamic> permissions;
  // String deviceId;
  DateTime createdAt;
  DateTime updatedAt;
  // int v;
  String firstName;
  String lastName;
  String phone;

  Member({
    required this.id,
    required this.broker,
    required this.email,
    required this.profileImage,
    // required this.isAccountSuspended,
    // required this.role,
    // required this.permissions,
    // required this.deviceId,
    required this.createdAt,
    required this.updatedAt,
    // required this.v,
    required this.firstName,
    required this.lastName,
    required this.phone,
  });

  factory Member.fromJson(Map<String, dynamic> json) => Member(
        id: json["_id"],
        broker: json["broker"],
        email: json["email"],
        profileImage: json["profile_image"],
        // isAccountSuspended: json["isAccountSuspended"],
        // role: json["role"],
        // permissions: List<dynamic>.from(json["permissions"].map((x) => x)),
        // deviceId: json["deviceId"]??"",
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        // v: json["__v"],
        firstName: json["firstName"],
        lastName: json["lastName"],
        phone: json["phone"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "broker": broker,
        "email": email,
        "profile_image": profileImage,
        // "isAccountSuspended": isAccountSuspended,
        // "role": role,
        // "permissions": List<dynamic>.from(permissions.map((x) => x)),
        // "deviceId": deviceId,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        // "__v": v,
        "firstName": firstName,
        "lastName": lastName,
        "phone": phone,
      };
}
