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
    longitude,
    latitude,
    remark,
    user,
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
      longitude,
      latitude,
      remark,
      user,
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

exports.getLogs = (req, res) => {
  try {
    LOGMODEL.find({}, (error, data) => {
      if (error)
        res.status(200).json({ status: "failed", msg: "An Error Occured!" });
      else res.status(200).json({ status: "success", msg: data });
    });
  } catch (error) {
    res.status(200).json({ status: "failed", msg: "An Error Occured!" });
  }
};
