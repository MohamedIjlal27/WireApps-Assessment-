import {Text, View, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const TrackingScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold mb-4">Tracking Screen</Text>
      <Text>Your order is on the way!</Text>
    </View>
  );
};

export default TrackingScreen;
