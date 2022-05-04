// To parse this JSON data, do
//
//     final previewBooks = previewBooksFromJson(jsonString);

// To parse this JSON data, do
//
//     final previewBooks = previewBooksFromJson(jsonString);

import 'package:meta/meta.dart';
import 'dart:convert';

List<PreviewBooks> previewBooksFromJson(String str) => List<PreviewBooks>.from(json.decode(str).map((x) => PreviewBooks.fromJson(x)));

String previewBooksToJson(List<PreviewBooks> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class PreviewBooks {
  PreviewBooks({
    @required this.id,
    @required this.img,
    @required this.img1,
    @required this.img2,
    @required this.title,
    @required this.author,
    @required this.raiting,
    @required this.publisher,
    @required this.price,
    @required this.amountSold,
    @required this.releaseDate,
    @required this.model,
    @required this.editionNumber,
    @required this.description,
    @required this.inStock,
    @required this.warranty,
    @required this.discount,
    @required this.date,
  });

  num? id;
  String? img;
  String? img1;
  String? img2;
  String? title;
  String? author;
  num? raiting;
  String? publisher;
  num? price;
  num? amountSold;
  String? releaseDate;
  String? model;
  num? editionNumber;
  String? description;
  num? inStock;
  String? warranty;
  String? discount;
  DateTime? date;

  factory PreviewBooks.fromJson(Map<String, dynamic> json) => PreviewBooks(
    id: json["id"],
    img: json["img"],
    img1: json["img1"],
    img2: json["img2"],
    title: json["title"],
    author: json["author"],
    raiting: json["raiting"],
    publisher: json["publisher"],
    price: json["price"],
    amountSold: json["amount_sold"],
    releaseDate: json["release_date"],//change it to view
    model: json["model"],
    editionNumber: json["edition_number"],
    description: json["description"],
    inStock: json["in_stock"],
    warranty: json["warranty"],
    discount: json["discount"],
    date: DateTime.parse(json["date"]),
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "img": img,
    "img1": img1,
    "img2": img2,
    "title": title,
    "author": author,
    "raiting": raiting,
    "publisher": publisher,
    "price": price,
    "amount_sold": amountSold,
    "release_date": releaseDate,
    "model": model,
    "edition_number": editionNumber,
    "description": description,
    "in_stock": inStock,
    "warranty": warranty,
    "discount": discount,
    "date": date,
  };
}
