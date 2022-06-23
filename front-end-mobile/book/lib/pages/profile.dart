import 'package:bookstore/views/profile_body.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../services/basket_data.dart';
import '../services/user_logged_data.dart';
import '../services/wishes_data.dart';
import '../utils/colors.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    Function sign_out = Provider.of<logged_in_user>(context).log_off_user;
    Function clean = Provider.of<Basket>(context).clean_basket;
    Function res_wish=Provider.of<Wishes>(context).reset_wishes;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Profile"),
        backgroundColor: AppColors.primaryBackground,
        centerTitle: true,
        elevation: 0.0,
        actions: [
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: ElevatedButton.icon(
              label: const Text(
                "Log Out",
                style: TextStyle(color: Colors.white),
              ),
              onPressed: (){
                res_wish();
                clean();
                sign_out();
                Navigator.pop(context);
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(AppColors.notification),
              ),
              icon: const Icon(Icons.logout),
            ),
          ),
        ],
      ),
      body: ProfileBody(),

    );
  }
}
