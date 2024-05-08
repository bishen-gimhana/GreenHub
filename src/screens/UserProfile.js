import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
// import { TextInput } from 'react-native-paper';
// import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { nameValidator } from "../helpers/nameValidator";
import { emailValidator } from "../helpers/emailValidator";
// import { telephoneValidator } from "../helpers/telephoneValidator";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Checkbox } from "react-native-paper";
import { Divider } from "react-native-paper";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
export default function UserProfile({ navigation, id }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState({ value: "", error: "" });
  const [data, setData] = useState({});
  const [telephone, setTelephone] = useState({ value: "", error: "" });
  const [checked, setChecked] = useState(false);

  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const handleCheckboxToggle = () => {
    setChecked(!checked);
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

  useFocusEffect(

    React.useCallback(() => {
          console.log(id +"hhhh");
      setSpinnerVisible(true);
      AsyncStorage.getItem("userToken").then((userToken) => {
        axios({
          url: `Login/getuser?userId=${id}`,
          method: "GET",
        })
          .then((res) => {
            // console.log(res);
            setData(res.data.result);
            setName({ value: res.data.result.userName, error: "" });
            setImage(
              axios.getUri() + `Login/GetImg?imgPath=${res.data.result.imgUrl}`
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
      setSpinnerVisible(false);
    }, [])
  );

  return (
    <ImageBackground
      source={require("../assets/background_dot.png")}
      resizeMode="repeat"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <Spinner visible={spinnerVisible} textContent={"Loading.."} />
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
          <View style={{}}>
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={{
                width: 150,
                height: 150,
                borderRadius: 20,
              }}
            ></Image>
          </View>

          <View style={styles.container}>
            <Text style={styles.chanakaRajapaksha}>{data.userName}</Text>
            <TextInput
              placeholder="Bio"
              editable={false}
              style={styles.placeholder2}
              value={data.bioDetails}
            ></TextInput>

            <TextInput
              placeholder="Adress"
              editable={false}
              style={styles.placeholder1}
              value={data.fname + " " + data.lname}
            ></TextInput>
            <TextInput
              placeholder="Email"
              editable={false}
              style={styles.placeholder4}
              value={data.address}
            ></TextInput>

            <TextInput
              placeholder="Mobile "
              editable={false}
              style={styles.placeholder3}
              value={data.tp}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 134,
    height: 110,
    marginTop: 77,
    marginLeft: 114,
  },
  chanakaRajapaksha: {
    color: "#121212",
    fontSize: 25,
    marginTop: 10,
  },
  placeholder2: {
    color: "#121212",
    fontSize: 20,
    width: 281,
    borderWidth: 1,
    borderColor: "rgba(195,169,169,1)",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  placeholder1: {
    color: "#121212",
    fontSize: 20,
    width: 281,
    borderWidth: 1,
    borderColor: "rgba(195,169,169,1)",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  placeholder3: {
    color: "#121212",
    fontSize: 20,
    width: 281,
    borderWidth: 1,
    borderColor: "rgba(195,169,169,1)",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  placeholder4: {
    color: "#121212",
    fontSize: 20,
    width: 281,
    borderWidth: 1,
    borderColor: "rgba(195,169,169,1)",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  placeholder3Row: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
