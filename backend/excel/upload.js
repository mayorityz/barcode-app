const readXlsxFile = require("read-excel-file/node");
const uploadModel = require("./../modules/record.module");

const records = [];

// File path.
readXlsxFile("./sulseg.xlsx").then((rows) => {
  try {
    const count = rows.length;
    for (let index = 1; index < 3; index++) {
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

      records.push({ assetName, assetType, barcode });
    }
    addToDB();
  } catch (error) {
    console.log(error);
  }
});

const addToDB = async () => {
  console.log(records);
  try {
    const result = await uploadModel.insertMany(records);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

// Readable Stream.
// readXlsxFile(fs.createReadStream("./sulseg.xlsx")).then((rows) => {
//   console.log(rows);
// });
