// To parse this JSON data, do
//
//     final freeQuotaModel = freeQuotaModelFromJson(jsonString);

import 'dart:convert';

FreeQuotaModel freeQuotaModelFromJson(String str) => FreeQuotaModel.fromJson(json.decode(str));

String freeQuotaModelToJson(FreeQuotaModel data) => json.encode(data.toJson());

class FreeQuotaModel {
    String id;
    String name;
    String logo;
    String address;
    int phone;
    String email;
    int freeListingQuota;
    int freeListingQuotaRemaining;
    DateTime createdAt;
    DateTime updatedAt;
    int v;

    FreeQuotaModel({
        required this.id,
        required this.name,
        required this.logo,
        required this.address,
        required this.phone,
        required this.email,
        required this.freeListingQuota,
        required this.freeListingQuotaRemaining,
        required this.createdAt,
        required this.updatedAt,
        required this.v,
    });

    factory FreeQuotaModel.fromJson(Map<String, dynamic> json) => FreeQuotaModel(
        id: json["_id"],
        name: json["name"],
        logo: json["logo"],
        address: json["address"],
        phone: json["phone"],
        email: json["email"],
        freeListingQuota: json["freeListingQuota"],
        freeListingQuotaRemaining: json["freeListingQuotaRemaining"],
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
        "freeListingQuotaRemaining": freeListingQuotaRemaining,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
        "__v": v,
    };
}
