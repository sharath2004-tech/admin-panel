import 'dart:convert';

import 'package:flutter/cupertino.dart';

import '../const/setting.dart';
import '../model/banner.dart';
import 'package:http/http.dart' as http;

import '../utils/exception.dart';

class BannerProvider with ChangeNotifier {
  final List<BannerModel> _banners = [];
  List<BannerModel> get banners => [..._banners];
  clearBanner() {
    _banners.clear();
  }

  Future getBanners() async {
    String url = "${AppConst.baseUrl}/ads/user/get-all-ads";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final data = bannerModelFromJson(response.body);
        _banners.clear();
        _banners.addAll(data);
      } else {
        throw CustomException(message: decodedData["message"]);
      }
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }
}
