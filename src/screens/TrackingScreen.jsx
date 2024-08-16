import {Text, View} from 'react-native';
import React from 'react';

const TrackingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold mb-4">Tracking Screen</Text>
      <Text>Your order is on the way!</Text>
    </View>
  );
};

export default TrackingScreen;
