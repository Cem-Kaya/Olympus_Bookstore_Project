import 'dart:convert';

import 'package:bookstore/pages/old_purchases.dart';
import 'package:bookstore/utils/colors.dart';
import 'package:bookstore/utils/jsonParse/accountDetails.dart';
import 'package:crypto/crypto.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../pages/favorites.dart';
import '../services/user_logged_data.dart';
import '../services/wishes_data.dart';
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
  var response_Account;
  var temp;
  var temp_account;
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

  postAccount(String email) async {
    try {
      response_Account = await http.post(
        Uri.parse(API.send_account_info),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          <String, String>{
            "email": email,
          },
        ),
      );
      //print(response_Account.body);
      temp_account = accountDetailsFromJson(response_Account.body);
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }


  @override
  Widget build(BuildContext context) {
    Function login = Provider.of<logged_in_user>(context).getUser;
    Function wish_data = Provider.of<Wishes>(context).get;
    Function wishs=Provider.of<Wishes>(context).init_wishes;
    Function res_wish=Provider.of<Wishes>(context).reset_wishes;
    String user = login();

    return Padding(
      padding: const EdgeInsets.fromLTRB(5, 20, 5, 20),
      child: Column(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage("https://m.media-amazon.com/images/M/MV5BN2EzM2JlMDMtMmUzNC00ZTY4LThhNzItZjIyNzBiYzYzOGZkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_QL75_UY281_CR155,0,190,281_.jpg"),
          ),
          const SizedBox(height: 20),
          Text(user, style: kProfileMailText),
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
                      Text("Account Details"),
                      Icon(Icons.arrow_forward)
                    ],
                  ),
                  onPressed: () async {
                    await postAccount(user);
                    await showDialog(
                        context: context,
                        builder: (_) => AlertDialog(
                          title: const Text("Account Details"),
                          content: Text(
                              "Name: ${temp_account.name!} \n \nEmail: ${temp_account.uid!} \n \nTax ID: ${temp_account.tax_id!} \n \nHome Address:${temp_account.homeaddress!} \n"),
                          actions: [
                            TextButton(
                                onPressed: () {
                                  Navigator.pop(_);
                                },
                                child: const Text("Ok"))
                          ],
                        ));

                  },
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
                  var bytes1 = utf8.encode("Almahery");
                  var digest1 = sha256.convert(bytes1);
                  var digest2 = sha256.convert(bytes1).toString();
                  print("this is a hashed hopefully ${digest1.bytes}" );
                  print("Digest as hex string: $digest2");
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
                      Icon(Icons.list_alt),
                      Text("Wish List "),
                      Icon(Icons.arrow_forward)
                    ],
                  ),
                  onPressed: () async{
                    res_wish();
                    await ALLwishes(user);
                    wishs(wishid);
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => Favorites(wishes: wish_data(),use:user)));
                  },
                ),
              )),
        ],
      ),
    );
  }
}