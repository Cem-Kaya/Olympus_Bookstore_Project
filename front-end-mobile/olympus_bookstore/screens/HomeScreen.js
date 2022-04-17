import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    FlatList,
    Text,
    useColorScheme,
    Image,
    View,
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';


  const mock_books = [
    {
      id: 1,
      name: 'Book1',
      price: '20.99',
      like: true,
      img: require('../src/assests/book1.jpg'),
      about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia neque eros, id auctor risus condimentum a. Suspendisse dignissim elit vitae dictum ornare. Maecenas finibus hendrerit dui sed egestas",

    },
    {
      id: 2,
      name: 'Book2',
      price: '17.99',
      like: false,
      img: require('../src/assests/book2.jpg'),
      about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia neque eros, id auctor risus condimentum a. Suspendisse dignissim elit vitae dictum ornare. Maecenas finibus hendrerit dui sed egestas",

    },
    {
      id: 3,
      name: 'Book3',
      price: '22.99',
      like: false,
      img: require('../src/assests/book3.png'),
      about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia neque eros, id auctor risus condimentum a. Suspendisse dignissim elit vitae dictum ornare. Maecenas finibus hendrerit dui sed egestas",

    },
    {
      id: 4,
      name: 'Book4',
      price: '9.99',
      like: false,
      img: require('../src/assests/book4.jpg'),
      about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia neque eros, id auctor risus condimentum a. Suspendisse dignissim elit vitae dictum ornare. Maecenas finibus hendrerit dui sed egestas",

    },
    {
      id: 5,
      name: 'Book5',
      price: '15.99',
      like: true,
      img: require('../src/assests/book5.jpg'),
      about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia neque eros, id auctor risus condimentum a. Suspendisse dignissim elit vitae dictum ornare. Maecenas finibus hendrerit dui sed egestas",

    }
    
  ];
  const COLORS = {
    white: '#fff',
    dark: '#000',
    red: '#F52A2A',
    light: '#F1F1F1',
    main: '#6745b5',
  };



  const HomeScreen = () => {
    const [catergoryIndex, setCategoryIndex] = React.useState(0);

    const categories = ['POPULAR', 'NEW', 'TOP SELLER', 'TOP RATED'];
  
    const CategoryList = () => {
      return (
        <View style={style.categoryContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setCategoryIndex(index)}>
              <Text
                style={[
                  style.categoryText,
                  catergoryIndex === index && style.categoryTextSelected,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };

    const Card = ({mock_books}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}>
          <View style={style.card}>
            <View style={{alignItems: 'flex-end'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: mock_books.like
                    ? 'rgba(245, 42, 42,0.2)'
                    : 'rgba(0,0,0,0.2) ',
                }}>
                <Icon
                  name="favorite"
                  size={18}
                  color={mock_books.like ? COLORS.red : COLORS.black}
                />
              </View>
            </View>
  
            <View
              style={{
                height: 100,
                alignItems: 'center',
              }}>
              <Image
                source={mock_books.img}
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </View>
  
            <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
              {mock_books.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                ${mock_books.price}
              </Text>
              <View
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: COLORS.main,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>
                  +
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }; 
    return (
      <SafeAreaView
        style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
          <View style={style.searchContainer}>
            <Icon name="search" size={25} style={{marginLeft: 20}} />
            <TextInput placeholder="Search" style={style.input} />
          </View>
          <View style={style.sortBtn}>
            <Icon name="sort" size={30} color={COLORS.white} />
          </View>
        </View>
        <CategoryList />
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={mock_books}
          renderItem={({item}) => {
            return <Card mock_books={item} />;
          }}
        />
      </SafeAreaView>
    );

  } 

  const style = StyleSheet.create({
    categoryContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
    categoryTextSelected: {
      color: COLORS.main,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: COLORS.main,
    },
    card: {
      height: 225,
      backgroundColor: COLORS.light,
      marginHorizontal: 2,
      width: 180,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
    },
    header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchContainer: {
      height: 50,
      backgroundColor: COLORS.light,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      color: COLORS.dark,
    },
    sortBtn: {
      marginLeft: 10,
      height: 50,
      width: 50,
      borderRadius: 10,
      backgroundColor: COLORS.main,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


  export default HomeScreen;