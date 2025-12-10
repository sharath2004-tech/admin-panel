import 'package:flutter/material.dart';

class AppConst {
  static const String baseUrl = "YOUR_API_BASE_URL";
  static String oneSignalAppID = "YOUR_ONESIGNAL_APP_ID";
  static String appName = "Sharath";
  static String androidAppID = 'YOUR_ANDROID_APP_ID';
  static String iosAppID = 'YOUR_IOS_APP_ID';
  static String privacyPolicy = 'YOUR_PRIVACY_POLICY_URL';
  static String contactUsEmail = "YOUR_CONTACT_EMAIL";
  static String aboutUs = 'YOUR_ABOUT_US_TEXT';
}

class AppColor {
  static const Color primaryColor = Color(0xffDC2626);
  static const Color lightBackground = Color(0xfffef2f2); //0xffedf2f6
  static Color grey = Colors.grey.shade600;
  static const Color darkModeColor = Color(0xff1a1414); //0xff0f172a
}

List<String> reportChoices = [
  "Inappropriate Content",
  "Spam or Unwanted Ads",
  "Hate Speech or Symbols",
  "Fraudulent Activity",
  "Harassment or Bullying",
  "Violence or Threatening Behavior",
  "Copyright Infringement",
  "Impersonation",
  "Privacy Violation",
  "Misinformation or Fake News"
];
