import 'dart:io';
import 'package:bookstore/views/action_bar.dart';
import 'package:expandable/expandable.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../services/basket_data.dart';
import '../utils/api.dart';
import '../utils/colors.dart';
import '../utils/dimensions.dart';
import '../utils/jsonParse/previewBooks.dart';
import '../utils/styles.dart';
import '../views/product_preview.dart';

class ProductPage extends StatefulWidget {
  const ProductPage(
      {Key? key, required this.productID, required this.refreshFunc})
      : super(key: key);
  final int productID;
  final Function? refreshFunc;

  @override
  _ProductPageState createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  late String id;
  @override
  late String x;

  @override
  void initState() {
    super.initState();
    () async {
      await allBooks();
      setState(() {
        // Update your UI with the desired changes.
      });
      getProduct();
    }();

    // obtain shared preferences
  }

  dynamic items;

  Future allBooks() async {
    final url = Uri.parse(API.allBooks);
    try {
      final response = await http.get(url);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        final result = previewBooksFromJson(response.body);
        items = await result;
        //print(items[0].id);
        return result;
      } else {
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
  }

  PreviewBooks? _product;

  Future<void> getProduct() async {
    PreviewBooks wanted =
        items[items.indexWhere((element) => element.id == widget.productID)];

    _product = wanted;
    //print(_product?.title);
  }

  num stocks = 1;

  Widget build(BuildContext context) {
    Function addBasket = Provider.of<Basket>(context).add_basket;
    Size size = MediaQuery.of(context).size;
    //sleep(Duration(milliseconds:50)); // it is for debugging
    if (_product == null) {
      allBooks();
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    return Scaffold(
      body: Stack(
        children: [
          Container(
            child: Hero(
              tag: _product?.title ?? "",
              child: Image.network(
                  _product?.img ??
                      "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",
                  fit: BoxFit.fitWidth),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(
              top: 48,
              left: 32,
            ),
            child: GestureDetector(
              onTap: () {
                Navigator.pop(context);
              },
              child: Align(
                alignment: Alignment.topLeft,
                child: Container(
                  height: 42,
                  width: 42,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Icon(
                      Icons.arrow_back,
                      color: AppColors.background,
                    ),
                  ),
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              height: size.height * 0.6,
              padding: EdgeInsets.only(top: 6),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(
                    child: Container(
                      padding: EdgeInsets.only(
                        right: 32,
                        left: 32,
                        bottom: 16,
                      ),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Text("${_product?.title}",
                                style: kHeadingTextStyle),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 8),
                              child: Row(children: [
                                Row(
                                  children: <Widget>[
                                    RatingBarIndicator(
                                      rating: _product?.raiting as double,
                                      itemBuilder: (context, index) =>
                                          const Icon(
                                        Icons.star,
                                        color: Colors.amber,
                                      ),
                                      itemCount: 5,
                                      itemSize: 25.0,
                                      unratedColor: Colors.amber.withAlpha(50),
                                      direction: Axis.horizontal,
                                    ),
                                    Text(
                                      "  ${_product?.raiting}",
                                      style: const TextStyle(
                                          color: Colors.amber, fontSize: 16),
                                    ),
                                  ],
                                ),
                                SizedBox(
                                  width: 12,
                                ),
                              ]),
                            ),
                            Expanded(
                              child: SingleChildScrollView(
                                physics: BouncingScrollPhysics(),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    build_desc("Description",
                                        _product?.description ?? ""),
                                    //Text(_product?.description ?? ""),
                                    SizedBox(
                                      height: 30,
                                    ),
                                    build_detail(
                                        "Details",
                                        _product?.author ?? "",
                                        _product?.publisher ?? "",
                                        _product?.model ?? "",
                                        _product?.editionNumber ?? 0,
                                        _product?.releaseDate ?? ""),
                                    /*Text(
                                      "writer: ",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w300),
                                    ),
                                    Text(
                                      "publisher: ",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w200),
                                    ),
                                    Text(
                                      "name:  ",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w200),
                                    ),*/
                                    SizedBox(
                                      height: 30,
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Container(
                                          width: size.width / 2 - 44,
                                          child: OutlinedButton(
                                            onPressed: () {},
                                            child: Text("Read Reviews"),
                                          ),
                                        ),
                                        Container(
                                          width: size.width / 2 - 44,
                                          child: OutlinedButton(
                                              onPressed: () {},
                                              child: Text("Add a Review")),
                                        ),
                                      ],
                                    )
                                  ],
                                ),
                              ),
                            ),
                          ]),
                    ),
                  ),
                  Container(
                    height: 100,
                    alignment: Alignment.bottomLeft,
                    width: size.width,
                    padding: EdgeInsets.only(
                      top: 16,
                      bottom: 32,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(30),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        IconButton(
                            onPressed: () {
                              setState(() {
                                print(stocks);
                                if (stocks > 0) {
                                  stocks = stocks - 1;
                                  print(stocks);
                                }
                              });
                            },
                            icon: Icon(Icons.remove)),
                        Container(
                          width: size.width / 3 - 44,
                          child: TextField(
                            controller: TextEditingController(text: "$stocks"),
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              isDense: true,
                            ),
                            onChanged: (value) {
                              stocks = num.parse(value);
                            },
                          ),
                        ),
                        IconButton(
                            onPressed: () {
                              setState(() {
                                print(stocks);

                                stocks = stocks + 1;
                              });
                            },
                            icon: Icon(Icons.add)),
                        SizedBox(
                          width: size.width / 2 - 50,
                          child: OutlinedButton(
                            onPressed: () {
                              //print(stocks);
                              if (stocks > (_product?.inStock ?? 0)) {
                                showDialog(
                                    context: context,
                                    builder: (_) => AlertDialog(
                                          title:
                                              const Text("Not enough STOCKS"),
                                          content: Text(
                                              "You can at most buy ${_product?.inStock} of this product"),
                                          actions: [
                                            TextButton(
                                                onPressed: () {
                                                  Navigator.pop(context);
                                                },
                                                child: const Text("OK"))
                                          ],
                                        ));
                              } else {
                                addBasket(_product?.id, stocks, _product?.title,
                                    _product?.price, _product?.img);
                              }
                            },
                            child: Text("Buy"),
                            style: ButtonStyle(
                              backgroundColor:
                                  MaterialStateProperty.resolveWith<Color?>(
                                      (Set<MaterialState> states) {
                                if (states.contains(MaterialState.pressed))
                                  return Theme.of(context)
                                      .colorScheme
                                      .primary
                                      .withOpacity(0.5);
                                return Colors.red.withOpacity(0.5);
                              }),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget build_desc(String title, String desc) {
    return Card(
      color: Colors.grey[200],
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ExpandablePanel(
          header: Text(
            title,
            style: kButtonLightTextStyle,
          ),
          collapsed: Text(
            desc,
            style: TextStyle(
              fontWeight: FontWeight.w300,
            ),
            overflow: TextOverflow.ellipsis,
            maxLines: 5,
            softWrap: true,
          ),
          expanded: Text(
            desc,
          ),
        ),
      ),
    );
  }

  Widget build_detail(String title, String writer, String publisher,
      String model, num edition, String releaseDate) {
    return Card(
      color: Colors.grey[200],
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ExpandablePanel(
          header: Text(
            title,
            style: kButtonLightTextStyle,
          ),
          collapsed: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Text(
                "Author: $writer",
                style: TextStyle(
                  fontWeight: FontWeight.w300,
                ),
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
                softWrap: true,
              ),
              Text(
                "Publisher: $publisher",
                style: TextStyle(
                  fontWeight: FontWeight.w300,
                ),
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
                softWrap: true,
              ),
            ],
          ),
          expanded: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Text(
                "Author: $writer",
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
                softWrap: true,
              ),
              Text(
                "Publisher: $publisher",
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
                softWrap: true,
              ),
              Text(
                "Model: $model",
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
                softWrap: true,
              ),
              Text(
                "Edition: $edition",
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
                softWrap: true,
              ),
              Text(
                "Release Date: $releaseDate",
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
                softWrap: true,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
