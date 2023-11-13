
const mailModel = require('../models/mail.model');

class mailController {
  selectUserLate = async (req, res, next) => {
    try {
      const result = await mailModel.selectUserLate();
      res.status(200).json(result);
      console.log("get all users Late Successfully"); 

    }
    catch (err) {
      console.log("get all users Late Failed"); 
      next(err);
    }

  }


}

module.exports = new mailController();