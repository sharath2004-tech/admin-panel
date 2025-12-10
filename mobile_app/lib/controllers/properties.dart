import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:real_estate/model/rating.dart';
import 'package:real_estate/model/type.dart';
import '../const/setting.dart';
import '../model/broker_properties.dart';
import '../model/properties.dart';
import 'package:http/http.dart' as http;
import '../model/properties_type.dart';
import '../model/property_detail.dart';
import '../utils/exception.dart';

class PropertiesProvider with ChangeNotifier {
  int _totalPage = 1;
  int get totalPage => _totalPage;

  int _totalProperties = 0;
  int get totalProperties => _totalProperties;

  clearByTypeData() {
    _propertiesByType.clear();
  }

  clearFeatured() {
    _featuredProp.clear();
  }

  clearRecentListings() {
    _recentListings.clear();
  }

  clearPropertiesType() {
    _propertType.clear();
  }

  clearAllRating() {
    _allRating.clear();
  }

  clearFiltered() {
    _filterProps.clear();
  }

  final List<PropertyByTypeData> _propertiesByType = [];
  List<PropertyByTypeData> get propertiesByType => [..._propertiesByType];
  //property Types
  final List<PropertyTypeModel> _propertType = [];

  List<PropertyTypeModel> get propertType => [..._propertType];

  // featured properies
  final List<PropertiesData> _featuredProp = [];
  List<PropertiesData> get featuredProp => [..._featuredProp];

  // recent listing
  final List<PropertiesData> _recentListings = [];
  List<PropertiesData> get recentListings => [..._recentListings];

  //Property Details
  final List<PropertyDetailModel> _propertyDetail = [];
  List<PropertyDetailModel> get propertyDetail => [..._propertyDetail];

  //Filtered Properties
  final List<PropertiesData> _filterProps = [];
  List<PropertiesData> get filterProps => [..._filterProps];

  //All rating

  final List<AllRatingModel> _allRating = [];
  List<AllRatingModel> get allRating => [..._allRating];

//Sort
  void sortByPopular(bool isFeatured, bool isRecent) {
    if (isFeatured) {
      _featuredProp.sort((a, b) => b.views.compareTo(a.views));
    } else if (isRecent) {
      _recentListings.sort((a, b) => b.views.compareTo(a.views));
    }
    _propertiesByType.sort((a, b) => b.views.compareTo(a.views));
  }

  void sortByNewest(bool isFeatured, bool isRecent) {
    if (isFeatured) {
      _featuredProp.sort((a, b) => b.createdAt.compareTo(a.createdAt));
    } else if (isRecent) {
      _recentListings.sort((a, b) => b.createdAt.compareTo(a.createdAt));
    }
    _propertiesByType.sort((a, b) => b.createdAt.compareTo(a.createdAt));
  }

  void sortByPriceLowest(bool isFeatured, bool isRecent) {
    if (isFeatured) {
      _featuredProp.sort((a, b) => a.price.compareTo(b.price));
    } else if (isRecent) {
      _recentListings.sort((a, b) => a.price.compareTo(b.price));
    }
    _propertiesByType.sort((a, b) => a.price.compareTo(b.price));
  }

  void sortByPriceHighest(bool isFeatured, bool isRecent) {
    if (isFeatured) {
      _featuredProp.sort((a, b) => b.price.compareTo(a.price));
    } else if (isRecent) {
      _recentListings.sort((a, b) => b.price.compareTo(a.price));
    }
    _propertiesByType.sort((a, b) => b.price.compareTo(a.price));
  }

  final List<BrokerPropertiesData> _brokerProperties = [];
  List<BrokerPropertiesData> get brokerProperties => [..._brokerProperties];
  Future getPropertyTypes() async {
    String url = "${AppConst.baseUrl}/property-type/user";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final data = propertyTypeModelFromJson(response.body);
        _propertType.clear();
        _propertType.addAll(data);
      } else {
        throw CustomException(message: decodedData["message"]);
      }
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  Future getFeaturedProperties(
      {required int page, required bool isFromHome}) async {
    String url = "${AppConst.baseUrl}/property/featured/user/all?page=$page";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        if (isFromHome) {
          _featuredProp.clear();
        }
        final data = propertiesModelFromJson(response.body);
        _totalPage = decodedData["pagination"]["totalPages"];
        _totalProperties = data.pagination.totalProperties.toInt();
        _featuredProp.addAll(data.pagination.data);

        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (e) {
      rethrow;
    }
  }

  Future getRecentListings(
      {required int page, required bool isFromHome}) async {
    String url = "${AppConst.baseUrl}/property/latest/user/all?page=$page";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final data = propertiesModelFromJson(response.body);
        if (isFromHome) {
          _recentListings.clear();
        }
        _recentListings.addAll(data.pagination.data);
        _totalPage = decodedData["pagination"]["totalPages"];
        _totalProperties = data.pagination.totalProperties.toInt();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  Future getPropertyDetail({required String propID}) async {
    String url = "${AppConst.baseUrl}/property/detail/user/$propID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);

      if (response.statusCode == 200) {
        final data = propertyDetailModelFromJson(response.body);
        _propertyDetail.clear();
        _propertyDetail.addAll([data]);
        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (e) {
      rethrow;
    }
  }

  Future getBrokerProperties(
      {required bool isBroker, required String propID}) async {
    String url = isBroker
        ? "${AppConst.baseUrl}/property/broker/user/$propID"
        : "${AppConst.baseUrl}/property/agent/user/$propID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final data = brokerPropertiesModelFromJson(response.body);
        _brokerProperties.clear();
        _brokerProperties.addAll(data.pagination.data);
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (e) {
      rethrow;
    }
  }

  Future getPropertiesByType(
      {required String typeID, required int page}) async {
    String url =
        "${AppConst.baseUrl}/property/property-type/user/$typeID?page=$page";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        _totalPage = decodedData["pagination"]["totalPages"];

        final data = propertiesByTypeModelFromJson(response.body);
        _totalProperties = data.pagination.totalProperties.toInt();
        _propertiesByType.addAll(data.pagination.data);
        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (e) {
      rethrow;
    }
  }

  Future filterProperties({
    required int page,
    required String lookingFor,
    required String propType,
    required String owner,
    required double minPrice,
    required double maxPrice,
    required int bath,
    required int bed,
    required int area,
  }) async {
    String url =
        "${AppConst.baseUrl}/property/filter/user?propertyType=$lookingFor&propertyHomeType=$propType&owner=$owner&maxPrice=$maxPrice&minPrice=$minPrice&bathroom=$bath&bedroom=$bed&area=$area&page=$page";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final data = propertiesModelFromJson(response.body);

        _filterProps.addAll(data.pagination.data);
        _totalPage = decodedData["pagination"]["totalPages"];
        _totalProperties = data.pagination.totalProperties.toInt();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
      notifyListeners();
    } catch (e) {
      rethrow;
    }
    //{{dev}}
  }

  Future rateProperty(
      {required String propertyID,
      required String userID,
      required String review,
      required int rate}) async {
    var url = "${AppConst.baseUrl}/rating";
    try {
      http.Response response = await http.post(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          "property": propertyID,
          "user": userID,
          "review": review,
          "rate": rate
        }),
      );
      var decodedBody = jsonDecode(response.body);

      if (response.statusCode != 201) {
        throw CustomException(message: decodedBody["message"]);
      } else {
        getPropertyDetail(propID: propertyID);
      }
    } catch (e) {
      rethrow;
    }
  }

  Future getAllRatedAndReviews(
      {required String propertyID, required int page}) async {
    String url =
        "${AppConst.baseUrl}/rating/property/all/$propertyID?page=$page";

    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        _totalPage = decodedData["pagination"]["totalPages"];

        final data = allRatingModelFromJson(response.body);
        _totalProperties = data.pagination.totalRatings.toInt();
        _allRating.addAll([data]);
        notifyListeners();
      } else {
        throw CustomException(message: decodedData["message"]);
      }
    } catch (e) {
      rethrow;
    }
  }

  Future reportProperty({
    required String userID,
    required String propertyID,
    required String message,
  }) async {
    String url = "${AppConst.baseUrl}/report/property/user";

    try {
      http.Response response = await http.post(Uri.parse(url),
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonEncode({
            "user": userID,
            "discription": message,
            "property": propertyID
          }));

      final decodedData = jsonDecode(response.body);
      if (response.statusCode != 201) {
        throw CustomException(message: decodedData["message"]);
      } else {}
    } catch (e) {
      rethrow;
    }
  }

//
}
