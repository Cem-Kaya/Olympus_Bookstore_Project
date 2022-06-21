import 'dart:convert';
import 'dart:io';
import 'package:bookstore/pages/reviews.dart';
import 'package:bookstore/pages/send_comment.dart';
import 'package:bookstore/views/action_bar.dart';
import 'package:expandable/expandable.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../services/basket_data.dart';
import '../services/root_index.dart';
import '../services/user_logged_data.dart';
import '../services/wishes_data.dart';
import '../utils/api.dart';
import '../utils/colors.dart';
import '../utils/dimensions.dart';
import '../utils/jsonParse/previewBooks.dart';
import '../utils/styles.dart';
import '../views/product_preview.dart';
import 'favorites.dart';

class ProductPage2 extends StatefulWidget {
  const ProductPage2(
      {Key? key,
        required this.productID,
        required this.refreshFunc,
        required this.isuser})
      : super(key: key);
  final int productID;
  final String isuser;
  final Function? refreshFunc;

  @override
  _ProductPage2State createState() => _ProductPage2State();
}

class _ProductPage2State extends State<ProductPage2> {
  late String id;
  @override
  late String x;
  bool is_wished = false;

  @override
  void initState() {
    super.initState();
        () async {
      await allBooks();
      setState(() {
        // Update your UI with the desired changes.
      });
      getProduct();
      if (widget.isuser != "") {
        await ALLwishes(widget.isuser);
        print("ssssssssssss");
        print(wishes[0]);
      }
    }();

    // obtain shared preferences
  }

  var remove;

  Removewishes(String email, num pid) async {
    //it will be handled
    try {
      remove = await http.post(
        Uri.parse(API.remove_wished), //it will be handled
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "email": email,
            "Pid": pid,
          },
        ),
      );

      //remove =jsonDecode(remove.body);
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }

  var add;

  ADDwishes(String email, num pid) async {
    //it will be handled
    try {
      add = await http.post(
        Uri.parse(API.wishes_submit), //it will be handled
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "email": email,
            "Pid": pid,
          },
        ),
      );

      //add =jsonDecode(add.body);
    } catch (e) {
      print("error is ${e.toString()}");
    }
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

  var wishes;

  ALLwishes(
      String email,
      ) async {
    //it will be handled
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

      wishes = jsonDecode(wishes.body);
      print("aaaaaaaaaaaaa");
      print(wishes);
      int i = 0;
      bool ished = false;
      while (i < wishes.length) {
        if (wishes[i]["Pid"] == widget.productID) {
          ished = true;

          // print(is_wished);
          //print(wishes[i]["Pid"]);
        }
        i = i + 1;
      }
      if (ished) {
        setState(() {
          is_wished = true;
        });
      } else {
        setState(() {
          is_wished = false;
        });
      }
    } catch (e) {
      print("error is ${e.toString()}");
    }
  }
  var response_basket;
  Send_to_basket(num pid, String email, num quantity) async { //it will be handled
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

  PreviewBooks? _product;

  Future<void> getProduct() async {
    PreviewBooks wanted = await items[
    await items.indexWhere((element) => element.id == widget.productID)];

    _product = wanted;
    //print(_product?.title);
  }

  num stocks = 1;

  Widget build(BuildContext context) {
    Function login = Provider.of<logged_in_user>(context).getUser;
    Function addwish = Provider.of<Wishes>(context).add_wishes;
    Function remwish = Provider.of<Wishes>(context).remove_wishes;
    Function getwish = Provider.of<Wishes>(context).get;
    Function change_index = Provider.of<ClassRoot>(context).changeRoot; //difference from other product page
    var user = login();
    print(is_wished);

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
              top: 264,
              right: 8,
            ),
            child: Align(
              alignment: Alignment.topRight,
              child: Visibility(
                visible: user != '',
                child: Container(
                  child: is_wished
                      ? ElevatedButton.icon(
                    onPressed: () async {
                      await Removewishes(widget.isuser, widget.productID);
                      await ALLwishes(widget.isuser);
                      await remwish(widget.productID);

                    },
                    label: Text("Remove from wishlist",
                        style: const TextStyle(
                          fontSize: 16,
                        )),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(
                          AppColors.notification),
                    ),
                    icon: Icon(Icons.favorite),
                  )
                      : ElevatedButton.icon(
                    onPressed: () async {
                      await ADDwishes(widget.isuser, widget.productID);
                      await ALLwishes(widget.isuser);
                      await addwish(widget.productID);
                    },
                    label: Text("Add to wishlist",
                        style: const TextStyle(
                          fontSize: 16,
                        )),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(
                          Colors.green),
                    ),
                    icon: Icon(Icons.favorite_border),
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(
              top: 48,
              left: 32,
            ),
            child: GestureDetector(
              onTap: () {
                //Navigator.of(context).push( MaterialPageRoute( builder: (context) => Favorites( use: login(),wishes:getwish() )));
                Navigator.pop(context);
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
                            Text(
                              "${_product?.title}",
                              style: kHeadingTextStyle,
                              overflow: TextOverflow.ellipsis,
                              maxLines: 3,
                              softWrap: true,
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 8),
                              child: Row(
                                  mainAxisAlignment:
                                  MainAxisAlignment.spaceBetween,
                                  children: [
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
                                          unratedColor:
                                          Colors.amber.withAlpha(50),
                                          direction: Axis.horizontal,
                                        ),
                                        Text(
                                          "  ${_product?.raiting}",
                                          style: const TextStyle(
                                              color: Colors.amber,
                                              fontSize: 16),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      children: [
                                        Container(
                                          margin: const EdgeInsets.all(3.0),
                                          padding: const EdgeInsets.all(3.0),
                                          decoration: BoxDecoration(
                                              border: Border.all(
                                                  color:
                                                  AppColors.notification)),
                                          child: Text(
                                            "Stocks: ${_product?.inStock}",
                                            style: const TextStyle(
                                              color: AppColors.notification,
                                              fontSize: 16,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ]),
                            ),
                            Expanded(
                              child: SingleChildScrollView(
                                physics: BouncingScrollPhysics(),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    SizedBox(
                                      height: 12,
                                    ),
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
                                            onPressed: () {
                                              Navigator.of(context).push(
                                                  MaterialPageRoute(
                                                      builder: (context) =>
                                                          reviews(
                                                            prod: widget
                                                                .productID,
                                                          )));
                                            },
                                            child: Text("Read Reviews"),
                                          ),
                                        ),
                                        Container(
                                          width: size.width / 2 - 44,
                                          child: OutlinedButton(
                                              onPressed: () async {
                                                if (user != "") {
                                                  Navigator.of(context).push(
                                                      MaterialPageRoute(
                                                          builder: (context) =>
                                                              AddReview(
                                                                  prod: widget
                                                                      .productID)));
                                                } else {
                                                  await showDialog(
                                                      context: context,
                                                      builder: (_) =>
                                                          AlertDialog(
                                                            title: const Text(
                                                                "Error"),
                                                            content: const Text(
                                                                "For continue adding a review, you need to login"),
                                                            actions: [
                                                              TextButton(
                                                                  onPressed:
                                                                      () {
                                                                    Navigator
                                                                        .pop(_);
                                                                  },
                                                                  child:
                                                                  const Text(
                                                                      "Ok"))
                                                            ],
                                                          ));
                                                }
                                              },
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
                                if (stocks > 0) {
                                  stocks = stocks - 1;
                                  //print(stocks);
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
                                //print(stocks);

                                stocks = stocks + 1;
                              });
                            },
                            icon: Icon(Icons.add)),
                        SizedBox(
                          width: size.width / 2 - 50,
                          child: OutlinedButton(
                            onPressed: () async {
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
                                if (user != ""){
                                  Send_to_basket(_product!.id!, user, stocks);
                                }
                                await showDialog(
                                    context: context,
                                    builder: (_) => AlertDialog(
                                      title: const Text("Success"),
                                      content:
                                      const Text("Added to Basket."),
                                      actions: [
                                        TextButton(
                                            onPressed: () {
                                              Navigator.pop(_);
                                            },
                                            child: const Text("Ok"))
                                      ],
                                    ));
                                Navigator.pop(context);
                                change_index(0);
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
