// To parse this JSON data, do
//
//     final allRatingModel = allRatingModelFromJson(jsonString);

import 'dart:convert';

AllRatingModel allRatingModelFromJson(String str) =>
    AllRatingModel.fromJson(json.decode(str));

String allRatingModelToJson(AllRatingModel data) => json.encode(data.toJson());

class AllRatingModel {
  double average;
  Counts counts;
  Pagination pagination;

  AllRatingModel({
    required this.average,
    required this.counts,
    required this.pagination,
  });

  factory AllRatingModel.fromJson(Map<String, dynamic> json) => AllRatingModel(
        average: json["average"]?.toDouble(),
        counts: Counts.fromJson(json["counts"]),
        pagination: Pagination.fromJson(json["pagination"]),
      );

  Map<String, dynamic> toJson() => {
        "average": average,
        "counts": counts.toJson(),
        "pagination": pagination.toJson(),
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

class Pagination {
  List<RatingData> data;
  dynamic page;
  dynamic perPage;
  int totalRatings;
  int totalPages;
  bool hasNextPage;
  bool hasPrevPage;

  Pagination({
    required this.data,
    required this.page,
    required this.perPage,
    required this.totalRatings,
    required this.totalPages,
    required this.hasNextPage,
    required this.hasPrevPage,
  });

  factory Pagination.fromJson(Map<String, dynamic> json) => Pagination(
        data: List<RatingData>.from(
            json["data"].map((x) => RatingData.fromJson(x))),
        page: json["page"],
        perPage: json["perPage"],
        totalRatings: json["totalRatings"],
        totalPages: json["totalPages"],
        hasNextPage: json["hasNextPage"],
        hasPrevPage: json["hasPrevPage"],
      );

  Map<String, dynamic> toJson() => {
        "data": List<dynamic>.from(data.map((x) => x.toJson())),
        "page": page,
        "perPage": perPage,
        "totalRatings": totalRatings,
        "totalPages": totalPages,
        "hasNextPage": hasNextPage,
        "hasPrevPage": hasPrevPage,
      };
}

class RatingData {
  String id;
  User user;
  String property;
  String review;
  int rate;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  RatingData({
    required this.id,
    required this.user,
    required this.property,
    required this.review,
    required this.rate,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  });

  factory RatingData.fromJson(Map<String, dynamic> json) => RatingData(
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

class User {
  String profileImage;
  String id;
  dynamic broker;
  String firstName;
  String lastName;
  String email;
  String phone;
  bool? isVerified;
  bool isAccountSuspended;
  String role;
  List<dynamic> permissions;
  int v;
  DateTime? createdAt;
  DateTime? updatedAt;

  User({
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
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
        profileImage: json["profile_image"],
        id: json["_id"],
        broker: json["broker"],
        firstName: json["firstName"],
        lastName: json["lastName"],
        email: json["email"],
        phone: json["phone"],
        isVerified: json["isVerified"],
        isAccountSuspended: json["isAccountSuspended"],
        role: json["role"],
        permissions: List<dynamic>.from(json["permissions"].map((x) => x)),
        v: json["__v"],
        createdAt: json["createdAt"] != null
            ? DateTime.parse(json["createdAt"])
            : null,
        updatedAt: json["updatedAt"] != null
            ? DateTime.parse(json["updatedAt"])
            : null,
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
        "createdAt": createdAt!.toIso8601String(),
        "updatedAt": updatedAt!.toIso8601String(),
      };
}
