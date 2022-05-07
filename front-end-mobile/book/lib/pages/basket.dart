import 'package:bookstore/pages/mockup_payment.dart';
import 'package:bookstore/services/basket_data.dart';
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
  const BasketPage({Key? key}) : super(key: key);

  @override
  State<BasketPage> createState() => _BasketPageState();
}

class _BasketPageState extends State<BasketPage> {
  @override
  Widget build(BuildContext context) {
    Function a = Provider.of<Basket>(context).get;
    var temp_basket = a();
    Function sum = Provider.of<Basket>(context).getSum;
    num s = sum();
    int counter = temp_basket.length;
    Function login = Provider.of<logged_in_user>(context).getUser;
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
      body: Column(
        children: [
          SingleChildScrollView(
            child: Column(
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
          ),
          Spacer(),
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
              child: Text("Your sum is $s \n   Pay in here")),
          */
        ],
      ),
    );
  }
}
