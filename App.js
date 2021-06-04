import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FreshScan from "./components/screens/FreshScan";
import ExistingScan from "./components/screens/exisitingScan";
import Login from "./components/screens/Login";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const Stack = createStackNavigator();
  const [isLoggedin, setLoggedStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);

  const allowCamera = () => {
    alert("Pressed");
  };

  const allowLocation = () => {
    alert("Location");
  };

  // camera /barcode permission
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //location permission.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocation(status === "granted");
    })();
  }, []);

  useEffect(() => {
    getData();
  }, [isLoggedin]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setLoggedStatus(true);
      } else setLoggedStatus(false);

      setLoading(false);
    } catch (e) {
      // error reading value
    }
  };

  if (!hasPermission) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f6f6f6",
          width: "100%",
        }}
      >
        <Text>You Need To Permit Your Camera!</Text>
        <Button title="Permit Camera!" onPress={allowLocation} />
      </View>
    );
  }

  if (!location) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>You Need To Permit Your Location!</Text>
        <Button title="Permit Location" onPress={() => alert("Pressed!!!")} />
      </View>
    );
  }

  if (loading) {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedin && (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Scan"
          component={UserScreen}
          options={{
            title: "SCANNER APP",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function UserScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scan Asset" component={ExistingScan} />
      <Tab.Screen name="New Scan" component={FreshScan} />
    </Tab.Navigator>
  );
}
