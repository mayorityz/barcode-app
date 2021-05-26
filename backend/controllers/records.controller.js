const NewRecordModule = require("./../modules/record.module");

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
