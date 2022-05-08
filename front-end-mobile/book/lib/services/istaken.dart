import 'package:flutter/material.dart';

class taken with ChangeNotifier{
  int take=0;
  now_taken(){
    take =1;

  }
  not_taken(){
    take=0;
  }
  get(){
    return take;
  }
}
