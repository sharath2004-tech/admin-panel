// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/auth.dart';
import 'package:real_estate/controllers/profile.dart';
import 'package:real_estate/utils/exception.dart';
import 'package:real_estate/utils/toast.dart';

import '../../../../const/app.dart';
import '../../../../const/setting.dart';

class UpdatePasswordScreen extends StatefulWidget {
  const UpdatePasswordScreen({super.key});

  @override
  State<UpdatePasswordScreen> createState() => _UpdatePasswordScreenState();
}

class _UpdatePasswordScreenState extends State<UpdatePasswordScreen> {
  TextEditingController oldPasswordController = TextEditingController();
  TextEditingController newPasswordController = TextEditingController();

  TextEditingController confirmPasswordController = TextEditingController();

  @override
  void dispose() {
    oldPasswordController.dispose();
    newPasswordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        automaticallyImplyLeading: false,
        centerTitle: true,
        leading: IconButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            icon: const Icon(Icons.arrow_back_ios, size: 20)),
        title: Text(
          "Update Profile",
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              TextFormField(
                controller: oldPasswordController,
                keyboardType: TextInputType.text,
                decoration: const InputDecoration(
                  isDense: true,
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: AppColor.primaryColor),
                  ),
                  border: OutlineInputBorder(),
                  labelText: 'Old Password',
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: newPasswordController,
                keyboardType: TextInputType.text,
                decoration: const InputDecoration(
                  isDense: true,
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: AppColor.primaryColor),
                  ),
                  border: OutlineInputBorder(),
                  labelText: 'New Password',
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: confirmPasswordController,
                keyboardType: TextInputType.text,
                decoration: const InputDecoration(
                  isDense: true,
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: AppColor.primaryColor),
                  ),
                  border: OutlineInputBorder(),
                  labelText: 'Confirm New Password',
                ),
              ),
              const SizedBox(height: 30),
              GestureDetector(
                onTap: () => validateUpdate(context),
                child: Container(
                  height: 46,
                  width: screenSize(context).width - 24,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.0),
                      color: AppColor.primaryColor),
                  child: Text(
                    "Update Password",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.bold),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  validateUpdate(BuildContext context) async {
    if (oldPasswordController.text.trim().isEmpty) {
      showErrorResponse(context: context, message: "Old password is required");
    } else if (oldPasswordController.text.trim().length <= 5) {
      showErrorResponse(
          context: context, message: "Old Password must be at least 6 digit");
    } else if (newPasswordController.text.trim().length <= 5) {
      showErrorResponse(
          context: context, message: "New Password must be at least 6 digit");
    } else if (newPasswordController.text.trim() !=
        confirmPasswordController.text.trim()) {
      showErrorResponse(context: context, message: "New Password do not match");
    } else {
      try {
        FocusScope.of(context).unfocus();
        context.loaderOverlay.show();
        await Provider.of<ProfileProvider>(context, listen: false)
            .updatePassword(
                userID:
                    Provider.of<AuthProvider>(context, listen: false).userId!,
                oldPassword: oldPasswordController.text.trim(),
                newPassword: confirmPasswordController.text.trim())
            .then((_) {
          showSuccessResponse(
              context: context, message: "Password Updated Successfully");
          context.loaderOverlay.hide();
          Future.delayed(const Duration(microseconds: 500), () {
            Navigator.pop(context);
          });
        });
      } on CustomException catch (e) {
        showErrorResponse(context: context, message: e.toString());

        context.loaderOverlay.hide();
      } catch (e) {
        showErrorResponse(context: context, message: e.toString());

        context.loaderOverlay.hide();
      }
    }
  }
}
