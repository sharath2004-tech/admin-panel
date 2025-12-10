import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/notification/push_notification.dart';

import 'const/route.dart';
import 'controllers/auth.dart';
import 'controllers/banner.dart';
import 'controllers/bookmark.dart';
import 'controllers/chat.dart';
import 'controllers/dark_mode.dart';
import 'controllers/notification/notification.dart';
import 'controllers/owners.dart';
import 'controllers/profile.dart';
import 'controllers/properties.dart';
import 'screens/splash.dart';
import 'controllers/bottom_bar.dart';
import 'utils/loading.dart';
import 'package:loader_overlay/loader_overlay.dart';

DarkModeProvider darkThemeProvider = DarkModeProvider();
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());

  darkThemeProvider.setDarkTheme = await darkThemeProvider.getDarkTheme();
  HttpOverrides.global = MyHttpOverrides();
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    PushNotification.oneSignalPushNotification();
    return MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (ctx) => AuthProvider()),
          ChangeNotifierProvider(create: (ctx) => NotificationProvider()),
          ChangeNotifierProvider(create: (ctx) => ChatProvider()),
          ChangeNotifierProvider(create: (ctx) => PropertiesProvider()),
          ChangeNotifierProvider(create: (ctx) => ProfileProvider()),
          ChangeNotifierProvider(create: (ctx) => BookmarkProvider()),
          ChangeNotifierProvider(create: (ctx) => OwnersProvider()),
          ChangeNotifierProvider(create: (ctx) => BannerProvider()),
          ChangeNotifierProvider(create: (ctx) => BottomNavBarProvider()),
          ChangeNotifierProvider(create: (ctx) => darkThemeProvider),
        ],
        child: Consumer<DarkModeProvider>(builder: (context, theme, _) {
          // Provider.of<AuthProvider>(context, listen: false).signOut();
          return GlobalLoaderOverlay(
              useDefaultLoading: false,
              overlayWidget: const Center(child: CustomLoadingWidget()),
              overlayColor: Colors.black,
              overlayOpacity: 0.4,
              duration: const Duration(milliseconds: 400),
              child: MaterialApp(
                debugShowCheckedModeBanner: false,
                theme: AppTheme.myThemes(context, theme.isDarkMode),
                home: const SplashScreen(),
                onGenerateRoute: customAppRoute,
              ));
        }));
  }
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}
