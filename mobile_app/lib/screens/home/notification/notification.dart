import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/const/app.dart';
import 'package:real_estate/controllers/auth.dart';
import 'package:real_estate/controllers/dark_mode.dart';
import 'package:real_estate/controllers/notification/notification.dart';
import 'package:timeago/timeago.dart' as timeago;

import '../../../const/setting.dart';
import '../../../model/notification.dart';

class NotificationScreen extends StatelessWidget {
  NotificationScreen({super.key});

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
            Provider.of<NotificationProvider>(context, listen: false)
                .markAllAsRead(context,
                    Provider.of<AuthProvider>(context, listen: false).userId!);
          },
          icon: const Icon(Icons.arrow_back_ios, size: 20),
        ),
        title: Text(
          "Notification",
          style: TextStyle(
              fontSize: AppTextSize.headerSize, fontFamily: AppFonts.bold),
        ),
      ),
      body: DefaultTabController(
        length: 2,
        child: Column(
          children: [
            const SizedBox(height: 10),
            Container(
              height: 40,
              width: screenSize(context).width * 0.8,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8.0),
                  boxShadow: customBoxShadow()),
              child: TabBar(
                indicator: BoxDecoration(
                    borderRadius: BorderRadius.circular(8.0),
                    color: AppColor.primaryColor),
                labelColor: Colors.white,
                unselectedLabelColor: Colors.black,
                tabs: _tabs,
              ),
            ),
            Expanded(
              child: TabBarView(
                // physics: const NeverScrollableScrollPhysics(),
                children: [
                  Consumer<NotificationProvider>(
                    builder: (context, value, _) {
                      if (value.notReadedNotification.isEmpty) {
                        return const Center(child: Text("No New Notification"));
                      }
                      return ListView.builder(
                          shrinkWrap: true,
                          itemCount: value.notReadedNotification.length,
                          padding: const EdgeInsets.only(top: 10, bottom: 10),
                          itemBuilder: (context, index) {
                            return NotificationWidget(
                              isRead: false,
                              data: value.notReadedNotification[index],
                            );
                          });
                    },
                  ),
                  //
                  //On The way
                  //

                  Consumer<NotificationProvider>(
                    builder: (context, value, _) {
                      if (value.readedNotification.isEmpty) {
                        return const Center(child: Text("No New Notification"));
                      }
                      return ListView.builder(
                        shrinkWrap: true,
                        itemCount: value.readedNotification.length,
                        padding: const EdgeInsets.only(top: 15, bottom: 10),
                        itemBuilder: (context, index) {
                          return NotificationWidget(
                            isRead: true,
                            data: value.readedNotification[index],
                          );
                        },
                      );
                    },
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  final _tabs = [
    const Tab(text: 'Unread'),
    const Tab(text: 'All'),
  ];
}

class NotificationWidget extends StatelessWidget {
  final NotificationData data;
  final bool isRead;
  const NotificationWidget(
      {super.key, required this.data, required this.isRead});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: screenSize(context).width,
      margin: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 5.0),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          color: Provider.of<DarkModeProvider>(context).isDarkMode
              ? AppColor.primaryColor.withOpacity(0.1)
              : Colors.white,
          boxShadow: Provider.of<DarkModeProvider>(context).isDarkMode
              ? null
              : customBoxShadow()),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          isRead
              ? Container(
                  margin: const EdgeInsets.only(left: 10.0),
                )
              : Container(
                  height: 5.0,
                  width: 5.0,
                  margin: const EdgeInsets.only(left: 5.0, right: 10.0),
                  decoration: const BoxDecoration(
                      color: Colors.red, shape: BoxShape.circle)),
          Flexible(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                //
                //Title
                //
                Padding(
                  padding: const EdgeInsets.only(top: 12, right: 10.0),
                  child: Text(
                    data.title,
                    maxLines: 2,
                    style: TextStyle(
                        fontSize: AppTextSize.titleSize,
                        overflow: TextOverflow.ellipsis,
                        fontFamily: AppFonts.semiBold),
                  ),
                ),

                Padding(
                  padding: const EdgeInsets.only(top: 4, right: 10.0),
                  child: Text(
                    data.body,
                    maxLines: 3,
                    style: TextStyle(
                        fontSize: AppTextSize.subTextSize + 1,
                        overflow: TextOverflow.ellipsis,
                        fontFamily: AppFonts.medium),
                  ),
                ),
                Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(right: 10.0, top: 6),
                        child: Text(
                          timeago.format(data.createdAt),
                          maxLines: 3,
                          style: TextStyle(
                              fontSize: AppTextSize.subTextSize,
                              overflow: TextOverflow.ellipsis,
                              fontFamily: AppFonts.regular),
                        ),
                      ),
                    ]),

                const SizedBox(height: 6)
              ],
            ),
          ),
        ],
      ),
    );
  }
}
