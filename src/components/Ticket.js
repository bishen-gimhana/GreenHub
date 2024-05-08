import { useState, useEffect } from "react";
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
// import Button from "./Button";
import { theme } from "../core/theme";
import axios from "axios";

const Ticket = ({
  data,
  onBuyPressHandle,
  onExPressHandle,
  onClickLogo,
  onDoPressHandle,
}) => {
  const [advice, setAdvice] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setAdvice(data);
  });

  const onBuyPress = (id, price, description, type) => {
    onBuyPressHandle(id, price, description, type);
  };

  const onClickUserLogo = (id) => {
    onClickLogo(id);
  };

  const onExPress = (id) => {
    onExPressHandle(id);
  };

  const onDonatePress = (id) => {
    onDoPressHandle(id);
  };

  return (
    <View>
      <Animated.FlatList
        data={advice}
        // onScroll={Animated.event([{ native }])}
        keyExtractor={(item) => item.itemId}
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
                marginBottom: 40,
                backgroundColor: "#97DBAE",
                borderRadius: 16,
                //shadowColor: "#000",
                //shadowOpacity: 0.3,
                // shadowOffset: { width: 0, height: 10 },
                //shadowRadius: 20,
                //elevation: 20,
                opacity: 0.9,
                maxHeight: 270,
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
                      `user/Product/GetImg?imgPath=${item.imgPath}`,
                  }}
                  resizeMode="contain"
                  style={{
                    top: -30,
                    width: 94,
                    height: 94,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: '#ABE9BD'
                  }}
                ></Image>
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
                {item.type == "S" ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      borderRadius: 20,
                      marginRight: 5,
                      height: "30%",
                      width: "20%",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 700 }}>
                      Rs {item.price}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                <TouchableOpacity onPress={() => onClickUserLogo(item.userId)}>
                  <Image
                    source={{
                      uri:
                        axios.getUri() +
                        `Login/GetImg?imgPath=${item.userImage}`,
                    }}
                    resizeMode="contain"
                    style={{
                      width: 59,
                      height: 59,
                      borderRadius: 8,
                    }}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  //backgroundColor: "red",
                  top: -15,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    //backgroundColor: "red",

                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      width: "73%",
                      backgroundColor: "#F7F3E2",
                      padding: 10,
                      borderRadius: 10,
                      marginRight: 5,
                      marginBottom: 10,
                      flexDirection: 'row'
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 400 }}>
                      {item.description}
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 800, marginLeft: 10 }}>
                      {item.qty} Kg
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      alignContent: "flex-end",
                      padding: 3,
                    }}
                  >
                    {item.type == "S" ? (
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#007AFF",
                            padding: 10,
                            borderRadius: 8,
                          }}
                          onPress={() =>
                            onBuyPress(
                              item.itemId,
                              item.price,
                              item.description,
                              item.type
                            )
                          }
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: 16,
                            }}
                          >
                            Buy
                          </Text>
                        </TouchableOpacity>
                        <View style={{ height: 10 }} />
                      </View>
                    ) : item.type == "E" ? (
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#FFCC00",
                            padding: 10,
                            borderRadius: 8,
                          }}
                          onPress={() => onExPress(item.itemId)}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: 13,
                            }}
                          >
                            Exchange
                          </Text>
                        </TouchableOpacity>
                        <View style={{ height: 10 }} />
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: theme.colors.primary,
                            padding: 10,
                            borderRadius: 8,
                          }}
                          onPress={() => onDonatePress(item.itemId)}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: 16,
                            }}
                          >
                            Donate
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    // flex: 1,
                    // backgroundColor:'blue',
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 3,
                    marginBottom: 10,
                    marginRight: 3,
                    // height: 30,
                    //padding: 3,
                  }}
                >
                  <Text
                    style={{
                      // color: "white",
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: 16,
                      backgroundColor: "white",
                      padding: 5,
                      //marginRight: 10,
                      // width:'20%',
                      borderRadius: 10,
                    }}
                  >
                    Ex Date : {item.expireDate}
                  </Text>
                  {/* <TouchableOpacity
                      style={{
                        backgroundColor: theme.colors.primary,
                        padding: 10,
                        borderRadius: 8,
                      }}
                      onPress={() => onExPress(item.itemId)}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: 700,
                          fontSize: 16,
                        }}
                      >
                        Donate
                      </Text>
                    </TouchableOpacity> */}
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: 16,
                      backgroundColor: "white",
                      padding: 5,
                      // marginRight: 10,
                      //  width: "20%",
                      borderRadius: 10,
                    }}
                  >
                    {parseFloat(item.distance.toFixed(2))} Km
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Ticket;
