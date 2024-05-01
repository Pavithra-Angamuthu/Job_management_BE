import response from "../utils/response.js";
import { getToken } from "../middleware/auth.js";
import { employer } from "../model/employerScheme.js";

//Employer Create
const createEmployer = async (req, res) => {
  try {
    let payload = {
      ...req.body,
    };

    const exist = await employer.find({business_email: req.body.business_email});

    if(exist.length>0){
      return res
      .status(200)
      .send(response("Email Already Exist", {}, false, 200));
    }
    const data = await employer.create(payload);
    if (data) {
      return res.send(response("Employer Created Successfully"), data, true);
    } else {
      return res
        .status(200)
        .send(response("Failed to create employer", {}, false, 200));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//Employer Login
const employerLogin = async (req, res) => {
  try {
    const emailData = await employer.findOne({ business_email: req.query.email });
    if (emailData) {
      const passwordData = await employer.findOne({
        _id: emailData._id,
        password: req.query.password,
      });
      if (passwordData) {
        const data = await employer
          .aggregate([
            {
              $match: {
                business_email: req.query.email,
              },
            },
          ])
          .exec();
        const token = await getToken(passwordData);

        const outputData = {
          ...data[0],
          token: token,
        };
        if (data) {
          return res.send(response("Verified Successflly", outputData, true));
        } else {
          return res
            .status(200)
            .send(response("Incorrect Password", {}, false, 200));
        }
      } else {
        return res
          .status(200)
          .send(response("Incorrect Password", {}, false, 200));
      }
    } else {
      return res
        .status(200)
        .send(response("Email not exist ", {}, false, 200));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};


export { createEmployer, employerLogin};
