import 'package:flutter/material.dart';

class user  with ChangeNotifier{
  num? Pcid;
  String? name;
  String? adress;
  user({
    required this.name,
    required this.Pcid,
    required this.adress,
  });

}
class logged_in_user with ChangeNotifier{
  user User=user(name: "",Pcid: -1,adress: "");
  getUser(){
    return User;
  }
  log_user(num id,String add,String Name){
    User=user(name:Name ,Pcid: id,adress: add);
    notifyListeners();
  }
  log_off_user(){
    user User=user(name: "",Pcid: -1,adress: "");
    notifyListeners();
  }
}
