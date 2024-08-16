import React, {
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useEffect, useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {UserType} from '../UserContext';
import {useNavigation} from '@react-navigation/native';
import {addFavorite, removeFavorite} from '../redux/FavouriteReducer';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [newestProducts, setNewestProducts] = useState([]);
  const [categories, setCategories] = useState([{id: '1', name: 'ALL'}]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const {userId} = useContext(UserType);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector(state => state.favorites.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json',
        );
        if (response.data.result === 'success') {
          const products = response.data.data;
          setProducts(products);
          setFilteredProducts(products);

          const productCategories = products.reduce((acc, product) => {
            if (product.category && !acc.includes(product.category)) {
              acc.push(product.category);
            }
            return acc;
          }, []);

          setCategories([
            {id: '1', name: 'ALL'},
            ...productCategories.map((category, index) => ({
              id: (index + 2).toString(),
              name: category,
            })),
          ]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'ALL' || product.category === selectedCategory),
    );
    setFilteredProducts(filtered);

    const halfIndex = Math.ceil(filtered.length / 2);
    setPopularProducts(filtered.slice(0, halfIndex));
    setNewestProducts(filtered.slice(halfIndex));
  }, [searchQuery, products, selectedCategory]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleProductPress = item => {
    navigation.navigate('Product', {
      item,
      image: item.mainImage,
      description: item.description,
      colors: item.colour,
    });
  };

  const handleFavoritePress = item => {
    if (favorites.some(fav => fav.id === item.id)) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const renderProduct = ({item}) => (
    <Pressable onPress={() => handleProductPress(item)}>
      <View
        key={item.id}
        className="bg-white rounded-lg shadow-md mb-2 mx-1.5 w-36 h-60 flex-col justify-between relative">
        <Image
          source={{uri: item.mainImage}}
          className="w-full h-24 rounded-t-lg"
        />
        <View className="p-2 flex-1">
          <Text className="text-lg font-bold">
            {truncateText(item.name, 20)}
          </Text>
          <Text className="text-xs text-gray-500">
            {truncateText(item.brandName, 15)}
          </Text>
          <Text className="text-lg font-bold text-black">
            {item.price.currency} {item.price.amount}
          </Text>
          <Text className="text-xs text-gray-500">
            Sizes: {item.sizes ? item.sizes.join(', ') : 'N/A'}
          </Text>
          <Text
            className={`text-xs font-bold ${
              item.stockStatus === 'IN STOCK'
                ? 'text-green-500'
                : 'text-red-500'
            }`}>
            {item.stockStatus}
          </Text>
        </View>
        <Pressable
          className="absolute top-2 right-2"
          onPress={() => handleFavoritePress(item)}>
          <Icon
            name={
              favorites.some(fav => fav.id === item.id)
                ? 'heart'
                : 'heart-outline'
            }
            size={24}
            color="red"
          />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pl-5 pr-5 pt-2 bg-white flex-row justify-between items-center"></View>

      <View className="px-5 pb-5 mt-5 bg-white flex-row items-center">
        <View className="flex-row items-center bg-gray-200 p-2 rounded-full flex-1">
          <Icon name="search" size={20} color="gray" className="mr-2" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for products..."
            className="flex-1"
          />
          <Icon name="mic-outline" size={20} color="gray" className="ml-2" />
        </View>
        <Pressable className="bg-blue-900 p-2 rounded-full ml-2">
          <Icon name="options-outline" size={20} color="white" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{padding: 10}}>
        <View className="mb-5">
          <Image
            source={require('../assets/shoe-sale-banner-vector.jpg')}
            className="w-full h-36 rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View className="mb-5">
          <Text className="text-xl font-bold mb-2">Popular Products</Text>
          <FlatList
            data={popularProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 5}}
          />
        </View>

        <View className="mb-5">
          <Text className="text-xl font-bold mb-2">Newest Products</Text>
          <FlatList
            data={newestProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 5}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
