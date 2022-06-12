import 'package:bookstore/views/action_bar.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../utils/api.dart';
import '../utils/dimensions.dart';
import '../utils/jsonParse/previewBooks.dart';

import '../views/product_preview.dart';

class search_page extends StatefulWidget {
  const search_page({Key? key, required this.search}) : super(key: key);
  final String search;

  @override
  _search_pageState createState() => _search_pageState();
}

class _search_pageState extends State<search_page> {
  static final _categories = [
    "Novel",
    "Non-fiction",
    "Manga",
    "Woodworking",
    "Light Novel",
    "Drama",
  ];

  String selected = "All";

  String my_search = "";

  void initState() {
    super.initState();
    () async {
      await allBooks();
      setState(() {
        // Update your UI with the desired changes.
      });
      my_search = widget.search;
      getProduct();
    }();

    // obtain shared preferences
  }

  List<PreviewBooks>? items;

  Future allBooks() async {
    final url = Uri.parse(API.allBooks);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = previewBooksFromJson(response.body);
        items = await result;
        //print(items[0].id);
        return result;
      } else {
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
  }

  List<PreviewBooks>? list;
  bool ascending = false;

  Future<void> getProduct() async {
    List<PreviewBooks>? search_title = await items
        ?.where((element) =>
            element.title!.toLowerCase().contains(my_search.toLowerCase())|| element.description!
        .toLowerCase()
        .contains(my_search.toLowerCase()))
        .toList();
    /*
    List<PreviewBooks>? search_des = await items
        ?.where((element) => element.description!
            .toLowerCase()
            .contains(my_search.toLowerCase()))
        .toList();*/
    //var exclusion = search_title?.except(search_des!);       // [1, 2]
    //var intersection = search_title?.intersect(search_des!); // [3, 4]
    //var union = search_title?.union(search_des!);
    list = search_title;
    //print(list);
    for (var i in list!) {
      print(i.title);
    }
    //print(_product?.title);
  }

  num stocks = 1;

/*
  Future<void> getProduct() async {
    print("aaaaaaaaaaaaaaaaaaa");
   // print(items[items.indexWhere((element) => element.title == widget.search)]);
    print("aaaaaaaaaaaaaaaaaaa");
    var searc_title=
    items.where((element) => element['title'].toLowerCase().contains(my_search.toLowerCase())).toList;
    print("my search is $my_search");
    print("items is $items");
    print("search title is #$searc_title");
    x=searc_title;
    var searc_desc=
        items.where((element) => element.description.toLowerCase().contains(my_search.toLowerCase())).toList;

    //_product = wanted;
    //print(_product?.title);
  }*/
  /*
  Future<void> getProduct() async {
    //PreviewBooks wanted = items[items.indexWhere((element) => element.title == widget.search)];
    items.Where((element) => element['title'].toLowerCase().contains(my_search.toLowerCase())).toList;

    //print(wanted.title);
  }*/
  @override
  Widget build(BuildContext context) {
    int len = list?.length ?? 0;
    //print(items[0].title);
    //getProduct();
    if (items == null) {
      allBooks();
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    return Scaffold(
      appBar: ActionBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(children: [
              SizedBox(
                width: 5,
              ),
              Expanded(child: TextFormField(
                onChanged: (value) {
                  setState(() {
                    my_search = value;
                  });
                },
              )),
              IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => search_page(
                              search: my_search,
                            )));

                  },
                  icon: Icon(Icons.search))
            ]),
            /* SizedBox( // maybe it will be added in future.
              height: 60,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: List.generate(_categories.length, (int index) {
                  return OutlinedButton(
                    onPressed: () {},
                    child: Container(
                      height: 50.0,
                      width: 100.0,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(_categories[index]),
                        ],
                      ),
                    ),
                  );
                }),
              ),
            ), */
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                DropdownButton<String>(
                  value: selected,
                  icon: const Icon(Icons.arrow_downward),
                  elevation: 16,
                  style: const TextStyle(color: Colors.deepPurple),
                  underline: Container(
                    height: 2,
                    color: Colors.deepPurpleAccent,
                  ),
                  onChanged: (String? newValue) {
                    setState(() {
                      //list = items as List<PreviewBooks>;
                      selected = newValue!;
                      if (selected == "Name") {
                        if (ascending) {
                          list!.sort((a, b) => a.title!.compareTo(b.title!));
                        } else {
                          list!.sort((b, a) => a.title!.compareTo(b.title!));
                        }
                      } else if (selected == "Release Date") {
                        if (ascending) {
                          list!.sort((a, b) =>
                              a.releaseDate!.compareTo(b.releaseDate!));
                        } else {
                          list!.sort((a, b) =>
                              a.releaseDate!.compareTo(b.releaseDate!));
                        }
                      } else if (selected == "Rating") {
                        if (ascending) {
                          list!
                              .sort((b, a) => a.raiting!.compareTo(b.raiting!));
                        } else {
                          list!
                              .sort((a, b) => a.raiting!.compareTo(b.raiting!));
                        }
                      } else if (selected == "Most Sold") {
                        if (ascending) {
                          list!.sort(
                              (b, a) => a.amountSold!.compareTo(b.amountSold!));
                        } else {
                          list!.sort(
                              (a, b) => a.amountSold!.compareTo(b.amountSold!));
                        }
                      } else {
                        if (ascending) {
                          list!.sort((a, b) => a.id!.compareTo(b.id!));
                        } else {
                          list!.sort((b, a) => a.id!.compareTo(b.id!));
                        }
                      }
                      //if(selected =="Name"){
                      //list.sort((a, b) => a.title.compareTo(b.title));;
                      //for(var i in list){
                      //print(list.title);}}
                    });
                  },
                  items: <String>[
                    'All',
                    'Name',
                    'Release Date',
                    'Rating',
                    'Most Sold'
                  ].map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                ),
                IconButton(
                  onPressed: () {
                    setState(() {
                      if (ascending) {
                        ascending = false;
                      } else {
                        ascending = true;
                      }
                      if (selected == "Name") {
                        if (ascending) {
                          list!.sort((a, b) => a.title!.compareTo(b.title!));
                        } else {
                          list!.sort((b, a) => a.title!.compareTo(b.title!));
                        }
                      } else if (selected == "Release Date") {
                        if (ascending) {
                          list!.sort((a, b) =>
                              a.releaseDate!.compareTo(b.releaseDate!));
                        } else {
                          list!.sort((b, a) =>
                              a.releaseDate!.compareTo(b.releaseDate!));
                        }
                      } else if (selected == "Rating") {
                        if (ascending) {
                          list!
                              .sort((b, a) => a.raiting!.compareTo(b.raiting!));
                        } else {
                          list!
                              .sort((a, b) => a.raiting!.compareTo(b.raiting!));
                        }
                      } else if (selected == "Most Sold") {
                        if (ascending) {
                          list!.sort(
                              (b, a) => a.amountSold!.compareTo(b.amountSold!));
                        } else {
                          list!.sort(
                              (a, b) => a.amountSold!.compareTo(b.amountSold!));
                        }
                      } else {
                        if (ascending) {
                          list!.sort((a, b) => a.id!.compareTo(b.id!));
                        } else {
                          list!.sort((b, a) => a.id!.compareTo(b.id!));
                        }
                      }
                    });
                  },
                  icon: myicon(ascending),
                )
              ],
            ),
            SizedBox(
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
                              for (var i in list!)
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
          ],
        ),
      ),
      /*body: SizedBox(
      child: Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
      Expanded(
      flex: 1,
      child: Wrap(
      alignment: WrapAlignment.spaceAround,
      children: List.generate(
      list.length,
      (index) => Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: ProductPreview(
      product: list[index],
      ),
      )),
    ),
    ),
    ],
    )),
      )*/
    );
  }
}

Widget myicon(bool a) {
  if (a) {
    return Icon(Icons.arrow_downward);
  } else {
    return Icon(Icons.arrow_upward);
  }
}
