import 'package:bookstore/services/basket_data.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../utils/colors.dart';

class one_basket_item extends StatefulWidget {
   one_basket_item({Key? key, required this.view_bask
  }) : super(key: key);
  final Baske view_bask;

  @override
  _one_basket_itemState createState() => _one_basket_itemState();
}

class _one_basket_itemState extends State<one_basket_item> {

  @override
  num sum=0;



  Widget build(BuildContext context) {
    Function a = Provider
        .of<Basket>(context)
        .remove_basket;
    Function add = Provider
        .of<Basket>(context)
        .add_stocks;
    Function sub = Provider
        .of<Basket>(context)
        .sum_stocks;
    Function getsum = Provider
        .of<Basket>(context)
        .getSum;




    Size size = MediaQuery.of(context).size;


    return Container(
      height: 125,
      width: size.width,
      child: ListTile(
          onTap: () {},
          title: Text(
            widget.view_bask.title,
            textAlign: TextAlign.start,
            overflow: TextOverflow.ellipsis,
            maxLines: 2,
            style: const TextStyle(
                color: AppColors.secondary,
                fontWeight: FontWeight.bold),
          ),
          leading: SizedBox(width: 50,child: Image.network(widget.view_bask.url)),
          subtitle: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '\$ ${widget.view_bask.price}',
                style: const TextStyle(
                    fontWeight: FontWeight.bold),

              ),
          Row(
            children: [
              IconButton(
                  onPressed: () {
                    sub(widget.view_bask.product_id);


                  },

                  icon: Icon(Icons.remove)),
              Text(
                ' ${widget.view_bask.stocks}',
                style: const TextStyle(
                    fontWeight: FontWeight.bold),),
              IconButton(
                  onPressed: () {
                    add(widget.view_bask.product_id);


                  },

                  icon: Icon(Icons.add)),
            ],
          )
            ],
          ),
          trailing: IconButton(
            onPressed: () async  {
              await (
                  a(widget.view_bask.product_id));




              /*

              int i = 0;
              num sumPrice = 0;
              while (i < products.length) {
                sumPrice =
                    sumPrice + products[index].price;
                i = i + 1;
              }
              setState(() {
                sum = sumPrice;
              });*/
            },
            icon: Icon(Icons.delete_forever),
          )
        //Icon(Icons.delete,color: Colors.red,) ,
      ),
    );
  }
}
