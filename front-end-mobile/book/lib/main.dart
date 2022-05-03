import 'package:bookstore/pages/sign_in.dart';
import 'package:bookstore/root.dart';
import 'package:flutter/material.dart';
import 'package:bookstore/pages/sign_up.dart';


void main() {
  runApp(MaterialApp(
    routes: {
      '/': (context) => const Root(),
      '/signIn': (context) => const SignIn(),
      '/signUp': (context) => const SignUp()
    },
  ));
}
