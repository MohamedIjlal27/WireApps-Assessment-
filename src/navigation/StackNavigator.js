import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AddAddressScreen from '../screens/AddAddressScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import TrackingScreen from '../screens/TrackingScreen';
import CheckOutrScreen from '../screens/CheckOutrScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#000E97'},
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="home" size={24} color="#000E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoritesScreen}
          options={{
            tabBarLabel: 'Wishlist',
            tabBarLabelStyle: {color: '#000E97'},

            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="heart" size={24} color="#000E97" />
              ) : (
                <Ionicons name="heart-outline" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {color: '#000E97'},
            tabBarIcon: ({focused}) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#000E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {color: '#000E97'},
            tabBarIcon: ({focused}) =>
              focused ? (
                <EvilIcons name="user" size={24} color="#000E97" />
              ) : (
                <EvilIcons name="user" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductInfoScreen}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="CheckOut"
          component={CheckOutrScreen}
          options={({navigation}) => ({
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Are you sure you want to leave?',
                    'Added items will be lost',
                    [
                      {
                        text: 'Yes',
                        onPress: () => navigation.navigate('Home'),
                      },
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Tracking"
          component={TrackingScreen}
          options={({navigation}) => ({
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
