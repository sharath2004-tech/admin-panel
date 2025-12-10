import 'package:basic_utils/basic_utils.dart' as bu;
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../const/app.dart';
import '../../../const/route.dart';
import '../../../const/setting.dart';
import '../../../controllers/owners.dart';

class OwnersWidget extends StatelessWidget {
  const OwnersWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<OwnersProvider>(
      builder: (context, data, _) {
        return ListView.builder(
            shrinkWrap: true,
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: data.owners.length,
            padding: const EdgeInsets.all(0),
            itemBuilder: (ctx, index) {
              return GestureDetector(
                onTap: () => Navigator.pushNamed(
                    context, AppRoutes.ownerProperties, arguments: [
                  data.owners[index].id,
                  data.owners[index].name
                ]),
                child: SizedBox(
                  width: screenSize(context).width * 0.24,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        height: 60,
                        width: 60,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppColor.primaryColor.withOpacity(0.1),
                          image: DecorationImage(
                            image: CachedNetworkImageProvider(
                                data.owners[index].logo),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        bu.StringUtils.capitalize(data.owners[index].name,
                            allWords: true),
                        maxLines: 2,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: AppTextSize.titleSize - 2,
                            overflow: TextOverflow.ellipsis,
                            fontFamily: AppFonts.semiBold),
                      )
                    ],
                  ),
                ),
              );
            });
      },
    );
  }
}
