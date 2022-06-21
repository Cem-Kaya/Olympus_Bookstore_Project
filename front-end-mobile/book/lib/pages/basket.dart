import 'dart:convert';

import 'package:bookstore/pages/mockup_payment.dart';
import 'package:bookstore/services/basket_data.dart';
import 'package:bookstore/services/istaken.dart';
import 'package:bookstore/views/one_basket_item.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../services/basket_data.dart';
import '../services/user_logged_data.dart';
import '../utils/api.dart';
import '../utils/colors.dart';
import '../utils/dimensions.dart';
import '../utils/jsonParse/previewBooks.dart';
import 'package:http/http.dart' as http;

import '../utils/styles.dart';
import '../views/action_bar.dart';

var a;

class BasketPage extends StatefulWidget {
  BasketPage({Key? key, required this.user}) : super(key: key);
  final String user;

  @override
  State<BasketPage> createState() => _BasketPageState();
}

var response_basket;
var resonse_take;
var new_basket;

class _BasketPageState extends State<BasketPage> {
  @override
  var x;

  void initState() {
    super.initState();
    () async {
      if (widget.user != "a") {
        await gettobasket(widget.user);
      }
    };
    // await gettobasket(login());

    // obtain shared preferences
  }

  Future gettobasket(String email) async {
    //it will be handled
    try {
      response_basket = await http.post(
        Uri.parse(API.get_shopping), //it will be handled
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "uid": email,
          },
        ),
      );
      new_basket = jsonDecode(response_basket.body);
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }

  @override
  Widget build(BuildContext context) {

    Function a = Provider.of<Basket>(context).get;
    Function clean = Provider.of<Basket>(context).clean_basket;
    Function take = Provider.of<taken>(context).get;
    Function now = Provider.of<taken>(context).now_taken;
    Function login = Provider.of<logged_in_user>(context).getUser;

    if (new_basket == null) {
      gettobasket(login());
    }

    var temp_basket = a();
    Function sum = Provider.of<Basket>(context).getSum;
    num s = sum();
    int counter = temp_basket.length;
    Size size = MediaQuery.of(context).size;
    if (s == 0) {
      return Scaffold(
        appBar: AppBar(
          title: Text(
            'My Basket',
            style: kAppBarTitleTextStyle,
          ),
          backgroundColor: AppColors.primaryBackground,
          centerTitle: true,
          elevation: 0.0,
        ),
        body: (const Center(
          child: Text("No product has been added. Add some!"),
        )),
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'My Basket',
          style: kAppBarTitleTextStyle,
        ),
        backgroundColor: AppColors.primaryBackground,
        centerTitle: true,
        elevation: 0.0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Column(
              children: [
                Column(
                  children: List.generate(
                    //productPreviewList.length,
                    counter,
                    (index) => Column(children: [
                      one_basket_item(
                        view_bask: temp_basket[index],
                      ),
                      SizedBox(width: 8),
                    ]),
                  ),
                ),
                Container(
                  height: 100,
                  alignment: Alignment.bottomLeft,
                  width: size.width,
                  padding: EdgeInsets.only(
                    top: 16,
                    bottom: 32,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Text("Total: \$ $s", style: kPurchaseTextStyle),
                      OutlinedButton(
                        onPressed: () async {
                          if (login() != "") {
                            Navigator.of(context).push(MaterialPageRoute(
                                builder: (context) => mockup(
                                      sum: s,
                                    )));
                          } else {
                            await showDialog(
                                context: context,
                                builder: (_) => AlertDialog(
                                      title: const Text("Error"),
                                      content: const Text(
                                          "For continue checkout, you need to login"),
                                      actions: [
                                        TextButton(
                                            onPressed: () {
                                              Navigator.pop(_);
                                            },
                                            child: const Text("Ok"))
                                      ],
                                    ));
                          }
                        },
                        child: Text(
                          "Check Out",
                          style: kButtonDarkTextStyle,
                        ),
                        style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all(AppColors.background),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),

            /*TextButton(
                onPressed: () async {
                  if (login() != "") {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => mockup(
                              sum: s,
                            )));
                  } else {
                    await showDialog(
                        context: context,
                        builder: (_) => AlertDialog(
                              title: const Text("Error"),
                              content: const Text(
                                  "For continue checkout, you need to login"),
                              actions: [
                                TextButton(
                                    onPressed: () {
                                      Navigator.pop(_);
                                    },
                                    child: const Text("Ok"))
                              ],
                            ));
                  }
                },
                child: Text("Your sum is $s \n
                 in here")),
            */
          ],
        ),
      ),
    );
  }
}
