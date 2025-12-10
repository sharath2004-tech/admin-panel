import 'package:basic_utils/basic_utils.dart' as bu;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/properties.dart';

import '../../../const/app.dart';
import '../../../const/route.dart';
import '../../../const/setting.dart';
import '../../../controllers/dark_mode.dart';

class ViewAllPropertiesType extends StatefulWidget {
  const ViewAllPropertiesType({super.key});

  @override
  State<ViewAllPropertiesType> createState() => _ViewAllPropertiesTypeState();
}

class _ViewAllPropertiesTypeState extends State<ViewAllPropertiesType> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          elevation: 0.0,
          automaticallyImplyLeading: false,
          centerTitle: true,
          leading: IconButton(
            onPressed: () => Navigator.of(context).pop(),
            icon: const Icon(Icons.arrow_back_ios, size: 20),
          ),
          title: Text(
            "Property Types",
            style: TextStyle(
              fontSize: AppTextSize.headerSize,
              fontFamily: AppFonts.bold,
            ),
          ),
        ),
        body: SingleChildScrollView(
          child: Consumer<PropertiesProvider>(
            builder: (context, data, _) {
              return ListView.builder(
                shrinkWrap: true,
                itemCount: data.propertType.length,
                physics: const BouncingScrollPhysics(),
                itemBuilder: (context, index) {
                  return GestureDetector(
                    onTap: () => Navigator.pushNamed(
                        context, AppRoutes.propertiesByType, arguments: [
                      data.propertType[index].id,
                      data.propertType[index].name
                    ]),
                    child: Container(
                        height: 60,
                        width: screenSize(context).width,
                        alignment: Alignment.center,
                        margin: const EdgeInsets.symmetric(
                            horizontal: 12.0, vertical: 6),
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: index == (data.propertType.length - 1)
                                ? BorderSide
                                    .none // Hide border for the last index
                                : BorderSide(
                                    color:
                                        Provider.of<DarkModeProvider>(context)
                                                .isDarkMode
                                            ? Colors.white
                                            : Colors.black87,
                                    width: 0.15),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Container(
                                height: 36,
                                width: 36,
                                decoration: BoxDecoration(
                                    color: Colors.white,
                                    shape: BoxShape.circle,
                                    boxShadow: customBoxShadow()),
                                child: AppPropTypesAssets.propTypes
                                        .contains(data.propertType[index].name)
                                    ? Padding(
                                        padding: const EdgeInsets.all(8),
                                        child: Image.asset(
                                            "assets/types/${data.propertType[index].name}.png",
                                            color: AppColor.primaryColor))
                                    : const Icon(Icons.aspect_ratio,
                                        color: AppColor.primaryColor,
                                        size: 18)),
                            const SizedBox(width: 15),
                            Text(
                              bu.StringUtils.capitalize(
                                  data.propertType[index].name,
                                  allWords: true),
                              style: TextStyle(
                                  fontSize: AppTextSize.titleSize,
                                  fontFamily: AppFonts.semiBold),
                            ),
                          ],
                        )),
                  );
                },
              );
            },
          ),
        ));
  }
}
