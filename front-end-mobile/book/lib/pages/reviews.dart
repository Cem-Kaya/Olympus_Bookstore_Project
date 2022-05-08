import 'dart:convert';

import 'package:bookstore/utils/api.dart';
import 'package:bookstore/utils/jsonParse/reviewsBook.dart';
import 'package:bookstore/views/action_bar.dart';
import 'package:expandable/expandable.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;

import '../utils/dimensions.dart';
import '../utils/styles.dart';

class reviews extends StatefulWidget {
  const reviews({Key? key, required this.prod}) : super(key: key);
  final int prod;

  @override
  _reviewsState createState() => _reviewsState();
}

class _reviewsState extends State<reviews> {
  var response;
  int? counter;
  var temp;
  Map<String, dynamic>? _reviewList;

  @override
  void initState() {
    super.initState();
        () async {
      await allReviews();
      setState(() {
        // Update your UI with the desired changes.
      });
      my_pid = widget.prod;
      getReviews();
    }();
  }

  // obtain shared preferences
/*
  Future allreview(num pid) async {
    try {
      response = await http.post(
        Uri.parse("http://10.0.2.2:5000/get_all_approved_comments/submit"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "Pid": pid,
          },
        ),
      );
      print(response.body);
      _reviewList = json.decode(response.body);
      print(_reviewList?.length);
      print("ssssssss");
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }
*/
  int my_pid = -1;

  List<ReviewBooks>? items;

  Future allReviews() async {
    print("ddd");
    final url = Uri.parse(API.allReviews);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = reviewBooksFromJson(response.body);
        items = result;
        return result;
      } else {
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
  }

  List<ReviewBooks>? reviewsList;

  Future<void> getReviews() async {
    List<ReviewBooks>? search_reviews =
    await items?.where((element) => element.pid! == my_pid).toList();
    print(search_reviews);
    reviewsList = search_reviews;
  }

  @override
  Widget build(BuildContext context) {
    //allreview(1);

    /*if (_reviewList == null) {
      //allreview(1);
      return Container();
    }*/
    if (my_pid == -1 || reviewsList == null) {
      allReviews();
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    if (reviewsList?.length == 0) {
      return Scaffold(
          appBar: ActionBar(
            title: "Reviews",
          ),
          body: Center(
            child: Text("There is no reviews in this book."),
          ));
    }

    return Scaffold(
        appBar: ActionBar(
          title: "Reviews",
        ),
        body: ListView.builder(
            scrollDirection: Axis.vertical,
            itemCount: reviewsList?.length, //_reviewList?.length
            itemBuilder: (context, index) {
              return Padding(
                  padding: Dimen.smallPadding,
                  child: Card(
                    color: Colors.white70,
                    child: ExpandablePanel(
                      header: Column(children: [
                        Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              RatingBarIndicator(
                                rating:
                                (reviewsList![index].stars!).toDouble(),
                                //(_reviewList![index.toString()]["rating"].toDouble()),
                                itemBuilder: (context, index) =>
                                const Icon(
                                  Icons.star,
                                  color: Colors.amber,
                                ),
                                itemCount: 5,
                                itemSize: 25.0,
                                unratedColor: Colors.amber.withAlpha(50),
                                direction: Axis.horizontal,
                              ),
                              Text((reviewsList![index].uid!),
                                  //(_reviewList![index.toString()]["uid"])
                                  style: kProfileNameText),
                            ])
                      ]),
                      collapsed: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          reviewsList![index].text!, style: TextStyle(
                          fontWeight: FontWeight.w300,
                        ),
                          overflow: TextOverflow.ellipsis,
                          maxLines: 3,
                          softWrap: true,
                        ),
                      ),
                      expanded: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(reviewsList![index].text!,
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                          ),),
                      ),
                    ),

                  ),
              );
            }));
  }
}
