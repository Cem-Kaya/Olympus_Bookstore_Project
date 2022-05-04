import 'package:bookstore/utils/jsonParse/previewBooks.dart';
import 'package:flutter/material.dart';
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

  final PreviewBooks product;
  final Function? refreshFunc;
  final bool editable;



  @override
  State<ProductPreview> createState() => _ProductPreviewState();
}

class _ProductPreviewState extends State<ProductPreview> {
  void childRefreshFunc() {
    setState(() {});
  }
  var temp;

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

              productID: widget.product.id as int,
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
                            widget.product.img ?? "",
                            height: 150,
                            width: 75,
                          ),
                          Text(
                            widget.product.title ?? "",
                            style: kSmallTitle,
                            textAlign: TextAlign.center,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          Text(
                            widget.product.publisher ?? "",
                            style: kSmallText,
                            textAlign: TextAlign.center,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          RatingBarIndicator(
                            rating: widget.product.raiting as double, //it will be debugged
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
                              /*Visibility(
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
                              */
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
                /*Visibility(
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
                )*/
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
  num id;
  String img;
  String title;
  String author;
  num rating;
  String publisher;
  num price;
  num? amountSold;
  String? releaseDate;
  String? discount;

  num stocks;
  String category;
  String desc;

  num oldPrice;
  Product({
    required this.id,
    required this.img,
    required this.title,
    required this.author,
    required this.rating,
    this.publisher = "Anonymous",
    required this.price,
    required this.amountSold,
    required this.releaseDate,
    required this.discount,

    this.stocks = 0, //this will be changed
    this.desc = "No Description",
    this.category = "History",
    this.oldPrice = 0,
  });
}
