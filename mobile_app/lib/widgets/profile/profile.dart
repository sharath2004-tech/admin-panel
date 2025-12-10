import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:real_estate/widgets/profile/user/user.dart';

import '../../controllers/profile.dart';
import 'broker/broker.dart';

class ProfileWidget extends StatelessWidget {
  const ProfileWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ProfileProvider>(
      builder: (context, value, _) {
        if (value.user[0].role != "Broker") {
          return const UserProfileWidget();
        }
        return const BrokerProfileWidget();
      },
    );
  }
}
