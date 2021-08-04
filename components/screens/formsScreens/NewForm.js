import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import GlobalCss from "../../GlobalCss";
import { newRecord } from "../../API";
import * as Location from "expo-location";

const NewForm = ({ barcodeNum, scanned, rescan }) => {
  const [model, setModel] = useState(null);
  const [brand, setBrand] = useState(null);
  const [serial, setSerial] = useState(null);
  const [outlet, setOutLet] = useState(null);
  const [chiller, setChiller] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [owner, setOwner] = useState(null);

  const [salesArea, setSalesArea] = useState(null);
  const [assetType, setAssetType] = useState(null);
  const [assetName, setAssetName] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [channel, setChannel] = useState(null);
  const [outletCode, setOutletCode] = useState(null);
  const [tier, setTier] = useState(null);

  // coordinates
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // indicator
  const [isIndicating, setIndicating] = useState(false);

  //   notification
  const [notification, setNotification] = useState(null);

  //   button control

  const saveNewRecord = async () => {
    console.log("saving new data");
    setNotification({ status: "success", message: "Please Wait!!!" });

    const length = barcodeNum.length;
    const reference = barcodeNum.slice(0, length - 1);

    const userName = await AsyncStorage.getItem("username");

    const data_ = {
      reference,
      model,
      brand,
      serial,
      outlet,
      chiller,
      phone,
      address,
      owner,
      salesArea,
      assetType,
      assetName,
      brandName,
      channel,
      outletCode,
      tier,
      longitude,
      latitude,
      user: userName,
    };

    if (
      !model ||
      !brand ||
      !serial ||
      !outlet ||
      !chiller ||
      !phone ||
      !address ||
      !owner ||
      !salesArea ||
      !brandName ||
      !outletCode ||
      !tier
    ) {
      setNotification({
        status: "error",
        message: "Fill Required Fields!!!",
      });
      return;
    }

    if (!longitude || !latitude) {
      setNotification({
        status: "error",
        message: "Click Add Location , To Add Current Location!",
      });
      return;
    }

    const response = await newRecord(data_);
    try {
      if (response.status === "success") {
        setNotification({
          status: "success",
          message: response.message,
        });
        setModel(null);
        setBrand(null);
        setSerial(null);
        setOutLet(null);
        setChiller(null);
        setPhone(null);
        setAddress(null);
        setOwner(null);
        setSalesArea(null);
        setAssetName(null);
        setAssetType(null);
        setBrandName(null);
        setChannel(null);
        setOutletCode(null);
        setTier(null);
      } else {
        setNotification({
          status: "error",
          message: response.message,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getGeoLoaction = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setIndicating(true);
    if (status !== "granted") {
      setIndicating(false);
      alert("Permission to access location was denied");
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      alert(error.message);
    }
    setIndicating(false);
  };

  useEffect(() => {
    setLatitude(null);
    setLongitude(null);
  }, [barcodeNum]);

  if (isIndicating) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 340,
          backgroundColor: "#fff",
        }}
      >
        <Text>Getting Your Location...</Text>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
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
            <Text style={GlobalCss.label}>BarCode Number*:</Text>
            <TextInput
              style={GlobalCss.field}
              defaultValue={barcodeNum}
              editable={false}
            />
          </View>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Model Number*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={model}
              onChangeText={(text) => setModel(text)}
            />
          </View>
        </View>
        <View style={GlobalCss.formGroup}>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Asset Type:</Text>
            <TextInput
              style={GlobalCss.field}
              value={assetType}
              onChangeText={(text) => setAssetType(text)}
            />
          </View>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Asset Name:</Text>
            <TextInput
              style={GlobalCss.field}
              value={assetName}
              onChangeText={(text) => setAssetName(text)}
            />
          </View>
        </View>
        {/* 2 */}
        <View style={GlobalCss.formGroup}>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Brand Name*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={brandName}
              onChangeText={(text) => setBrandName(text)}
            />
          </View>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Outlet Code*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={outletCode}
              onChangeText={(text) => setOutletCode(text)}
            />
          </View>
        </View>
        {/*3 */}
        <View style={GlobalCss.formGroup}>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Channel:</Text>
            <TextInput
              style={GlobalCss.field}
              value={channel}
              onChangeText={(text) => setChannel(text)}
            />
          </View>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Tier*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={tier}
              onChangeText={(text) => setTier(text)}
            />
          </View>
        </View>

        <View style={GlobalCss.formGroup}>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Brand Number*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={brand}
              onChangeText={(text) => setBrand(text)}
            />
          </View>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Serial Number*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={serial}
              onChangeText={(text) => setSerial(text)}
            />
          </View>
        </View>

        <View style={GlobalCss.formGroup}>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Outlet Name*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={outlet}
              onChangeText={(text) => setOutLet(text)}
            />
          </View>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Owner's Name*:</Text>
            <TextInput
              style={GlobalCss.field}
              value={owner}
              onChangeText={(text) => setOwner(text)}
            />
          </View>
        </View>

        <View style={GlobalCss.formGroup}>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Phone Number*:</Text>
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
            <Text style={GlobalCss.label}>Sales Area:</Text>
            <TextInput
              style={GlobalCss.field}
              value={salesArea}
              onChangeText={(text) => setSalesArea(text)}
            />
          </View>
        </View>

        <View style={GlobalCss.formGroup}>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Longitude *:</Text>
            <Text style={{ fontSize: 30 }}>
              {longitude || "Click Location"}
            </Text>
          </View>
          <View style={GlobalCss.input}>
            <Text style={GlobalCss.label}>Latitude *:</Text>
            <Text style={{ fontSize: 30 }}>{latitude || "Click Location"}</Text>
          </View>
        </View>
        {notification &&
          (notification.status === "success" ? (
            <Text style={GlobalCss.successMsg}>{notification.message}</Text>
          ) : (
            <Text style={GlobalCss.errorMsg}>{notification.message}</Text>
          ))}
        <View style={GlobalCss.formGroup}>
          <View>
            {scanned && (
              <TouchableOpacity
                style={{
                  ...GlobalCss.button,
                  backgroundColor: "#09BC8A",
                }}
                onPress={rescan}
              >
                <Text style={{ color: "#fff" }}>TAP TO RESCAN </Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={
                !notification ? GlobalCss.buttonDisabled : GlobalCss.button
              }
              onPress={saveNewRecord}
              //   disabled={!notification.disabled ? false : true}
            >
              <Text style={{ color: "#fff" }}>SUBMIT NEW RECORD</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={GlobalCss.button} onPress={getGeoLoaction}>
              <Text style={{ color: "#fff" }}>ADD LOCATION</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewForm;
