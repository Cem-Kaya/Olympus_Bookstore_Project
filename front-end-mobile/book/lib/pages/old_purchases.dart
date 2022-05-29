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
  String button = "Refund";
  final todayDate = DateTime.now();

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

  var temp;

  Future postRefund(String email_uid, num purc_id) async {
    try {
      var response = await http.post(
        Uri.parse(API.send_refund),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "uid": email_uid,
            "purcid": purc_id,
          },
        ),
      );
      print(response.body);
      temp = json.decode(response.body);
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }

  List<PurchaseHistory>? purchaseList;

  Future<void> getHistory() async {
    List<PurchaseHistory>? search_purchase = await items
        ?.where((element) => element.email!.contains(my_user))
        .toList();
    purchaseList = search_purchase;
  }

  bool isRefund(String shipment) {
    if (shipment == "Cancelled" ||
        shipment == "Refunded" ||
        shipment == "Refund in Progress" ||
        shipment == "Refund Rejected") {
      return true;
    }
    if (shipment == "Delivered") {
      return false;
    }
    button = "Cancel";
    return false;
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
          body: const Center(
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
                        SizedBox(
                            width: 50,
                            child: Image.network(purchaseList![index].url!)),
                        Flexible(
                          child: Text(
                            purchaseList![index].name!,
                            style: const TextStyle(
                                color: AppColors.secondary,
                                fontWeight: FontWeight.bold),
                            overflow: TextOverflow.ellipsis,
                            maxLines: 1,
                            softWrap: false,
                            textAlign: TextAlign.center,
                          ),
                        ),
                        Flexible(
                          child: Text(
                            purchaseList![index].shipment!,
                            style: TextStyle(
                                color: AppColors.LightTextColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                            ),
                            textAlign: TextAlign.end,
                          ),
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
                        textRefund(
                            isRefund(purchaseList![index].shipment!),
                            purchaseList![index].shipment!,
                            "Quantity: ${purchaseList![index].quantity!.toString()}"),
                        /*Text(
                          "Quantity: ${purchaseList![index].quantity.toString()}",
                          style: TextStyle(
                              color: AppColors.LightTextColor,
                              fontWeight: FontWeight.bold,
                              fontSize: 16),
                        ),*/
                        textInfo(isRefund(purchaseList![index].shipment!),
                            purchaseList![index].shipment!),
                      ],
                    ),
                  ),
                  expanded: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        textRefund(
                            isRefund(purchaseList![index].shipment!),
                            purchaseList![index].shipment!,
                            "Sum: ${(purchaseList![index].price! * purchaseList![index].quantity!)} \$"),
                        Text(
                          "Date: ${(purchaseList![index].date.toString()).substring(0, 10)} ",
                          style: TextStyle(
                              color: AppColors.LightTextColor,
                              fontWeight: FontWeight.bold,
                              fontSize: 16),
                        ),
                        SizedBox(
                            height: 24,
                            child: OutlinedButton(
                                onPressed: isRefund(
                                        purchaseList![index].shipment!)
                                    ? null
                                    : () async {
                                        final dateDiff = todayDate
                                            .difference(
                                                purchaseList![index].date!)
                                            .inDays;
                                        if (dateDiff > 30) {
                                          await showDialog(
                                              context: context,
                                              builder: (_) => AlertDialog(
                                                    title: const Text("Error"),
                                                    content: const Text(
                                                        "Your purchased product bought more than 30 days ago. Hence, you cannot refund this product"),
                                                    actions: [
                                                      TextButton(
                                                          onPressed: () {
                                                            Navigator.pop(_);
                                                          },
                                                          child:
                                                              const Text("Ok"))
                                                    ],
                                                  ));
                                        } else if (purchaseList![index]
                                                .shipment ==
                                            "Processing") {
                                          postRefund(my_user,
                                              purchaseList![index].purcid!);
                                          await showDialog(
                                            context: context,
                                            builder: (_) => AlertDialog(
                                              title: const Text(
                                                  "Cancel Request Success"),
                                              content: const Text(
                                                  "Your order is cancelled and refunded."),
                                              actions: [
                                                TextButton(
                                                    onPressed: () {
                                                      Navigator.pop(_);
                                                    },
                                                    child: const Text("Ok"))
                                              ],
                                            ),
                                          );
                                          Navigator.pop(context);
                                        } else {
                                          postRefund(my_user,
                                              purchaseList![index].purcid!);
                                          await showDialog(
                                            context: context,
                                            builder: (_) => AlertDialog(
                                              title: const Text(
                                                  "Refund Request Success"),
                                              content: const Text(
                                                  "The seller will evaluate your refund request."),
                                              actions: [
                                                TextButton(
                                                    onPressed: () {
                                                      Navigator.pop(_);
                                                    },
                                                    child: const Text("Ok"))
                                              ],
                                            ),
                                          );
                                          Navigator.pop(context);
                                        }
                                      },
                                child: isRefund(purchaseList![index].shipment!)
                                    ? Text(button)
                                    : Text(
                                        button,
                                        style: TextStyle(
                                            color: AppColors.notification,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16),
                                      )))
                      ],
                    ),
                  ),
                ),
              ),
            );
          }),
    );
  }

  Widget textInfo(bool isRefund, String shipment) {
    if (!isRefund) {
      return Text(
        "Receipt Sent!",
        style: kImportantText,
      );
    }
    if (shipment == "Cancelled") {
      return Text(
        "Order Cancelled!",
        style: kImportantTextCancel,
      );
    }
    if (shipment == "Refunded") {
      return Text(
        "Refund Request Accepted!",
        style: kImportantText,
      );
    }
    if (shipment == "Refund in Progress") {
      return Text(
        "Refund Request Sent!",
        style: kImportantText,
      );
    }
    return Text(
      "Refund Request Rejected!",
      style: kImportantTextRefused,
    );
  }

  Widget textRefund(bool isRefund, String shipment, String text) {
    if (isRefund && (shipment == "Refunded" || shipment == "Cancelled")) {
      return Text(
        text,
        style: TextStyle(
          color: const Color(0x94535353),
          fontSize: 16,
          decoration: TextDecoration.lineThrough,
          decorationColor: Colors.black,
        ),
      );
    }
    return Text(
      text,
      style: TextStyle(
        color: AppColors.LightTextColor,
        fontWeight: FontWeight.bold,
        fontSize: 16,
      ),
    );
  }
}
