import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import GlobalCss from "../GlobalCss";
import NewForm from "./formsScreens/NewForm";

function FreshScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeNum, setBarCodeNum] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarCodeNum(data);
  };

  if (hasPermission === null) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "green",
        }}
      >
        <Text>Check For Camera Permissions.</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "green",
        }}
      >
        <Text>No access to camera</Text>
      </View>
    );
  }

  const reScan = () => {
    setScanned(false);
    setBarCodeNum(null);
  };

  return (
    <View style={styles.container}>
      <Text style={GlobalCss.headerBanner}>
        {barcodeNum ? barcodeNum : "Scan A BarCode"}
      </Text>
      {!barcodeNum ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <NewForm barcodeNum={barcodeNum} scanned={scanned} rescan={reScan} />
      )}
    </View>
  );
}

export default FreshScan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EC7357",
    flex: 1,
    marginTop: 0,
    // padding: 10,
  },
  h3: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    width: "80%",
    margin: 10,
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
  },
  formGroup: {
    width: "50%",
    marginTop: 20,
  },
  form: {
    backgroundColor: "#f6f6f6",
    padding: 5,
    paddingBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: -10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "green",
    height: 40,
    display: "flex",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    fontSize: 12,
  },
});
