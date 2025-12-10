import 'package:flutter/material.dart';
import 'package:flutter_styled_toast/flutter_styled_toast.dart';

import '../const/app.dart';
import '../const/setting.dart';

showErrorResponse({required BuildContext context, required message}) {
  return showToast(message,
      backgroundColor: Colors.red,
      textStyle: TextStyle(
          fontFamily: AppFonts.semiBold,
          color: Colors.white,
          fontSize: AppTextSize.titleSize),
      context: context,
      animation: StyledToastAnimation.slideFromTopFade,
      reverseAnimation: StyledToastAnimation.slideToTopFade,
      position:
          const StyledToastPosition(align: Alignment.topCenter, offset: 0.0),
      startOffset: const Offset(0.0, -3.0),
      reverseEndOffset: const Offset(0.0, -3.0),
      duration: const Duration(milliseconds: 3800),
      // toastHorizontalMargin: 50.0,
      animDuration: const Duration(milliseconds: 1500),
      curve: Curves.fastLinearToSlowEaseIn,
      reverseCurve: Curves.fastOutSlowIn);
}

showInfoResponse({required BuildContext context, required String message}) {
  return showToast(message,
      backgroundColor: AppColor.primaryColor,
      textStyle: TextStyle(
          fontFamily: AppFonts.semiBold,
          color: Colors.white,
          fontSize: AppTextSize.titleSize),
      context: context,
      animation: StyledToastAnimation.slideFromTopFade,
      reverseAnimation: StyledToastAnimation.slideToTopFade,
      position:
          const StyledToastPosition(align: Alignment.topCenter, offset: 0.0),
      startOffset: const Offset(0.0, -3.0),
      reverseEndOffset: const Offset(0.0, -3.0),
      duration: const Duration(milliseconds: 3800),
      // toastHorizontalMargin: 50.0,
      animDuration: const Duration(milliseconds: 1500),
      curve: Curves.fastLinearToSlowEaseIn,
      reverseCurve: Curves.fastOutSlowIn);
}

showSuccessResponse(
    {required BuildContext context,
    required String message,
    int duration = 4000}) {
  return showToast(message,
      backgroundColor: Colors.green,
      textStyle:
          const TextStyle(fontFamily: AppFonts.semiBold, color: Colors.white),
      context: context,
      animation: StyledToastAnimation.slideFromTopFade,
      reverseAnimation: StyledToastAnimation.slideToTopFade,
      position:
          const StyledToastPosition(align: Alignment.topCenter, offset: 0.0),
      startOffset: const Offset(0.0, -3.0),
      reverseEndOffset: const Offset(0.0, -3.0),
      duration: Duration(milliseconds: duration),
      // toastHorizontalMargin: 50.0,
      animDuration: const Duration(milliseconds: 1500),
      curve: Curves.fastLinearToSlowEaseIn,
      reverseCurve: Curves.fastOutSlowIn);
}
