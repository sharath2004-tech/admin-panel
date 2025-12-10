// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';

import '../../../../const/app.dart';
import '../../../../const/route.dart';
import '../../../../const/setting.dart';
import '../../../../controllers/auth.dart';
import '../../../../utils/exception.dart';
import '../../../../utils/toast.dart';

class VerifyForgotScreen extends StatefulWidget {
  final String email;

  const VerifyForgotScreen({super.key, required this.email});

  @override
  State<VerifyForgotScreen> createState() => _VerifyForgotScreenState();
}

class _VerifyForgotScreenState extends State<VerifyForgotScreen> {
  final codeController = TextEditingController();
  final formKey = GlobalKey<FormState>();

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
          icon: const Icon(Icons.arrow_back_ios, size: 20),
        ),
        title: Text(
          "Email Verification",
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
      ),
      body: Form(
        key: formKey,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12.0),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 15),
                  Text(
                    "Please enter the 6-digit verification code that was sent to ${widget.email}.",
                    style: TextStyle(
                        fontSize: AppTextSize.titleSize,
                        fontFamily: AppFonts.medium),
                  ),
                  const SizedBox(height: 15),
                  TextFormField(
                    controller: codeController,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      isDense: true,
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: AppColor.primaryColor),
                      ),
                      border: OutlineInputBorder(),
                      labelText: 'Verification Code',
                    ),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please enter verification code';
                      }
                      if (value.length != 6) {
                        return 'Please enter a valid verification code';
                      }
                      return null; // Return null if the input is valid
                    },
                  ),
                  const SizedBox(height: 30),
                  GestureDetector(
                    onTap: () => submitForm(),
                    child: Container(
                      height: 46,
                      width: screenSize(context).width - 24,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10.0),
                          color: AppColor.primaryColor),
                      child: Text(
                        "Verify",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: AppTextSize.titleSize,
                            fontFamily: AppFonts.bold),
                      ),
                    ),
                  ),
                ]),
          ),
        ),
      ),
    );
  }

  void submitForm() async {
    if (formKey.currentState!.validate()) {
      try {
        FocusScope.of(context).unfocus();
        context.loaderOverlay.show();
        await Provider.of<AuthProvider>(context, listen: false)
            .verifyEmail(
                email: widget.email,
                code: codeController.text,
                isRegister: false)
            .then((_) {
          context.loaderOverlay.hide();

          Navigator.of(context)
              .pushNamed(AppRoutes.newPassword, arguments: widget.email);
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
