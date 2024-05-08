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
    setPassword({ value: "", error: "" });
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

  const userRegister = async () => {
    try {
      let data = new FormData();
      data.append("UserName", username.value);
      data.append("Fname", fname.value);
      data.append("Lname", lname.value);
      data.append("Password", password.value);
      data.append("File", {
        uri: image,
        name: getFileNameFromURI(image),
        type: "image/jpeg",
      });

      data.append("LocationLongtitute", locations.lat);
      data.append("LocationLatititute", locations.long);
      data.append("BioDetails", bio.lat);
      data.append("Tp", mobile.value);
      data.append("Address", address.value);

      console.log(data);
      axios({
        method: "post",
        url: "Login/SignUp",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log(response.data);
          alert("User Successfully Registed");
          clesr();
        })
        .catch(function (response) {
          alert("Error!, Please check again");
        });
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const onSignUpPressed = () => {
    const nameError = nameValidator(fname.value);
    const usernameError = nameValidator(username.value);
    const emailError = nameValidator(lname.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError || usernameError) {
      setUserName({ ...username, error: usernameError });
      setFName({ ...fname, error: nameError });
      setLName({ ...lname, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    userRegister();
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Dashboard" }],
    // });
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
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/newlogo.png")}
          resizeMode="contain"
          style={{
            width: 200,
            height: 100,
            //borderWidth: 2,
            //backgroundColor: "#fff",
          }}
        ></Image>
        <Header>Create Account</Header>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <TouchableOpacity
            onPress={pickImage}
            style={{ alignItems: "center" }}
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
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

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
            autoCompleteType="Bio"
            textContentType="Bio"
            // keyboardType="email-address"
          />

          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Sign Up
          </Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
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
