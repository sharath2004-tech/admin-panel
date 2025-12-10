import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../controllers/auth.dart';
import '../screens/profile/loged_in/profile.dart';
import '../screens/profile/not_loged_in/profile.dart';

class ProfileAuthStatus extends StatelessWidget {
  const ProfileAuthStatus({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: Provider.of<AuthProvider>(context).authStatus,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          if (snapshot.data == true) {
            return const ProfileScreen();
          } else {
            return const ProfileScreenNotLogedIn();
          }
        } else if (snapshot.hasError) {
          return const Center(
            child: Text('Unknown error Occured!'),
          );
        } else {
          return Container();
        }
      },
    );
  }
}
