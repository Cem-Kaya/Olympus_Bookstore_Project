import 'dart:convert';
import 'package:bookstore/pages/category_page.dart';
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
GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

class _HomePageState extends State<HomePage> {
  //Categories
  static final _categories = [
    "Best Seller",
    "Top Rated",
    "New Books",
    "Promotions",
  ];
  static int _currentCategory = 0;

  List<String> cat=[];
  /*
  @override
  void initState() {
    super.initState();
    ()async{
    await allCategories();};
    setState(() {

    });
    print("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    print(cat_books);
    allBooks();


    // obtain shared preferences
  }*/
  var counter = 0;
  List<PreviewBooks>? items;

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
  var counter_cat = 0;
  dynamic items_cat;

  Future allCategories() async {
    final url = Uri.parse(API.all_catogary);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = jsonDecode(response.body);

        print("aaaaaaaaaaaaa");
        setState(() {
          counter_cat = result.length;
          items_cat = result;
        });
        print("ppppppppppppp");
        print(result);
        int c=1;
        cat=[];

        while(c<=counter_cat){
          //print(items_cat[c.toString()]);
          cat.add(items_cat[c.toString()]);
          //print(cat);
          c++;
        }
        print("bbbbbbbbbbb");
        print(cat);
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
    //allCategories();
    if (items == null || cat==null) {
      allBooks();
      allCategories();
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    print("tttttttttttttt");
    print(cat);

    return Scaffold(
      key: scaffoldKey,
      drawer: nav_draw(categories: cat),
      appBar: ActionBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(children: [
              SizedBox(
                width: 5,
              ),
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
                    onPressed: () {if(index==0){
                      setState(() {
                        items!.sort(
                                (b, a) => a.amountSold!.compareTo(b.amountSold!));
                        _currentCategory = index;
                      }

                      );
                    }
                    else if(index==1){
                      //print("index 1");
                      setState(() {
                        items!.sort(
                                (b, a) => a.raiting!.compareTo(b.raiting!));
                        _currentCategory = index;
                      }
                      );


                    }
                    else if(index==2){
                      setState(() {
                        items!.sort(
                                (a,b)=> a.releaseDate!.compareTo(b.releaseDate!)
                        );
                        _currentCategory = index;
                      });
                    }
                    else if(index==3){
                      setState(() {
                        items!.sort(
                                (b,a)=> a.discount!.compareTo(b.discount!)
                        );
                        _currentCategory = index;
                      });
                    }
                    },
                    child: Container(
                      height: 50.0,
                      width: 100,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(_categories[index]),
                        ],
                      ),
                    ),
                    style: ButtonStyle(backgroundColor:
                    MaterialStateProperty.resolveWith<Color?>((states) {
                      if (states.contains(MaterialState.pressed)) {
                        return AppColors.secondaryBackground.withOpacity(.5);
                      } else if (_currentCategory == index) {
                        return AppColors.secondaryBackground;
                      } else {
                        return null;
                      }
                    }), foregroundColor:
                    MaterialStateProperty.resolveWith<Color?>((states) {
                      return (_currentCategory == index)
                          ? AppColors.DarkTextColor
                          : AppColors.LightTextColor;
                    })),
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
                          product: items![index],
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
                        ProductPreview(product: items![index]),
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