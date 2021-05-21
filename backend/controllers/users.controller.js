const UserModule = require("./../modules/user.module");

exports.login = (req, res) => {
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
};

exports.createuser = (req, res) => {
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
};
