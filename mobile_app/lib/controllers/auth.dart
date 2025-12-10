import 'dart:convert';

import 'package:device_uuid/device_uuid.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
// import 'package:platform_device_id/platform_device_id.dart';
import '../const/setting.dart';
import '../utils/exception.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  String? userId;
  String? role;
  String? brokerID;
  String? deviceID;
  String? token;

  // Future<void> onBoardingStatus() async {
  //   var prefs = await SharedPreferences.getInstance();

  //   if (prefs.getString("firstTime") != null) {
  //     onBoarding = false;
  //   } else {
  //     onBoarding = true;
  //   }
  // }

  //
  //Check Then assign userId and token
  //
  Future getUserAndToken() async {
    var prefs = await SharedPreferences.getInstance();
    // deviceID = await PlatformDeviceId.getDeviceId;
    // print(deviceID);
    if (prefs.getString("LocalToken") != null &&
        prefs.getString("LocalUserId") != null) {
      userId = prefs.getString("LocalUserId");
      role = prefs.getString("Role");
      brokerID = prefs.getString("BrokerID");
      token = prefs.getString("LocalToken");
      // notifyListeners();
    } else {
      prefs.remove("LocalUserId");
      prefs.remove("LocalToken");
      prefs.remove("Role");
      prefs.remove("BrokerID");
      userId = null;
      role = null;
      token = null;
      brokerID = null;
      // notifyListeners();
    }
  }

  //
  //Check token status
  //

  Future<bool> get authStatus async {
    var prefs = await SharedPreferences.getInstance();

    if (prefs.getString("LocalToken") != null &&
        prefs.getString("LocalUserId") != null) {
      return true;
    }
    return false;
  }

//
//Sign In
//
  Future<void> signIn({required String email, required String password}) async {
    var url = "${AppConst.baseUrl}/auth/login";
    deviceID = await DeviceUuid().getUUID();
    // print(deviceID);
    try {
      http.Response response = await http.post(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode(
            {"email": email, "password": password, "deviceId": deviceID}),
      );

      var decodedBody = jsonDecode(response.body);

      if (response.statusCode != 201) {
        throw CustomException(message: decodedBody["message"]);
      } else {
        var prefs = await SharedPreferences.getInstance();
        prefs.setString("LocalUserId", decodedBody["user"]["_id"]);
        prefs.setString("Role", decodedBody["user"]["role"]);
        if (decodedBody["user"]["role"] != "User") {
          if (decodedBody["user"]["broker"] != null) {
            prefs.setString("BrokerID", decodedBody["user"]["broker"]);
          } else if (decodedBody["user"]["Agent"] != null) {
          } else {
            throw CustomException(message: "User Not Found.");
          }
        }
        prefs.setString("LocalToken", decodedBody['token']);
        await getUserAndToken();
        // notifyListeners();
      }
    } catch (e) {
      rethrow;
    }
  }

  //
  //
  //
  Future<void> emailAuth({required String email}) async {
    var url = "${AppConst.baseUrl}/auth/signup";

    try {
      http.Response response = await http.post(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({"email": email}),
      );
      var decodedBody = jsonDecode(response.body);
      // print(response.body);
      if (response.statusCode != 201) {
        throw CustomException(message: decodedBody["message"]);
      } else {}
    } catch (e) {
      rethrow;
    }
  }

  //
  //Verify Email
  //

  Future<void> verifyEmail(
      {required String email,
      required String code,
      required bool isRegister}) async {
    var url = isRegister
        ? "${AppConst.baseUrl}/auth/verify-otp"
        : "${AppConst.baseUrl}/auth/forgot-password/verify-otp";

    try {
      http.Response response = await http.post(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({"email": email, "code": code}),
      );
      var decodedBody = jsonDecode(response.body);
      if (response.statusCode != 201) {
        throw CustomException(message: decodedBody["message"]);
      } else {}
    } catch (e) {
      rethrow;
    }
  }

  //
  //Sign Up
  //
  Future<void> signUp(
      {required String firstName,
      required String lastName,
      required String phone,
      required String email,
      required String password}) async {
    var url = "${AppConst.baseUrl}/auth/finish-signup";

    deviceID = await DeviceUuid().getUUID();
    try {
      http.Response response = await http.put(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          "phone": phone,
          "email": email,
          "firstName": firstName,
          "lastName": lastName,
          "password": password,
          "deviceId": deviceID
        }),
      );
      var decodedBody = jsonDecode(response.body);
      if (response.statusCode != 200) {
        throw CustomException(message: decodedBody["message"]);
      } else {}
    } catch (e) {
      rethrow;
    }
  }

  //
  //
  //
  Future<void> forgotPassword({required String email}) async {
    var url = "${AppConst.baseUrl}/auth/forgot-password";

    try {
      http.Response response = await http.post(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({"email": email}),
      );

      var decodedBody = jsonDecode(response.body);
      if (response.statusCode != 201) {
        throw CustomException(message: decodedBody["message"]);
      } else {}
    } catch (e) {
      rethrow;
    }
  }

  //
  //
  //
  Future<void> newPassword(
      {required String email, required String password}) async {
    var url = "${AppConst.baseUrl}/auth/forgot-password/set-new-password";

    try {
      http.Response response = await http.put(
        Uri.parse(url),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({"email": email, "password": password}),
      );
      var decodedBody = jsonDecode(response.body);

      if (response.statusCode != 200) {
        throw CustomException(message: decodedBody["message"]);
      } else {}
    } catch (e) {
      rethrow;
    }
  }

  //
  //SignOut
  //
  Future<void> signOut() async {
    var prefs = await SharedPreferences.getInstance();
    prefs.remove("LocalUserId");
    prefs.remove("LocalToken");
    prefs.remove("Role");

    prefs.remove("BrokerID");
    userId = null;
    role = null;
    token = null;
    brokerID = null;
    notifyListeners();
  }
}
