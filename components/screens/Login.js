import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import GlobalCss from "../GlobalCss";
import { login } from "./../API";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [notification, setNotification] = useState(null);

  const userLogin = async () => {
    setNotification("Processing Login! Please Wait!!");
    if (!username || !password) {
      setNotification("fill all input fields");
      return;
    }
    try {
      const access = await login({ username, password });
      console.log(access);
      setNotification(access.msg);
      setUsername(null);
      setPassword(null);
      if (access.status === "success") {
        await AsyncStorage.setItem("username", username);
        navigation.navigate("Scan");
      }
    } catch (error) {
      setNotification(error.message);
    }
  };
  return (
    <>
      <KeyboardAvoidingView style={GlobalCss.container}>
        <View style={{ ...GlobalCss.form, padding: 30 }}>
          <Text style={{ ...GlobalCss.h1, textAlign: "center" }}>
            User Login
          </Text>
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            style={{ ...GlobalCss.field, marginBottom: 30 }}
            onChangeText={(text) => setUsername(text)}
            value={username}
          ></TextInput>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            style={{ ...GlobalCss.field, marginBottom: 30 }}
            onChangeText={(text) => setPassword(text)}
            value={password}
          ></TextInput>
          <TouchableOpacity style={GlobalCss.button} onPress={userLogin}>
            <Text style={{ color: "#f6f6f6" }}>LOGIN</Text>
          </TouchableOpacity>
          {notification && (
            <Text style={GlobalCss.errorMsg}>{notification}</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
