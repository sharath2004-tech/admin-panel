import 'dart:convert';

import 'package:flutter/material.dart';
import '../const/setting.dart';
import '../model/owners/owners.dart';
import 'package:http/http.dart' as http;
import '../model/owners/owners_properties.dart';
import '../utils/exception.dart';

class OwnersProvider with ChangeNotifier {
  //
  //Owners
  //
  final List<OwnersModel> _owners = [];
  List<OwnersModel> get owners => [..._owners];

  //
  //Owners Properties
  //
  final List<OwnersProperties> _ownersProperties = [];
  List<OwnersProperties> get ownersProperties => [..._ownersProperties];

  Future getOwners() async {
    String url = "${AppConst.baseUrl}/owner/user/home-page";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final data = ownersModelFromJson(response.body);
        _owners.clear();
        _owners.addAll(data);
      } else {
        throw CustomException(message: decodedData["message"]);
      }
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  Future getOwnersProperties({required String ownerID}) async {
    String url = "${AppConst.baseUrl}/property/owner/user/$ownerID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final data = ownersPropertiesModelFromJson(response.body);
        _ownersProperties.clear();
        _ownersProperties.addAll(data.pagination.data);
      } else {
        throw CustomException(message: decodedData["message"]);
      }
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }
}
