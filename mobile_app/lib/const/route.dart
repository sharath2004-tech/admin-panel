import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:real_estate/controllers/profile.dart';
import 'package:real_estate/screens/home/filter/filter.dart';
import 'package:real_estate/screens/home/filter/filtered.dart';
import 'package:real_estate/screens/home/notification/notification.dart';
import 'package:real_estate/screens/profile/about_us.dart';
import 'package:real_estate/screens/profile/loged_in/request_broker.dart';
import 'package:real_estate/screens/profile/loged_in/subscription.dart';
import 'package:real_estate/screens/profile/loged_in/update/password.dart';
import 'package:real_estate/screens/profile/loged_in/update/setting.dart';
import 'package:real_estate/screens/profile/loged_in/update/update_profile.dart';
import 'package:real_estate/screens/profile/not_loged_in/forgot/forgot.dart';
import 'package:real_estate/screens/profile/not_loged_in/forgot/new_password.dart';
import 'package:real_estate/screens/profile/not_loged_in/forgot/verify.dart';
import 'package:real_estate/screens/profile/not_loged_in/sign_up/email.dart';
import 'package:real_estate/screens/property%20details/all_rating.dart';
import '../screens/chat/individual.dart';
import '../screens/home/by_types/by_types.dart';
import '../screens/profile/not_loged_in/login.dart';
import '../screens/profile/not_loged_in/sign_up/register.dart';
import '../screens/profile/not_loged_in/sign_up/verify.dart';
import '../screens/property details/property_detail.dart';
import '../screens/property%20details/broker.dart';

import '../screens/home/owner/properties.dart';
import '../utils/bottom_bar.dart';

class AppRoutes {
  static const String login = "/login";
  static const String emailAuth = "/emailAuth";
  static const String verifyEmail = "/verifyEmail";
  static const String verifyForgot = "/verifyForgot";
  static const String newPassword = "/newPassword";
  static const String register = "/register";
  static const String ownerProperties = "/ownerProperties";
  static const String propertyDetail = "/propertyDetail";
  static const String bottomNavigator = "/bottomNavigator";
  static const String brokerProperties = "/brokerProperties";
  static const String individualChat = "/individualChat";
  static const String propertiesByType = "/propertiesByType";
  static const String notification = "/notification";
  static const String requestToBeBroker = "/requestToBeBroker";
  static const String seeAllreviews = "/seeAllreviews";
  static const String subscription = "/subscription";
  static const String setting = "/setting";
  static const String updateProfile = "/updateProfile";
  static const String updatePassword = "/updatePassword";
  static const String filter = "/filter";
  static const String filteredProps = "/filteredProps";
  static const String forgot = "/forgot";
  static const String aboutUs = "/aboutUs";
}

Route<dynamic>? customAppRoute(RouteSettings settings) {
  if (settings.name == AppRoutes.login) {
    return CupertinoPageRoute(
      fullscreenDialog: true,
      builder: (context) => const LoginScreen(),
      settings: const RouteSettings(
        name: AppRoutes.login,
      ),
    );
  }
  if (settings.name == AppRoutes.emailAuth) {
    return CupertinoPageRoute(
      // fullscreenDialog: true,
      builder: (context) => const EmailAuthScreen(),
      settings: const RouteSettings(
        name: AppRoutes.emailAuth,
      ),
    );
  }
  if (settings.name == AppRoutes.verifyEmail) {
    String arguments = settings.arguments as String;
    return CupertinoPageRoute(
      // fullscreenDialog: true,
      builder: (context) => VerifyEmailScreen(email: arguments),
      settings: const RouteSettings(name: AppRoutes.verifyEmail),
    );
  }

  if (settings.name == AppRoutes.verifyForgot) {
    String arguments = settings.arguments as String;
    return CupertinoPageRoute(
      // fullscreenDialog: true,
      builder: (context) => VerifyForgotScreen(email: arguments),
      settings: const RouteSettings(name: AppRoutes.verifyForgot),
    );
  }

  if (settings.name == AppRoutes.newPassword) {
    String arguments = settings.arguments as String;
    return CupertinoPageRoute(
      // fullscreenDialog: true,
      builder: (context) => NewPasswordScreen(email: arguments),
      settings: const RouteSettings(name: AppRoutes.newPassword),
    );
  }
  if (settings.name == AppRoutes.register) {
    String arguments = settings.arguments as String;
    return CupertinoPageRoute(
      // fullscreenDialog: true,
      builder: (context) => RegisterScreen(email: arguments),
      settings: const RouteSettings(name: AppRoutes.register),
    );
  }
  if (settings.name == AppRoutes.brokerProperties) {
    final List arguments = settings.arguments as List;
    final id = arguments[0];
    final brokerName = arguments[1];
    final isBroker = arguments[2];
    return CupertinoPageRoute(
      builder: (context) =>
          BrokerPropertiesScreen(id: id, name: brokerName, isBroker: isBroker),
      settings:
          RouteSettings(name: AppRoutes.brokerProperties, arguments: arguments),
    );
  }
  if (settings.name == AppRoutes.filteredProps) {
    final List arguments = settings.arguments as List;
    final lookingFor = arguments[0];
    final propType = arguments[1];
    final owner = arguments[2];
    final minPrice = arguments[3];
    final maxPrice = arguments[4];
    final bath = arguments[5];
    final bed = arguments[6];
    final area = arguments[7];
    return CupertinoPageRoute(
      builder: (context) => FilteredPropertiesScreen(
          lookingFor: lookingFor,
          propType: propType,
          owner: owner,
          minPrice: minPrice,
          maxPrice: maxPrice,
          bath: bath,
          bed: bed,
          area: area),
      settings:
          RouteSettings(name: AppRoutes.filteredProps, arguments: arguments),
    );
  }
  if (settings.name == AppRoutes.ownerProperties) {
    final List<String> arguments = settings.arguments as List<String>;
    final id = arguments[0];
    final ownerName = arguments[1];
    return CupertinoPageRoute(
      // fullscreenDialog: true,
      builder: (context) =>
          OwnerPropertiesScreen(ownerID: id, ownerName: ownerName),
      settings: RouteSettings(
        name: AppRoutes.ownerProperties,
        arguments: arguments,
      ),
    );
  }

  if (settings.name == AppRoutes.bottomNavigator) {
    return CupertinoPageRoute(
      // fullscreenDialog: true,
      builder: (context) => const BottomNavagationScreen(),
      settings: const RouteSettings(
        name: AppRoutes.bottomNavigator,
      ),
    );
  }

  if (settings.name == AppRoutes.requestToBeBroker) {
    return CupertinoPageRoute(
      fullscreenDialog: true,
      builder: (context) => const RequestToBeBrokerScreen(),
      settings: const RouteSettings(
        name: AppRoutes.requestToBeBroker,
      ),
    );
  }

  if (settings.name == AppRoutes.individualChat) {
    // final List<Member> arguments = settings.arguments as List<Member>;
    final List<String> arguments = settings.arguments as List<String>;
    final id = arguments[0];
    final propID = arguments[1];
    final name = arguments[2];

    final agentPhone = arguments[3];

    // final agentData = arguments;
    return MaterialPageRoute(
      // fullscreenDialog: true,
      builder: (context) => IndividualChatScreen(
        // conversation: conversation,
        agentID: id,
        propertyID: propID,
        agentName: name,
        agentPhone: agentPhone,
      ),
      settings:
          RouteSettings(name: AppRoutes.individualChat, arguments: arguments),
    );
  }
  if (settings.name == AppRoutes.propertyDetail) {
    final arguments = settings.arguments as String;
    final id = arguments;
    return CupertinoPageRoute(
      builder: (context) => PropertyDetailScreen(propertyID: id),
      settings: RouteSettings(
        name: AppRoutes.propertyDetail,
        arguments: arguments,
      ),
    );
  }
  if (settings.name == AppRoutes.notification) {
    return CupertinoPageRoute(
      builder: (context) => NotificationScreen(),
      settings: const RouteSettings(name: AppRoutes.notification),
    );
  }

  if (settings.name == AppRoutes.setting) {
    final arguments = settings.arguments as ProfileProvider;
    final value = arguments;
    return CupertinoPageRoute(
      builder: (context) => SettingScreen(
        profileData: value,
      ),
      settings: const RouteSettings(name: AppRoutes.setting),
    );
  }

  if (settings.name == AppRoutes.updateProfile) {
    final arguments = settings.arguments as ProfileProvider;
    final value = arguments;
    return CupertinoPageRoute(
      builder: (context) => UpdateProfileScreen(
        profileData: value,
      ),
      settings: const RouteSettings(name: AppRoutes.updateProfile),
    );
  }
  if (settings.name == AppRoutes.seeAllreviews) {
    final String arguments = settings.arguments as String;
    final id = arguments;

    return CupertinoPageRoute(
      builder: (context) => SeeAllReviewsScreen(propertyID: id),
      settings: const RouteSettings(name: AppRoutes.seeAllreviews),
    );
  }
  if (settings.name == AppRoutes.subscription) {
    final String arguments = settings.arguments as String;
    final id = arguments;

    return CupertinoPageRoute(
      builder: (context) => SubscriptionScreen(brokerID: id),
      settings: const RouteSettings(name: AppRoutes.subscription),
    );
  }
  if (settings.name == AppRoutes.updatePassword) {
    return CupertinoPageRoute(
      builder: (context) => const UpdatePasswordScreen(),
      settings: const RouteSettings(name: AppRoutes.updatePassword),
    );
  }
  if (settings.name == AppRoutes.propertiesByType) {
    final List<String> arguments = settings.arguments as List<String>;
    final id = arguments[0];
    final name = arguments[1];
    return CupertinoPageRoute(
      builder: (context) => PropertiesByTypeScreen(id: id, name: name),
      settings:
          RouteSettings(name: AppRoutes.propertiesByType, arguments: arguments),
    );
  }

  if (settings.name == AppRoutes.filter) {
    return CupertinoPageRoute(
      fullscreenDialog: true,
      builder: (context) => const FilterScreen(),
      settings: const RouteSettings(name: AppRoutes.filter),
    );
  }

  if (settings.name == AppRoutes.forgot) {
    return CupertinoPageRoute(
      builder: (context) => const ForgotPasswordScreen(),
      settings: const RouteSettings(name: AppRoutes.forgot),
    );
  }

  if (settings.name == AppRoutes.aboutUs) {
    return CupertinoPageRoute(
      fullscreenDialog: true,
      builder: (context) => const AboutUsScreen(),
      settings: const RouteSettings(name: AppRoutes.aboutUs),
    );
  }

  return null;
}
