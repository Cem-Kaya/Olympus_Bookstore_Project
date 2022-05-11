import 'dart:convert';

import 'package:bookstore/pages/reviews.dart';
import 'package:bookstore/views/action_bar.dart';
import 'package:expandable/expandable.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

import '../services/user_logged_data.dart';
import '../utils/api.dart';
import '../utils/colors.dart';
import '../utils/dimensions.dart';
import '../utils/jsonParse/purchaseHistory.dart';
import '../utils/styles.dart';

class old_purchases extends StatefulWidget {
  const old_purchases({Key? key, required this.user}) : super(key: key);
  final String user;

  @override
  State<old_purchases> createState() => _old_purchasesState();
}

class _old_purchasesState extends State<old_purchases> {
  @override
  @override
  void initState() {
    super.initState();
        () async {
      await allPurchases();
      setState(() {
        // Update your UI with the desired changes.
      });
      my_user = widget.user;
      getHistory();
    }();
  }

  String my_user = "";

  List<PurchaseHistory>? items;

  Future allPurchases() async {
    final url = Uri.parse(API.allHistory);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = purchaseHistoryFromJson(response.body);
        items = result;
        return result;
      } else {
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
  }

  List<PurchaseHistory>? purchaseList;

  Future<void> getHistory() async {
    List<PurchaseHistory>? search_purchase = await items
        ?.where((element) => element.email!.contains(my_user))
        .toList();
    purchaseList = search_purchase;
  }

  Widget build(BuildContext context) {
    //Function login = Provider.of<logged_in_user>(context).getUser;

    if (my_user == "" || purchaseList == null) {
      allPurchases();
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    if (purchaseList?.length == 0) {
      return Scaffold(
          appBar: ActionBar(
            title: "Reviews",
          ),
          body: Center(
            child: Text("There is no purchase. Buy something!"),
          ));
    }

    return Scaffold(
      appBar: ActionBar(
        title: "Purchase History",
      ),
      body: ListView.builder(
          scrollDirection: Axis.vertical,
          itemCount: purchaseList?.length,
          itemBuilder: (context, index) {
            return Padding(
              padding: Dimen.smallPadding,
              child: Card(
                color: Colors.white70,
                child: ExpandablePanel(
                  header: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(width: 50, child: Image.network(purchaseList![index].url!)),
                        Text(
                          purchaseList![index].name!,
                          style: const TextStyle(
                              color: AppColors.secondary,
                              fontWeight: FontWeight.bold),
                          overflow: TextOverflow.ellipsis,
                          maxLines: 3,
                          softWrap: true,
                        ),
                        Text(purchaseList![index].shipment!,
                          style: TextStyle(color: AppColors.LightTextColor, fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                      ],
                    ),
                  ),
                  collapsed: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Quantity: ${purchaseList![index].quantity.toString()}", style: TextStyle(color: AppColors.LightTextColor, fontWeight: FontWeight.bold, fontSize: 16),),
                        Text("Receipt Sent!", style: kImportantText,),
                      ],
                    ),
                  ),
                  expanded: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Sum: ${(purchaseList![index].price!*purchaseList![index].quantity!)} \$", style: TextStyle(color: AppColors.LightTextColor, fontWeight: FontWeight.bold, fontSize: 16),),
                        Text("Date: ${purchaseList![index].date!.substring(0, 10)} ", style: TextStyle(color: AppColors.LightTextColor, fontWeight: FontWeight.bold, fontSize: 16),),
                        SizedBox(height: 24,child: OutlinedButton(onPressed: () {}, child: Text("Refund",style: TextStyle(color: AppColors.notification, fontWeight: FontWeight.bold, fontSize: 16), )))
                      ],
                    ),
                  ),
                ),
              ),
            );
          }),

      /*Flexible(
        fit: FlexFit.loose,
        child: ListView.builder(
          scrollDirection: Axis.vertical,
          itemCount: widget.user.length,
          itemBuilder: (context, index) {
            if (widget.user.isNotEmpty) {
              return Text("${widget.user[index.toString()]["price"]}");
            } else {
              return const Center(
                  child: Text("This user have not sold anything yet!"));
            }
          },
        ),
      ),*/
    );
  }
}



