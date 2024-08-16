import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  Pressable,
  Dimensions,
  Image,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/CartReducer';
import {addFavorite, removeFavorite} from '../redux/FavouriteReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductInfoScreen = () => {
  const route = useRoute();
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();

  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const height = (width * 100) / 100;

  const dispatch = useDispatch();

  const addItemToCart = item => {
    if (!selectedColour || !selectedSize) {
      Alert.alert('Error', 'Please select a color and size.');
      return;
    }
    setAddedToCart(true);
    dispatch(
      addToCart({
        ...item,
        colour: selectedColour,
        size: selectedSize,
        quantity,
        image,
      }),
    );
    Alert.alert('Product Added', 'Do you want to shop more or check out?', [
      {
        text: 'Shop More',
        onPress: () => navigation.navigate('HomeScreen'),
      },
      {
        text: 'Check Out',
        onPress: () => navigation.navigate('Cart'),
      },
    ]);
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const incrementQty = () => {
    setQuantity(prevQty => prevQty + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1);
    }
  };

  const cart = useSelector(state => state.cart.cart);
  const favorites = useSelector(state => state.favorites.items);

  const {item, image, description, colors} = route.params;

  const displayColors =
    colors === 'multicoloured' ? ['red', 'blue', 'black', 'gray'] : [colors];

  const isFavorite = favorites.some(fav => fav.id === item.id);

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const getBorderColor = color => {
    if (color === 'blue') return 'black';
    if (color === 'gray') return 'blue';
    if (color === 'black') return 'red';
    return 'black';
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white p-3 flex-row items-center justify-between">
        <Pressable onPress={handleFavoritePress}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : 'black'}
          />
        </Pressable>
      </View>

      <ScrollView className="flex-1">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.carouselImages && item.carouselImages.length > 0
            ? item.carouselImages.map((image, index) => (
                <Pressable key={index} onPress={() => setModalVisible(true)}>
                  <ImageBackground
                    resizeMode="contain"
                    style={{width: width, height: height, marginTop: 24}}
                    source={{uri: image}}
                    key={index}>
                    <View className="p-2 flex-row items-center justify-between">
                      <View className="w-10 h-10 rounded-full bg-red-700 justify-center items-center flex-row">
                        <Text className="text-white text-center font-semibold text-xs">
                          20% offer
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </Pressable>
              ))
            : null}
        </ScrollView>

        <View className="p-4">
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              source={{uri: image}}
              style={{width: '100%', height: 160, borderRadius: 8}}
              resizeMode="contain"
            />
          </Pressable>
          <Text className="text-xl font-bold mt-4">{item.name}</Text>
          <Text className="text-lg text-gray-500">{item.brandName}</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-2xl font-bold text-green-600">
              {item.price.currency} {item.price.amount}
            </Text>
            <Text className="text-lg text-gray-500 line-through ml-2">
              {item.price.currency} {item.price.amount}
            </Text>
          </View>
          <Text className="text-lg text-green-600 mt-1">
            {item.stockStatus}
          </Text>
          <View className="bg-yellow-100 p-4 rounded-lg mt-4">
            <Text className="text-yellow-800 font-bold">Free Delivery</Text>
            <Text className="text-yellow-800">Within 2 Days</Text>
          </View>
          <Text className="text-lg font-bold mt-4">Select Colour</Text>
          <View className="flex-row mt-2">
            {displayColors.length > 0 ? (
              displayColors.map((color, index) => (
                <Pressable
                  key={index}
                  className={`w-8 h-8 rounded-full mr-2 ${
                    selectedColour === color ? 'border-2' : ''
                  }`}
                  style={{
                    backgroundColor: color,
                    borderColor:
                      selectedColour === color
                        ? getBorderColor(color)
                        : 'transparent',
                  }}
                  onPress={() => setSelectedColour(color)}
                />
              ))
            ) : (
              <Text>No colors available</Text>
            )}
          </View>
          <Text className="text-lg font-bold mt-4">Select your size</Text>
          <View className="flex-row mt-2">
            {item.sizes && item.sizes.length > 0 ? (
              item.sizes.map((size, index) => (
                <Pressable
                  key={index}
                  className={`w-8 h-8 rounded-full mr-2 flex items-center justify-center ${
                    selectedSize === size ? 'border-2 border-black' : 'border'
                  }`}
                  onPress={() => setSelectedSize(size)}>
                  <Text>{size}</Text>
                </Pressable>
              ))
            ) : (
              <Text>No sizes available</Text>
            )}
          </View>
          <Text className="text-lg font-bold mt-4">Description</Text>
          <Text className="text-base text-gray-700 mb-20">{description}</Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between p-4 bg-white shadow-lg">
        <View className="flex-row items-center">
          <Pressable
            className="bg-gray-200 p-2 rounded-full"
            onPress={decrementQty}>
            <AntDesign name="minus" size={20} color="black" />
          </Pressable>
          <Text className="mx-4 text-lg">{quantity}</Text>
          <Pressable
            className="bg-gray-200 p-2 rounded-full"
            onPress={incrementQty}>
            <AntDesign name="plus" size={20} color="black" />
          </Pressable>
        </View>
        <Pressable
          onPress={() => addItemToCart(item)}
          className="bg-blue-500 p-4 rounded-full flex-1 ml-4">
          <Text className="text-white text-center text-lg">Add to Cart</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-75">
          <Pressable
            className="absolute top-10 right-10"
            onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="close" size={30} color="white" />
          </Pressable>
          <Image
            source={{uri: image}}
            style={{width: '90%', height: '75%', borderRadius: 8}}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
