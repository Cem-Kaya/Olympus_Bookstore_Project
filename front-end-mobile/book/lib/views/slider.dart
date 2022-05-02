import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class slider extends StatefulWidget {
  const slider({Key? key}) : super(key: key);

  @override
  State<slider> createState() => _slider();
}

class _slider extends State<slider> {
  double _currentSliderValue = 20;
  static final eventlist=<Slide_event>[
    Slide_event(id: 1,
        image: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", text: "text"),
    Slide_event(id: 2, image: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip" ,text:"this book is amazing"),
    Slide_event(id: 3, image: "https://media.wired.com/photos/6053ed2babe735a0f6772abc/1:1/w_2400,c_limit/business_plaintext_copyright_1217382141.jpg", text: "something good"),
  ];
  @override
  Widget build(BuildContext context) {
    return CarouselSlider(
      options: CarouselOptions(height: 400.0,
      enlargeCenterPage:true,
      autoPlay: true,
      aspectRatio: 16/9,
      autoPlayCurve: Curves.fastOutSlowIn,
      enableInfiniteScroll: true,
      autoPlayAnimationDuration: Duration(milliseconds: 800),
      viewportFraction: 0.8),
      items: eventlist.map((i) {
        return Builder(
          builder: (BuildContext context) {
            return InkWell(
              onTap: (){},
              child: Container(

                  width: MediaQuery.of(context).size.width,

                  margin: EdgeInsets.all(5.0),
                  decoration: BoxDecoration(
                      color: Colors.amber,
                    image: DecorationImage(
                      opacity: 0.5,
                      image: NetworkImage(i.image),
                      fit: BoxFit.cover
                    ),

                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text('${i.text}', style: TextStyle(fontSize: 20.0,color: Colors.white),),
                    ],
                  )
              ),
            );
          },
        );
      }).toList(),
    );
  }
}
class Slide_event{
  num id;
  String image;
  String text;
  Slide_event({
    required this.id,
    required this.image,
    required this.text
    ,
});}
