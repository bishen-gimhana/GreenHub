import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { nameValidator } from "../helpers/nameValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";




export default function LoginScreen({ navigation }) {
  const navigate1 = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully.");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  // const checkLoginStatus = async () => {
  //   try {
  //     const loginToken = await AsyncStorage.getItem('userToken');
  //     if (loginToken) {
  //       // Token is available, navigate to the main screen
  //       // navigate1.navigate('Main');
  //     }
  //   } catch (error) {
  //     console.log('Error occurred while checking login status:', error);
  //   }
  // };

  const onLoginPressed = async () => {
    const emailError = nameValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
   await axios({
      url: "Login/Authenticate",
      method: "GET",
      headers: {
        userName: `${email.value}`,
        password: `${password.value}`,
      },
    })
      .then((res) => {
        console.log(email);
        console.log(password);
        console.log(res.data);

        if (res.data.statusCode != 200) {
          alert("Invalid Credentials");
        } else {
          //  AsyncStorage.setItem("userToken", res.data.result.id);
          storeData("userToken", res.data.result.id);
          storeData("stripeuserToken", res.data.result.stripeUserId);
          storeData("userName", res.data.result.fname+ " " +res.data.result.lname);
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
        {/* <TouchableOpacity > */}
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
