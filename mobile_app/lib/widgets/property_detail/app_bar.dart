// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/dark_mode.dart';
import 'package:real_estate/controllers/properties.dart';
import 'package:real_estate/utils/exception.dart';
import 'package:real_estate/utils/toast.dart';

import '../../const/app.dart';
import '../../const/route.dart';
import '../../const/setting.dart';
import '../../controllers/auth.dart';
import '../../controllers/bookmark.dart';

class PropertyDetailsAppBarWidget extends StatelessWidget {
  const PropertyDetailsAppBarWidget({
    super.key,
    required this.id,
  });

  final String id;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56,
      margin: const EdgeInsets.symmetric(horizontal: 12.0),
      width: screenSize(context).width,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: const Icon(Icons.arrow_back_ios, size: 22),
          ),
          Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                //
                //Report Property
                //
                GestureDetector(
                    onTap: () {
                      if (Provider.of<AuthProvider>(context, listen: false)
                              .userId !=
                          null) {
                        reportProperty(context: context, id: id);
                      } else {
                        Navigator.of(context).pushNamed(AppRoutes.login);
                      }
                    },
                    child: const Icon(Icons.report_outlined,
                        size: 24, color: Colors.red)),
                const SizedBox(width: 10),
                //
                //bookmark Property
                //
                Consumer<BookmarkProvider>(
                  builder: (context, favstatus, _) {
                    if (favstatus.isFavourite) {
                      return GestureDetector(
                          onTap: () {
                            favstatus.removeFavourite(id);
                          },
                          child: AppIcons.bookMarkFilled);
                    } else {
                      return favstatus.findPropertByID(id)
                          ? GestureDetector(
                              onTap: () async {
                                favstatus.removeFavourite(id);
                                try {
                                  await favstatus.removeFromFavourite(
                                      Provider.of<AuthProvider>(context,
                                              listen: false)
                                          .userId!,
                                      id);
                                } catch (_) {}
                              },
                              child: AppIcons.bookMarkFilled)
                          : GestureDetector(
                              onTap: () async {
                                bool isLogedin =
                                    await Provider.of<AuthProvider>(context,
                                            listen: false)
                                        .authStatus;
                                if (isLogedin) {
                                  try {
                                    favstatus.makeFavourite();
                                    await favstatus.addToFavourite(
                                        Provider.of<AuthProvider>(context,
                                                listen: false)
                                            .userId!,
                                        id);
                                  } catch (_) {}
                                } else {
                                  Navigator.of(context)
                                      .pushNamed(AppRoutes.login);
                                }
                              },
                              child: SizedBox(
                                  height: 40,
                                  child: AppIcons.bookMarkOutlined));
                    }
                  },
                ),
              ]),
        ],
      ),
    );
  }
}

void reportProperty({
  required BuildContext context,
  required String id,
}) {
  showModalBottomSheet(
    backgroundColor: Colors.transparent,
    isScrollControlled: true,
    context: context,
    builder: (context) {
      return Container(
        padding: const EdgeInsets.only(left: 10, right: 10, top: 15),
        decoration: BoxDecoration(
            color: Provider.of<DarkModeProvider>(context).isDarkMode
                ? AppColor.darkModeColor
                : Colors.white,
            borderRadius:
                const BorderRadius.vertical(top: Radius.circular(16))),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Center(
              child: Container(
                height: 7,
                width: 40,
                decoration: BoxDecoration(
                    color: AppColor.primaryColor,
                    borderRadius: BorderRadius.circular(15.0)),
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              child: Text(
                "Why are you reporting this property?",
                style: TextStyle(
                  fontSize: AppTextSize.headerSize - 1.5,
                  fontFamily: AppFonts.semiBold,
                ),
              ),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              child: Text(
                "please be aware that your report will be completely anonymous. We do not collect any personal information or associate your identity with the report.",
                style: TextStyle(
                    color: AppColor.grey,
                    fontSize: AppTextSize.titleSize,
                    fontFamily: AppFonts.medium),
              ),
            ),
            const SizedBox(height: 10),
            ListView.builder(
              shrinkWrap: true,
              itemCount: reportChoices.length,
              physics: const NeverScrollableScrollPhysics(),
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: () async {
                    return showDialog(
                        context: context,
                        builder: (ctx) => AlertDialog(
                              title: const Text("Are You Sure?"),
                              content: const Text(
                                  "You want to report this property."),
                              actions: [
                                TextButton(
                                  child: const Text("No"),
                                  onPressed: () {
                                    return Navigator.of(ctx).pop(false);
                                  },
                                ),
                                TextButton(
                                  child: const Text("Yes"),
                                  onPressed: () async {
                                    try {
                                      context.loaderOverlay.show();
                                      await Provider.of<PropertiesProvider>(
                                              context,
                                              listen: false)
                                          .reportProperty(
                                              userID: Provider.of<AuthProvider>(
                                                      context,
                                                      listen: false)
                                                  .userId!,
                                              propertyID: id,
                                              message: reportChoices[index])
                                          .then((_) {
                                        Navigator.pop(context);
                                        context.loaderOverlay.hide();

                                        showInfoResponse(
                                            context: context,
                                            message: "Property Reported");

                                        Navigator.pop(context);
                                      });
                                    } on CustomException catch (e) {
                                      context.loaderOverlay.hide();
                                      showErrorResponse(
                                          context: context,
                                          message: e.toString());
                                      Navigator.pop(context);
                                    } catch (e) {
                                      context.loaderOverlay.hide();
                                      showErrorResponse(
                                          context: context,
                                          message: e.toString());
                                      Navigator.pop(context);
                                    }
                                  },
                                )
                              ],
                            ));
                  },
                  child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 12.0, vertical: 8),
                      child: Text(reportChoices[index],
                          style: TextStyle(
                              fontSize: AppTextSize.titleSize + 1,
                              fontFamily: AppFonts.semiBold))),
                );
              },
            )
          ],
        ),
      );
    },
  );
}
