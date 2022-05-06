import 'package:bookstore/pages/mockup_payment.dart';
import 'package:bookstore/services/basket_data.dart';
import 'package:bookstore/views/one_basket_item.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../services/basket_data.dart';
import '../utils/api.dart';
import '../utils/dimensions.dart';
import '../utils/jsonParse/previewBooks.dart';
import 'package:http/http.dart' as http;

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
    print(temp_basket);
    int counter = temp_basket.length;

    return Scaffold(
      appBar: ActionBar(),
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
                  SizedBox(width: 8)
                ]),
              ),
            ),
          ),
          TextButton(onPressed: (){
            Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => mockup(

                  sum: s,
                )));
          }, child: Text("Your sum is $s \n   Pay in here"))
        ],
      ),
    );
  }
}
