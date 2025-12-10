// To parse this JSON data, do
//
//     final ownersModel = ownersModelFromJson(jsonString);

import 'dart:convert';

List<OwnersModel> ownersModelFromJson(String str) => List<OwnersModel>.from(json.decode(str).map((x) => OwnersModel.fromJson(x)));

String ownersModelToJson(List<OwnersModel> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class OwnersModel {
    String id;
    String name;
    String logo;
    String address;
    String phone;
    String email;
    DateTime createdAt;
    DateTime updatedAt;
    int v;

    OwnersModel({
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

    factory OwnersModel.fromJson(Map<String, dynamic> json) => OwnersModel(
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
