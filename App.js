import React, { useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { theme } from "./src/core/theme";
import axios from "axios";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  AddItem,
  Cart,
  Notification,
  Profile,
} from "./src/screens";
import MapView from "./src/components/MapView";
import { StatusBar } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";
axios.defaults.baseURL = "http://10.10.89.52/api/";
// axios.defaults.baseURL = "http://192.168.1.101/api/";
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 80;
  return width / 5;
}

const MainNavigator = () => {
  
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                //top: 20,
              }}
            >
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? theme.colors.primary : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="Order Details"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                //top: 20,
              }}
            >
              <FontAwesome5
                name="history"
                size={20}
                color={focused ? theme.colors.primary : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddItem}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                //top: 20,
              }}
            >
              <FontAwesome5
                name="plus-circle"
                size={20}
                color={focused ? theme.colors.primary : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                //top: 20,
              }}
            >
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? theme.colors.primary : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                //top: 20,
              }}
            >
              <FontAwesome5
                name="user-plus"
                size={20}
                color={focused ? theme.colors.primary : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [token, setToken] = useState(null);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setToken(value);
        console.log("Retrieved value:", value);
        return value;
      } else {
        console.log("No data found.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully.");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };
  useEffect(() => {
    storeData("userToken", "user");
    AsyncStorage.getItem("userToken").then((userToken) => {
      console.log("Retrieved value:", userToken);
      setToken(userToken);
    });
  }, []);

  return (
    <Provider theme={theme}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.primary}
        //barStyle={statusBarStyle}
        //showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="LoginScreen"
          initialRouteName={token ? "Main" : "LoginScreen"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
          <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
          <Stack.Screen
            name={"ResetPasswordScreen"}
            component={ResetPasswordScreen}
          />
          {/* {token && <Stack.Screen name={"Main"} component={MainNavigator} />} */}
          {token ? (
            <Stack.Screen name="Main" component={MainNavigator} />
          ) : (
            <Stack.Screen name="StartScreen" component={StartScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
