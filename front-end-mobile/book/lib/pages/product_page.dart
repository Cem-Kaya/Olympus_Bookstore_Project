import 'package:bookstore/views/action_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

import '../utils/colors.dart';
import '../utils/dimensions.dart';
import '../utils/styles.dart';
import '../views/product_preview.dart';
 final products = <Product>[
  Product(
    pid: "5",
    url:
    "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    productName: "Book name",
    rating: 3.7,
    price: 24.99,
    oldPrice: 20.00,
    stocks: 30,
    seller: "Seller1",
    desc :"No Descriptionsdfmjskdmcksdcdskcmdsjk jkmskdvfjkdvm sjkd vnfjkd sjkv nsdcmkdsmckdsmcksdmckdsmc ksdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm",
    category : "Games",
    tag : "All",),
  Product(
    pid: "6",
    url:
    "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    productName: "Book name",
    rating: 3.7,
    price: 24.99,
    oldPrice: 20.00,
    stocks: 30,
    seller: "Seller1",
    desc :"No Descriptionsdfmjskdmcksdcdskcmdsjk jkmskdvfjkdvm sjkd vnfjkd sjkv nsdcmkdsmckdsmcksdmckdsmc ksdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm",
    category : "Games",
    tag : "All",),

  Product(
    pid: "4",
    url:
    "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    productName: "Book name",
    rating: 3.7,
    price: 24.99,
    oldPrice: 20.00,
    stocks: 30,
    seller: "Seller1",
    desc :"No Descriptionsdfmjskdmcksdcdskcmdsjk jkmskdvfjkdvm sjkd vnfjkd sjkv nsdcmkdsmckdsmcksdmckdsmc ksdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm",
    category : "Games",
    tag : "All",),

  Product(
    pid: "3",
    url:
    "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    productName: "Book name",
    rating: 3.7,
    price: 24.99,
    oldPrice: 20.00,
    stocks: 30,
    seller: "Seller1",
    desc :"No Descriptionsdfmjskdmcksdcdskcmdsjk jkmskdvfjkdvm sjkd vnfjkd sjkv nsdcmkdsmckdsmcksdmckdsmc ksdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm",
    category : "Games",
    tag : "All",),
  Product(
    pid: "2",
    url:
    "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    productName: "Book name",
    rating: 3.7,
    price: 24.99,
    oldPrice: 20.00,
    stocks: 30,
    seller: "Seller1",
    desc :"No Descriptionsdfmjskdmcksdcdskcmdsjk jkmskdvfjkdvm sjkd vnfjkd sjkv nsdcmkdsmckdsmcksdmckdsmc ksdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm",
    category : "Games",
    tag : "All",),
  Product(
    pid: "1",
    url:
    "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    productName: "Book namessss",
    rating: 3.7,
    price: 24.99,
    oldPrice: 20.00,
    stocks: 30,
    seller: "Seller1",
    desc :"No Descriptionsdfmjskdmcksdcdskcmdsjk jkmskdvfjkdvm sjkd vnfjkd sjkv nsdcmkdsmckdsmcksdmckdsmc ksdvm"
        "sncjksdkvmflkvömdklcvmslcödslkvmflvösdlvölsvöfldövldföv"
        "völfşdvöflşdvölsşövlşvölfdşvösdlşvömfldşvödslşvöslşvölfdlövlfdövlsşdvölsşdövlşsdövlşsdövlşsöv"
        "svöklsdvöölsşdvölkövslşövlsşdvölsşdövlsşövşlsdövşlsdövşsdövlşsdövlsşdövlşsdöv"
        "slkdmvklsdvmslkvmsddmvklsdmvlksdmvklsdmsvdlkvmsklmvslkdvmslkdvmsdlkdvm",
    category : "Games",
    tag : "All",),
];
class ProductPage extends StatefulWidget {
  const ProductPage({Key? key, required this.productID, required this.refreshFunc}) : super(key: key);
  final String productID;
  final Function? refreshFunc;
  @override


  _ProductPageState createState() => _ProductPageState();
}


class _ProductPageState extends State<ProductPage> {
  late String id;
  @override
  late String x;

   getProduct(){
    Product wanted= products[products.indexWhere((element) => element.pid==widget.productID)];
    return wanted;

  }
  Product ? _product;
  void initState() {

    _product =getProduct();
    super.initState();
  }
  num stocks = 1;
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(

      body: Stack(
        children: [

      Container(
      child: Hero(
      tag: _product?.productName ?? "",
        child: Image.network(
            _product?.url ?? "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",

            fit: BoxFit.fitWidth
        ),
      ),
    ),

    Padding(
    padding: EdgeInsets.only(top: 48, left: 32,),
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
    padding: EdgeInsets.only(right: 32, left: 32, bottom: 16,),
    child: Column(

    crossAxisAlignment: CrossAxisAlignment.stretch,
    mainAxisAlignment: MainAxisAlignment.start,
    children: [

    Text(
    "${_product?.productName}",
    style: kHeadingTextStyle
    ),



    Padding(
    padding: EdgeInsets.symmetric(vertical: 8),
    child: Row(
    children: [

    Row(
    children: <Widget>[

      RatingBarIndicator(
        rating: _product?.rating as double,
        itemBuilder: (context, index) => const Icon(
          Icons.star,
          color: Colors.amber,
        ),
        itemCount: 5,
        itemSize: 25.0,
        unratedColor: Colors.amber.withAlpha(50),
        direction: Axis.horizontal,
      ),
      Text(
        "  ${_product?.rating}",
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
        Text(
        _product?.desc ?? "no description",

        ),
        SizedBox(
          height: 30,
        ),
        Text("writer: ",style: TextStyle(fontWeight: FontWeight.w200),),
        Text("publisher: ",style: TextStyle(fontWeight: FontWeight.w200),),
        Text("nameÇ:  ",style: TextStyle(fontWeight: FontWeight.w200),),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [

            Container(
              width: size.width/2-44,
              child: OutlinedButton(onPressed: (){}, child: Text(
                "Read Reviews"
              ),


              ),
            ),
            Container(
              width: size.width/2-44,
              child: OutlinedButton(onPressed: (){}, child: Text(
                  "Add a Review"
              )),
            ),
          ],
        )
      ],
    ),
    ),
    ),


    ]
    ),

    ),
    ),
    Container(
    height: 100,
    alignment: Alignment.bottomLeft,
    width: size.width,
    padding: EdgeInsets.only(top: 16,  bottom: 32,),
    decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.only(
    topLeft: Radius.circular(30),
    ),
    ),
    child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [

      IconButton(onPressed: (){
        setState(() {
          print(stocks);
          if(stocks>0 ) {
            stocks = stocks - 1;
            print(stocks);
          }
        });
      }, icon: Icon(Icons.remove)),
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
          stocks=num.parse(value);
        },
      ),
    ),
      IconButton(onPressed: (){
        setState(() {
          print(stocks);

            stocks = stocks + 1;

        });
      }, icon: Icon(Icons.add)),


      SizedBox(
        width: size.width/2 -30  ,



        child: OutlinedButton(
          onPressed: (){
            print(stocks);
            if(stocks > (_product?.stocks ?? 0)){
              showDialog(
                  context: context,
                  builder: (_) => AlertDialog(
                    title: const Text("Not enough STOCKS"),
                    content: Text(
                        "You can at most buy ${_product?.stocks} of this product"),
                    actions: [
                      TextButton(
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: const Text("OK"))
                    ],
                  ));


          }
          },
          child: Text("Buy"),
          style: ButtonStyle(
            backgroundColor: MaterialStateProperty.resolveWith<Color?>(
    (Set<MaterialState> states) {
    if (states.contains(MaterialState.pressed))
    return Theme.of(context).colorScheme.primary.withOpacity(0.5);
    return Colors.red.withOpacity(0.5);
    }
            ),
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
}







