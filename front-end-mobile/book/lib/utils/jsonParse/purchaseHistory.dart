// To parse this JSON data, do
//
//     final purchaseHistory = purchaseHistoryFromJson(jsonString);

import 'package:meta/meta.dart';
import 'dart:convert';

List<PurchaseHistory> purchaseHistoryFromJson(String str) => List<PurchaseHistory>.from(json.decode(str).map((x) => PurchaseHistory.fromJson(x)));

String purchaseHistoryToJson(List<PurchaseHistory> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class PurchaseHistory {
  PurchaseHistory({
    @required this.pid,
    @required this.date,
    @required this.quantity,
    @required this.purcid,
    @required this.sale,
    @required this.price,
    @required this.shipment,
    @required this.email,
    @required this.name,
    @required this.url,
  });

  num? pid;
  DateTime? date;
  num? quantity;
  num? purcid;
  num? sale;
  num? price;
  String? shipment;
  String? email;
  String? name;
  String? url;

  factory PurchaseHistory.fromJson(Map<String, dynamic> json) => PurchaseHistory(
    pid: json["pid"],
    date: DateTime.parse(json["date"]),
    quantity: json["quantity"],
    purcid: json["purcid"],
    sale: json["sale"],
    price: json["price"],
    shipment: json["shipment"],
    email: json["email"],
    name: json["name"],
    url: json["url"],

  );

  Map<String, dynamic> toJson() => {
    "pid": pid,
    "date": date,
    "quantity": quantity,
    "purcid": purcid,
    "sale": sale,
    "price": price,
    "shipment": shipment,
    "email": email,
    "name" : name,
    "url" : url,
  };
}