// To parse this JSON data, do
//
//     final userModel = userModelFromJson(jsonString);

import 'dart:convert';

UserModel userModelFromJson(String str) => UserModel.fromJson(json.decode(str));

String userModelToJson(UserModel data) => json.encode(data.toJson());

class UserModel {
    String id;
    dynamic broker;
    String email;
    String profileImage;
    // bool isAccountSuspended;
    String role;
    // List<dynamic> permissions;
    // String deviceId;
    DateTime createdAt;
    DateTime updatedAt;
    // int v;
    String firstName;
    String lastName;
    dynamic phone;

    UserModel({
        required this.id,
        required this.broker,
        required this.email,
        required this.profileImage,
        // required this.isAccountSuspended,
        required this.role,
        // required this.permissions,
        // required this.deviceId,
        required this.createdAt,
        required this.updatedAt,
        // required this.v,
        required this.firstName,
        required this.lastName,
        required this.phone,
    });

    factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json["_id"],
        broker: json["broker"],
        email: json["email"],
        profileImage: json["profile_image"],
        // isAccountSuspended: json["isAccountSuspended"],
        role: json["role"],
        // permissions: List<dynamic>.from(json["permissions"].map((x) => x)),
        // deviceId: json["deviceId"],
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
