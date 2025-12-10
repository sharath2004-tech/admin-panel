import 'package:flutter/material.dart';
import 'package:system_settings/system_settings.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Plugin example app'),
        ),
        body: Center(
          child: ListView(
            padding: const EdgeInsets.all(20.0),
            children: <Widget>[
              ElevatedButton(
                child: const Text('App info'),
                onPressed: () => SystemSettings.app(),
              ),
              ElevatedButton(
                child: const Text('App notifications'),
                onPressed: () => SystemSettings.appNotifications(),
              ),
              ElevatedButton(
                child: const Text('Settings'),
                onPressed: () => SystemSettings.system(),
              ),
              ElevatedButton(
                child: const Text('Location'),
                onPressed: () => SystemSettings.location(),
              ),
              ElevatedButton(
                child: const Text('Wi-Fi'),
                onPressed: () => SystemSettings.wifi(),
              ),
              ElevatedButton(
                child: const Text('Bluetooth'),
                onPressed: () => SystemSettings.bluetooth(),
              ),
              ElevatedButton(
                child: const Text('NFC'),
                onPressed: () => SystemSettings.nfc(),
              ),
              ElevatedButton(
                child: const Text('Power Options'),
                onPressed: () => SystemSettings.powerOptions(),
              ),
              ElevatedButton(
                child: const Text('Security'),
                onPressed: () => SystemSettings.security(),
              ),
              ElevatedButton(
                child: const Text('Display'),
                onPressed: () => SystemSettings.display(),
              ),
              ElevatedButton(
                child: const Text('Date & time'),
                onPressed: () => SystemSettings.date(),
              ),
              ElevatedButton(
                child: const Text('Sound'),
                onPressed: () => SystemSettings.sound(),
              ),
              ElevatedButton(
                child: const Text('Apps'),
                onPressed: () => SystemSettings.apps(),
              ),
              ElevatedButton(
                child: const Text('Network & internet'),
                onPressed: () => SystemSettings.wireless(),
              ),
              ElevatedButton(
                child: const Text('Device info'),
                onPressed: () => SystemSettings.deviceInfo(),
              ),
              ElevatedButton(
                child: const Text('Data usage'),
                onPressed: () => SystemSettings.dataUsage(),
              ),
              ElevatedButton(
                child: const Text('Data roaming'),
                onPressed: () => SystemSettings.dataRoaming(),
              ),
              ElevatedButton(
                child: const Text('Locale'),
                onPressed: () => SystemSettings.locale(),
              ),
              ElevatedButton(
                child: const Text('Default apps'),
                onPressed: () => SystemSettings.defaultApps(),
              ),
              ElevatedButton(
                child: const Text('Airplane/offline mode'),
                onPressed: () => SystemSettings.airplaneMode(),
              ),
              ElevatedButton(
                child: const Text('Privacy'),
                onPressed: () => SystemSettings.privacy(),
              ),
              ElevatedButton(
                child: const Text('Accessibility'),
                onPressed: () => SystemSettings.accessibility(),
              ),
              ElevatedButton(
                child: const Text('Internal storage'),
                onPressed: () => SystemSettings.internalStorage(),
              ),
              ElevatedButton(
                child: const Text('Notification policy / DND'),
                onPressed: () => SystemSettings.notificationPolicy(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
