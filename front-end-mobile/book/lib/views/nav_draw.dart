import 'package:bookstore/pages/category_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class nav_draw extends StatelessWidget {
  const nav_draw({Key? key}) : super(key: key);
  static final _categories = [
    "Novel",
    "Non-fiction",
    "Manga",
    "Woodworking",
    "Light Novel",
    "Drama",
  ];

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.amber,
      elevation: 2.0,
      child: ListView(
        scrollDirection: Axis.vertical,
        children: List.generate(_categories.length, (int index) {
          return OutlinedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(Colors.green),
              padding: MaterialStateProperty.all(const EdgeInsets.all(20)),
            ),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => Category(cat: index + 1,)));
            },
            child: Container(
              width: 200,
              color: Colors.blue,
              height: 50.0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    _categories[index],
                    style: TextStyle(color: Colors.black),
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
