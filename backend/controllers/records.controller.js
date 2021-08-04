const NewRecordModule = require("./../modules/record.module");
const { remover } = require("./../excel/index");
const readXlsxFile = require("read-excel-file/node");

// const excelPath = __dirname + "./../excel/sulseg.xlsx";
const excelPath = "../backend/excel/sulseg.xlsx";
// const path = "./../excel/sulseg.xlsx";

exports.addition = (req, res) => {
  console.log(req.body);
  const {
    address,
    reference,
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
      reference,
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
    NewRecordModule.findOne({ reference: barcode }, (er, docx) => {
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
  // File path.
  readXlsxFile(excelPath).then((rows) => {
    try {
      const count = rows.length;
      for (let index = 1; index <= 3087; index++) {
        console.log("updating : ", index);

        const element = rows[index];

        const assetType = element[0] || null;
        const assetName = element[1] || null;
        const modelnumber = element[2] || null;
        const brandname = element[3] || null;
        const serialnumber = element[4] || null;
        const outletcode = element[5] || null;
        const channel = element[6] || null;
        const tier = element[7] || null;
        const outletname = element[8] || null;
        const owner = element[9] || null;
        const phone = element[10] || null;
        const outletaddress = element[11] || null;
        const salesarea = element[12] || null;
        const dataset = element[13] || null;
        const barcode = element[14] || null;
        const contractor = element[15] || null;
        const date = element[16] || null;
        const q1 = element[17] || null;
        const q2 = element[18] || null;
        const q3 = element[19] || null;
        const q4 = element[20 || null];
        const CT = element[21] || null;
        const VStatus = element[22] || null;
        const remark = element[23] || null;
        const tradeverif = element[24] || null;

        records.push({
          assetName,
          assetType,
          barcode: remover(barcode),
          model: modelnumber,
          reference: barcode,
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
      // console.log(records);
    } catch (error) {
      console.log(error.message);
    }
  });
};

exports.queryDateRange = (req, res) => {
  const { from, to } = req.body;

  NewRecordModule.find(
    {
      date: {
        $lte: to,
        $gte: from,
      },
    },
    (err, ress) => {
      if (err) {
        res.status(201).json({ status: "failed", message: err.message });
      } else {
        res.status(201).json({ status: "success", message: ress });
      }
    }
  );
};
