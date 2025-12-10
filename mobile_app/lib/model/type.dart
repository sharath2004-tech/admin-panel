// To parse this JSON data, do
//
//     final propertyTypeModel = propertyTypeModelFromJson(jsonString);

import 'dart:convert';

List<PropertyTypeModel> propertyTypeModelFromJson(String str) => List<PropertyTypeModel>.from(json.decode(str).map((x) => PropertyTypeModel.fromJson(x)));

String propertyTypeModelToJson(List<PropertyTypeModel> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class PropertyTypeModel {
    String id;
    String name;
    DateTime createdAt;
    DateTime updatedAt;
    int v;

    PropertyTypeModel({
        required this.id,
        required this.name,
        required this.createdAt,
        required this.updatedAt,
        required this.v,
    });

    factory PropertyTypeModel.fromJson(Map<String, dynamic> json) => PropertyTypeModel(
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
