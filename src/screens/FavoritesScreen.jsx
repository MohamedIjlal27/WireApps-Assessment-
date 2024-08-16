import {Text, View, FlatList, Image, Pressable, Alert} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFavorite} from '../redux/FavouriteReducer';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
  selectCartTotal,
} from '../redux/CartReducer';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemoveFavorite = id => {
    dispatch(removeFavorite(id));
  };

  const handleProductPress = item => {
    navigation.navigate('Product', {
      item,
      image: item.mainImage,
      description: item.description,
      colors: item.colour,
    });
  };

  const handleAddToCart = item => {
    dispatch(addToCart({...item, quantity: 1}));
    dispatch(removeFavorite(item.id));
    Alert.alert(
      'Success',
      'Product added to cart successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Cart'),
        },
      ],
      {cancelable: false},
    );
  };

  const renderFavoriteItem = ({item}) => (
    <View className="bg-white rounded-lg shadow-md mb-4 p-4">
      <View className="flex-row items-center">
        <Pressable
          onPress={() => handleProductPress(item)}
          className="flex-1 flex-row items-center">
          <Image
            source={{uri: item.mainImage}}
            className="w-20 h-20 rounded-lg mr-2"
          />
          <View className="flex-1">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-sm text-gray-500">{item.brandName}</Text>
            <Text className="text-lg font-bold text-black">
              {item.price.currency} {item.price.amount}
            </Text>
            <Text className="text-sm text-gray-500">
              Sizes: {item.sizes ? item.sizes.join(', ') : 'N/A'}
            </Text>
            <Text
              className={`text-sm font-bold ${
                item.stockStatus === 'IN STOCK'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}>
              {item.stockStatus}
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => handleAddToCart(item)} className="ml-2">
          <Icon name="cart" size={24} color="blue" />
        </Pressable>
        <Pressable
          onPress={() => handleRemoveFavorite(item.id)}
          className="ml-2">
          <Icon name="heart" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {favorites.length === 0 ? (
        <Text className="text-lg text-gray-500 text-center mt-5">
          No favorite products found.
        </Text>
      ) : (
        <>
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: 20}}
          />
        </>
      )}
    </View>
  );
};

export default FavoritesScreen;
