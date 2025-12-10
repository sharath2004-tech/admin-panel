import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../const/setting.dart';

class CustomLoadingWidget extends StatelessWidget {
  const CustomLoadingWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Container(
            height: 100,
            width: 100,
            // margin: EdgeInsets.only(bottom: haveScaffold ? 46 : 0),
            decoration: BoxDecoration(
                color: AppColor.lightBackground,
                borderRadius: BorderRadius.circular(10.0)),
            child: Platform.isIOS
                ? const IOSLoadingWidget()
                : const AndroidLoadingWidget()));
  }
}

class AndroidLoadingWidget extends StatelessWidget {
  const AndroidLoadingWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Transform.scale(
            scale: 0.8,
            child:
                const CircularProgressIndicator(color: AppColor.primaryColor)));
  }
}

class IOSLoadingWidget extends StatelessWidget {
  const IOSLoadingWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Transform.scale(
            scale: 1.5,
            child: const CupertinoActivityIndicator(
                color: AppColor.primaryColor)));
  }
}
