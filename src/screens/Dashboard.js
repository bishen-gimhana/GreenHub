import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import Ticket from "../components/Ticket";
import Background from "../components/Background";
import { UserProfile } from "../screens";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../core/theme";
import axios from "axios";
import * as Location from "expo-location";
import Dialog1 from "react-native-dialog";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreditCardInput } from "react-native-credit-card-input";
import Button from "../components/Button";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";

export default function Dashboard() {
  const [advice, setAdvice] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [loaderText, setLoaderText] = useState("Loading");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpirationYear, setExpirationYear] = useState("");
  const [cardExpirationMonth, setCardExpirationMonth] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [buyItemDetails, setbuyItemDetails] = useState({});
  const [des, setDes] = useState("");
  const [pickUpDesc, setPickUpDesc] = useState("");
  const [timePickerMode, settimePickerMode] = useState("date");
  const [SelectedViewDate,setSelectedViewDate]= useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleC, setCVisible] = useState(false);

  const [cardData, setCardData] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      setSpinnerVisible(true);
      const getCurrentLocation = async () => {
        console.log("focus");
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.error("Location permission denied");
            return;
          }
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;

          const parsedLatitude = parseFloat(latitude);
          const parsedLongitude = parseFloat(longitude);

          setLat(parsedLatitude);
          setLon(parsedLongitude);
          getProducts("All", longitude, latitude);
        } catch (error) {
          console.error("Error getting user location:", error);
        }
      };
      setSpinnerVisible(false);
      getCurrentLocation();
    }, [])
  );

  const getProductsBySearchParam = async (txt) => {
    try {
      const response = await axios.get(
        `user/Product/SearchProducts?SearchParam=${txt}&longtitute=${lat}&latitute=${lon}`
      );
      onChangeText("");
      setAdvice(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };


  const handleCardChange = (cardData) => {
    setCardData(cardData);
    setCardHolderName(cardData.values.name);
    setCardNumber(cardData.values.number.replace(/ /g, ""));
    setExpirationYear(cardData.values.expiry.split("/")[1]);
    setCardExpirationMonth(cardData.values.expiry.split("/")[0]);
    setCardCVC(cardData.values.cvc);
  };

  const showToast = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Payment Receieved Successfully !!",
      button: "close",
      autoClose: 20,
    });
  };

  const showDialog = (id) => {
    setSelectedId(id);
    setVisible(true);
    console.log(id);
  };

  const doDonateEvnt = (id) => {
    handleDonate(id);
  };

  const buyBtnHandle = async (id, price, description, type) => {
    setLoaderText("Payment Processing!!");
    
    const loginToken = await AsyncStorage.getItem("stripeuserToken");
    const usertoken = await AsyncStorage.getItem("userToken");
    const userName = await AsyncStorage.getItem("userName");

    if (loginToken != null) {
      setSpinnerVisible(true);
      try {
        let data = JSON.stringify({
          customerId: loginToken,
          receiptEmail: "test@gmail.com",
          description: description,
          currency: "usd",
          amount: price,
        });
console.log(data);
        axios({
          method: "POST",
          url: "Stripe/AddStripePayment/payment/add",
          data: data,
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            axios({
              method: "POST",
              url: `user/Order/BuyExchangeDonateProduct?ItemId=${id}&buyerId=${usertoken}&stype=${type}&paymentid=${response.data.paymentId}`,
              headers: { "Content-Type": "application/json" },
            })
              .then(function (response) {
                setSpinnerVisible(false);
                showToast();
                getProducts("All", lon, lat);
              })
              .catch(function (response) {
                console.log(" A "+response)
                alert("Error!, Please check again");
              });
          })
          .catch(function (response) {
            console.log(" B "+response)
            alert("Error!, Please check again");
          });
      } catch (error) {
        console.log("Upload error:", error);
      }
    } else {
      let data = {
        id: id,
        price: price,
        description: description,
        type: type,
      };

      setbuyItemDetails(data);
      setCVisible(true);
    }
  };

  const handlePay = async () => {
    setCVisible(false);
    //setSpinnerVisible(true);
    const usertoken = await AsyncStorage.getItem("userToken");
    const userName = await AsyncStorage.getItem("userName");

    let data = {
      email: "testmail@gmail.com",
      name: userName,
      userId: usertoken,
      creditCard: {
        name: userName,
        cardNumber: cardNumber,
        expirationYear: cardExpirationYear,
        expirationMonth: cardExpirationMonth,
        cvc: cardCVC,
      },
    };
    axios({
      method: "POST",
      url: `Stripe/AddStripeCustomer/customer/add`,
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then(function (response) {
        let data = {
          customerId: response.data.customerId,
          receiptEmail: "test@gmail.com",
          description: buyItemDetails.description,
          currency: "usd",
          amount: buyItemDetails.price,
        };
        //storeData("stripeuserToken", data.customerId);
        axios({
          method: "post",
          url: "Stripe/AddStripePayment/payment/add",
          data: data,
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            axios({
              method: "POST",
              url: `user/Order/BuyExchangeDonateProduct?ItemId=${buyItemDetails.id}&buyerId=${usertoken}&stype=${buyItemDetails.type}&paymentid=${response.data.paymentId}`,
              headers: { "Content-Type": "application/json" },
            })
              .then(function (response) {
                setSpinnerVisible(false);
                showToast();
              })
              .catch(function (response) {
                alert("Error!, Please check again");
              });

            //  alert("User Successfully Registed");
          })
          .catch(function (response) {
            alert("Error!, Please check again");
          });
      })
      .catch(function (response) {
        alert("Error!, Please check again");
      });

    setVisible(false);
  };

  const handlePicktimeSet = async () => {
    // setLoaderText("Processing!!");
    // setSpinnerVisible(true);
console.log(pickUpDesc);
    var pickupdate = new Date(selectedDate);
    var nowDate = new Date();
    console.log(selectedDate);
    console.log(nowDate);
    console.log(Math.abs(pickupdate - nowDate));
    setTimeout(
      function () {
        axios({
          method: "POST",
          url: `user/Order/ReverseOrder?ItemId=${selectedId}`,
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            getProducts("All", lon, lat);
          })
          .catch(function (response) {
            alert("Error!, Please check again");
          });
      }.bind(this),
      Math.abs(pickupdate - nowDate)
    );

    setVisible(false);
    await axios
      .get(`user/Product/getproductbyid?productid=${selectedId}`)
      .then((res) => {
        AsyncStorage.getItem("cartList")
          .then((cartItemList) => {
            // Check if cartItemList is a valid JSON string
            const parsedCartItemList = JSON.parse(cartItemList || "[]");
            const updatedCartItemList = [
              ...parsedCartItemList,
              res.data.result,
            ];
            AsyncStorage.setItem(
              "cartList",
              JSON.stringify(updatedCartItemList)
            )
              .then(async () => {
                const usertoken = await AsyncStorage.getItem("userToken");

                axios({
                  method: "POST",
                  url: `user/Order/BuyExchangeDonateProduct?ItemId=${selectedId}&buyerId=${usertoken}&stype=E`,
                  headers: { "Content-Type": "application/json" },
                })
                  .then(function (response) {
                    let data = {
                      SellerId: usertoken,
                      ItemId: selectedId,
                      Description: pickUpDesc,
                      BuyerId: res.data.result.userId
                      
                    };

                    axios({
                      method: "POST",
                      url: `user/Notification/PostNotification`,
                      data: data,
                      headers: { "Content-Type": "application/json" },
                    })
                      .then(function (response) {
                        setSpinnerVisible(false);
                        if (response.data.statusCode === 200) {
                          alert("Exchange Successfully");
                          getProducts("All", lon, lat);
                        } else {
                          console.log(response.data);
                          alert("Error!, Please check again");
                        }
                      })
                      .catch(function (response) {
                        alert("Error!, Please check again");
                      });
                  })
                  .catch(function (response) {
                    alert("Error!, Please check again");
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDonate = async (id) => {
    setLoaderText("Processing!!");
    setSpinnerVisible(true);

    await axios
      .get(`user/Product/getproductbyid?productid=${id}`)
      .then((res) => {
        AsyncStorage.getItem("cartList")
          .then((cartItemList) => {
            // Check if cartItemList is a valid JSON string
            const parsedCartItemList = JSON.parse(cartItemList || "[]");
            const updatedCartItemList = [
              ...parsedCartItemList,
              res.data.result,
            ];
            AsyncStorage.setItem(
              "cartList",
              JSON.stringify(updatedCartItemList)
            )
              .then(async () => {
                const usertoken = await AsyncStorage.getItem("userToken");

                axios({
                  method: "POST",
                  url: `user/Order/BuyExchangeDonateProduct?ItemId=${id}&buyerId=${usertoken}&stype=E`,
                  headers: { "Content-Type": "application/json" },
                })
                  .then(function (response) {
                    let data = {
                      SellerId: res.data.result.userId,
                      ItemId: id,
                      Description: "Donated",
                      BuyerId: usertoken,
                    };

                    axios({
                      method: "POST",
                      url: `user/Notification/PostNotification`,
                      data: data,
                      headers: { "Content-Type": "application/json" },
                    })
                      .then(function (response) {
                        setSpinnerVisible(false);
                        if (response.data.statusCode === 200) {
                          alert("Opatarion Successfully");
                          getProducts("All", lon, lat);
                        } else {
                          console.log(response.data);
                          alert("Error!, Please check again");
                        }
                      })
                      .catch(function (response) {
                        alert("Error!, Please check again");
                      });
                  })
                  .catch(function (response) {
                    alert("Error!, Please check again");
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = async (type, long, lat) => {
    await axios
      .get(
        `user/Product/GetProducts?type=${type}&longtitute=${lat}&latitute=${long}`
      )
      .then((res) => {
        setSpinnerVisible(false);
        setAdvice(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   setSpinnerVisible(true);
  //   const getCurrentLocation = async () => {
  //     try {
  //       const { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         console.error("Location permission denied");
  //         return;
  //       }
  //       const location = await Location.getCurrentPositionAsync({});
  //       const { latitude, longitude } = location.coords;

  //       const parsedLatitude = parseFloat(latitude);
  //       const parsedLongitude = parseFloat(longitude);

  //       setLat(parsedLatitude);
  //       setLon(parsedLongitude);

  //       getProducts("All", longitude, latitude);
  //     } catch (error) {
  //       console.error("Error getting user location:", error);
  //     }
  //   };

  //   getCurrentLocation();
  // }, []);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const showUserProfile = (id) => {
    setProfileVisible(true);
    setSelectedUser(id );
    console.log(id+"fff");
  };


  const handleDateChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;
      
      setDate(currentDate);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;

    if (timePickerMode == "date") {
      settimePickerMode("time");

      setSelectedViewDate(formattedDate);
      
    } else{
      setSelectedViewDate(formattedDate+" "+selectedDate.toLocaleTimeString());
      setSelectedDate(selectedDate);
    }
    if (timePickerMode == "time") {
    setShowDatePicker(false);
    }
    Keyboard.dismiss();
  };

  return (
    <AlertNotificationRoot>
      <Spinner visible={spinnerVisible} textContent={loaderText} />
      <ImageBackground
        source={require("../assets/background_dot.png")}
        resizeMode="repeat"
        style={{
          flex: 1,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Dialog1.Container visible={visibleC}>
          <Dialog1.Title>Informations</Dialog1.Title>
          <View
            style={{
              //marginTop: 10,
              // backgroundColor: "red",
              flexDirection: "row",
              // justifyContent:'center',
              alignItems: "center",
            }}
          >
            <CreditCardInput
              requiresName
              requiresCVC
              // requiresPostalCode
              allowScroll
              onChange={handleCardChange}
            />
          </View>
          {cardHolderName && (
            <Dialog1.Button
              style={{ color: "red" }}
              label="Pay"
              onPress={handlePay}
            />
          )}
          {/* <Dialog.Button label="OK" onPress={handlePicktimeSet} /> */}
        </Dialog1.Container>

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
            <UserProfile id={selectedUser}></UserProfile>
          </View>
          <Dialog1.Button
            label="Close"
            onPress={() => setProfileVisible(false)}
          />
        </Dialog1.Container>

        <View style={{ flex: 1, marginTop: "10%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "80%",
                height: "100%",
                borderWidth: 1,
                borderColor: "#c0c0c0",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <Dialog1.Container
                visible={visible}
              // contentStyle={{ height: "80%" }}
              >
                <Dialog1.Title
                  style={{
                    textAlign: "center",
                  }}
                >
                  Please enter pickp time below
                </Dialog1.Title>

                <View
                  style={{
                    backgroundColor: "#97DBAE",
                    justifyContent: "center",
                    padding: 10,
                    borderColor: "#444",
                    borderWidth: 1,
                  }}
                >
                  <TextInput
                    style={{
                      borderColor: "#444",
                      borderWidth: 1,
                      backgroundColor: theme.colors.surface,
                      borderRadius: 4,
                      paddingLeft: 10,
                      
                    }}
                    
                      onChangeText={(text) =>
                        setPickUpDesc(text)
                      }
                    multiline
                    numberOfLines={5}
                    returnKeyType="next"

                  // value={selectedDate}
                  // editable={false}
                  // error={!!price.error}
                  // errorText={price.error}
                  />
                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode={timePickerMode}
                      display="inline"
                      onChange={handleDateChange}
                      style={{
                        backgroundColor: "white",
                        width: "100%",
                        height: 250,
                      }}
                    />
                  )}
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        showDatepicker();
                      }}
                      style={{
                        alignItems: "center",
                        borderWidth: 1,
                        borderRadius: 5,
                        width: "30%",
                        height: 50,
                        justifyContent: "center",
                        backgroundColor: theme.colors.primary,
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#121212",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        Select Date
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      style={{
                        borderColor: "#444",
                        borderWidth: 1,
                        width: 160,
                        height: 50,
                        backgroundColor: theme.colors.surface,
                        borderRadius: 4,
                        // paddingLeft: 10,
                        fontSize:12,
                        textAlign: "center",
                      }}
                      onChangeText={(text) =>
                        setDes({ value: text, error: "" })
                      }
                      returnKeyType="next"
                      placeholder="Select Pickup Date"
                      value={SelectedViewDate}
                      editable={false}
                    // error={!!price.error}
                    // errorText={price.error}
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#007AFF",
                        padding: 10,
                        borderRadius: 8,
                        height: 40,
                      }}
                      onPress={() => {
                        handlePicktimeSet();
                        Keyboard.dismiss();
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: 700,
                          fontSize: 20,
                        }}
                      >
                        Ok
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Dialog1.Container>
              <TextInput
                value={text}
                placeholder="Search here"
                onChangeText={onChangeText}
                style={{
                  marginLeft: 45,
                  alignSelf: "center",
                  width: 78,
                  height: 28,
                }}
              ></TextInput>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                width: 50,
                height: 30,
                borderWidth: 1,
                borderColor: "#c0c0c0",
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => getProductsBySearchParam(text)}>
                <FontAwesome name="search" size={24} color="#c0c0c0" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              marginTop: 10,
              padding: 10,
              backgroundColor: "white",
              borderColor: "#c0c0c0",
              borderWidth: 0.5,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <MapView data={advice}></MapView>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 20,
                width: "20%",
                height: 35,
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
              }}
              onPress={() => getProducts("All", lon, lat)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 20,
                width: "20%",
                height: 35,
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
              }}
              onPress={() => getProducts("S", lon, lat)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 20,
                width: "25%",
                height: 35,
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
              }}
              onPress={() => getProducts("E", lon, lat)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Exchange
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 20,
                width: "20%",
                height: 35,
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
              }}
              onPress={() => getProducts("F", lon, lat)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Free
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, borderRadius: 10 }}>
            <Ticket
              data={advice}
              onBuyPressHandle={buyBtnHandle}
              onExPressHandle={showDialog}
              onClickLogo={showUserProfile}
              onDoPressHandle={doDonateEvnt}
            ></Ticket>
          </View>
        </View>
      </ImageBackground>
    </AlertNotificationRoot>
  );
}
