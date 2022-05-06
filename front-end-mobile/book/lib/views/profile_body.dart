import 'package:bookstore/utils/colors.dart';
import 'package:flutter/material.dart';
import '../utils/styles.dart';

class ProfileBody extends StatelessWidget {
  const ProfileBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
                    Text("Buy/Sell History"),
                    Icon(Icons.arrow_forward)
                  ],
                ),
                onPressed: () {}, //
              ),
            ),
          )
        ],
      ),
    );
  }
}
