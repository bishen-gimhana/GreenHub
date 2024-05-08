import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import Checkbox from "expo-checkbox";
import TextInput1 from "../components/TextInput";
import * as ImagePicker from "expo-image-picker";
import Background from "../components/Background";
import { titleValidator } from "../helpers/titleValidator";
import { desValidator } from "../helpers/desValidator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { theme } from "../core/theme";

const logo = require("../assets/imageupload.png");
const AddItem = () => {
  const [sellSelected, setSellSelected] = useState(false);
  const [exchangeSelected, setExchangeSelected] = useState(false);
  const [donateSelected, setDonateSelected] = useState(false);
  const [paytypeSelected, setPayTypeSelected] = useState(false);

  const [cash, setCash] = useState(false);
  const [bd, setBD] = useState(false);
  const [card, setCard] = useState(false);

  const [image, setImage] = useState(null);
  const [name, setName] = useState({ value: "", error: "" });
  const [des, setDes] = useState({ value: "", error: "" });
  const [type, setType] = useState({ value: "", error: "" });
  const [price, setPrice] = useState({ value: "", error: "" });
  const [qty, setQty] = useState({ value: "", error: "" });
  const [expireDate, setExpireDate] = useState({ value: "", error: "" });


  const clesr = () => {
    setSellSelected({ value: "", error: "" });
    setExchangeSelected({ value: "", error: "" });
    setDonateSelected({ value: "", error: "" });
    setPayTypeSelected({ value: "", error: "" });
    setName({ value: "", error: "" });
    setDes({ value: "", error: "" });
    setType({ value: "", error: "" });
    setPrice({ value: "", error: "" });
    setQty({ value: "", error: "" });
    setExpireDate({ value: "", error: "" });
    setImage(null);
     setSellSelected(false);
    setExchangeSelected(false);
    setDonateSelected(false);
  setPayTypeSelected(false);
  
  setCash(false);
     setBD(false);
     setCard(false);
  };


  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(formattedDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  const getFileNameFromURI = (uri) => {
    let fileName = "";
    if (Platform.OS === "ios") {
      fileName = uri.replace(/^.*[\\/]/, "");
    } else {
      fileName = uri.substring(uri.lastIndexOf("/") + 1);
    }
    return fileName;
  };

  const productPost = async () => {
    console.log(date.toISOString());
    AsyncStorage.getItem("userToken").then((userToken) => {
      try {
        let data = new FormData();
        data.append("ItemName", name.value);
        data.append("Description", des.value);
        data.append("CategoryId", 0);
        data.append("UserId", userToken);
        data.append("File", {
          uri: image,
          name: getFileNameFromURI(image),
          type: "image/jpeg",
        });
        data.append(
          "Type",
          sellSelected === true ? "S" : exchangeSelected === true ? "E" : "F"
        );
        data.append("Price", price.value=="" ? 0 :price.value);
        // data.append("PickupTime", "1234567890");
        data.append("Qty", qty.value=="" ? 0 : qty.value);
        data.append("ExpireDate", selectedDate);

        axios({
          method: "post",
          url: "user/Product/PostProduct",
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            console.log(response.data.result);
            if (response.data.statusCode === 200) {
              alert("Item Added Successfully");
              clesr();
            } else {
              alert("Item Added Faild");
            }
          })
          .catch(function (response) {
            console.log(response);
            alert("Error!, Please check again");
          });
      } catch (error) {
        console.log("Upload error:", error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Add New Item</Text>
        </View>
        <View
          style={{
            flex: 0.5,
            //backgroundColor: "blue",
            alignItems: "center",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              //flex: 0.5,
              width: "60%",
              flexDirection: "row",
              // backgroundColor: "white",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{ alignItems: "center" }}
            >
              <Image
                source={require("../assets/imageupload.png")}
                resizeMode="contain"
                style={{
                  width: 54,
                  height: 54,
                }}
              ></Image>
              <Text
                style={{
                  fontSize: 18,
                  color: "#121212",
                  fontWeight: 700,
                }}
              >
                Pick from galary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openCamera}
              style={{ alignItems: "center" }}
            >
              <Image
                source={require("../assets/imageupload.png")}
                resizeMode="contain"
                style={{ width: 54, height: 54 }}
              ></Image>
              <Text
                style={{
                  fontSize: 18,
                  color: "#121212",
                  fontWeight: 700,
                }}
              >
                Open Camera
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={
                image === null
                  ? require("../assets/imageupload.png")
                  : { uri: image }
              }
              // source={{ uri: image }}
              resizeMode="contain"
              style={{
                width: 200,
                height: 180,
                //borderWidth: 2,
                //backgroundColor: "#fff",
              }}
            ></Image>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <TextInput1
              label="Title"
              returnKeyType="next"
              placeholder="Item Name"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: "" })}
              error={!!name.error}
              errorText={name.error}
            />
            <TextInput1
              label="Description"
              returnKeyType="next"
              placeholder="Item Description"
              value={des.value}
              onChangeText={(text) => setDes({ value: text, error: "" })}
              error={!!des.error}
              errorText={des.error}
              multiline
              numberOfLines={5}
            />

            <View
              style={{
                marginTop: 10,
                // backgroundColor: "red",
                //flexDirection: "row",
                // justifyContent:'center',
                alignItems: "center",
              }}
            >
              <View
                style={{
                  //marginTop: 10,
                  // backgroundColor: "red",
                  flexDirection: "row",
                  // justifyContent:'center',
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={showDatepicker}
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
                      fontSize: 18,
                      color: "#121212",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    Select Date
                  </Text>
                </TouchableOpacity>

                <TextInput
                  label="QTY"
                  style={{
                    borderColor: "#444",
                    borderWidth: 1,
                    width: '30%',
                    height: 50,
                    backgroundColor: theme.colors.surface,
                    borderRadius: 4,
                    paddingLeft: 10,
                    textAlign: "center",
                  }}
                  returnKeyType="next"
                  placeholder="Select Expire Date"
                  value={selectedDate}
                  //editable={false}
                  error={!!price.error}
                  errorText={price.error}
                />
              </View>
              <View>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <TextInput
              label="Price"
              style={{
                borderColor: "#444",
                borderWidth: 1,
                width: 150,
                height: 50,
                backgroundColor: theme.colors.surface,
                borderRadius: 4,
                paddingLeft: 10,
              }}
              returnKeyType="next"
              placeholder="Price"
              value={price.value}
              onChangeText={(text) => setPrice({ value: text, error: "" })}
              keyboardType="numeric"
             // error={!!price.error}
             // errorText={price.error}
            />
             <View style={{flexDirection:'row',alignItems:'center'}}>
            <TextInput
              label="QTY"
              style={{
                borderColor: "#444",
                borderWidth: 1,
                width: 150,
                height: 50,
                backgroundColor: theme.colors.surface,
                borderRadius: 4,
                paddingLeft: 10,
              }}
              returnKeyType="next"
              placeholder="QTY"
              value={qty.value}
              onChangeText={(text) => setQty({ value: text, error: "" })}
              //error={!!qty.error}
              //errorText={qty.error}
              keyboardType="numeric"
            />
            <Text style={{fontSize:20,fontWeight: 500,marginLeft:5}}>Kg</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>Sell</Text>
              <Checkbox
                value={sellSelected}
                onValueChange={setSellSelected}
                style={styles.checkbox}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>Exchange</Text>
              <Checkbox
                value={exchangeSelected}
                onValueChange={setExchangeSelected}
                style={styles.checkbox}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>Free</Text>
              <Checkbox
                value={donateSelected}
                onValueChange={setDonateSelected}
                style={styles.checkbox}
              />
            </View>
          </View>

          {/* <View style={{ padding: 10, backgroundColor: "#0ff", marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>
                Payment and Delivery Option
              </Text>
            </View>




            <View style={{ alignItems: "flex-start", marginTop: 10 }}>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Checkbox
                  value={cash}
                  onValueChange={setCash}
                  style={styles.checkbox}
                />
                <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 10 }}>
                  Cash
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Checkbox
                  value={bd}
                  onValueChange={setBD}
                  style={styles.checkbox}
                />
                <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 10 }}>
                  Bank Deposite
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Checkbox
                  value={card}
                  onValueChange={setCard}
                  style={styles.checkbox}
                />
                <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 10 }}>
                  Card payment
                </Text>
              </View>
            </View>
          </View> */}
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <TouchableOpacity
              onPress={productPost}
              style={{
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 20,
                width: "25%",
                height: 35,
                justifyContent: "center",
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#121212",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addNewItem: {
    fontSize: 25,
    color: "#121212",
    marginTop: 10,
    marginLeft: 27,
  },
  itemName: {
    color: "#121212",
    height: 46,
    width: 323,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 247,
    marginLeft: 34,
  },
  rect: {
    width: 322,
    height: 100,
    backgroundColor: "#E6E6E6",
    marginTop: 10,
    marginLeft: 35,
  },
  itemDescription: {
    color: "#121212",
    marginTop: 7,
  },
  button: {
    width: 70,
    height: 76,
    backgroundColor: "#E6E6E6",
    marginTop: -373,
    marginLeft: 153,
  },
  image: {
    width: 64,
    height: 54,
    marginTop: 17,
    marginLeft: 6,
  },
  image2: {
    width: 255,
    height: 113,
    marginTop: 13,
    marginLeft: 69,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 27,
  },
  sell: {
    color: "#121212",
    marginLeft: 14,
    marginTop: 8,
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 27,
    marginLeft: 47,
  },
  exchange: {
    color: "#121212",
    marginLeft: 4,
    marginTop: 8,
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 27,
    marginLeft: 23,
  },
  donate: {
    color: "#121212",
    marginTop: 8,
  },
  iconRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 191,
    marginLeft: 26,
    marginRight: 52,
  },
  rect2: {
    width: 100,
    height: 39,
    backgroundColor: "#E6E6E6",
    borderRadius: 34,
    shadowColor: "rgba(220,209,209,1)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 201,
    marginLeft: 138,
  },
  post: {
    color: "#121212",
    marginTop: 11,
    marginLeft: 35,
  },
  uploadImage: {
    color: "#121212",
    marginTop: -683,
    marginLeft: 145,
  },
  rect3: {
    width: 331,
    height: 157,
    backgroundColor: "#E6E6E6",
    marginTop: 450,
    marginLeft: 27,
  },
  loremIpsum: {
    color: "#121212",
    marginTop: 5,
    marginLeft: 7,
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 27,
    height: 30,
    width: 27,
  },
  cash: {
    color: "#121212",
    marginLeft: 24,
    marginTop: 6,
  },
  icon3Row: {
    height: 30,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 12,
    marginRight: 236,
  },
  icon5: {
    color: "rgba(128,128,128,1)",
    fontSize: 27,
    height: 30,
    width: 27,
  },
  bankDeposit: {
    color: "#121212",
    marginLeft: 20,
    marginTop: 12,
  },
  icon5Row: {
    height: 30,
    flexDirection: "row",
    marginTop: 9,
    marginLeft: 12,
    marginRight: 190,
  },
  icon4: {
    color: "rgba(128,128,128,1)",
    fontSize: 27,
    height: 30,
    width: 27,
  },
  cardPayment: {
    color: "#121212",
    marginLeft: 20,
    marginTop: 6,
  },
  icon4Row: {
    height: 30,
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 12,
    marginRight: 184,
  },
});

export default AddItem;
