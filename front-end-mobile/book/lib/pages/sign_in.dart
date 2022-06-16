import 'dart:convert';
import 'dart:io';
import 'package:bookstore/services/basket_data.dart';
import 'package:bookstore/views/one_basket_item.dart';
import 'package:email_validator/email_validator.dart';
import "package:http/http.dart" as http;
import 'package:bookstore/utils/colors.dart';
import 'package:bookstore/utils/dimensions.dart';
import 'package:bookstore/utils/styles.dart';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../services/root_index.dart';
import '../services/user_logged_data.dart';
import '../services/wishes_data.dart';
import '../utils/api.dart';

class SignIn extends StatefulWidget {
  const SignIn({Key? key}) : super(key: key);

  @override
  _SignInState createState() => _SignInState();
}
class _SignInState extends State<SignIn> {
  var wishes;
  List<num> wishid=[];

  ALLwishes(String email) async {//it will be handled
    try {

      wishes = await http.post(
        Uri.parse(API.allwishes), //it will be handled
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "email": email,
          },
        ),
      );
      setState(() {
        wishes =jsonDecode(wishes.body);
      });

      int i =0;
      while(i<wishes.length){
        wishid.add(wishes[i]["Pid"]);
        i=i+1;
      }
      print("inside");
      print(wishes);


    } catch (e) {
      print("error is ${e.toString()}");
    }
  }
  final _formKey = GlobalKey<FormState>();
  var response_basket;
  Send_to_basket(num pid,String email,  num quantity) async { //it will be handled
    try {

      response_basket = await http.post(
        Uri.parse(API.send_to_basket), //it will be handled
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "Pid": pid,
            "email": email,
            "quantity": quantity,

          },
        ),
      );
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }
  String mail = "";
  String pass = "";
  var response;
  late Map<String, dynamic> temp;
  var resonse_take;
  var new_basket;
  Future gettobasket(String email) async { //it will be handled
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
    new_basket =jsonDecode(response_basket.body);
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }

  Future AccountLogin(String email, String pass) async {
    try {
      response = await http.post(
        Uri.parse(API.sign_in),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          <String, String>{
            "email": email,
            "pass_hash": pass,
          },
        ),
      );
      temp = json.decode(response.body);
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }

  @override
  Widget build(BuildContext context) {
    Function login = Provider.of<logged_in_user>(context).log_user;
    Function basketget = Provider.of<Basket>(context).get;
    Function basketclean = Provider.of<Basket>(context).clean_basket;
    Function basketadd = Provider.of<Basket>(context).add_basket;
    Function change_index = Provider.of<ClassRoot>(context).changeRoot;
    Function wishs=Provider.of<Wishes>(context).init_wishes;
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Sign In',
          style: kAppBarTitleTextStyle,
        ),
        backgroundColor: AppColors.primary,
        centerTitle: true,
        elevation: 0.0,
      ),
      body: Padding(
        padding: Dimen.regularPadding,
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                CircleAvatar(
                  radius: 80,
                  backgroundImage: AssetImage("assets/olympus bookstore icon.jpeg"),
                ),
                SizedBox(height: 15),
                Text("Olympus Bookstore", style: kHeadingTextStyle,),
                SizedBox(height: 25),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 1,
                      child: TextFormField(
                          decoration: InputDecoration(
                            fillColor: AppColors.DarkTextColor,
                            filled: true,
                            hintText: "Email",
                            hintStyle: kButtonLightTextStyle,
                            border: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: AppColors.primary,
                              ),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                            ),
                          ),
                          keyboardType: TextInputType.emailAddress,
                          validator: (value) {
                            if (value == null) {
                              return "Email can not be empty";
                            } else {
                              String trimmedValue = value.trim();
                              if (trimmedValue.isEmpty) {
                                return "Email can not be empty";
                              }
                            }
                            return null;
                          },
                          onSaved: (value) {
                            if (value != null) {
                              mail = value;
                            }
                          }),
                    ),
                  ],
                ),
                SizedBox(height: 25),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 1,
                      child: TextFormField(
                        decoration: InputDecoration(
                          fillColor: AppColors.DarkTextColor,
                          filled: true,
                          hintText: "Password",
                          hintStyle: kButtonLightTextStyle,
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: AppColors.primary,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(30)),
                          ),
                        ),
                        keyboardType: TextInputType.text,
                        obscureText: true,
                        autocorrect: false,
                        validator: (value) {
                          if (value == null) {
                            return "Password can not be empty";
                          } else {
                            String trimmedValue = value.trim();
                            if (trimmedValue.isEmpty) {
                              return "Password can not be empty";
                            }
                          }
                          return null;
                        },
                        onSaved: (value) {
                          if (value != null) {
                            pass = value;
                          }
                        },
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 25),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Expanded(
                      flex: 1,
                      child: OutlinedButton(
                        onPressed: () async {
                          if (_formKey.currentState!.validate()) {

                            _formKey.currentState!.save();
                            await AccountLogin(mail, pass);
                            if (temp["status"]) {
                              await ALLwishes(mail);
                              wishs(wishid);
                              List<Baske> bas=  await basketget();
                              if(bas!=null){
                                for(var i in bas){
                                  await Send_to_basket(i.product_id!, mail, i.stocks);}
                                }
                                basketclean();
                                await gettobasket(mail);
                                if(new_basket!=null) {
                                  int i =new_basket.length;
                                  int y=0;
                                  while(y<i){
                                    basketadd(new_basket[y.toString()]["Pid"],
                                      new_basket[y.toString()]["quantity"],new_basket[y.toString()]["name"],
                                        new_basket[y.toString()]["price"],
                                        new_basket[y.toString()]["url"]);
                                    y=y+1;
                                  }
                                }
                                login(mail);
                              change_index(0);
                                //basketclean();
                              /*
                                gettobasket(mail);
                              //int x=new_basket.length;
                              if(new_basket!=null){
                                for(var i in new_basket){
                                  print(i);
                                }
                                login(mail);
                                change_index(0);}
                              //await basketclean();
                              //sleep(Duration(seconds:1));
                              //await gettobasket(mail);
                              //if(new_basket!=null){
                                //for(var i in new_basket){
                                  //print(i);
                                //}
                              //}*/


                            }
                            else {
                              await showDialog(
                                  context: context,
                                  builder: (_) => AlertDialog(
                                    title: const Text("Error"),
                                    content: const Text(
                                        "E-mail or Password is wrong. Try again."),
                                    actions: [
                                      TextButton(
                                          onPressed: () {
                                            Navigator.pop(_);
                                          },
                                          child: const Text("Ok"))
                                    ],
                                  ));
                            }
                          }
                        },
                        child: Padding(
                          padding: Dimen.smallPadding,
                          child: Text(
                            'Sign in ',
                            style: kButtonDarkTextStyle,
                          ),
                        ),
                        style: OutlinedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 25),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Expanded(
                      flex: 1,
                      child: OutlinedButton(
                        onPressed: () {
                          setState(() {
                            Navigator.pushNamed(context, '/signUp');
                          });
                        },
                        child: Padding(
                          padding: Dimen.smallPadding,
                          child: Text(
                            "Don't have an account  ",
                            style: kButtonDarkTextStyle,
                          ),
                        ),
                        style: OutlinedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
