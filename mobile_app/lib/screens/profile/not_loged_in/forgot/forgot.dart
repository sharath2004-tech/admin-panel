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

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final emailController = TextEditingController();
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
          "Forgot Password",
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
                  const SizedBox(height: 50),
                  TextFormField(
                    controller: emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: const InputDecoration(
                      isDense: true,
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: AppColor.primaryColor),
                      ),
                      border: OutlineInputBorder(),
                      labelText: 'Email Address',
                    ),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please enter an email address';
                      }
                      final RegExp emailRegExp = RegExp(
                          r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$');
                      if (!emailRegExp.hasMatch(value)) {
                        return 'Please enter a valid email address';
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
                        "Forgot",
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
            .forgotPassword(email: emailController.text)
            .then((_) {
          context.loaderOverlay.hide();
          Navigator.of(context).pushNamed(AppRoutes.verifyForgot,
              arguments: emailController.text);
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
