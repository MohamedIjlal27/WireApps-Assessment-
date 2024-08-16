import {
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
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

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  const totalAmount = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});

  const handleRemoveProduct = item => {
    dispatch(removeFromCart(item));
  };

  const handleIncrementQuantity = item => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrementQuantity = item => {
    dispatch(decrementQuantity(item));
  };

  const handleCheckOut = () => {
    const selectedCartItems = cart.filter(item => selectedItems[item.id]);
    if (selectedCartItems.length === 0) {
      Alert.alert('No items selected', 'Please select items to checkout.');
      return;
    }
    navigation.navigate('CheckOut', {
      cart: selectedCartItems,
      totalAmount:
        selectedCartItems.reduce(
          (total, item) => total + item.price.amount * item.quantity,
          0,
        ) - discount,
    });
    dispatch(cleanCart());
  };

  const handleApplyCoupon = () => {
    if (coupon === 'WELCOME500') {
      setCouponApplied(true);
      setCouponMessage('"WELCOME500" coupon has been applied successfully');
      setDiscount(500);
    } else {
      setCouponApplied(false);
      setCouponMessage('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handleClearCoupon = () => {
    setCoupon('');
    setCouponApplied(false);
    setCouponMessage('');
    setDiscount(0);
  };

  const handleSelectItem = itemId => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const renderCartItem = ({item}) => (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
      <View className="flex-row items-center">
        <CheckBox
          value={!!selectedItems[item.id]}
          onValueChange={() => handleSelectItem(item.id)}
          style={{width: 20, height: 20}}
        />
        <Image
          source={{uri: item.mainImage}}
          className="w-20 h-20 rounded-lg mr-4 ml-2.5"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <Text className="text-base text-gray-600 mb-1">
            Color: {item.colour}
          </Text>
          <Text className="text-base text-gray-600 mb-1">
            Size: {item.size}
          </Text>
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {item.price.currency} {item.price.amount}
          </Text>
        </View>
        <Pressable className="ml-4" onPress={() => handleRemoveProduct(item)}>
          <Icon name="close" size={24} color="red" />
        </Pressable>
      </View>
      <View className="flex-row items-center mt-2">
        <Pressable
          className="bg-blue-500 p-2 rounded-lg"
          onPress={() => handleDecrementQuantity(item)}>
          <Text className="text-white text-lg">-</Text>
        </Pressable>
        <Text className="text-base text-gray-600 mx-2">{item.quantity}</Text>
        <Pressable
          className="bg-blue-500 p-2 rounded-lg"
          onPress={() => handleIncrementQuantity(item)}>
          <Text className="text-white text-lg">+</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        {cart.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-800 text-center mb-4">
              No products in the cart.
            </Text>
            <Pressable
              className="bg-blue-500 p-4 rounded-lg"
              onPress={() => navigation.navigate('Home')}>
              <Text className="text-white text-center text-lg">
                Add to Cart
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={item => `${item.id}-${item.colour}-${item.size}`}
              numColumns={1}
              contentContainerStyle={{paddingBottom: 20}}
            />
            <View className="bg-white p-4 rounded-lg shadow-md mt-4">
              <TextInput
                className="border border-gray-300 p-2 rounded-lg mb-2"
                placeholder="Enter coupon code"
                value={coupon}
                onChangeText={setCoupon}
              />
              <Pressable
                className="bg-blue-500 p-2 rounded-lg mb-5"
                onPress={handleApplyCoupon}>
                <Text className="text-white text-center">Apply Coupon</Text>
              </Pressable>
              {couponApplied && (
                <Pressable
                  className="bg-red-500 p-2 rounded-lg mb-2"
                  onPress={handleClearCoupon}>
                  <Text className="text-white text-center">Clear Coupon</Text>
                </Pressable>
              )}
              {couponMessage !== '' && (
                <Text className="text-center text-gray-800 mb-2">
                  {couponMessage}
                </Text>
              )}
              <Text className="text-lg font-bold text-gray-800">
                Total: GBP {totalAmount - discount}
              </Text>
              <Pressable
                className="bg-blue-500 p-4 rounded-lg mt-4"
                onPress={handleCheckOut}>
                <Text className="text-white text-center text-lg">
                  Check Out
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default CartScreen;
