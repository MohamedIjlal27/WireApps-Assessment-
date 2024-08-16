import {Text, View, Pressable, Alert, Image} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {cleanCart} from '../redux/CartReducer';

const ConfirmationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {cart, totalAmount, shippingMethod, paymentMethod, address} =
    useSelector(state => state.order.orders[state.order.orders.length - 1]);

  const handlePlaceOrder = () => {
    dispatch(cleanCart());
    Alert.alert('Order Placed', 'Your order has been placed successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Tracking'),
      },
    ]);
  };

  return (
    <View className="flex-1 p-4 pt-20">
      <Text className="text-2xl font-bold mb-4">Order Confirmation</Text>
      <View className="bg-white rounded-lg p-4 mb-4 shadow">
        <Text className="text-lg font-bold mb-2">Order Details</Text>
        {cart.map(item => (
          <View key={item.id} className="flex-row justify-between mb-2">
            <Image
              source={{uri: item.image}}
              className="w-20 h-20 rounded-lg mr-4"
            />
            <View className="flex-1">
              <Text>
                {item.name} x{item.quantity}
              </Text>
              <Text>
                {item.price.currency} {item.price.amount * item.quantity}
              </Text>
            </View>
          </View>
        ))}
        <Text className="text-lg font-bold mt-2">Total: GBP {totalAmount}</Text>
        <Text className="text-lg font-bold mb-2">Shipping Method</Text>
        <Text>{shippingMethod}</Text>
        <Text className="text-lg font-bold mb-2">Payment Method</Text>
        <Text>{paymentMethod}</Text>
        <Text className="text-lg font-bold mb-2">Shipping Address</Text>
        <Text>{address.receiverName}</Text>
        <Text>{address.completeAddress}</Text>
        <Text>
          {address.city}, {address.state}
        </Text>
        <Text>{address.phoneNumber}</Text>
      </View>
      <Pressable
        className="bg-blue-600 rounded-lg py-3 px-6 items-center"
        onPress={handlePlaceOrder}>
        <Text className="text-base font-bold text-white">Place Order</Text>
      </Pressable>
    </View>
  );
};

export default ConfirmationScreen;
