import 'package:flutter/material.dart';

class BottomNavBarProvider with ChangeNotifier {
  int _selectedIndex = 0;
  int get selectedIndex => _selectedIndex;

  void onChangeIndex(int newIndex) {
    _selectedIndex = newIndex;
    notifyListeners();
  }
}