// To parse this JSON data, do
//
//     final accountDetails = accountDetailsFromJson(jsonString);

import 'package:meta/meta.dart';
import 'dart:convert';

AccountDetails accountDetailsFromJson(String str) => AccountDetails.fromJson(json.decode(str));

String accountDetailsToJson(AccountDetails data) => json.encode(data.toJson());

class AccountDetails {
  AccountDetails({
    @required this.status,
    @required this.uid,
    @required this.name,
    @required this.passHash,
    @required this.homeaddress,
    @required this.tax_id,
  });

  bool? status;
  String? uid;
  String? name;
  String? passHash;
  String? homeaddress;
  String? tax_id;

  factory AccountDetails.fromJson(Map<String, dynamic> json) => AccountDetails(
    status: json["status"],
    uid: json["uid"],
    name: json["name"],
    passHash: json["pass_hash"],
    homeaddress: json["homeaddress"],
    tax_id: json["tax_id"],
  );

  Map<String, dynamic> toJson() => {
    "status": status,
    "uid": uid,
    "name": name,
    "pass_hash": passHash,
    "homeaddress": homeaddress,
    "tax_id": tax_id,
  };
}
