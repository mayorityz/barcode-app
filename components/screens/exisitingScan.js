import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import GlobalCss from "./../GlobalCss.js";
import ViewRecord from "./ViewRecord";

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

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      const response = await axios.post(
        "http://192.168.43.94:4500/fetchrecord/",
        {
          barcode: data,
        }
      );
      const data_ = response.data;

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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={GlobalCss.container} behavior="height">
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
    </KeyboardAvoidingView>
  );
}

export default ExistingScan;
