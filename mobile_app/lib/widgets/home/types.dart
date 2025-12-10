import 'package:basic_utils/basic_utils.dart';
import 'package:flutter/material.dart';

import '../../const/app.dart';
import '../../const/route.dart';
import '../../const/setting.dart';
import '../../model/type.dart';
import '../../screens/home/view_all/types.dart';
import 'header.dart';

class PropertiesTypeWidget extends StatelessWidget {
  final List<PropertyTypeModel> data;

  const PropertiesTypeWidget({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const PropertyHeader(
            header: "Explore", //Properties
            ontap: ViewAllPropertiesType()),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10.0),

          child: GridView.builder(
            shrinkWrap: true,
            itemCount: data.length > 8 ? 8 : data.length,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                childAspectRatio: 2.4,
                crossAxisCount: 4,
                mainAxisSpacing: 8,
                crossAxisSpacing: 8),
            itemBuilder: (context, index) {
              return GestureDetector(
                onTap: () => Navigator.pushNamed(
                    context, AppRoutes.propertiesByType,
                    arguments: [data[index].id, data[index].name]),
                child: Container(
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.0),
                      border:
                          Border.all(color: AppColor.grey.withOpacity(0.3))),
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 6),
                      child: Text(
                          StringUtils.capitalize(data[index].name,
                              allWords: true),
                          maxLines: 1,
                          style: TextStyle(
                              fontSize: AppTextSize.titleSize - 1,
                              overflow: TextOverflow.ellipsis,
                              fontFamily: AppFonts.medium)),
                    ),
                  ),
                ),
              );
            },
          ),
          // child: Wrap(
          //   spacing: 8.0, // Horizontal spacing between items
          //   runSpacing: 8.0, // Vertical spacing between rows
          //   children: List.generate(data.length, (index) {
          //     return GestureDetector(
          //       onTap: () => Navigator.pushNamed(
          //           context, AppRoutes.propertiesByType,
          //           arguments: [data[index].id, data[index].name]),
          //       child: Container(
          //         height: 38,
          //         width: screenSize(context).width * 0.2,
          //         decoration: BoxDecoration(
          //             color: Colors.white,
          //             borderRadius: BorderRadius.circular(10.0),
          //             border: Border.all(color: AppColor.grey.withOpacity(0.25))),
          //         child: Center(
          //           child: Padding(
          //             padding: const EdgeInsets.symmetric(horizontal: 6),
          //             child: Text(
          //                 StringUtils.capitalize(data[index].name, allWords: true),
          //                 maxLines: 1,
          //                 style: TextStyle(
          //                     fontSize: AppTextSize.titleSize - 1,
          //                     overflow: TextOverflow.ellipsis,
          //                     fontFamily: AppFonts.medium)),
          //           ),
          //         ),
          //       ),
          //     );
          //   }),
          // ),
        ),
      ],
    );
  }
}
