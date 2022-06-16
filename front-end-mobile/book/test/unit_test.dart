
import 'package:bookstore/pages/suggestions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';


void main() {
  testWidgets("Test: Suggestion has title.", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Suggestions(),));
    final title = find.text("My Suggestions");
    expect(title, findsOneWidget);
  });
}


