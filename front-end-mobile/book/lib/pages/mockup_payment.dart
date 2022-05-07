import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/basket_data.dart';
import '../services/user_logged_data.dart';
import '../utils/colors.dart';
import '../utils/dimensions.dart';
import '../utils/styles.dart';
import '../views/action_bar.dart';

class mockup extends StatefulWidget {
  const mockup({Key? key, required this.sum}) : super(key: key);
  final num sum;

  @override
  _mockupState createState() => _mockupState();
}

class _mockupState extends State<mockup> {
  final _formKey = GlobalKey<FormState>();
  List month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  var dropdownValue;
  var yearvalue;
  String? CVV;
  String? card;
  String? name;
  var response;

  Checkout(String email, int pid, int quantity,num price,double sale,int did) async { //it will be handled
    try {

      response = await http.post(
        Uri.parse("http://10.0.2.2:5000/to_purchase/submit"), //it will be handled
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "email": email,
            "Pid": pid,
            "quantity": quantity,
            "price":price,
            "sale": sale,
            "did":did,

          },
        ),
      );
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }

  @override
  Widget build(BuildContext context) {
    Function a = Provider.of<Basket>(context).get;
    Function clean = Provider.of<Basket>(context).clean_basket;
    Function login = Provider.of<logged_in_user>(context).getUser;
    var temp_basket = a();
    var user_mail = login();

    return Scaffold(
        appBar: ActionBar(),
        body: Padding(
            padding: const EdgeInsets.all(35),
            child: SingleChildScrollView(
              child: Form(
                key: _formKey,
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Text(
                        "Price is ${widget.sum}",
                        style: kHeadingTextStyle,
                      ),
                      const SizedBox(
                        height: Dimen.textFieldHeight,
                      ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 1,
                            child: TextFormField(
                                decoration: InputDecoration(
                                  fillColor: AppColors.DarkTextColor,
                                  filled: true,
                                  hintText: "Card number",
                                  hintStyle: kButtonLightTextStyle,
                                  border: const OutlineInputBorder(
                                    borderSide: BorderSide(
                                      color: AppColors.primary,
                                    ),
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(30)),
                                  ),
                                ),
                                keyboardType: TextInputType.number,
                                validator: (value) {
                                  if (value == null) {
                                    return "please enter a card number ";
                                  } else {
                                    String trimmedValue = value.trim();
                                    if (trimmedValue.isEmpty) {
                                      return "please enter the name of the card holder";
                                    }
                                  }
                                  return null;
                                },
                                onSaved: (value) {
                                  if (value != null) {
                                    card = value;
                                  }
                                }),
                          ),
                        ],
                      ),
                      const SizedBox(height: Dimen.textFieldHeight),
                      DropdownButton<String>(
                        value: dropdownValue,
                        icon: const Icon(Icons.arrow_downward),
                        elevation: 16,
                        isExpanded: true,
                        hint: const Text("month expriation date"),
                        style: const TextStyle(color: Colors.deepPurple),
                        underline: Container(
                          height: 1,
                          color: Colors.deepPurpleAccent,
                        ),
                        onChanged: (String? newValue) {
                          setState(() {
                            dropdownValue = newValue!;
                          });
                        },
                        items: <String>[
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "11",
                          "12"
                        ].map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: Dimen.textFieldHeight),
                      DropdownButton<String>(
                        value: yearvalue,
                        icon: const Icon(Icons.arrow_downward),
                        elevation: 16,
                        isExpanded: true,
                        hint: const Text("year expriation date"),
                        style: const TextStyle(color: Colors.deepPurple),
                        underline: Container(
                          height: 1,
                          color: Colors.deepPurpleAccent,
                        ),
                        onChanged: (String? newValue) {
                          setState(() {
                            yearvalue = newValue!;
                          });
                        },
                        items: <String>[
                          "22",
                          "23",
                          "24",
                          "25",
                          "26",
                          "27",
                          "28",
                          "29",
                          "30",
                          "31",
                          "32"
                        ].map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                      ),
                      const SizedBox(
                        height: 25,
                      ),
                      TextFormField(
                          decoration: InputDecoration(
                            fillColor: AppColors.DarkTextColor,
                            filled: true,
                            hintText: "Card Holder",
                            hintStyle: kButtonLightTextStyle,
                            border: const OutlineInputBorder(
                              borderSide: BorderSide(
                                color: AppColors.primary,
                              ),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                            ),
                          ),
                          keyboardType: TextInputType.name,
                          validator: (value) {
                            if (value == null) {
                              return "please enter the name of the card holder ";
                            } else {
                              String trimmedValue = value.trim();
                              if (trimmedValue.isEmpty) {
                                return "please enter the name of the card holder";
                              }
                            }
                            return null;
                          },
                          onSaved: (value) {
                            if (value != null) {
                              name = value;
                            }
                          }),
                      const SizedBox(
                        height: Dimen.textFieldHeight,
                      ),
                      TextFormField(
                          decoration: InputDecoration(
                            fillColor: AppColors.DarkTextColor,
                            filled: true,
                            hintText: "CVV2 Security Code",
                            hintStyle: kButtonLightTextStyle,
                            border: const OutlineInputBorder(
                              borderSide: BorderSide(
                                color: AppColors.primary,
                              ),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                            ),
                          ),
                          keyboardType: TextInputType.number,
                          validator: (value) {
                            if (value == null) {
                              return "please enter the  CVV2 Security Code";
                            } else {
                              String trimmedValue = value.trim();
                              if (trimmedValue.isEmpty) {
                                return "CVV2 Security Code can not be empty";
                              }
                            }
                            return null;
                          },
                          onSaved: (value) {
                            if (value != null) {
                              CVV = value;
                            }
                          }),
                      const SizedBox(
                        height: 10,
                      ),
                      OutlinedButton(
                          onPressed: () async {
                            if (_formKey.currentState!.validate()) {
                              _formKey.currentState!.save();
                              if (name != null && card != null && CVV != null) {

                                for (var i in temp_basket) {
                                  Checkout(user_mail,i.product_id,i.stocks,i.price,1.0,3);
                                }
                                clean();
                                await showDialog(
                                    context: context,
                                    builder: (_) => AlertDialog(
                                          title: const Text("Success"),
                                          content: const Text(
                                              "Transaction Complete"),
                                          actions: [
                                            TextButton(
                                                onPressed: () {
                                                  Navigator.pop(_);
                                                },
                                                child: const Text("Ok"))
                                          ],
                                        ));
                                Navigator.pop(context);
                                //Provider.of<BottomNav>(context, listen: false).switchTo(0);
                              }
                            }
                          },
                          child: const Text("purchase")),
                    ]),
              ),
            )));
  }
}
