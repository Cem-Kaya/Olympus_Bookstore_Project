import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

import 'package:bookstore/utils/colors.dart';
import 'package:bookstore/utils/dimensions.dart';
import 'package:bookstore/utils/styles.dart';

import 'package:shared_preferences/shared_preferences.dart';

import '../pages/product_page.dart';

class ProductPreview extends StatefulWidget {
  const ProductPreview({
    Key? key,
    required this.product,
    this.refreshFunc,
    this.editable = false,
  }) : super(key: key);

  final Product product;
  final Function? refreshFunc;
  final bool editable;

  @override
  State<ProductPreview> createState() => _ProductPreviewState();
}

class _ProductPreviewState extends State<ProductPreview> {
  void childRefreshFunc() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      style: ButtonStyle(
          backgroundColor: MaterialStateProperty.resolveWith(
                  (states) => AppColors.primary.withOpacity(0.1)),
          shape: MaterialStateProperty.resolveWith((states) =>
              RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20))),
          padding: MaterialStateProperty.resolveWith(
                  (states) => EdgeInsets.zero)),
      onPressed: () {
        Navigator.of(context).push(MaterialPageRoute(
            builder: (context) => ProductPage(

              productID: widget.product.pid,
              refreshFunc: childRefreshFunc,
            )));

      },
      child: Stack(
        alignment: Alignment.center,
        children: [
          Stack(
              alignment: Alignment.topRight,
              children: <Widget>[
                Column(
                  children: [
                    Container(
                      width: 150,
                      alignment: Alignment.topCenter,
                      margin: const EdgeInsets.all(0),
                      padding: Dimen.smallPadding,
                      child: Column(
                        children: [
                          Image.network(
                            widget.product.url,
                            height: 150,
                            width: 75,
                          ),
                          Text(
                            widget.product.productName,
                            style: kSmallTitle,
                            textAlign: TextAlign.center,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          Text(
                            widget.product.seller,
                            style: kSmallText,
                            textAlign: TextAlign.center,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          RatingBarIndicator(
                            rating: widget.product.rating as double,
                            itemBuilder: (context, index) =>
                            const Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            itemCount: 5,
                            itemSize: 18.0,
                            unratedColor: Colors.amber.withAlpha(80),
                            direction: Axis.horizontal,
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          Column(
                            children: [
                              Visibility(
                                visible: widget.product.oldPrice >
                                    widget.product.price,
                                child: Row(
                                  mainAxisAlignment:
                                  MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      "\$ ${widget.product.oldPrice}",
                                      style: const TextStyle(
                                          fontSize: 12,
                                          color: AppColors.primary,
                                          decoration:
                                          TextDecoration.lineThrough),
                                    ),
                                    // Text(
                                    //     "${(((widget.product.oldPrice - widget.product.price) / widget.product.oldPrice) * 100).toStringAsFixed(0)}%"),
                                  ],
                                ),
                              ),
                              Text("\$ ${widget.product.price}"),
                            ],
                          ),
                        ],
                      ),
                    )
                  ],
                ),

                Positioned(
                  top: 0,
                  right: 0,
                  child: IconButton(
                      onPressed: () {},

                      icon: Icon(
                          Icons.favorite,
                          color: AppColors.notification)),
                ),
                Visibility(
                  visible: widget.product.oldPrice >
                      widget.product.price,
                  child: Positioned(
                    top: 0,
                    left: 0,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          Icon(
                            Icons.circle,
                            size: 40,
                            color: AppColors.background,
                          ),
                          Text(
                              "${(((widget.product.oldPrice -
                                  widget.product.price) /
                                  widget.product.oldPrice) * 100)
                                  .toStringAsFixed(0)}%",
                              style: TextStyle(color: Colors.white))
                        ],
                      ),
                    ),
                  ),
                )
              ]
          ),
        ],
      ),
    );
  }

  List<Widget> editableButtons(context, product, refreshFunc) {
    return <Widget>[
      Positioned(
        top: 0,
        left: 0,
        child: IconButton(
            onPressed: () {

            },
            icon: const Icon(Icons.edit, color: Colors.black,)),
      ),
      Positioned(
          top: 0,
          right: 0,
          child: IconButton(
              onPressed: () {

              },
              icon: const Icon(Icons.delete, color: Colors.red,))),
    ];
  }
}

class Product {
  String pid;
  String url;
  String productName;
  String seller;
  num rating;
  num price;
  num oldPrice;
  num stocks;
  String category;
  String tag;
  String desc;

  Product({
    required this.pid,
    required this.url,
    required this.productName,
    required this.rating,
    required this.price,
    required this.stocks,
    required this.oldPrice,
    this.desc = "No Description",
    this.category = "Games",
    this.tag = "All",
    this.seller = "Anonymous",
  });
}
