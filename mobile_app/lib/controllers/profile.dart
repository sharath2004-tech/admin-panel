// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/auth.dart';
import 'package:real_estate/utils/exception.dart';
import '../const/setting.dart';
import '../model/subscription/active.dart';
import '../model/subscription/free_quota.dart';
import '../model/subscription/history.dart';
import '../model/user.dart';
import 'package:http/http.dart' as http;

class ProfileProvider with ChangeNotifier {
  //
  //UserData
  //
  final List<UserModel> _user = [];
  List<UserModel> get user => [..._user];
//
//Active subscription
//
  final List<ActiveSubscriptionModel> _activeSubscription = [
    // ActiveSubscriptionModel(
    //     id: "65046398b72317842afa4819",
    //     package: Packagee(
    //         name: "Basic",
    //         description: "bacsic listing package",
    //         maxListingsAllowed: 30,
    //         remining: 28,
    //         price: 100,
    //         id: "650462ff3a742a87215530cb",
    //         createdAt: DateTime.now(),
    //         updatedAt: DateTime.now()),
    //     broker: Broker(
    //         freeListingQuotaRemaining: 0,
    //         id: "64d8ac543c6003a7968d03cc",
    //         name: "Teshay RealEstate Broker",
    //         logo:
    //             "https://res.cloudinary.com/dxrvoxbvu/image/upload/v1691921479/bafzib8l26eeqmrthh1f.png",
    //         address: "addis abeba ethiopia",
    //         phone: 2519336699,
    //         email: "tsehay@gmail.com",
    //         freeListingQuota: 0,
    //         createdAt: DateTime.now(),
    //         updatedAt: DateTime.now(),
    //         v: 0),
    //     isActive: true,
    //     status: "APPROVED")
  ];

  List<ActiveSubscriptionModel> get activeSubscription =>
      [..._activeSubscription];

  //
// Subscription History
//
  final List<SubscriptionHistoryModel> _subscriptionHistory = [];

  List<SubscriptionHistoryModel> get subscriptionHistory =>
      [..._subscriptionHistory];

  //
  //Free Quota
  //

  final List<FreeQuotaModel> _freeQuota = [];

  List<FreeQuotaModel> get freeQuota => [..._freeQuota];

  clearProfileData() {
    _user.clear();
  }
  //
  //
  //

  Future getProfile(
      {required BuildContext context, required String userID}) async {
    String url = "${AppConst.baseUrl}/users/profile/$userID";
    try {
      http.Response response = await http.get(Uri.parse(url));

      if (response.statusCode != 200) {
        Provider.of<AuthProvider>(context, listen: false).signOut();
      } else {
        final data = userModelFromJson(response.body);

        _user.clear();
        _user.addAll([data]);
        notifyListeners();
      }
    } catch (_) {
      rethrow;
    }
  }

  //
  //Update Profile
  //
  Future updateProfile({
    required BuildContext context,
    required String userID,
    required String fName,
    required String lName,
    required XFile? image,
  }) async {
    String url = "${AppConst.baseUrl}/users/profile/update/$userID";

    try {
      final request = http.MultipartRequest("PUT", Uri.parse(url));
      request.headers["Content-Type"] = "application/json";
      request.fields["firstName"] = fName;
      request.fields["lastName"] = lName;
      if (image != null) {
        request.files.add(
            await http.MultipartFile.fromPath('image', image.path));
      }

      final response = await request.send();
      var responseBody = await (response.stream.bytesToString());
      var decodedData = jsonDecode(responseBody);
      // print(decodedData);
      if (response.statusCode != 200) {
        throw CustomException(message: decodedData["message"]);
      } else {
        await getProfile(context: context, userID: userID);
      }
    } catch (_) {
      rethrow;
    }
  }

  //
  //
  //
  Future updatePassword({
    required String userID,
    required String oldPassword,
    required String newPassword,
  }) async {
    String url = "${AppConst.baseUrl}/auth/change-password/$userID";
    try {
      http.Response response = await http.put(Uri.parse(url),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(
              {"oldPassword": oldPassword, "newPassword": newPassword}));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode != 200) {
        throw CustomException(message: decodedData["message"]);
      } else {}
    } catch (_) {
      rethrow;
    }
  }

  //
  //
  //

  Future requestToBeComeBroker(
      {required String userID,
      required String companyName,
      required XFile image,
      required String address,
      required String phone,
      required String email}) async {
    String url = "${AppConst.baseUrl}/broker-request/new";
    try {
      final request = http.MultipartRequest("POST", Uri.parse(url));
      // request.headers["Content-Type"] = "application/json";
      request.fields["user"] = userID;
      request.fields["companyName"] = companyName;
      request.fields["address"] = address;
      request.fields["phone"] = phone;
      request.fields["email"] = email;
      request.files.add(await http.MultipartFile.fromPath('logo', image.path));

      final response = await request.send();
      var responseBody = await (response.stream.bytesToString());
      var decodedData = jsonDecode(responseBody);
      if (response.statusCode != 201) {
        throw CustomException(message: decodedData["message"]);
      } else {}
    } catch (_) {
      rethrow;
    }
  }

  //
  //
  //

  Future getActiveSubscription({required String brokerID}) async {
    String url =
        "${AppConst.baseUrl}/broker-packages/my-active-packages/$brokerID";
    try {
      http.Response response = await http.get(Uri.parse(url));
      final decodedData = jsonDecode(response.body);
      if (response.statusCode != 200) {
        throw CustomException(message: decodedData["message"]);
      } else {
        _activeSubscription.clear();
        _freeQuota.clear();
        if (decodedData["status"] != null) {
          final data = activeSubscriptionModelFromJson(response.body);
          _activeSubscription.addAll([data]);
        } else {
          final data = freeQuotaModelFromJson(response.body);
          _freeQuota.addAll([data]);
        }
      }
    } catch (_) {
      rethrow;
    }
  }

  //
  //
  //

  Future getSubscriptionHistory({required String brokerID}) async {
    String url = "${AppConst.baseUrl}/broker-packages/broker/all/$brokerID";
    try {
      http.Response response = await http.get(Uri.parse(url));

      final decodedData = jsonDecode(response.body);
      if (response.statusCode != 200) {
        throw CustomException(message: decodedData["message"]);
      } else {
        _subscriptionHistory.clear();
        final data = subscriptionHistoryModelFromJson(response.body);
        _subscriptionHistory.addAll([data]);
      }
    } catch (_) {
      rethrow;
    }
  }
}
