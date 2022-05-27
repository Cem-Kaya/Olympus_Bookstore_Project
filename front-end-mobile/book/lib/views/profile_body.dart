import 'dart:convert';

import 'package:bookstore/pages/old_purchases.dart';
import 'package:bookstore/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../pages/favorites.dart';
import '../services/user_logged_data.dart';
import '../utils/api.dart';
import '../utils/styles.dart';
import 'package:http/http.dart' as http;

class ProfileBody extends StatefulWidget {
  const ProfileBody({Key? key}) : super(key: key);

  @override
  State<ProfileBody> createState() => _ProfileBodyState();
}

class _ProfileBodyState extends State<ProfileBody> {
  var response;

    // obtain shared preferences


  // late Map<String, dynamic>
  var temp;
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

      wishes =jsonDecode(wishes.body);
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

  /*
   purchases()  async{
    try {
      print("user $user");
      response = await http.post(
        Uri.parse("http://10.0.2.2:5000/get_ones_purch_hist/submit"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "uid": "a@a.com",

          },
        ),
      );
      temp=response.body;
      return temp;
      print(temp.runtimeType);
    } catch (e) {
      print("error is ${e.toString()}");

    }
  }
  */

  @override
  Widget build(BuildContext context) {
    Function login = Provider.of<logged_in_user>(context).getUser;
    String user = login();

    return Padding(
      padding: const EdgeInsets.fromLTRB(5, 20, 5, 20),
      child: Column(
        children: [
          Text(
            "Name",
            style: kProfileNameText,
          ),
          Text("Email", style: kProfileMailText),
          const SizedBox(height: 10),
          Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: SizedBox(
                width: 1000,
                height: 60,
                child: ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor:
                    MaterialStateProperty.all(AppColors.primary),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Icon(Icons.person),
                      Text("Account Settings"),
                      Icon(Icons.arrow_forward)
                    ],
                  ),
                  onPressed: () {},
                ),
              )),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            child: SizedBox(
              width: 1000,
              height: 60,
              child: ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(AppColors.primary),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    Icon(Icons.history),
                    Text("Purchase History"),
                    Icon(Icons.arrow_forward)
                  ],
                ),
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => old_purchases(user: user)));
                }, //
              ),
            ),
          ),
          const SizedBox(height: 10),
          Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: SizedBox(
                width: 1000,
                height: 60,
                child: ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor:
                    MaterialStateProperty.all(AppColors.primary),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Icon(Icons.favorite),
                      Text("My wishes"),
                      Icon(Icons.arrow_forward)
                    ],
                  ),
                  onPressed: () async{
                    await ALLwishes(user);
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => Favorites(wishes: wishid,)));
                  },
                ),
              )),
        ],
      ),
    );
  }
}