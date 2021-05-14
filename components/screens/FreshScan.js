import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

function FreshScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeNum, setBarCodeNum] = useState(null);

  //   form variables.
  const [model, setModel] = useState(null);
  const [brand, setBrand] = useState(null);
  const [serial, setSerial] = useState(null);
  const [outlet, setOutLet] = useState(null);
  const [chiller, setChiller] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [contractor, setContractor] = useState(null);
  const [owner, setOwner] = useState(null);

  // coordinates
  const [latiitude, setLatiitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const reScan = () => {
    setScanned(false);
    setBarCodeNum(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h3}>Scan A BarCode!</Text>
      {!barcodeNum ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.form}>
          <Text>Fill In New Record.</Text>
          <View style={styles.formControl}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>BarCode Number:</Text>
              <TextInput
                style={styles.input}
                defaultValue={barcodeNum}
                editable={false}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Model Number:</Text>
              <TextInput
                style={styles.input}
                value={model}
                onChangeText={(text) => setModel(text)}
              />
            </View>
          </View>

          <View style={styles.formControl}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Brand Number:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Serial Number:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
          </View>

          <View style={styles.formControl}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Outlet Name:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Owner's Name:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
          </View>

          <View style={styles.formControl}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Outlet Address:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
          </View>

          <View style={styles.formControl}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Chiller Contractor:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Geo Location:</Text>
              <TextInput style={styles.input} defaultValue={barcodeNum} />
            </View>
          </View>
        </View>
      )}

      {scanned && <Button title={"Tap to Scan Again"} onPress={reScan} />}
    </View>
  );
}

export default FreshScan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f89939",
    flex: 1,
    marginTop: 29,
    padding: 10,
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
  },
  label: {
    fontWeight: "bold",
    marginBottom: -10,
    marginLeft: 10,
  },
});
