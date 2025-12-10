// ignore_for_file: use_build_context_synchronously

import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/auth.dart';
import 'package:real_estate/controllers/profile.dart';
import 'package:real_estate/utils/exception.dart';
import 'package:real_estate/utils/toast.dart';

import '../../../../const/app.dart';
import '../../../../const/setting.dart';

class UpdateProfileScreen extends StatefulWidget {
  final ProfileProvider profileData;

  const UpdateProfileScreen({super.key, required this.profileData});

  @override
  State<UpdateProfileScreen> createState() => _UpdateProfileScreenState();
}

class _UpdateProfileScreenState extends State<UpdateProfileScreen> {
  TextEditingController firstNameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();

  final _imagePicker = ImagePicker();
  XFile? pickedLogo;
  String userProPic = "";
  File? previewImage;
  @override
  void initState() {
    firstNameController.text = widget.profileData.user[0].firstName;
    lastNameController.text = widget.profileData.user[0].lastName;
    userProPic = widget.profileData.user[0].profileImage;

    super.initState();
  }

  @override
  void dispose() {
    firstNameController.dispose();
    lastNameController.dispose();
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
          icon: const Icon(Icons.arrow_back_ios, size: 20),
        ),
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
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              pickedLogo == null
                  ? GestureDetector(
                      onTap: () => pickProfile(),
                      child: Container(
                        height: 100,
                        width: 100,
                        alignment: Alignment.bottomRight,
                        decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: AppColor.grey.withOpacity(0.1),
                            image: DecorationImage(
                                image: CachedNetworkImageProvider(userProPic))),
                        child: const UploadIconWidget(),
                      ),
                    )
                  : GestureDetector(
                      onTap: () => pickProfile(),
                      child: Container(
                        height: 100,
                        width: 100,
                        decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: AppColor.grey.withOpacity(0.1),
                            image: DecorationImage(
                                image: FileImage(previewImage!),
                                fit: BoxFit.cover)),
                      )),
              const SizedBox(height: 10),
              Text(
                "Profile Image",
                style: TextStyle(
                    fontSize: AppTextSize.titleSize,
                    fontFamily: AppFonts.semiBold),
              ),
              const SizedBox(height: 30),
              TextFormField(
                controller: firstNameController,
                keyboardType: TextInputType.text,
                decoration: const InputDecoration(
                  isDense: true,
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: AppColor.primaryColor),
                  ),
                  border: OutlineInputBorder(),
                  labelText: 'First Name',
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: lastNameController,
                keyboardType: TextInputType.text,
                decoration: const InputDecoration(
                  isDense: true,
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: AppColor.primaryColor),
                  ),
                  border: OutlineInputBorder(),
                  labelText: 'Last Name',
                ),
              ),
              const SizedBox(height: 30),
              GestureDetector(
                onTap: () async {
                  if (firstNameController.text.isEmpty ||
                      lastNameController.text.isEmpty) {
                    return showErrorResponse(
                        context: context, message: "Name Can't be Empty!");
                  }
                  try {
                    FocusScope.of(context).unfocus();
                    context.loaderOverlay.show();
                    await Provider.of<ProfileProvider>(context, listen: false)
                        .updateProfile(
                            context: context,
                            userID: Provider.of<AuthProvider>(context,
                                    listen: false)
                                .userId!,
                            fName: firstNameController.text,
                            lName: lastNameController.text,
                            image: pickedLogo)
                        .then((value) {
                      context.loaderOverlay.hide();

                      showSuccessResponse(
                          context: context, message: "Profile Updated");
                      Navigator.pop(context);
                    });
                  } on CustomException catch (e) {
                    context.loaderOverlay.hide();

                    showErrorResponse(context: context, message: e.toString());
                  } catch (e) {
                    context.loaderOverlay.hide();

                    showErrorResponse(context: context, message: e.toString());
                  }
                },
                child: Container(
                  height: 46,
                  width: screenSize(context).width - 24,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.0),
                      color: AppColor.primaryColor),
                  child: Text(
                    "Update Profile",
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

  void pickProfile() async {
    XFile? image = await _imagePicker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      setState(() {
        previewImage = File(image.path);
        pickedLogo = image;
      });
    }
  }
}

class UploadIconWidget extends StatelessWidget {
  const UploadIconWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 10, bottom: 10),
      child: Container(
          height: 25,
          width: 25,
          decoration:
              const BoxDecoration(shape: BoxShape.circle, color: Colors.white),
          child:
              const Icon(Icons.upload, color: AppColor.primaryColor, size: 18)),
    );
  }
}
