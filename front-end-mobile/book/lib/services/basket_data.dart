import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Baske with ChangeNotifier {
  //basket_data
  num? product_id;
  String title;
  num stocks;

  num price;
  String url;

  Baske({
    this.stocks = 1,
    required this.product_id,
    required this.price,
    required this.title,
    required this.url,
  });
}

class Basket with ChangeNotifier {
  List<Baske> myBasket = [];

  List<Baske> get() {
    return myBasket;
  }

  void add_stocks(num productid) {
    myBasket[myBasket.indexWhere((element) => productid == element.product_id)]
        .stocks = myBasket[myBasket
                .indexWhere((element) => productid == element.product_id)]
            .stocks +
        1;
    notifyListeners();
  }

  void sum_stocks(num productid) {
    if (myBasket[myBasket
                .indexWhere((element) => productid == element.product_id)]
            .stocks >
        1) {
      myBasket[
              myBasket.indexWhere((element) => productid == element.product_id)]
          .stocks = myBasket[myBasket
                  .indexWhere((element) => productid == element.product_id)]
              .stocks -
          1;
      notifyListeners();
    }
  }

  void add_basket(
      num produtid, num stocks, String title, num price, String url) {
    final index =
        myBasket.indexWhere((element) => element.product_id == produtid);
    if (index == -1) {
      myBasket.add(Baske(
          product_id: produtid,
          title: title,
          stocks: stocks,
          price: price,
          url: url));
      notifyListeners();
    } else {
      myBasket[myBasket.indexWhere((element) => produtid == element.product_id)]
          .stocks = myBasket[myBasket
                  .indexWhere((element) => produtid == element.product_id)]
              .stocks +
          stocks;
    }
  }

  void remove_basket(num productid) {
    myBasket.remove(myBasket[
        myBasket.indexWhere((element) => productid == element.product_id)]);
    notifyListeners();
  }

  void clean_basket() {

    for (var i in myBasket) {
      remove_basket(i.product_id!);
    }
  }

  num getSum() {
    num sum = 0;
    for (var i in myBasket) {
      sum = sum + (i.stocks * i.price);
    }
    return sum;
  }
}
