import 'dart:convert';
import 'package:bookstore/pages/search_page.dart';
import 'package:bookstore/utils/api.dart';
import 'package:bookstore/utils/colors.dart';
import 'package:bookstore/utils/dimensions.dart';
import 'package:bookstore/utils/jsonParse/previewBooks.dart';
import 'package:bookstore/utils/styles.dart';
import 'package:bookstore/views/action_bar.dart';
import 'package:bookstore/views/product_preview.dart';
import 'package:bookstore/views/slider.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../views/nav_draw.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  //Categories
  static final _categories = [
    "Reccomerndations",
    "Best Seller",
    "SELLL OF",
    "something bla bla"
  ];
  static int _currentCategory = 0;

  @override
  void initState() {
    super.initState();
    allBooks();
    // obtain shared preferences
  }
  var counter = 0;
  dynamic items;

  Future allBooks() async {
    final url = Uri.parse(API.allBooks);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = previewBooksFromJson(response.body);
        //print(result[0].id);
        setState(() {
          counter = result.length;
          items = result;
        });
        //print(counter);
        return result;
      }
      else {
        print(response.statusCode);
      }

    } catch (e) {
      print(e.toString());
    }
  }

  @override
  String _search="";
  Widget build(BuildContext context) {
    if (items == null) {
      allBooks();
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    return Scaffold(
      drawer: nav_draw(),
      appBar: ActionBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(children: [
              Expanded(child: TextFormField(
                onChanged: (value) { setState(() { _search = value; }); },
              )),
              IconButton(onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => search_page(

                      search: _search,
                    )));
              }, icon: Icon(Icons.search))
            ]),
            SizedBox(
              height: 60,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: List.generate(_categories.length, (int index) {
                  return OutlinedButton(
                    onPressed: () {},
                    child: Container(
                      height: 50.0,
                      child: Text(_categories[index]),
                    ),
                  );
                }),
              ),
            ),

            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Padding(
                padding: Dimen.regularPadding,
                child: Row(
                  children: List.generate(
                      //productPreviewList.length,
                      counter,
                      (index) => Row(children: [
                            ProductPreview(
                              product: items[index],
                            ),
                            SizedBox(width: 8),
                          ])),
                ),
              ),
            ),
            Text(
              "Recommendations",
              style: kHeadingTextStyle,
            ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Padding(
                padding: Dimen.regularPadding,
                child: Row(
                  children: List.generate(
                      counter,
                      (index) => Row(children: [
                            ProductPreview(product: items[index]),
                            SizedBox(width: 8)
                          ])),
                ),
              ),
            ),
            slider(),
            //Book of the Day
          ],
        ),
      ),
    );
  }
}
