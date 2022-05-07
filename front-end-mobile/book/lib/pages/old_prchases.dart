import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

import '../services/user_logged_data.dart';

class old_purchases extends StatefulWidget {
  const old_purchases(
      {Key? key, required this.user})
      : super(key: key);
  final dynamic user;
  @override
  State<old_purchases> createState() => _old_purchasesState();
}

class _old_purchasesState extends State<old_purchases> {
  @override
  late String id;

  late String x;

  var use;

    // obtain shared preferences

  var response;







  num stocks = 1;
  Widget build(BuildContext context) {

    
    
    
    Function login = Provider.of<logged_in_user>(context).getUser;
    //var email=login();
   // var x=purchases();
    //var mail;
   /* setState(() async{
       temp=await purchases(email).body;

    });*/

      return Scaffold(
              body: Flexible(
                fit: FlexFit.loose,
                child: ListView.builder(
                  scrollDirection: Axis.vertical,
                  itemCount:  widget.user.length,
                  itemBuilder: (context, index) {
                    if ( widget.user.isNotEmpty) {
                      return Text("${ widget.user[index.toString()]["price"]}");
                    } else {
                      return const Center(
                          child: Text("This user have not sold anything yet!"));
                    }
                  },
                ),
              ),
            );


  }
}



