import 'package:bookstore/utils/colors.dart';
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
        image: "https://media.istockphoto.com/photos/cat-reads-a-book-on-a-window-sill-picture-id1144173711?k=20&m=1144173711&s=612x612&w=0&h=_DxEhiQHbl7QXkIQkUeFoll-pN85W_ycoGOwpFkIKlA=", text: "Even animals need to good books", Title_text: "BOOKS FOR CATS"),
    Slide_event(id: 2, image: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip" ,text:"Enjoy summer with some amazing books", Title_text: "SCHOOLS  ARE  OFF!", ),
    Slide_event(id: 3, image: "https://media.wired.com/photos/6053ed2babe735a0f6772abc/1:1/w_2400,c_limit/business_plaintext_copyright_1217382141.jpg", text: "For up tu %50 discounts ", Title_text: "GREAT PROMOTIONS!",),
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
                      color: AppColors.primary,
                    image: DecorationImage(
                      opacity: 0.5,
                      image: NetworkImage(i.image),
                      fit: BoxFit.cover
                    ),

                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('${i.Title_text}', style: TextStyle(fontSize: 35.0, color: AppColors.background, fontWeight: FontWeight.w700),textAlign: TextAlign.center,),
                        Text('${i.text}', style: TextStyle(fontSize: 20.0,color: Colors.white, fontWeight: FontWeight.w400), textAlign: TextAlign.center,),
                      ],
                    ),
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
  String Title_text;
  Slide_event({
    required this.id,
    required this.image,
    required this.text,
    required this.Title_text,
});}
