import React from "react";
import { Provider } from "react-native-paper";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "./src/core/theme";
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import Ticket from "./src/components/Ticket";
import { StatusBar } from "react-native";
import plus from './assets/plus.png'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRef } from 'react';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}
export default function App() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Provider theme={theme}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.primary}
        //barStyle={statusBarStyle}
        //showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      {/* <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="LoginScreen" component={LoginScreen} />
          <Tab.Screen name="RegisterScreen" component={RegisterScreen} />
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Ticket" component={Ticket} />
          <Tab.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Tab.Navigator>
      </NavigationContainer> */}

      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            // Floating Tab Bar...
            style: {
              backgroundColor: "white",
              position: "absolute",
              bottom: 40,
              marginHorizontal: 20,
              // Max Height...
              height: 60,
              borderRadius: 10,
              // Shadow...
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowOffset: {
                width: 10,
                height: 10,
              },
              paddingHorizontal: 20,
            },
          }}
        >
          {
            // Tab Screens....
            // Tab ICons....
          }
          <Tab.Screen
            name={"AddItem"}
            component={Dashboard}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="home"
                    size={20}
                    color={focused ? "red" : "gray"}
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
          ></Tab.Screen>

          <Tab.Screen
            name={"Cart"}
            component={Cart}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="search"
                    size={20}
                    color={focused ? "red" : "gray"}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth(),
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          {
            // Extra Tab Screen For Action Button..
          }

          <Tab.Screen
            name={"Home"}
            component={Dashboard}
            options={{
              tabBarIcon: ({ focused }) => (
                <TouchableOpacity>
                  <View
                    style={{
                      width: 55,
                      height: 55,
                      backgroundColor: "red",
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: Platform.OS == "android" ? 50 : 30,
                    }}
                  >
                    <Image
                      source={plus}
                      style={{
                        width: 22,
                        height: 22,
                        tintColor: "white",
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
              ),
            }}
          ></Tab.Screen>

          <Tab.Screen
            name={"Notifications"}
            component={Notification}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="bell"
                    size={20}
                    color={focused ? "red" : "gray"}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          <Tab.Screen
            name={"Profile"}
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="user-alt"
                    size={20}
                    color={focused ? "red" : "gray"}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 4,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>
        </Tab.Navigator>

        <Animated.View
          style={{
            width: getWidth() - 20,
            height: 2,
            backgroundColor: "red",
            position: "absolute",
            bottom: 98,
            // Horizontal Padding = 20...
            left: 50,
            borderRadius: 20,
            transform: [{ translateX: tabOffsetValue }],
          }}
        ></Animated.View>
      </NavigationContainer>
    </Provider>
  );
}
