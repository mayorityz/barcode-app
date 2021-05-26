import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GlobalCss from "./../GlobalCss";
import { Picker } from "@react-native-picker/picker";

const ViewRecord = ({ data, newscan }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [secondary, setSecondary] = useState();
  const [status, setStatus] = useState(false);

  const primaryOption = (value) => {
    if (value === "Repair") {
      setStatus(true);
    } else {
      setStatus(false);
      setSecondary("");
    }

    setSelectedLanguage(value);
  };

  return (
    <>
      <Text style={GlobalCss.h1}>BARCODE REF. : {data.barcode}</Text>
      <ScrollView>
        <View style={GlobalCss.form}>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Contractor :</Text>
              <TextInput
                placeholder="Chiller Contract"
                defaultValue={data.chiller}
                style={GlobalCss.field}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Model Number :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Model Number"
                defaultValue={data.model}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Brand :</Text>
              <TextInput
                placeholder="Brand"
                defaultValue={data.brand}
                style={GlobalCss.field}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Serial Number :</Text>
              <TextInput
                style={GlobalCss.field}
                defaultValue={data.serial}
                placeholder="Serial Number"
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Outlet Name :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Outlet's Name"
                defaultValue={data.outlet}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Owner's Name :</Text>
              <TextInput
                placeholder="Owner"
                style={GlobalCss.field}
                defaultValue={data.owner}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Phone Number :</Text>
              <TextInput
                style={GlobalCss.field}
                placeholder="Phone"
                defaultValue={data.phone}
              />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Outlet Address :</Text>
              <TextInput
                placeholder="Outlet Address"
                defaultValue={data.address}
                style={GlobalCss.field}
              />
            </View>
          </View>
          <View style={GlobalCss.formGroup}>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Latitude :</Text>
              <TextInput placeholder="Latitude" style={GlobalCss.field} />
            </View>
            <View style={GlobalCss.input}>
              <Text style={GlobalCss.label}>Longitude :</Text>
              <TextInput placeholder="Longitude" style={GlobalCss.field} />
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
                label="Electrical wiring"
                value="Electrical wiring"
              />
              <Picker.Item
                label="Capacitor/ starting device"
                value="Capacitor/ starting device"
              />
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
            </Picker>
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
              <TouchableOpacity style={GlobalCss.button}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ViewRecord;
