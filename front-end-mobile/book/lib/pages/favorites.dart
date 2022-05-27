import 'package:flutter/material.dart';

import '../utils/api.dart';
import '../utils/jsonParse/previewBooks.dart';
import '../views/action_bar.dart';
import '../views/product_preview.dart';
import 'package:http/http.dart' as http;

class Favorites extends StatefulWidget {
  const Favorites({Key? key, required this.wishes}) : super(key: key);
  final List<num> wishes;


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
      setState(() {
        // Update your UI with the desired changes.
      });
    };
  }

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
          items=items?.where((element) => widget.wishes.contains(element.id)).toList();
          print(items);
          print("inside all books");
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
  Widget build(BuildContext context) {
    print(widget.wishes);
    if(widget.wishes.length==0) {
      return Scaffold(
        appBar: ActionBar(title:"MY WISHES",),
      body:Center(
        child: Text("Favorites"), //aaaaaaaaaaaaaaaaaa
      ),
      );
    }

    else{
      if (items == null) {
        allBooks();
        return const Center(
          child: CircularProgressIndicator(),
        );
      }
      return Scaffold(
        appBar: ActionBar(title:"MY WISHES",),
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
                                child: ProductPreview(product: i ),
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
