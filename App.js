import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FreshScan from "./components/screens/FreshScan";
import ExistingScan from "./components/screens/exisitingScan";
import Login from "./components/screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createStackNavigator();
  const [isLoggedin, setLoggedStatus] = useState(null);

  useEffect(() => {
    getData();
  }, [isLoggedin]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setLoggedStatus(true);
      } else setLoggedStatus(false);
    } catch (e) {
      // error reading value
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedin ? (
          <Stack.Screen
            name="Scan"
            component={UserScreen}
            options={{
              title: "SCANNER APP",
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function UserScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="New Scan" component={FreshScan} />
      <Tab.Screen name="Existing Record" component={ExistingScan} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f8f939",
    marginTop: 29,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  middleContainer: {
    flexDirection: "row",
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
  },
  animationLineStyle: {
    height: 2,
    width: "100%",
    backgroundColor: "red",
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
