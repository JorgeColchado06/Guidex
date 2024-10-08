import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import MapView, { Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationBar from '../components/navigationBar';

export default function MapScreen() {
  const [location, setLocation] = useState({
    latitude: 24.0232,
    longitude: -104.6759,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    })();
  }, []);

  const handlePlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;
    setLocation({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-black">

          <MapView 
            style={{ flex: 1 }}
            region={location}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="You"
            />
          </MapView>
          
          <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          extraHeight={150}
          enableOnAndroid={true}
        >
        <ScrollView>  
          <View className="bg-[#121111] p-4">
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              onPress={handlePlaceSelect}
              query={{
                key: 'AIzaSyDddURt1vWEhQN0cfCe2wUf9LPaaHJNdIU',
                language: 'en',
              }}
              onSubmitEditing={handlePlaceSelect} // Maneja la búsqueda al presionar "Intro"
              styles={{
                textInputContainer: {
                  paddingHorizontal: 0,
                },
                textInput: {
                  backgroundColor: '#333',
                  color: '#fff',
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />

            <View className="mt-4">
              <View className="flex-row justify-between mb-4">
                <Text className="text-white">Recents</Text>
                <Text className="text-gray-400">Popular</Text>
              </View>

              <TouchableOpacity className="bg-[#232323] rounded-xl p-4 mb-4">
                <Text className="text-white text-lg">Paseo Durango</Text>
                <Text className="text-gray-400">Victoria De Durango, Durango - 4 km</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-[#232323] rounded-xl p-4">
                <Text className="text-white text-lg">Central Camionera</Text>
                <Text className="text-gray-400">Col del Maestro, 34240 Durango, Dgo - 2 km</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        </KeyboardAwareScrollView>
        <NavigationBar/>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
