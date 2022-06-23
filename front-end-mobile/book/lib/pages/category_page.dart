import 'dart:convert';
import 'package:bookstore/views/action_bar.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../utils/api.dart';
import '../utils/jsonParse/previewBooks.dart';
import '../views/product_preview.dart';

class Category extends StatefulWidget {
  const Category({Key? key, required this.cat, required this.categories})
      : super(key: key);
  final num cat;
  final List<String> categories;

  @override
  State<Category> createState() => _CategoryState();
}

/*final _categories = [
  "Novel",
  "Non-fiction",
  "Manga",
  "Woodworking",
  "Light Novel",
  "Drama",
];*/

var response;
List<PreviewBooks>? cat_books;

getCategories(num pcid) async {
  //it will be handled
  try {
    response = await http.post(
      Uri.parse(API.get_catogary_books), //it will be handled
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        {
          "min": 0,
          "max": 100,
          "Pcid": pcid,
        },
      ),
    );
    cat_books = previewBooksFromJson(response.body);
    print(cat_books.runtimeType);
  } catch (e) {
    print("error is ${e.toString()}");
  }
}

class _CategoryState extends State<Category> {
  @override
  void initState() {
    super.initState();
    () async {
      await getCategories(widget.cat);
      setState(() {
        // Update your UI with the desired changes.
      });
    }();

    // obtain shared preferences
  }

  @override
  Widget build(BuildContext context) {
    if (cat_books == null) {
      getCategories(widget.cat);
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    /*
    List<dynamic> lis=[];
    var x = cat_books.length;
    int y=0;
    while(y<x){
      lis.add(cat_books[y]);
      y++;

    }
    */
    return Scaffold(
      appBar: ActionBar(
        title: widget.categories[widget.cat.toInt() - 1],
      ),
      body: SingleChildScrollView(
        child: SizedBox(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  flex: 1,
                  child: Container(
                    child: Wrap(
                        alignment: WrapAlignment.spaceAround,
                        children: <Widget>[
                          for (var i in cat_books!)
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 8.0),
                              child: ProductPreview(product: i),
                            ),
                        ]),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
