const NewRecordModule = require("./../modules/record.module");
const readXlsxFile = require("read-excel-file/node");

exports.addition = (req, res) => {
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
    salesArea,
    assetType,
    assetName,
    brandName,
    channel,
    outletCode,
    tier,
    longitude,
    latitude,
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
      salesArea,
      assetType,
      assetName,
      brandName,
      channel,
      outletCode,
      tier,
      longitude,
      latitude,
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
};

exports.fetchrecord = (req, res) => {
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
};

exports.fetchAll = (req, res) => {
  try {
    NewRecordModule.find({}, (er, docx) => {
      if (er) {
        return res.status(400).send(er);
      }

      res.status(200).json({ document: docx });
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.upload = (req, res) => {
  const records = [];

  const addToDB = async () => {
    console.log(records);
    try {
      await NewRecordModule.insertMany(records, (er, docx) => {
        res.status(200).json(docx);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  try {
    // File path.
    readXlsxFile("../backend/excel/sulseg.xlsx").then((rows) => {
      try {
        const count = rows.length;
        for (let index = 1; index <= count; index++) {
          console.log("updating : ", index);

          const element = rows[index];

          const assetType = element[0];
          const assetName = element[1];
          const modelnumber = element[2];
          const brandname = element[3];
          const serialnumber = element[4];
          const outletcode = element[5];
          const channel = element[6];
          const tier = element[7];
          const outletname = element[8];
          const owner = element[9];
          const phone = element[10];
          const outletaddress = element[11];
          const salesarea = element[12];
          const dataset = element[13];
          const barcode = element[14];
          const contractor = element[15];
          const date = element[16];
          const q1 = element[17];
          const q2 = element[18];
          const q3 = element[19];
          const q4 = element[20];
          const CT = element[21];
          const VStatus = element[22];
          const remark = element[23];
          const tradeverif = element[24];

          records.push({
            assetName,
            assetType,
            barcode,
            model: modelnumber,
            brandName: brandname,
            serial: serialnumber,
            outletCode: outletcode,
            outlet: outletname,
            owner,
            phone,
            chiller: contractor,
            address: outletaddress,
            salesArea: salesarea,
            channel,
            tier,
            date,
            CT,
            dataset,
            q1,
            q2,
            q3,
            q4,
            tradeverif,
            remark,
            VStatus,
          });
        }
        addToDB();
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
