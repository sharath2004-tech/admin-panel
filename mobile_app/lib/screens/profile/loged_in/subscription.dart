import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/controllers/profile.dart';

import '../../../const/app.dart';
import '../../../const/setting.dart';
import '../../../controllers/dark_mode.dart';
import '../../../widgets/profile/broker/subscription/active.dart';
import '../../../widgets/profile/broker/subscription/free.dart';
import '../../../widgets/profile/broker/subscription/history.dart';

class SubscriptionScreen extends StatefulWidget {
  final String brokerID;

  const SubscriptionScreen({super.key, required this.brokerID});
  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  bool isInit = true;
  late Future activeStatusData;

  late Future historyData;
  @override
  void didChangeDependencies() {
    if (isInit) {
      activeStatusData = Provider.of<ProfileProvider>(context, listen: false)
          .getActiveSubscription(brokerID: widget.brokerID);

      historyData = Provider.of<ProfileProvider>(context, listen: false)
          .getSubscriptionHistory(brokerID: widget.brokerID);
      isInit = false;
    }
    super.didChangeDependencies();
  }

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
          "Subscription",
          style: TextStyle(
            fontSize: AppTextSize.headerSize,
            fontFamily: AppFonts.bold,
          ),
        ),
        actions: [
          GestureDetector(
            onTap: () {
              setState(() {
                activeStatusData =
                    Provider.of<ProfileProvider>(context, listen: false)
                        .getActiveSubscription(brokerID: widget.brokerID);

                historyData =
                    Provider.of<ProfileProvider>(context, listen: false)
                        .getSubscriptionHistory(brokerID: widget.brokerID);
              });
            },
            child: const Padding(
              padding: EdgeInsets.only(right: 8.0),
              child: Icon(Icons.refresh),
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            //
            //Active Subscription Check
            //
            FutureBuilder(
              future: activeStatusData,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                      child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Transform.scale(
                        scale: 0.7,
                        child: const CircularProgressIndicator.adaptive()),
                  ));
                } else {
                  if (snapshot.hasError) {
                    return const Center(
                      child: Text("Error"),
                    );
                  } else {
                    return Consumer<ProfileProvider>(
                      builder: (context, value, _) {
                        if (value.freeQuota.isNotEmpty) {
                          return FreePlanWidget(
                            value: value,
                          );
                        }
                        return Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 15),
                            header("Current Package"),
                            const SizedBox(height: 10),
                            CurrentSubscriptionWidget(value: value),
                          ],
                        );
                      },
                    );
                  }
                }
              },
            ),
            Container(
              height: 8,
              margin: const EdgeInsets.only(top: 20),
              width: screenSize(context).width,
              color: AppColor.grey.withOpacity(0.08),
            ),

            //
            //History
            //
            FutureBuilder(
              future: historyData,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                      child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Transform.scale(
                        scale: 0.7,
                        child: const CircularProgressIndicator.adaptive()),
                  ));
                } else {
                  if (snapshot.hasError) {
                    return const Center(
                      child: Text("Error"),
                    );
                  } else {
                    return Consumer<ProfileProvider>(
                      builder: (context, value, _) {
                        if (value
                            .subscriptionHistory[0].pagination.data.isEmpty) {
                          return Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const SizedBox(height: 15),
                              header("Subscription History"),
                              SizedBox(height: screenSize(context).width * 0.2),
                              Center(
                                child: SizedBox(
                                    height: screenSize(context).width * 0.45,
                                    child: Image.asset(AppAssets.walletEmpty,
                                        color: Provider.of<DarkModeProvider>(
                                                    context)
                                                .isDarkMode
                                            ? AppColor.darkModeColor
                                            : null)),
                              ),
                              const SizedBox(height: 10),
                              Center(
                                child: Text(
                                  "You dont have any subscription yet.",
                                  style: TextStyle(
                                      fontSize: AppTextSize.titleSize + 1,
                                      color: AppColor.grey,
                                      fontFamily: AppFonts.semiBold),
                                ),
                              ),
                            ],
                          );
                        }
                        return SubscriptionHistoryWidget(value: value);
                      },
                    );
                  }
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
