import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
const MapScreen = ({ data }) => {
  const { width, height } = Dimensions.get("window");
  const [locations, setLocations] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    getCurrentLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {data.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(location.lng),
              longitude: parseFloat(location.lat),
            }}
            title={location.itemName}
            description={location.description}
          >
            <Image
             source={{
              uri: axios.getUri() + `user/Product/GetImg?imgPath=${location.imgPath}`,
            }}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
