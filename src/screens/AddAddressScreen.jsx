import {Text, View, TextInput, Pressable, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateAddressForm,
  addAddress,
  setAddress,
} from '../redux/CheckoutReducer';

const AddAddressScreen = ({setModalVisible}) => {
  const dispatch = useDispatch();
  const {addressForm, addresses} = useSelector(state => state.checkout);

  const handleAddAddress = () => {
    if (
      addressForm.receiverName.trim() &&
      addressForm.completeAddress.trim() &&
      addressForm.city.trim() &&
      addressForm.state.trim() &&
      addressForm.phoneNumber.trim()
    ) {
      dispatch(addAddress(addressForm));
      dispatch(
        updateAddressForm({
          receiverName: '',
          completeAddress: '',
          landmark: '',
          addressType: 'Home',
          phoneNumber: '',
          city: '',
          state: '',
        }),
      );
    }
  };

  const handleSelectAddress = address => {
    dispatch(setAddress(address));
    setModalVisible(false);
  };

  const renderAddressItem = ({item}) => (
    <Pressable
      className="flex-row justify-between items-center p-2 border-b border-gray-300"
      onPress={() => handleSelectAddress(item)}>
      <Text className="text-lg">{item.completeAddress}</Text>
      {addressForm === item && (
        <Icon name="checkmark-circle" size={24} color="green" />
      )}
    </Pressable>
  );

  const renderHeader = () => (
    <View className="w-full p-5 mt-10">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Address details</Text>
        <Pressable onPress={() => setModalVisible(false)}>
          <Icon name="close" size={24} color="black" />
        </Pressable>
      </View>
      <Text className="text-sm text-gray-500 mb-4">
        Complete address would assist better us in serving you
      </Text>
      <View className="flex-row justify-between mb-4">
        <Pressable
          className={`flex-1 items-center p-2 border rounded-lg mr-2 ${
            addressForm.addressType === 'Home'
              ? 'border-blue-500'
              : 'border-gray-300'
          }`}
          onPress={() => dispatch(updateAddressForm({addressType: 'Home'}))}>
          <Icon name="home" size={24} color="blue" />
          <Text className="text-sm">Home</Text>
        </Pressable>
        <Pressable
          className={`flex-1 items-center p-2 border rounded-lg mr-2 ${
            addressForm.addressType === 'Office'
              ? 'border-blue-500'
              : 'border-gray-300'
          }`}
          onPress={() => dispatch(updateAddressForm({addressType: 'Office'}))}>
          <Icon name="briefcase" size={24} color="blue" />
          <Text className="text-sm">Office</Text>
        </Pressable>
      </View>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Receiver's name *"
        value={addressForm.receiverName}
        onChangeText={text => dispatch(updateAddressForm({receiverName: text}))}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Complete address *"
        value={addressForm.completeAddress}
        onChangeText={text =>
          dispatch(updateAddressForm({completeAddress: text}))
        }
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="City *"
        value={addressForm.city}
        onChangeText={text => dispatch(updateAddressForm({city: text}))}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="State *"
        value={addressForm.state}
        onChangeText={text => dispatch(updateAddressForm({state: text}))}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Nearby Landmark (optional)"
        value={addressForm.landmark}
        onChangeText={text => dispatch(updateAddressForm({landmark: text}))}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Phone Number *"
        value={addressForm.phoneNumber}
        onChangeText={text => dispatch(updateAddressForm({phoneNumber: text}))}
        keyboardType="numeric"
        maxLength={10}
      />
      <Pressable
        className="bg-blue-500 p-4 rounded-lg mb-4"
        onPress={handleAddAddress}>
        <Text className="text-white font-bold text-center">Save address</Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={addresses}
      renderItem={renderAddressItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{paddingBottom: 20}}
    />
  );
};

export default AddAddressScreen;
