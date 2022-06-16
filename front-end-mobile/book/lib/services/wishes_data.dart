import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Wishes with ChangeNotifier {
  List<num> mywishes = [];

  List<num> get() {
    return mywishes;
  }

  void add_wishes(num productid) {
    mywishes.add(productid);
    print("my wihses is $mywishes");
    notifyListeners();
  }

  remove_wishes(num productid) {
    mywishes.remove(productid);
    print("my wihses is $mywishes");
    notifyListeners();
  }

  init_wishes(List<num> wish) {
    mywishes = wish;
    notifyListeners();


  }



}
