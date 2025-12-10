import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../const/setting.dart';
import '../model/bookmark.dart';
import '../utils/exception.dart';

class BookmarkProvider with ChangeNotifier {
  bool isFavourite = false;
  List _favouritePropertyID = [];
  final List<Property> _favouritePropertyData = [];
  List<Property> get favouritePropertyData => [..._favouritePropertyData];

  cleanFavourite() {
    _favouritePropertyData.clear();
    _favouritePropertyID.clear();
  }

  void makeFavourite() {
    isFavourite = true;
    notifyListeners();
  }

  void removeFavourite(String propertyID) {
    isFavourite = false;
    if (_favouritePropertyID.firstWhere(
            (favProperty) => favProperty == propertyID,
            orElse: () => null) !=
        null) {
      _favouritePropertyID
          .removeWhere((favProperty) => favProperty == propertyID);
    }
    notifyListeners();
  }

  bool findPropertByID(String propertyID) {
    if (_favouritePropertyID.firstWhere(
            (favProperty) => favProperty == propertyID,
            orElse: () => null) ==
        null) {
      return false;
    } else {
      return true;
    }
  }

  Future<void> getFavouriteProperties({required String userID}) async {
    String url = "${AppConst.baseUrl}/favorite/user/$userID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      var decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        if (decodedData["properties"] == null) {}
        if (decodedData["properties"] != null) {
          _favouritePropertyID.clear();
          _favouritePropertyData.clear();
          final data = bookmarkModelFromJson(response.body);
          _favouritePropertyData.addAll(data.properties);
          for (var prop in _favouritePropertyData) {
            _favouritePropertyID.add(prop.id);
          }
        } else {}

        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (_) {
      rethrow;
    }
  }

  Future addToFavourite(String userID, String propertyID) async {
    String url = "${AppConst.baseUrl}/favorite/add/$userID";
    try {
      http.Response response = await http.put(Uri.parse(url),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: jsonEncode({
            "property": propertyID,
          }));
      final decodedData = jsonDecode(response.body);

      if (response.statusCode == 200) {
        _favouritePropertyID.clear();
        _favouritePropertyData.clear();
        await getFavouriteProperties(userID: userID);
        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (e) {
      rethrow;
    }
  }

  Future<void> removeFromFavourite(String userID, String propertyID) async {
    try {
      var url = "${AppConst.baseUrl}/favorite/remove/$userID";
      http.Response response = await http.put(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: jsonEncode({"property": propertyID}),
      );
      var decodedData = jsonDecode(response.body);

      if (response.statusCode == 200) {
        if (decodedData["success"] == true) {
          if (decodedData['data']["properties"] == null) {
            _favouritePropertyID = [];
          } else {
            _favouritePropertyID.clear();
            _favouritePropertyData.clear();
            await getFavouriteProperties(userID: userID);
          }
        }
      }
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }
}
