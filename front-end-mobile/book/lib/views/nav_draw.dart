import 'dart:convert';

import 'package:bookstore/pages/category_page.dart';
import 'package:bookstore/utils/colors.dart';
import 'package:bookstore/utils/styles.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../utils/api.dart';
import '../utils/jsonParse/previewBooks.dart';
import 'package:http/http.dart' as http;
class nav_draw extends StatelessWidget {
   nav_draw({Key? key,required this.categories}) : super(key: key);
   final List<String> categories;
  static final _categories = [
    "Novel",
    "Non-fiction",
    "Manga",
    "Woodworking",
    "Light Novel",
    "Drama",
  ];
  @override

  var counter_cat = 0;
  dynamic items_cat;
  Future allCategories() async {
    final url = Uri.parse(API.all_catogary);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = jsonDecode(response.body);
        counter_cat = result.length;
        items_cat = result;
        int c=0;
        print(result.runtimeType);
        print(counter_cat);
        while(c<counter_cat){
          print(counter_cat);
          _categories.add(items_cat[c.toString()]);
          c++;
        }

        print(result);
        return result;
      }
      else {
        print(response.statusCode);
      }

    } catch (e) {
      print(e.toString());
    }
  }

  Widget build(BuildContext context) {
    print("zzzzzzzzzzzzzzzzzzzzzzzzzzz");
    //allCategories();

    return Drawer(
      backgroundColor: AppColors.primary,
      elevation: 2.0,
      child: ListView(
        scrollDirection: Axis.vertical,
        children: List.generate(categories.length, (int index) {
          return OutlinedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(AppColors.primaryBackground),
              padding: MaterialStateProperty.all(const EdgeInsets.all(20)),
            ),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => Category(cat: index + 1,)));
            },
            child: Container(
              width: 200,
              color: AppColors.secondaryBackground,
              height: 50.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    categories[index],
                    style: kButtonDarkTextStyle,
                  ),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
