import 'package:flutter/material.dart';

class RootIndex extends ChangeNotifier {

  num? root;

  RootIndex ({required this.root});

}

class ClassRoot extends ChangeNotifier {

  RootIndex rootChange = RootIndex(root: 0);

  getRoot() {
    return rootChange.root;
  }
  changeRoot (num root) {
    rootChange.root = root;
    notifyListeners();
  }
}