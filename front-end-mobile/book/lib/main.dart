import 'package:bookstore/pages/basket.dart';
import 'package:bookstore/pages/homepage.dart';
import 'package:bookstore/pages/profile.dart';
import 'package:bookstore/pages/sign_in.dart';
import 'package:bookstore/root.dart';
import 'package:bookstore/services/basket_data.dart';
import 'package:bookstore/services/istaken.dart';
import 'package:bookstore/services/root_index.dart';
import 'package:bookstore/services/user_logged_data.dart';
import 'package:bookstore/services/wishes_data.dart';
import 'package:flutter/material.dart';
import 'package:bookstore/pages/sign_up.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(BaseApp());
}

class BaseApp extends StatefulWidget {
  const BaseApp({Key? key}) : super(key: key);

  @override
  _BaseAppState createState() => _BaseAppState();
}

class _BaseAppState extends State<BaseApp> {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [ListenableProvider<Wishes>(
          create: (BuildContext context) {
            return Wishes();
          },
        ),
          ListenableProvider<Basket>(
            create: (BuildContext context) {
              return Basket();
            },
          ),
          ListenableProvider<taken>(
            create: (BuildContext context) {
              return taken();
            },
          ),
          ListenableProvider<logged_in_user>(
            create: (BuildContext context) {
              return logged_in_user();
            },
          ),
          ListenableProvider<ClassRoot>(
            create: (BuildContext context) {
              return ClassRoot();
            },
          )
        ],
        child: MaterialApp(
          routes: {
            '/': (context) => const Root(),
            '/signIn': (context) => const SignIn(),
            '/signUp': (context) => const SignUp(),
            '/profile': (context) => const Profile(),
            '/homepage': (context) => const HomePage(),
          },
        ));
  }
}
