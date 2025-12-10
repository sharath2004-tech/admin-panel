import 'package:flutter/cupertino.dart';
import '../../const/app.dart';
import '../../const/setting.dart';

class PropertyHeader extends StatelessWidget {
  final String header;
  final Widget ontap;

  const PropertyHeader({super.key, required this.header, required this.ontap});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 10, top: 20, right: 10, bottom: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text(
            header,
            style: TextStyle(
              fontSize: AppTextSize.headerSize,
              fontFamily: AppFonts.title,
            ),
          ),
          GestureDetector(
            onTap: () => Navigator.of(context)
                .push(CupertinoPageRoute(builder: (context) => ontap)),
            child: Text(
              "View all",
              style: TextStyle(
                fontSize: AppTextSize.subTextSize + 1,
                color: AppColor.primaryColor,
                fontFamily: AppFonts.semiBold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
