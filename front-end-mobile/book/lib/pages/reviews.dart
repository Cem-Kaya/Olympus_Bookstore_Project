import 'dart:convert';

import 'package:bookstore/views/action_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;

import '../utils/dimensions.dart';
import '../utils/styles.dart';

class reviews extends StatefulWidget {
  const reviews({Key? key}) : super(key: key);

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
      await allreview(1);
      setState(() {
        // Update your UI with the desired changes.
      });
      print("ddddddd");
      print(_reviewList?.length);
      print("xxxxxxxxx");
    };
  }

  // obtain shared preferences

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

  @override
  Widget build(BuildContext context) {
    allreview(1);

    if (_reviewList == null) {
      //allreview(1);
      return Container();
    }
    //return Container();
    return Scaffold(
        appBar: ActionBar(title: "Reviews",),
        body: ListView.builder(
            scrollDirection: Axis.vertical,
            itemCount: _reviewList?.length,
            itemBuilder: (context, index) {
              return Padding(
                  padding: Dimen.smallPadding,
                  child: Card(
                      color: Colors.white70,
                      child: ListTile(
                          onTap: () {},
                          title: Column(children: [
                            Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  RatingBarIndicator(
                                    rating: (_reviewList![index.toString()]
                                            ["rating"])
                                        .toDouble(),
                                    itemBuilder: (context, index) => const Icon(
                                      Icons.star,
                                      color: Colors.amber,
                                    ),
                                    itemCount: 5,
                                    itemSize: 25.0,
                                    unratedColor: Colors.amber.withAlpha(50),
                                    direction: Axis.horizontal,
                                  ),
                                  Text((_reviewList![index.toString()]["uid"]),
                                      style: kProfileNameText),
                                ])
                          ]))));
            }));
  }
}
