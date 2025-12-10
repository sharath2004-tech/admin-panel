// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import '../../../const/app.dart';
import '../../../const/setting.dart';
import '../../../controllers/bottom_bar.dart';
import '../../../utils/exception.dart';

import '../../../const/route.dart';
import '../../../controllers/auth.dart';
import '../../../utils/toast.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  bool obscurePassword = true;
  void showPassword() {
    setState(() {
      obscurePassword = !obscurePassword;
    });
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Form(
        key: formKey,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 25),
          child: SingleChildScrollView(
            physics: const ScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                GestureDetector(
                  onTap: () => Navigator.of(context).pop(),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(Icons.close, size: 28),
                    ],
                  ),
                ),
                const SizedBox(height: 15),
                Center(
                  child: SvgPicture.asset(
                    AppAssets.login,
                    height: screenSize(context).width * 0.45,
                    fit: BoxFit.contain,
                  ),
                ),
                const SizedBox(height: 10),
                Text("Sign in to Your Account",
                    style: TextStyle(
                        fontSize: AppTextSize.headerSize,
                        fontFamily: AppFonts.bold)),
                const SizedBox(height: 15),
                //
                //email textform field
                //
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
                    final RegExp emailRegExp =
                        RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$');
                    if (!emailRegExp.hasMatch(value)) {
                      return 'Please enter a valid email address';
                    }
                    return null; // Return null if the input is valid
                  },
                ),
                const SizedBox(height: 15),
                TextFormField(
                  controller: passwordController,
                  keyboardType: TextInputType.visiblePassword,
                  obscureText: obscurePassword,
                  decoration: InputDecoration(
                    isDense: true,
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(color: AppColor.primaryColor),
                    ),
                    border: const OutlineInputBorder(),
                    labelText: 'Password',
                    suffixIcon: IconButton(
                      onPressed: () => showPassword(),
                      icon: obscurePassword
                          ? const Icon(Icons.visibility_off_sharp, size: 20)
                          : const Icon(Icons.visibility, size: 20),
                    ),
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
                const SizedBox(height: 10),
                GestureDetector(
                  onTap: () =>
                      Navigator.of(context).pushNamed(AppRoutes.forgot),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Forgot password?",
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize,
                            color: AppColor.primaryColor,
                            fontFamily: AppFonts.semiBold),
                      )
                    ],
                  ),
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
                      "Login",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.bold),
                    ),
                  ),
                ),
                const SizedBox(height: 15),
                GestureDetector(
                  onTap: () =>
                      Navigator.pushNamed(context, AppRoutes.emailAuth),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Dont't have an account? ",
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize,
                            fontFamily: AppFonts.medium),
                      ),
                      Text(
                        "SIGN UP",
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize,
                            color: AppColor.primaryColor,
                            fontFamily: AppFonts.semiBold),
                      )
                    ],
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
            .signIn(
                email: emailController.text, password: passwordController.text)
            .then((_) {
          context.loaderOverlay.hide();
          Provider.of<BottomNavBarProvider>(context, listen: false)
              .onChangeIndex(0);
          Navigator.of(context).pushNamedAndRemoveUntil(
              AppRoutes.bottomNavigator, (routes) => false);
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
