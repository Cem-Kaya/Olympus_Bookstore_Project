import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../services/user_logged_data.dart';
import '../utils/api.dart';
import '../utils/jsonParse/previewBooks.dart';
import '../views/action_bar.dart';
import '../views/producpreview2.dart';
import '../views/product_preview.dart';
import 'package:http/http.dart' as http;

class Favorites extends StatefulWidget {
  const Favorites({Key? key, required this.wishes,required this.use}) : super(key: key);
  final List<num> wishes;
  final String use;
  @override
  State<Favorites> createState() => _FavoritesState();
}

class _FavoritesState extends State<Favorites> {
  @override
  var counter = 0;
  List<PreviewBooks>? items;

  @override
  void initState() {
    super.initState();
    () async {
      await allBooks();
      setState(() async{
        // Update your UI with the desired changes.
      });
    };
  }
  var wishes;
  List<num> wishid=[];

  ALLwishes(String email) async {//it will be handled
    try {

      wishes = await http.post(
        Uri.parse(API.allwishes), //it will be handled
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "email": email,
          },
        ),
      );
      setState(() {
        wishes =jsonDecode(wishes.body);
      });

      int i =0;
      while(i<wishes.length){
        wishid.add(wishes[i]["Pid"]);
        i=i+1;
      }
      print("inside");
      print(wishes);


    } catch (e) {
      print("error is ${e.toString()}");
    }
  }

  Future allBooks() async {
    final url = Uri.parse(API.allBooks);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = previewBooksFromJson(response.body);
        await ALLwishes(widget.use);
        //print(result[0].id);
        setState(() {
          counter = result.length;

          items = result;
          items = items
              ?.where((element) => wishid.contains(element.id))
              .toList();
          print(items);
          print("inside all books");
        });
        //print(counter);
        return items;
      } else {
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
  }

  Widget build(BuildContext context) {
    Function login = Provider.of<logged_in_user>(context).getUser;
    print(widget.wishes);
    if (widget.wishes.length == 0) {

      return Scaffold(
        appBar: ActionBar(
          title: "My Wish List",
        ),
        body: Center(
          child: Text("Wish List is empty. Add some products!"),
        ),
      );
    } else {
      if (items == null) {
        allBooks();
        return const Center(
          child: CircularProgressIndicator(),
        );
      }
      return Scaffold(
        appBar: ActionBar(
          title: "My Wish List",
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
                            for (var i in items!)
                              Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 8.0),
                                child: ProductPreview2(product: i),
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
}
