import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
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
  const [loading, setLoading] = useState(true);

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
