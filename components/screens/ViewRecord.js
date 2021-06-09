import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import GlobalCss from "./../GlobalCss";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logs } from "../API";

const ViewRecord = ({ data, newscan }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [secondary, setSecondary] = useState();

  const [status, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

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

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [remark, setRemark] = useState("");

  const primaryOption = (value) => {
    if (value === "Repair") {
      setStatus(true);
    } else {
      setStatus(false);
      setSecondary("");
    }

    setSelectedLanguage(value);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) value;
    } catch (e) {
      return null;
    }
  };

  const submitLog = async () => {
    console.log("saving log!!!");

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
      !assetType ||
      !assetName ||
      !brandName ||
      !channel ||
      !outletCode ||
      !tier
    ) {
      alert("All Fields Except Reamrk Are REquired!!!");
      return;
    }

    if (!selectedLanguage) {
      alert("You Must Update Your GeoLocation!!!");
      return;
    }

    setLoading(true);
    const data_ = {
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
      primary: selectedLanguage,
      secondary,
      longitude,
      latitude,
      remark,
    };
    try {
      const data = await Logs(data_);

      if (data.status === "success") {
        setLoading(false);
        alert("Data Uploaded Successfully!");
      } else {
        setLoading(false);
        alert("DB ERROR! PLEASE TRY AGAIN!!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Network Error! Please Try Again!");
    }
  };

  useEffect(() => {
    setModel(data.model);
    setAddress(data.address);
    setAssetName(data.assetName);
    setAssetType(data.assetType);
    setBrand(data.brand);
    setBrandName(data.brandName);
    setOutLet(data.outlet);
    setOutletCode(data.outletCode);
    setOwner(data.owner);
    setPhone(data.phone);
    setSalesArea(data.salesArea);
    setSerial(data.serial);
    setTier(data.tier);
    setChiller(data.chiller);
    setChannel(data.channel);
    setLongitude(data.longitude);
    setLatitude(data.latitude);
  }, [data]);

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
        <Text>Updating! Please Wait!!</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const getGeoLoaction = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setLoading(true);
    if (status !== "granted") {
      setLoading(false);
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
    setLoading(false);
  };

  return (
    <>
      <Text style={{ ...GlobalCss.h1, color: "#fff", fontSize: 14 }}>
        BARCODE REF. : {data.reference}
      </Text>
      <ScrollView>
        <View style={GlobalCss.form}>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Contractor :</Text>
              <TextInput
                placeholder="Chiller Contract"
                value={chiller}
                style={GlobalCss.field}
                onChangeText={(text) => setChiller(text)}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Model Number :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Model Number"
                value={model}
                onChangeText={(text) => setModel(text)}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Brand :</Text>
              <TextInput
                placeholder="Brand"
                value={brand}
                style={GlobalCss.field}
                onChangeText={(text) => setBrand(text)}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Serial Number :</Text>
              <TextInput
                style={GlobalCss.field}
                value={serial}
                placeholder="Serial Number"
                onChangeText={(text) => setSerial(text)}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Outlet Name :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Outlet's Name"
                value={outlet}
                onChangeText={(text) => setOutLet(text)}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Owner's Name :</Text>
              <TextInput
                placeholder="Owner"
                style={GlobalCss.field}
                value={owner}
                onChangeText={(text) => setOwner(text)}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Phone Number :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Outlet Address :</Text>
              <TextInput
                placeholder="Outlet Address"
                value={address}
                style={GlobalCss.field}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Asset Name :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Asset Name"
                value={assetName}
                onChangeText={(text) => setAssetName(text)}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Asset Type:</Text>
              <TextInput
                placeholder="Asset Type"
                value={assetType}
                style={GlobalCss.field}
                onChangeText={(text) => setAssetType(text)}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Channel :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Channel"
                value={channel}
                onChangeText={(text) => setChannel(text)}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Outlet Code :</Text>
              <TextInput
                placeholder="Outlet Code"
                value={outletCode}
                onChangeText={(text) => setOutletCode(text)}
                style={GlobalCss.field}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Sales Area :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Sales Area"
                value={salesArea}
                onChangeText={(text) => setSalesArea(text)}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Brand Name:</Text>
              <TextInput
                placeholder="Brand Name"
                value={brandName}
                style={GlobalCss.field}
                onChangeText={(text) => setBrandName(text)}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Latitude :</Text>
              <Text style={{ fontSize: 30 }}>
                {latitude || "Click Location"}
              </Text>
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Longitude :</Text>
              <Text style={{ fontSize: 30 }}>
                {longitude || "Click Location"}
              </Text>
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Tire :</Text>
              <TextInput
                placeholder="Tier"
                style={GlobalCss.field}
                value={tier}
                onChangeText={(text) => setTier(text)}
              />
            </View>
          </View>

          <Text style={GlobalCss.label}>Activity Log.</Text>
          <View style={{ padding: 10, backgroundColor: "#f6f6f6" }}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) => primaryOption(itemValue)}
              mode="dialog"
              style={GlobalCss.pickerStyle}
            >
              <Picker.Item label="=== Select A Log ===" value="" />
              <Picker.Item
                label="Routine Maintenance/Servicing"
                value="Routine Maintenance/Servicing"
              />
              <Picker.Item label="Repair" value="Repair" />
            </Picker>
            <Text>Options:</Text>
            <Picker
              selectedValue={secondary}
              onValueChange={(itemValue, itemIndex) => setSecondary(itemValue)}
              mode="dialog"
              style={GlobalCss.pickerStyle}
              enabled={status}
            >
              <Picker.Item label="-- Select Secondary Option --" value="" />

              <Picker.Item
                label="Capacitor/ starting device"
                value="Capacitor/ starting device"
              />
              <Picker.Item label="Electrical" value="Electrical" />
              <Picker.Item
                label="Lighting replaced"
                value="Lighting replaced"
              />
              <Picker.Item
                label="Compressor Replaced"
                value="Compressor Replaced"
              />
              <Picker.Item
                label="Evaporator fan Motor replaced"
                value="Evaporator fan Motor replaced"
              />
              <Picker.Item
                label="Condenser Fan Motor replaced"
                value="Condenser Fan Motor replaced"
              />
              <Picker.Item
                label="Broken Glass Door"
                value="Broken Glass Door"
              />

              <Picker.Item label="Front Grill" value="Front Grill" />
              <Picker.Item label="Shelf Clips" value="Shelf Clips" />
              <Picker.Item label="Shelves" value="Shelves" />
              <Picker.Item label="Consumables" value="Consumables" />
              <Picker.Item
                label="Thermostatic control module (carel)"
                value="Thermostatic control module (carel)"
              />
              <Picker.Item
                label="Stabilizer transformer"
                value="Stabilizer transformer"
              />
              <Picker.Item label="Stabilizer" value="Stabilizer" />
              <Picker.Item label="Dryer " value="Dryer " />
              <Picker.Item label="Condenser" value="Condenser" />
              <Picker.Item label="Evaporator" value="Evaporator" />
              <Picker.Item label="Gasket rubber " value="Gasket rubber " />
              <Picker.Item
                label="Recomended for replacement"
                value="Recomended for replacement"
              />
              <Picker.Item
                label="Branding required"
                value="Branding required"
              />
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Remark (optional) :</Text>
              <TextInput
                placeholder="Leave a remark ..."
                style={GlobalCss.textField}
                value={remark}
                onChangeText={(text) => setRemark(text)}
                multiline={true}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                ...GlobalCss.button,
                backgroundColor: "#09B",
              }}
              onPress={getGeoLoaction}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                UPDATE ASSET LOCATION
              </Text>
            </TouchableOpacity>
          </View>

          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <TouchableOpacity
                style={{ ...GlobalCss.button, backgroundColor: "#09BC8A" }}
                onPress={newscan}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  NEW SCAN
                </Text>
              </TouchableOpacity>
            </View>
            <View style={GlobalCss.input}>
              <TouchableOpacity style={GlobalCss.button} onPress={submitLog}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ViewRecord;
