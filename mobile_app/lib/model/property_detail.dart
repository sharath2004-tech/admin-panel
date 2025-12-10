// To parse this JSON data, do
//
//     final propertyDetailModel = propertyDetailModelFromJson(jsonString);

import 'dart:convert';

PropertyDetailModel propertyDetailModelFromJson(String str) =>
    PropertyDetailModel.fromJson(json.decode(str));

String propertyDetailModelToJson(PropertyDetailModel data) =>
    json.encode(data.toJson());

class PropertyDetailModel {
  SinglePropertyModel property;
  PropertyRating propertyRating;
  List<Ad> ads;
  List<Related> related;

  PropertyDetailModel({
    required this.property,
    required this.propertyRating,
    required this.ads,
    required this.related,
  });

  factory PropertyDetailModel.fromJson(Map<String, dynamic> json) =>
      PropertyDetailModel(
        property: SinglePropertyModel.fromJson(json["property"]),
        propertyRating: PropertyRating.fromJson(json["propertyRating"]),
        ads: List<Ad>.from(json["ads"].map((x) => Ad.fromJson(x))),
        related:
            List<Related>.from(json["related"].map((x) => Related.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "property": property.toJson(),
        "propertyRating": propertyRating.toJson(),
        "ads": List<dynamic>.from(ads.map((x) => x.toJson())),
        "related": List<dynamic>.from(related.map((x) => x.toJson())),
      };
}

class SinglePropertyModel {
  String id;
  Broker? broker;
  String poster;
  String name;
  List<ImageModel> images;
  dynamic videoTour;
  int price;
  String currency;
  String description;
  String paymentDescription;
  String propertyType;
  PropertyHomeType propertyHomeType;
  Owner owner;
  Agent agent;
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

  SinglePropertyModel({
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

  factory SinglePropertyModel.fromJson(Map<String, dynamic> json) =>
      SinglePropertyModel(
        id: json["_id"],
        broker: json["broker"] != null ? Broker.fromJson(json["broker"]) : null,
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
        propertyHomeType: PropertyHomeType.fromJson(json["propertyHomeType"]),
        owner: Owner.fromJson(json["owner"]),
        agent: Agent.fromJson(json["agent"]),
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
        isRemoved: json["isRemoved"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "broker": broker!.toJson(),
        "poster": poster,
        "name": name,
        "images": List<dynamic>.from(images.map((x) => x.toJson())),
        "VideoTour": videoTour,
        "price": price,
        "currency": currency,
        "description": description,
        "paymentDescription": paymentDescription,
        "propertyType": propertyType,
        "propertyHomeType": propertyHomeType.toJson(),
        "owner": owner.toJson(),
        "agent": agent.toJson(),
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

class Agent {
  String id;
  String? broker;
  User user;
  String whatsappNumber;
  bool isInHouseAgent;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  Agent({
    required this.id,
    required this.broker,
    required this.user,
    required this.isInHouseAgent,
    required this.whatsappNumber,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory Agent.fromJson(Map<String, dynamic> json) => Agent(
        id: json["_id"],
        broker: json["broker"] ?? "",
        user: User.fromJson(json["user"]),
        isInHouseAgent: json["isInHouseAgent"],
         whatsappNumber: json["whatsappNumber"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "broker": broker,
        "user": user.toJson(),
        "isInHouseAgent": isInHouseAgent,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class User {
  String profileImage;
  String id;
  dynamic broker;
  String firstName;
  String lastName;
  String email;
  String phone;
  // bool? isVerified;
  // bool isAccountSuspended;
  // String role;
  // List<dynamic> permissions;
  // int v;

  User({
    required this.profileImage,
    required this.id,
    required this.broker,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phone,
    // required this.isVerified,
    // required this.isAccountSuspended,
    // required this.role,
    // required this.permissions,
    // required this.v,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
        profileImage: json["profile_image"],
        id: json["_id"],
        broker: json["broker"],
        firstName: json["firstName"],
        lastName: json["lastName"],
        email: json["email"],
        phone: json["phone"],
        // isVerified: json["isVerified"],
        // isAccountSuspended: json["isAccountSuspended"],
        // role: json["role"],
        // permissions: List<dynamic>.from(json["permissions"].map((x) => x)),
        // v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "profile_image": profileImage,
        "_id": id,
        "broker": broker,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phone": phone,
        // "isVerified": isVerified,
        // "isAccountSuspended": isAccountSuspended,
        // "role": role,
        // "permissions": List<dynamic>.from(permissions.map((x) => x)),
        // "__v": v,
      };
}

class Broker {
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

class PropertyHomeType {
  String id;
  String name;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  PropertyHomeType({
    required this.id,
    required this.name,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory PropertyHomeType.fromJson(Map<String, dynamic> json) =>
      PropertyHomeType(
        id: json["_id"],
        name: json["name"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "name": name,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

// class Amenities {
//   String id;
//   String name;
//   DateTime createdAt;
//   DateTime updatedAt;
//   int v;

//   Amenities({
//     required this.id,
//     required this.name,
//     required this.createdAt,
//     required this.updatedAt,
//     required this.v,
//   });

//   factory Amenities.fromJson(Map<String, dynamic> json) => Amenities(
//         id: json["_id"],
//         name: json["name"],
//         createdAt: DateTime.parse(json["createdAt"]),
//         updatedAt: DateTime.parse(json["updatedAt"]),
//         v: json["__v"],
//       );

//   Map<String, dynamic> toJson() => {
//         "_id": id,
//         "name": name,
//         "createdAt": createdAt.toIso8601String(),
//         "updatedAt": updatedAt.toIso8601String(),
//         "__v": v,
//       };
// }

class Ad {
  String id;
  String title;
  String? broker;
  String? owner;
  String? payment;
  String image;
  DateTime startDate;
  DateTime endDate;
  bool isEdited;
  bool isApproved;
  bool isRejected;
  String status;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  Ad({
    required this.id,
    required this.title,
    required this.broker,
    required this.owner,
    required this.payment,
    required this.image,
    required this.startDate,
    required this.endDate,
    required this.isEdited,
    required this.isApproved,
    required this.isRejected,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory Ad.fromJson(Map<String, dynamic> json) => Ad(
        id: json["_id"],
        title: json["title"],
        broker: json["broker"] ?? "",
        owner: json["owner"] ?? "",
        payment: json["payment"] ?? "",
        image: json["image"],
        startDate: DateTime.parse(json["startDate"]),
        endDate: DateTime.parse(json["endDate"]),
        isEdited: json["isEdited"],
        isApproved: json["isApproved"],
        isRejected: json["isRejected"],
        status: json["status"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "title": title,
        "broker": broker,
        "owner": owner,
        "payment": payment,
        "image": image,
        "startDate": startDate.toIso8601String(),
        "endDate": endDate.toIso8601String(),
        "isEdited": isEdited,
        "isApproved": isApproved,
        "isRejected": isRejected,
        "status": status,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
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

class Owner {
  String id;
  String name;
  String logo;
  String address;
  String phone;
  String email;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  Owner({
    required this.id,
    required this.name,
    required this.logo,
    required this.address,
    required this.phone,
    required this.email,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory Owner.fromJson(Map<String, dynamic> json) => Owner(
        id: json["_id"],
        name: json["name"],
        logo: json["logo"],
        address: json["address"],
        phone: json["phone"],
        email: json["email"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "name": name,
        "logo": logo,
        "address": address,
        "phone": phone,
        "email": email,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class PropertyRating {
  List<GetAllRating> getAllRatings;
  int totalRatings;
  double average;
  Counts counts;

  PropertyRating({
    required this.getAllRatings,
    required this.totalRatings,
    required this.average,
    required this.counts,
  });

  factory PropertyRating.fromJson(Map<String, dynamic> json) => PropertyRating(
        getAllRatings: List<GetAllRating>.from(
            json["getAllRatings"].map((x) => GetAllRating.fromJson(x))),
        totalRatings: json["totalRatings"],
        average: json["average"]?.toDouble(),
        counts: Counts.fromJson(json["counts"]),
      );

  Map<String, dynamic> toJson() => {
        "getAllRatings":
            List<dynamic>.from(getAllRatings.map((x) => x.toJson())),
        "totalRatings": totalRatings,
        "average": average,
        "counts": counts.toJson(),
      };
}

class Counts {
  int one;
  int two;
  int three;
  int four;
  int five;

  Counts({
    required this.one,
    required this.two,
    required this.three,
    required this.four,
    required this.five,
  });

  factory Counts.fromJson(Map<String, dynamic> json) => Counts(
        one: json["one"],
        two: json["two"],
        three: json["three"],
        four: json["four"],
        five: json["five"],
      );

  Map<String, dynamic> toJson() => {
        "one": one,
        "two": two,
        "three": three,
        "four": four,
        "five": five,
      };
}

class GetAllRating {
  String id;
  User user;
  String property;
  String review;
  int rate;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  GetAllRating({
    required this.id,
    required this.user,
    required this.property,
    required this.review,
    required this.rate,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory GetAllRating.fromJson(Map<String, dynamic> json) => GetAllRating(
        id: json["_id"],
        user: User.fromJson(json["user"]),
        property: json["property"],
        review: json["review"],
        rate: json["rate"],
        createdAt: DateTime.parse(json["createdAt"]),
        updatedAt: DateTime.parse(json["updatedAt"]),
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "user": user.toJson(),
        "property": property,
        "review": review,
        "rate": rate,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
      };
}

class Related {
  String id;
  dynamic broker;
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
  bool isRemoved;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  Related({
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

  factory Related.fromJson(Map<String, dynamic> json) => Related(
        id: json["_id"],
        broker: json["broker"],
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

class ImageModel {
  String url;
  String id;

  ImageModel({
    required this.url,
    required this.id,
  });

  factory ImageModel.fromJson(Map<String, dynamic> json) => ImageModel(
        url: json["url"],
        id: json["_id"],
      );

  Map<String, dynamic> toJson() => {
        "url": url,
        "_id": id,
      };
}
