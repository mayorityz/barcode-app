import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GlobalCss from "./../GlobalCss";

const ViewRecord = ({ data, newscan }) => {
  return (
    <ScrollView>
      <Text style={GlobalCss.h1}>record : {data.barcode}</Text>
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
        <View style={{ padding: 10 }}>
          <Text>Activity Log.</Text>
          <TextInput
            style={{ ...GlobalCss.field, height: 60, padding: 0 }}
            multiline={true}
          />
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
              <Text style={{ color: "#fff", fontWeight: "bold" }}>UPDATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewRecord;
