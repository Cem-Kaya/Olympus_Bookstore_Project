
import 'package:bookstore/pages/homepage.dart';
import 'package:bookstore/pages/sign_in.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';


void main() {
  testWidgets("LoginPage has 2 text fields.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: SignIn(),));
    expect(find.byType(TextFormField), findsNWidgets(2));
  });
}


