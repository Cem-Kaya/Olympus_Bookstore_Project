import 'dart:convert';
import 'package:bookstore/views/product_preview.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import "package:http/http.dart" as http;
import 'package:provider/provider.dart';
import '../services/user_logged_data.dart';
import '../views/action_bar.dart';

class AddReview extends StatefulWidget {
  const AddReview({Key? key, required this.prod}) : super(key: key);
  final int prod;

  @override
  State<AddReview> createState() => _AddReviewState();
}

class _AddReviewState extends State<AddReview> {
  num rating = 1;
  String comment = "";
  var response;
  var temp;
  postlog(num pid,String email,String text,num stars) async{
    try{ response =await http.post(Uri.parse("http://10.0.2.2:5000/Comment_all_/submit"),
      headers:<String, String>{'Content-Type': 'application/json; charset=UTF-8' ,},
      body:jsonEncode({ "Pid":pid, "email":email, "text":text, "stars":stars, }, ), );
    print(response.body); temp=json.decode(response.body);}
    catch(e){ print("error is ${e.toString()}"); } }

  @override
  Widget build(BuildContext context) {
    Function login = Provider.of<logged_in_user>(context).getUser;
    return Scaffold(
      appBar: ActionBar(),
      body: Column(children: [
        RatingBar(
          initialRating: 2.5,
          direction: Axis.horizontal,
          allowHalfRating: true,
          itemCount: 5,
          minRating: 1,
          ratingWidget: RatingWidget(
            full: const Icon(Icons.star),
            half: const Icon(Icons.star_half),
            empty: const Icon(Icons.star_border_outlined),
          ),
          itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
          onRatingUpdate: (value) {
            rating = value;
          },
        ),
        TextField(
          maxLines: null,
          maxLength: 100,
          maxLengthEnforcement: MaxLengthEnforcement.enforced,
          minLines: 3,
          keyboardType: TextInputType.multiline,
          decoration: const InputDecoration(
              hintText: "Comment (Optional)", border: OutlineInputBorder()),
          onChanged: (value) {
            comment = value;
          },
        ),
        OutlinedButton(
            onPressed: () async {
              postlog(widget.prod, login(), comment, rating);
              await showDialog(
                  context: context,
                  builder: (_) => AlertDialog(
                        title: const Text("Success"),
                        content: const Text(
                            "Review submitted. It will be shown once approved by the seller."),
                        actions: [
                          TextButton(
                              onPressed: () {
                                Navigator.pop(_);
                              },
                              child: const Text("Ok"))
                        ],
                      ));
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: const Text("Submit"))
      ]),
    );
  }
}
