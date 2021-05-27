import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Vibration,
  ActivityIndicator,
} from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import GlobalCss from "./../GlobalCss.js";
import ViewRecord from "./ViewRecord";
import { getRecord } from "./../API";

function ExistingScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeNum, setBarCodeNum] = useState(null);
  const [toggle, setToggle] = useState(null);
  const [notification, setNotification] = useState({
    status: null,
    message: null,
    data: null,
  });

  const [isLoading, setLoading] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    Vibration.vibrate([1000, 2000, 1000]);
    //! add a preloader here
    setLoading(true);
    //! remove the last number.

    const data_ = await getRecord({
      barcode: data,
    });

    if (data_.status === "success") {
      if (!data_.data) {
        setNotification({
          status: 0,
          message: "No Records Match",
          data: data_.data,
        });
        setToggle(!toggle);
      } else {
        setNotification({ status: 1, message: "", data: data_.data });
        setBarCodeNum(true);
      }
    }

    setLoading(false);
  };

  if (isLoading) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flexDirection: "column",
          padding: 19,
        }}
      >
        <Text>Processing Data! Please Wait!!</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={GlobalCss.container}>
      <StatusBar backgroundColor="#EC7357" animated={true} />
      {toggle ? (
        barcodeNum ? (
          <ViewRecord
            data={notification.data}
            newscan={() => setBarCodeNum(null)}
          />
        ) : (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ ...StyleSheet.absoluteFillObject }}
            />
            <TouchableOpacity
              style={GlobalCss.tapBtn2}
              onPress={() => setToggle(null)}
            >
              <Text>TAP TO TURN OFF SCANNER.</Text>
            </TouchableOpacity>
          </>
        )
      ) : (
        <>
          <Text style={GlobalCss.h1}>Scan For Existing Record</Text>
          <TouchableOpacity
            style={GlobalCss.tapBtn}
            onPress={() => setToggle(true)}
          >
            <Text>Tap To Scan</Text>
          </TouchableOpacity>
          <Text style={GlobalCss.h1}>{notification.message}</Text>
        </>
      )}
    </View>
  );
}

export default ExistingScan;
