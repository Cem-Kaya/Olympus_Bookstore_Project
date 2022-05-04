import 'package:bookstore/pages/basket.dart';
import 'package:bookstore/pages/sign_in.dart';
import 'package:bookstore/root.dart';
import 'package:bookstore/services/basket_data.dart';
import 'package:flutter/material.dart';
import 'package:bookstore/pages/sign_up.dart';
import 'package:provider/provider.dart';


void main() {
  runApp(
      ListenableProvider<Basket>(
        create: (BuildContext context) { return Basket(); },

        child: MaterialApp(
    routes: {
        '/': (context) => const Root(),
        '/signIn': (context) => const SignIn(),
        '/signUp': (context) => const SignUp()
    },
  ),
      ));
}
