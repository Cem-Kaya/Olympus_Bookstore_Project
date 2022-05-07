import 'package:flutter/material.dart';

import '../utils/colors.dart';
import '../utils/styles.dart';

class ActionBar extends StatelessWidget with PreferredSizeWidget {
  ActionBar({Key? key, this.title = "Olympus Bookstore"}) : super(key: key);
  String title;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      actions: [
        IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.notifications,
              color: AppColors.primary,
              size: 40,
            ))
      ],
      title: Text(
        title,
      ),
      backgroundColor: AppColors.primaryBackground,
      centerTitle: true,
      elevation: 0.0,
      titleTextStyle: kAppBarTitleTextStyle,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(56);
}
