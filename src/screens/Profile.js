import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import { Alert } from "react-native";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function RegisterScreen({ navigation }) {
  const [username, setUserName] = useState({ value: "", error: "" });
  const [fname, setFName] = useState({ value: "", error: "" });
  const [lname, setLName] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [mobile, setMobile] = useState({ value: "", error: "" });
  const [address, setAdress] = useState({ value: "", error: "" });
  const [bio, setBio] = useState({ value: "", error: "" });
  const [locations, setLocation] = useState({ lat: "", long: "" });
  const [image, setImage] = useState(null);

  const clesr = () => {
    setUserName({ value: "", error: "" });
    setFName({ value: "", error: "" });
    setLName({ value: "", error: "" });
    setBio({ value: "", error: "" });
    setMobile({ value: "", error: "" });
    setAdress({ value: "", error: "" });
    setLocation({ value: "", error: "" });
    setImage(null);
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
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("userToken").then((userToken) => {
        axios({
          url: `Login/getuser?userId=${userToken}`,
          method: "GET",
        })
          .then((res) => {
            console.log(res.data);
            setUserName({ value: res.data.result.userName, error: "" });
            setAdress({ value: res.data.result.address, error: "" });
            setMobile({ value: res.data.result.tp, error: "" });
            setFName({ value: res.data.result.fname, error: "" });
            setLName({ value: res.data.result.lname, error: "" });

            setBio({ value: res.data.result.bioDetails, error: "" });
            setImage(
              axios.getUri() + `Login/GetImg?imgPath=${res.data.result.imgUrl}`
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });

      getCurrentLocation();
    }, [])
  );

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ lat: latitude, long: longitude });
      console.log(location.coords);
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  };

  const updateUser = async () => {
    try {
      // let data = new FormData();
      // data.append("Fname", fname.value);
      // data.append("Lname", lname.value);
      // data.append("LocationLongtitute", locations.long);
      // data.append("LocationLatititute", locations.lat);
      // data.append("Tp", mobile.value);
      // data.append("Address", address.value);
      //  data.append("bioDetails", bio.value);

      AsyncStorage.getItem("userToken").then((userToken) => {
        // let data = JSON.stringify({
        //   id: Number(userToken),
        //   fname: fname.value,
        //   lname: lname.value,
        //   locationLongtitute: locations.long,
        //   locationLatititute: locations.lat,
        //   tp: mobile.value,
        //   address: address.value,
        //   bioDetails: address.value,
        // });
        // let data = JSON.stringify({
        //   "id": 11,
        //   "fname": "abc123",
        //   "lname": "abc",
        //   "locationLongtitute": "79.86167907714844",
        //   "locationLatititute": "6.913475618628447",
        //   "tp": "1234567890",
        //   "address": "aa",
        //   "bioDetails": "sfsdfds"
        // });

        let data = JSON.stringify({
          "id": Number(userToken),
          "fname": fname.value,
          "lname": lname.value,
          "locationLongtitute": locations.long+"",
          "locationLatititute":locations.lat+"",
          "tp": mobile.value,
          "address": address.value,
          "bioDetails": bio.value
        });
        console.log(data);
        axios({
          method: "POST",
          url: "Login/UpdateProfile",
          data: data,
          headers: { "Content-Type": "application/json" },

          // url: "http://192.168.1.101/api/Login/UpdateProfile",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // data: data,
        })
          .then(function (response) {
            console.log(response.data);
            alert("User Successfully Registed");
           
          })
          .catch(function (response) {
            console.log(response);
            alert("Error!, Please check again");
          });
      });
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const onSignUpPressed = () => {
    const nameError = nameValidator(fname.value);
    const usernameError = nameValidator(username.value);
    const emailError = nameValidator(lname.value);

    if (emailError || nameError || usernameError) {
      setUserName({ ...username, error: usernameError });
      setFName({ ...fname, error: nameError });
      setLName({ ...lname, error: emailError });

      return;
    }
    updateUser();
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Dashboard" }],
    // });
  };
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] }),
        },
      ],
      { cancelable: false }
    );
  };

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        padding: 20,
        width: "100%",
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          <TouchableOpacity
            // onPress={pickImage}
            style={{ alignItems: "center" }}
          >
            <Image
              source={{ uri: image }}
              // source={{ uri: image }}
              resizeMode="contain"
              style={{
                width: 200,
                height: 180,
                //borderWidth: 2,
                //backgroundColor: "#fff",
              }}
            ></Image>
          </TouchableOpacity>
          <TextInput
            label="User Name"
            returnKeyType="next"
            value={username.value}
            onChangeText={(text) => setUserName({ value: text, error: "" })}
            error={!!username.error}
            errorText={username.error}
          />
          <TextInput
            label="First Name"
            returnKeyType="next"
            value={fname.value}
            onChangeText={(text) => setFName({ value: text, error: "" })}
            error={!!fname.error}
            errorText={fname.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Last Name"
            returnKeyType="next"
            value={lname.value}
            onChangeText={(text) => setLName({ value: text, error: "" })}
            error={!!lname.error}
            errorText={lname.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Mobile Number"
            returnKeyType="next"
            value={mobile.value}
            onChangeText={(text) => setMobile({ value: text, error: "" })}
            error={!!mobile.error}
            errorText={mobile.error}
            keyboardType="numeric"
            maxLength={10}
          />
          {/* <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          /> */}

          <TextInput
            label="Address"
            returnKeyType="next"
            value={address.value}
            onChangeText={(text) => setAdress({ value: text, error: "" })}
            error={!!address.error}
            errorText={address.error}
            autoCapitalize="none"
            autoCompleteType="Address"
            textContentType="Address"
            // keyboardType="email-address"
          />

          <TextInput
            label="Bio"
            returnKeyType="next"
            value={bio.value}
            onChangeText={(text) => setBio({ value: text, error: "" })}
            error={!!bio.error}
            errorText={bio.error}
            autoCapitalize="none"

            // keyboardType="email-address"
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              mode="contained"
              onPress={onSignUpPressed}
              style={{ marginTop: 24, width: "40%" }}
            >
              Update
            </Button>
            <Button
              mode="contained"
              onPress={handleLogout}
              style={{ marginTop: 24, width: "40%" }}
            >
              LogOut
            </Button>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "flex-end",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
