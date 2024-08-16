import {
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddAddressScreen from './AddAddressScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  setShippingMethod,
  setNote,
  setPaymentMethod,
  setAddress,
} from '../redux/CheckoutReducer';
import {useNavigation} from '@react-navigation/native';
import {placeOrder} from '../redux/OrderReducer';

const CheckOutrScreen = () => {
  const route = useRoute();
  const {cart, totalAmount} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const dispatch = useDispatch();
  const {shippingMethod, paymentMethod, address} = useSelector(
    state => state.checkout,
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (shippingMethod === 'Express') {
      setDeliveryCharge(5.0); // Set delivery charge for express delivery
    } else {
      setDeliveryCharge(0); // No delivery charge for normal delivery
    }
  }, [shippingMethod]);

  const handleCheckout = () => {
    if (!address) {
      Alert.alert('Error', 'Please add a shipping address.');
      return;
    }
    if (!shippingMethod) {
      Alert.alert('Error', 'Please select a shipping method.');
      return;
    }
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }

    dispatch(
      placeOrder({
        cart,
        totalAmount: totalAmount + deliveryCharge,
        shippingMethod,
        paymentMethod,
        address,
        orderDate: new Date().toISOString(),
      }),
    );
    navigation.navigate('Confirmation');
  };

  const renderCartItem = ({item}) => (
    <View className="flex-row bg-white rounded-lg p-4 mb-4 shadow">
      <Image source={{uri: item.image}} className="w-20 h-20 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-bold mb-1">{item.name}</Text>
        <Text className="text-base text-gray-500 mb-1">
          {item.colour}, {item.size}
        </Text>
        <Text className="text-lg font-bold mb-1">
          {item.price.currency} {item.price.amount}
        </Text>
        <Text className="text-base text-gray-500">x{item.quantity}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View className="pt-4 px-0">
      <View className="bg-white rounded-lg p-4 mb-4 shadow flex-row justify-between items-center">
        <Pressable onPress={() => setModalVisible(true)}>
          <View className="flex-row items-center">
            <Text className="text-lg font-bold mb-2 mr-2">
              Shipping Address
            </Text>
            <Icon name="add-circle-outline" size={24} color="blue" />
          </View>
        </Pressable>
      </View>
      <View className="bg-gray-200 rounded-lg p-4">
        {address ? (
          <>
            <Text className="text-base text-gray-500 mb-1">
              Receiver: {address.receiverName}
            </Text>
            <Text className="text-base text-gray-500 mb-1">
              Address: {address.completeAddress}
            </Text>
            <Text className="text-base text-gray-500 mb-1">
              City: {address.city}
            </Text>
            <Text className="text-base text-gray-500 mb-1">
              State: {address.state}
            </Text>
            <Text className="text-base text-gray-500 mb-1">
              Landmark: {address.landmark}
            </Text>
            <Text className="text-base text-gray-500 mb-1">
              Phone Number: {address.phoneNumber}
            </Text>
            <Text className="text-base text-gray-500 mb-1">
              Type: {address.addressType}
            </Text>
          </>
        ) : (
          <Text className="text-base text-gray-500 mb-1">
            No address selected
          </Text>
        )}
      </View>
    </View>
  );

  const renderFooter = () => (
    <View className="px-0">
      <View className="bg-white rounded-lg p-4 mb-4 shadow">
        <Text className="text-lg font-bold mb-2">Select Shipping</Text>
        <View className="bg-gray-200 rounded-lg p-4">
          <Pressable
            className={`p-2 ${
              shippingMethod === 'Express' ? 'bg-teal-100' : ''
            }`}
            onPress={() => dispatch(setShippingMethod('Express'))}>
            <Text className="text-base font-bold mb-1">Express</Text>
            <Text className="text-base text-gray-500 mb-1">
              Estimated arrived 9 - 10 August
            </Text>
            <Text className="text-base font-bold">GBP 5.00</Text>
          </Pressable>
        </View>
        <View className="bg-gray-200 rounded-lg p-4 mt-4">
          <Pressable
            className={`p-2 ${
              shippingMethod === 'Normal' ? 'bg-teal-100' : ''
            }`}
            onPress={() => dispatch(setShippingMethod('Normal'))}>
            <Text className="text-base font-bold mb-1">Normal</Text>
            <Text className="text-base text-gray-500 mb-1">
              Estimated arrived 9 - 25 August
            </Text>
            <Text className="text-base font-bold">Free</Text>
          </Pressable>
        </View>
      </View>
      <View className="bg-white rounded-lg p-4 mb-4 shadow">
        <Text className="text-base text-gray-500 mb-1">
          Subtotal, {cart.length} items
        </Text>
        <Text className="text-lg font-bold text-blue-600">
          GBP {totalAmount}
        </Text>
      </View>
      <View className="bg-white rounded-lg p-4 mb-4 shadow">
        <Text className="text-lg font-bold mb-2">Payment Method</Text>
        <View className="flex-row justify-between">
          <Pressable
            className={`flex-1 border border-gray-400 rounded-lg p-4 mr-2 ${
              paymentMethod === 'Cash' ? 'bg-teal-100' : 'bg-gray-200'
            }`}
            onPress={() => dispatch(setPaymentMethod('Cash'))}>
            <Text className="text-base font-bold mb-1">Cash</Text>
            <Text className="text-base text-gray-500">
              Pay cash when the products arrives at the destination.
            </Text>
          </Pressable>
          <Pressable
            className={`flex-1 border border-gray-400 rounded-lg p-4 ${
              paymentMethod === 'Bank Transfer' ? 'bg-teal-100' : 'bg-gray-200'
            }`}
            onPress={() => dispatch(setPaymentMethod('Bank Transfer'))}>
            <Text className="text-base font-bold mb-1">Bank Transfer</Text>
            <Text className="text-base text-gray-500">
              Log in to your online account and make payment.
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 px-4">
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{paddingBottom: 150}}
      />
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-blue-600">
            Total: GBP {totalAmount + deliveryCharge}
          </Text>
          <Pressable
            className="bg-blue-600 rounded-lg py-3 px-6"
            onPress={handleCheckout}>
            <Text className="text-base font-bold text-white">Checkout</Text>
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddAddressScreen
          setModalVisible={setModalVisible}
          setAddress={address => dispatch(setAddress(address))}
        />
      </Modal>
    </View>
  );
};

export default CheckOutrScreen;
