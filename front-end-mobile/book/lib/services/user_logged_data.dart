import 'package:flutter/material.dart';

class user with ChangeNotifier {
  String? email;

  user({
   required this.email,
  });
}

class logged_in_user with ChangeNotifier {
  user User = user(email: "");

  getUser() {
    return User.email;
  }

  log_user(String mail) {
    User = user(email: mail);
    notifyListeners();
  }

  log_off_user() {
    User = user(email: "");
    notifyListeners();
  }
}
