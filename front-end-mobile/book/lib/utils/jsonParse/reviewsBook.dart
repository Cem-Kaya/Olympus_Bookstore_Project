// To parse this JSON data, do
//
//     final reviewBooks = reviewBooksFromJson(jsonString);

import 'package:meta/meta.dart';
import 'dart:convert';

List<ReviewBooks> reviewBooksFromJson(String str) => List<ReviewBooks>.from(json.decode(str).map((x) => ReviewBooks.fromJson(x)));

String reviewBooksToJson(List<ReviewBooks> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class ReviewBooks {
  ReviewBooks({
    @required this.pid,
    @required this.text,
    @required this.uid,
    @required this.stars,
  });

  num? pid;
  String? text;
  String? uid;
  num? stars;

  factory ReviewBooks.fromJson(Map<String, dynamic> json) => ReviewBooks(
    pid: json["Pid"],
    text: json["text"],
    uid: json["uid"],
    stars: json["stars"],
  );

  Map<String, dynamic> toJson() => {
    "Pid": pid,
    "text": text,
    "uid": uid,
    "stars": stars,
  };
}
