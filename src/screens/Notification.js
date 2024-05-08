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
import React, { useState, useEffect } from "react";
import { theme } from "../core/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog1 from "react-native-dialog";
import { UserProfile } from "../screens";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
const Notification = () => {
  const [advice, setAdvice] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      setSpinnerVisible(true);
      getNotification();
    }, [])
  );



  const showDialog = (id) => {
    setSelectedId(id);
    setVisible(true);
  };

  const getNotification = async () => {
    AsyncStorage.getItem("userToken").then((userToken) => {
      try {
        axios({
          method: "GET",
          url: `user/Notification/GetNotifications?receiverId=${userToken}`,
        })
          .then(function (response) {
            console.log(response.data.result);
            setAdvice(response.data.result);
          })
          .catch(function (response) {
            console.log(response);
          });
      } catch (error) {
        console.log("Upload error:", error);
      }
    });
    setSpinnerVisible(false);
  };

  const acceptNotification = async (notiId) => {
    try {
      axios({
        method: "POST",
        url: `user/Notification/acceptNotification?notificationId=${notiId}`,
      })
        .then(function (response) {
          console.log(response.data);
          getNotification();
        })
        .catch(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const rejectNotification = async (notiId) => {
    try {
      axios({
        method: "POST",
        url: `user/Notification/rejectNotification?notificationId=${notiId}`,
      })
        .then(function (response) {
          console.log(response.data);
          getNotification();
        })
        .catch(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.log("Upload error:", error);
    }
  };
  const getAdvice = () => {
    console.log(advice);
  };
  return (
    <View>
      <Spinner visible={spinnerVisible} textContent={"Loading.."} />
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
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Notification</Text>
      </View>
      <Animated.FlatList
        data={advice}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
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
                marginBottom: 40,
                backgroundColor: "#97DBAE",
                borderRadius: 16,
                opacity: 0.9,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{
                    uri:
                      axios.getUri() +
                      `user/Product/GetImg?imgPath=${item.itemImg}`,
                  }}
                  resizeMode="contain"
                  style={{
                    top: -30,
                    width: 94,
                    height: 94,
                    borderRadius: 18,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                    marginLeft: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>
                    {item.itemName}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    marginRight: 5,
                    height: "30%",
                    width: "40%",
                  }}
                >
                  <TouchableOpacity
                  onPress={() => {
                    setSelectedId(item.sellerId);
                    setProfileVisible(true);
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: 700 }}>
                    Get Seller Details
                  </Text>
                  {/* <Image
                    source={{
                      uri:
                        axios.getUri() +
                        `user/Product/GetImg?imgPath=${item.itemImg}`,
                    }}
                    resizeMode="cover"
                    style={{
                      width: 59,
                      height: 59,
                      borderRadius: 8,
                    }}
                  ></Image> */}
                </TouchableOpacity>
                </View>
                {/* {console.log(item.userId)} */}
               
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  top: -25,
                  borderRadius: 10,
                  position: "relative", // add this property
                }}
              >
                <View
                  style={{
                    width: "75%",
                    backgroundColor: "#F7F3E2",
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: 700 }}>
                    {item.description}
                  </Text>
                </View>
              </View>

              {item.type == "N" ? (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    //  backgroundColor: "red",
                    alignSelf: "center",
                    // position: "absolute",
                    bottom: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007AFF",
                      padding: 10,
                      borderRadius: 8,
                      width: "25%",
                    }}
                    // onPress={acceptNotification}
                    onPress={() => acceptNotification(item.id)}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FFCC00",
                      padding: 10,
                      borderRadius: 8,
                      width: "25%",
                    }}
                    // onPress={rejectNotification}
                    onPress={() => rejectNotification(item.id)}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                       Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
            </View>
          );
        }}
      />
      <Dialog1.Container
        visible={profileVisible}
        onBackdropPress={() => setProfileVisible(false)}
        contentStyle={{ width: 350 }}
      >
        <Dialog1.Title>Informations</Dialog1.Title>
        <View
          style={
            {
              //flex:1,
              //flexDirection: "row",
              // justifyContent:'center',
              //alignItems: "center",
              // padding:10
            }
          }
        >
          <UserProfile id={selectedId}></UserProfile>
        </View>
        <Dialog1.Button
          label="Close"
          onPress={() => setProfileVisible(false)}
        />
      </Dialog1.Container>
    </View>
  );
};
export default Notification;
