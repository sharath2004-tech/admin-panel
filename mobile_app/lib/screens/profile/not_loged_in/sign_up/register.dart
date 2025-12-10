// ignore_for_file: deprecated_member_use, use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/bottom_bar.dart';
import '../../../../const/app.dart';
import '../../../../const/route.dart';
import '../../../../const/setting.dart';
import '../../../../utils/exception.dart';
import '../../../../utils/toast.dart';

import '../../../../controllers/auth.dart';

class RegisterScreen extends StatefulWidget {
  final String email;
  const RegisterScreen({super.key, required this.email});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  final formKey = GlobalKey<FormState>();
  String phoneNumber = "";

  bool obscurePassword = true;
  void showPassword() {
    setState(() {
      obscurePassword = !obscurePassword;
    });
  }

  @override
  void dispose() {
    firstNameController.dispose();
    lastNameController.dispose();
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
            "Create An Account",
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
                    const SizedBox(height: 15),
                    Center(
                      child: SvgPicture.asset(
                        AppAssets.register,
                        height: screenSize(context).width * 0.45,
                        fit: BoxFit.contain,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text("Sign Up",
                        style: TextStyle(
                            fontSize: AppTextSize.headerSize,
                            fontFamily: AppFonts.bold)),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        //
                        //First Name textform field
                        //
                        SizedBox(
                          width: screenSize(context).width * 0.42,
                          child: TextFormField(
                            controller: firstNameController,
                            keyboardType: TextInputType.text,
                            decoration: const InputDecoration(
                              isDense: true,
                              focusedBorder: OutlineInputBorder(
                                borderSide:
                                    BorderSide(color: AppColor.primaryColor),
                              ),
                              border: OutlineInputBorder(),
                              labelText: 'First Name',
                            ),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Please enter your first name';
                              }

                              return null; // Return null if the input is valid
                            },
                          ),
                        ),
                        //
                        //lastName textform field
                        //
                        SizedBox(
                          width: screenSize(context).width * 0.42,
                          child: TextFormField(
                            controller: lastNameController,
                            keyboardType: TextInputType.text,
                            decoration: const InputDecoration(
                              isDense: true,
                              focusedBorder: OutlineInputBorder(
                                borderSide:
                                    BorderSide(color: AppColor.primaryColor),
                              ),
                              border: OutlineInputBorder(),
                              labelText: 'Last Name',
                            ),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Please enter your last name';
                              }

                              return null; // Return null if the input is valid
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 15),
                    //
                    //email textform field
                    //
                    TextFormField(
                      enableInteractiveSelection: false,
                      readOnly: true,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        hintText: widget.email,
                        isDense: true,
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: AppColor.primaryColor),
                        ),
                        border: const OutlineInputBorder(),
                      ),
                    ),
                    //
                    //Phone Input
                    //
                    const SizedBox(height: 15),
                    SizedBox(
                      child: IntlPhoneField(
                        decoration: const InputDecoration(
                          labelText: 'Phone Number',
                          floatingLabelAlignment: FloatingLabelAlignment.start,
                          border: OutlineInputBorder(
                            borderSide: BorderSide(),
                          ),
                        ),
                        languageCode: "en",
                        onChanged: (phone) {
                          phoneNumber = phone.completeNumber;
                        },
                      ),
                    ),
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
                          "Register",
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
      if (phoneNumber == "") {
        showErrorResponse(context: context, message: "Phone is Empty");
      } else {
        try {
          FocusScope.of(context).unfocus();
          context.loaderOverlay.show();

          await Provider.of<AuthProvider>(context, listen: false)
              .signUp(
                  firstName: firstNameController.text,
                  lastName: lastNameController.text,
                  phone: phoneNumber.replaceAll("+", ""),
                  email: widget.email,
                  password: passwordController.text)
              .then((_) {
            context.loaderOverlay.hide();
            Provider.of<BottomNavBarProvider>(context, listen: false)
                .onChangeIndex(0);
            Navigator.of(context).pushNamedAndRemoveUntil(
                AppRoutes.bottomNavigator, (routes) => false);
            Navigator.of(context).pushNamed(AppRoutes.login);
            showSuccessResponse(
                context: context, message: "Registration Successful");
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
}
