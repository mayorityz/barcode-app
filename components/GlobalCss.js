import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EC7357",
  },
  h1: {
    fontSize: 23,
    marginBottom: 10,
  },
  tapBtn: {
    backgroundColor: "#A9FBD7",
    borderWidth: 1,
    borderColor: "#fff",
    width: 150,
    height: 150,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tapBtn2: {
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 73,
    right: 0,
  },
  form: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 2,
  },
  formGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 7,
  },
  input: {
    width: "45%",
  },
  field: {
    paddingLeft: 5,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    backgroundColor: "#f6f6f6",
  },
  label: {
    color: "red",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#161FF0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
    padding: 10,
  },
  buttonDisabled: {
    width: "100%",
    height: 50,
    backgroundColor: "#473BF0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
    padding: 10,
  },
  headerBanner: {
    backgroundColor: "#f6f6f6",
    height: 40,
    fontSize: 30,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 50,
  },
  pickerStyle: {
    height: 30,
    borderBottomColor: "#000",
    borderBottomWidth: 5,
  },
  errorMsg: {
    backgroundColor: "red",
    height: 30,
    width: "100%",
    marginTop: 10,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  successMsg: {
    backgroundColor: "green",
    height: 30,
    width: "100%",
    marginTop: 10,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  textField: {
    width: 320,
    height: 120,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
});
