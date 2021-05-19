import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import GlobalCss from "../GlobalCss";

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

  const [loader, setLoader] = useState(null);

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

  const saveNewRecord = async () => {
    const data_ = {
      barcode: barcodeNum,
      model,
      brand,
      serial,
      outlet,
      chiller,
      phone,
      address,
      owner,
    };

    try {
      const { data } = await axios.post(
        "http://192.168.43.94:4500/addition/",
        data_
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
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
        <ScrollView>
          <Text
            style={{
              textAlign: "center",
              fontSize: 11,
              fontWeight: "bold",
            }}
          >
            CREATE NEW RECORD.
          </Text>
          <View style={GlobalCss.form}>
            <View style={GlobalCss.formGroup}>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>BarCode Number:</Text>
                <TextInput
                  style={GlobalCss.field}
                  defaultValue={barcodeNum}
                  editable={false}
                />
              </View>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Model Number:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={model}
                  onChangeText={(text) => setModel(text)}
                />
              </View>
            </View>

            <View style={GlobalCss.formGroup}>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Brand Number:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={brand}
                  onChangeText={(text) => setBrand(text)}
                />
              </View>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Serial Number:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={serial}
                  onChangeText={(text) => setSerial(text)}
                />
              </View>
            </View>

            <View style={GlobalCss.formGroup}>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Outlet Name:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={outlet}
                  onChangeText={(text) => setOutLet(text)}
                />
              </View>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Owner's Name:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={owner}
                  onChangeText={(text) => setOwner(text)}
                />
              </View>
            </View>

            <View style={GlobalCss.formGroup}>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Phone Number:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Outlet Address:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                />
              </View>
            </View>

            <View style={GlobalCss.formGroup}>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Chiller Contractor:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={chiller}
                  onChangeText={(text) => setChiller(text)}
                />
              </View>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Latitude:</Text>
                <TextInput style={GlobalCss.field} defaultValue={barcodeNum} />
              </View>
            </View>

            <View style={GlobalCss.formGroup}>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Longitude:</Text>
                <TextInput
                  style={GlobalCss.field}
                  value={chiller}
                  onChangeText={(text) => setChiller(text)}
                />
              </View>
              <View style={GlobalCss.input}>
                <Text style={GlobalCss.label}>Latitude:</Text>
                <TextInput style={GlobalCss.field} defaultValue={barcodeNum} />
              </View>
            </View>

            <View style={GlobalCss.formGroup}>
              <View>
                {scanned && (
                  <TouchableOpacity
                    style={{
                      ...GlobalCss.button,
                      backgroundColor: "#09BC8A",
                    }}
                    onPress={reScan}
                  >
                    <Text style={{ color: "#fff" }}>TAP TO RESCAN </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={GlobalCss.button}
                  onPress={saveNewRecord}
                >
                  <Text style={{ color: "#fff" }}>SUBMIT NEW RECORD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
