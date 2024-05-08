import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  Animated,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { theme } from "../core/theme";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

function Cart(props) {
  const [advice, setAdvice] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const getProducts = async () => {
    //   var attendList = (await AsyncStorage.getItem("cartList")) || "[]";
    //   attendList = JSON.parse(attendList);
    //   setAdvice(attendList);
    setSpinnerVisible(true);
    AsyncStorage.getItem("userToken").then((userToken) => {
      console.log(userToken);
      axios({
        method: "get",
        url: `user/Order/GetOrdersByUser?userId=${userToken}`,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          console.log(response.data);
          setAdvice(response.data.result);
        })
        .catch(function (response) {
          console.log(response);
        });
    });
    setSpinnerVisible(false);
  };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, [])
  );
  const getAdvice = () => {
    console.log(advice);
  };

  return (
    <View style={styles.container}>
       <Spinner visible={spinnerVisible} textContent={"Loading.."} />
      <View style={{ flex: 0.1, justifyContent: "center", margin: 10 }}>
        <View
          style={{
            borderWidth: 1,
            borderBottomColor: "#4545",
            width: "70%",
            height: 50,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,

            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            marginTop: "15%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Order Details</Text>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: "5%" }}>
        <Animated.FlatList
          data={advice}
          // onScroll={Animated.event([{ native }])}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            // padding: 20,
            paddingTop: StatusBar.currentHeight || 42,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 10,
                  marginBottom: 10,
                  backgroundColor: "#97DBAE",
                  borderRadius: 16,
                  opacity: 0.9,
                  maxHeight: 200,
                }}
              >
                <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                  <View >
                    <Text style={{ fontSize: 15, fontWeight: 700 }}>
                      Buyer Name: {item.buyerName}
                    </Text>

                    <Text style={{ fontSize: 15, fontWeight: 700 }}>
                      Item Name: {item.itemName}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: 700 }}>
                      Type: {item.type}
                    </Text>

                    <Text style={{ fontSize: 15, fontWeight: 700 }}>
                      Status: {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect: {
    width: 341,
    height: 477,
    backgroundColor: "#E6E6E6",
    marginTop: 85,
    alignSelf: "center",
  },
  orderCart: {
    color: "#121212",
  },
  cupertinoButtonInfo1: {
    height: 44,
    width: 100,
  },
  cupertinoButtonSuccess1: {
    height: 44,
    width: 100,
    marginLeft: 87,
  },
  cupertinoButtonInfo1Row: {
    height: 44,
    flexDirection: "row",
    marginTop: 618,
    marginLeft: 47,
    marginRight: 41,
  },
});

export default Cart;
