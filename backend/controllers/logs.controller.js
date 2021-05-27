const LOGMODEL = require("./../modules/logs.module");

exports.addLog = (req, res) => {
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
    primary,
    secondary,
  } = req.body;

  try {
    const insertRecord = new LOGMODEL({
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
      primary,
      secondary,
    });

    insertRecord.save((er, response) => {
      if (er) {
        res.status(200).json({
          status: "error",
          message: "An Error Occured Place Try Again!",
        });
      } else {
        console.log(response);
        res.status(200).json({
          status: "success",
          message: "Log Inserted Successfully!",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
