import '../utils/jsonParse/previewBooks.dart';

sortFuncs (bool ascending, String selected, List <PreviewBooks> list) { //not work properly

  if (selected == "Name") {
    if (ascending){
      list!.sort((a, b) => a.title!.compareTo(b.title!));
    }
    else {
      list!.sort((b, a) => a.title!.compareTo(b.title!));
    }

  }
  else if (selected == "Release Date") {
    list!.sort((a, b) => a.releaseDate!.compareTo(b.releaseDate!));
  }
  else if (selected == "Rating") {
    list!.sort((b, a) => a.raiting!.compareTo(b.raiting!));
  }
  else if (selected == "Most Sold") {
    list!.sort((b, a) => a.amountSold!.compareTo(b.amountSold!));
  }
  else {
    list!.sort((a, b) => a.id!.compareTo(b.id!));
  }

}