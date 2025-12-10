// ignore_for_file: deprecated_member_use, use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/bottom_bar.dart';
import '../../../../const/app.dart';
import '../../../../const/route.dart';
import '../../../../const/setting.dart';
import '../../../../utils/exception.dart';
import '../../../../utils/toast.dart';

import '../../../../controllers/auth.dart';

class NewPasswordScreen extends StatefulWidget {
  final String email;
  const NewPasswordScreen({super.key, required this.email});

  @override
  State<NewPasswordScreen> createState() => _NewPasswordScreenState();
}

class _NewPasswordScreenState extends State<NewPasswordScreen> {
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  bool obscurePassword = true;
  void showPassword() {
    setState(() {
      obscurePassword = !obscurePassword;
    });
  }

  @override
  void dispose() {
    passwordController.dispose();
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
          title: Text(
            "Updated Password",
            style: TextStyle(
              fontSize: AppTextSize.headerSize,
              fontFamily: AppFonts.bold,
            ),
          ),
        ),
        body: WillPopScope(
          onWillPop: () async {
            return false;
          },
          child: Form(
            key: formKey,
            child: Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 25,
              ),
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    //
                    //Password
                    //
                    const SizedBox(height: 15),
                    TextFormField(
                      controller: passwordController,
                      keyboardType: TextInputType.visiblePassword,
                      obscureText: obscurePassword,
                      decoration: const InputDecoration(
                        isDense: true,
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: AppColor.primaryColor),
                        ),
                        border: OutlineInputBorder(),
                        labelText: 'Password',
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter a password';
                        }
                        if (value.length < 6) {
                          return 'Password must be at least 6 characters';
                        }
                        return null; // Return null if the input is valid
                      },
                    ),
                    //
                    //confirm password
                    //
                    const SizedBox(height: 15),
                    TextFormField(
                      controller: confirmPasswordController,
                      keyboardType: TextInputType.visiblePassword,
                      obscureText: obscurePassword,
                      decoration: InputDecoration(
                        isDense: true,
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: AppColor.primaryColor),
                        ),
                        border: const OutlineInputBorder(),
                        labelText: 'Confirm Password',
                        suffixIcon: IconButton(
                          onPressed: () => showPassword(),
                          icon: obscurePassword
                              ? const Icon(Icons.visibility_off_sharp, size: 20)
                              : const Icon(Icons.visibility, size: 20),
                        ),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please confirm your password';
                        }
                        if (value != passwordController.text) {
                          return 'Password don not match';
                        }
                        return null; // Return null if the input is valid
                      },
                    ),
                    const SizedBox(height: 20),
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
                          "Update Password",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: AppTextSize.titleSize,
                              fontFamily: AppFonts.bold),
                        ),
                      ),
                    ),

                    SizedBox(height: screenSize(context).height * 0.05),
                  ],
                ),
              ),
            ),
          ),
        ));
  }

  void submitForm() async {
    if (formKey.currentState!.validate()) {
      try {
        FocusScope.of(context).unfocus();
        context.loaderOverlay.show();

        await Provider.of<AuthProvider>(context, listen: false)
            .newPassword(email: widget.email, password: passwordController.text)
            .then((_) {
          context.loaderOverlay.hide();
          Provider.of<BottomNavBarProvider>(context, listen: false)
              .onChangeIndex(0);
          Navigator.of(context).pushNamedAndRemoveUntil(
              AppRoutes.bottomNavigator, (routes) => false);
          Navigator.of(context).pushNamed(AppRoutes.login);
          showSuccessResponse(context: context, message: "Password Changed");
        });
      } on CustomException catch (error) {
        showErrorResponse(context: context, message: error.toString());
        context.loaderOverlay.hide();
      } catch (error) {
        showErrorResponse(context: context, message: error.toString());
        context.loaderOverlay.hide();
      }
    }
  }
}
