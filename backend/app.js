const express = require("express");
const cors = require("cors");
const app = express();
const Port = process.env.PORT || 4500;
// const cookieParser = require("cookie-parser");
const DATABASE = require("./helpers/Database");
const NewRecordModule = require("./modules/record.module");
const UserModule = require("./modules/user.module");

var origin_ = process.env.NODE_ENV
  ? "https://yoruba-community.herokuapp.com/"
  : "http://localhost:3000";

app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/addition", (req, res, next) => {
  console.log(req.body);
  const {
    address,
    barcode,
    brand,
    chiller,
    model,
    outlet,
    owner,
    phone,
    serial,
  } = req.body;

  try {
    const saveNew = new NewRecordModule({
      barcode,
      model,
      brand,
      serial,
      outlet,
      owner,
      phone,
      chiller,
      address,
    });

    saveNew.save((er, docx) => {
      if (er) {
        console.log(er);
        res.status(200).json({
          status: "failed",
          message: "An Error Occured, please try again!",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: " New Record Created Successfully!!!",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.use("/fetchrecord", (req, res, next) => {
  const { barcode } = req.body;
  console.log(barcode);
  try {
    NewRecordModule.findOne({ barcode }, (er, docx) => {
      if (er) {
        res.status(200).json({ status: "failed", data: [] });
      } else {
        res.status(200).json({ status: "success", data: docx });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.use("/login", (req, res, next) => {
  const { username, password } = req.body;
  try {
    UserModule.findOne({ username, password }, (err, response) => {
      console.log(response);
      if (err)
        res.status(200).json({ status: "failed", msg: "Invalid Credentials" });
      else {
        if (response === null)
          res
            .status(200)
            .json({ status: "failed", msg: "Invalid Credentials" });
        else
          res
            .status(200)
            .json({ status: "success", msg: "Login Successfully" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.use(
  (createuser = (req, res, next) => {
    const { username, password } = req.body;
    try {
      let newUser = new UserModule({ username, password });
      newUser.save((err, docx) => {
        if (err) {
          res
            .status(200)
            .json({ status: "failed", msg: "Error Occured, Try again" });
          return;
        }

        res
          .status(200)
          .json({ status: "success", msg: "User Created Successfully" });
      });
    } catch (error) {
      console.log(error.message);
    }
  })
);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// catch server errors and respond with 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// server
DATABASE.then(() => {
  console.log("db is connected");
  app.listen(Port, () => {
    console.log(`running on port:${Port}`);
  });
}).catch((err) => {
  console.log(err);
});
