import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
  const [owner, setOwner] = useState(null);
  const [contractor, setContractor] = useState(null);

  // coordinates
  const [latiitude, setLatiitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const createNewRecord = () => {};

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={100000}
      >
        <Text style={styles.h3}>
          {barcodeNum ? barcodeNum : "Scan A BarCode!"}
        </Text>
        {!barcodeNum ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        ) : (
          <View style={styles.form}>
            <Text
              style={{ textAlign: "center", fontSize: 19, fontWeight: "bold" }}
            >
              CREATE NEW RECORD.
            </Text>
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
                <TextInput
                  style={styles.input}
                  value={brand}
                  onChangeText={(text) => setBrand(text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Serial Number:</Text>
                <TextInput
                  style={styles.input}
                  value={serial}
                  onChangeText={(text) => setSerial(text)}
                />
              </View>
            </View>

            <View style={styles.formControl}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Outlet Name:</Text>
                <TextInput
                  style={styles.input}
                  value={outlet}
                  onChangeText={(text) => setOutLet(text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Owner's Name:</Text>
                <TextInput
                  style={styles.input}
                  value={owner}
                  onChangeText={(text) => setOwner(text)}
                />
              </View>
            </View>

            <View style={styles.formControl}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Outlet Address:</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                />
              </View>
            </View>

            <View style={styles.formControl}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Chiller Contractor:</Text>
                <TextInput
                  style={styles.input}
                  value={chiller}
                  onChangeText={(text) => setChiller(text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Latitude:</Text>
                <TextInput style={styles.input} defaultValue={barcodeNum} />
              </View>
            </View>

            <View style={styles.formControl}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Longitude:</Text>
                <TextInput
                  style={styles.input}
                  value={chiller}
                  onChangeText={(text) => setChiller(text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Latitude:</Text>
                <TextInput style={styles.input} defaultValue={barcodeNum} />
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View>
                {scanned && (
                  <TouchableOpacity style={styles.button} onPress={reScan}>
                    <Text style={{ color: "#fff" }}>TAP TO RESCAN </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={createNewRecord}
                >
                  <Text style={{ color: "#fff" }}>SUBMIT NEW RECORD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
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
