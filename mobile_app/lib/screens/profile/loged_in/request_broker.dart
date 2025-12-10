// ignore_for_file: use_build_context_synchronously

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
// import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/const/app.dart';

import '../../../const/setting.dart';
import '../../../controllers/auth.dart';
import '../../../controllers/profile.dart';
import '../../../utils/exception.dart';
import '../../../utils/toast.dart';

class RequestToBeBrokerScreen extends StatefulWidget {
  const RequestToBeBrokerScreen({super.key});

  @override
  State<RequestToBeBrokerScreen> createState() =>
      _RequestToBeBrokerScreenState();
}

class _RequestToBeBrokerScreenState extends State<RequestToBeBrokerScreen> {
  final formKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final addressController = TextEditingController();
  String phoneNumber = "";

  final _imagePicker = ImagePicker();
  XFile? pickedLogo;
  String pickedFileName = "";

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    // phoneController.dispose();
    addressController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.5,
        centerTitle: true,
        automaticallyImplyLeading: false,
        title: Text(
          "Become A broker",
          style: TextStyle(
              fontSize: AppTextSize.headerSize, fontFamily: AppFonts.bold),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: const Icon(Icons.close, size: 26),
            ),
          ),
        ],
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
                SizedBox(height: screenSize(context).height * 0.05),
                //
                //Name
                //
                TextFormField(
                  controller: nameController,
                  keyboardType: TextInputType.text,
                  decoration: const InputDecoration(
                    isDense: true,
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColor.primaryColor),
                    ),
                    border: OutlineInputBorder(),
                    labelText: 'Company/Broker Name',
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Please enter an Company/Broker Name';
                    }

                    return null; // Return null if the input is valid
                  },
                ),

                const SizedBox(height: 15),
                //
                //Email
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
                //
                //Phone
                //
                const SizedBox(height: 15),
                SizedBox(
                  child: IntlPhoneField(
                    // focusNode: focusNode,
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

                const SizedBox(height: 15),
                //
                //Address
                //
                TextFormField(
                  controller: addressController,
                  keyboardType: TextInputType.text,
                  decoration: const InputDecoration(
                    isDense: true,
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColor.primaryColor),
                    ),
                    border: OutlineInputBorder(),
                    labelText: 'Address',
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Please enter an address';
                    }

                    return null; // Return null if the input is valid
                  },
                ),
                const SizedBox(height: 15),

                GestureDetector(
                  onTap: () => pickLogo(),
                  child: Container(
                    height: 120,
                    width: screenSize(context).width,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8.0),
                      color: AppColor.grey.withOpacity(0.1),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.cloud_upload,
                          size: AppTextSize.headerSize + 25,
                        ),
                        const SizedBox(height: 5),
                        pickedFileName == ""
                            ? Text(
                                "Upload Company Logo",
                                style: TextStyle(
                                    fontSize: AppTextSize.titleSize,
                                    fontFamily: AppFonts.medium),
                              )
                            : Text(
                                "Update Company Logo",
                                style: TextStyle(
                                    fontSize: AppTextSize.titleSize,
                                    fontFamily: AppFonts.medium),
                              )
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 15),

                pickedFileName == ""
                    ? Container()
                    : Container(
                        height: 50,
                        width: screenSize(context).width * 0.5,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8.0),
                          color: AppColor.grey.withOpacity(0.1),
                        ),
                        child: Row(children: [
                          const SizedBox(width: 5),
                          const Icon(Icons.file_copy),
                          const SizedBox(width: 10),
                          Flexible(
                              child: Text(
                            pickedFileName
                                .replaceAll("File: '", "")
                                .replaceAll("'", ""),
                            maxLines: 1,
                            style: TextStyle(
                                overflow: TextOverflow.ellipsis,
                                fontSize: AppTextSize.titleSize,
                                fontFamily: AppFonts.semiBold),
                          ))
                        ]),
                      ),
                const SizedBox(height: 20),
                GestureDetector(
                  onTap: () => validateThenRequest(),
                  child: Container(
                    height: 46,
                    width: screenSize(context).width - 24,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10.0),
                        color: AppColor.primaryColor),
                    child: Text(
                      "Request To Become A Broker",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.bold),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void pickLogo() async {
    XFile? image = await _imagePicker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      setState(() {
        pickedFileName = File(image.name).toString();
        pickedLogo = image;
      });
    }
  }

  void validateThenRequest() async {
    if (formKey.currentState!.validate()) {
      if (phoneNumber == "") {
        showErrorResponse(context: context, message: "Phone is Empty");
      } else if (pickedFileName == "") {
        showErrorResponse(context: context, message: "Company Logo Not Picked");
      } else {
        try {
          FocusScope.of(context).unfocus();
          context.loaderOverlay.show();
          await Provider.of<ProfileProvider>(context, listen: false)
              .requestToBeComeBroker(
                  userID:
                      Provider.of<AuthProvider>(context, listen: false).userId!,
                  companyName: nameController.text,
                  image: pickedLogo!,
                  address: addressController.text,
                  phone: phoneNumber.replaceAll("+", ""),
                  email: emailController.text)
              .then((_) {
            context.loaderOverlay.hide();
            Navigator.pop(context);
            showInfoResponse(
                context: context,
                message: "Broker Request Sent\nAnd Waiting Approval");
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
