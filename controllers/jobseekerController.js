import response from "../utils/response.js";
import { getToken } from "../middleware/auth.js";
import { jobseeker } from "../model/jobSeekerSchema.js";

//jobseeker Create
const createJobSeeker = async (req, res) => {
  try {
    let payload = {
      ...req.body,
    };
    const exist = await jobseeker.find({email: req.body.email});
    if(exist.length>0){
      return res
      .status(200)
      .send(response("Email Already Exist", {}, false, 200));
    }

    const data = await jobseeker.create(payload);
    if (data) {
      return res.send(response("Job Seeker Created Successfully"), data, true);
    } else {
      return res
        .status(400)
        .send(response("Failed to create Job Seeker", {}, false, 400));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//jobseeker Login
const jobSeekerLogin = async (req, res) => {
  try {
    const emailData = await jobseeker.findOne({ email: req.query.email });
    if (emailData) {
      const passwordData = await jobseeker.findOne({
        _id: emailData._id,
        password: req.query.password,
      });
      if (passwordData) {
        const data = await jobseeker
          .aggregate([
            {
              $match: {
                email: req.query.email,
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
            .status(400)
            .send(response("Incorrect Password", {}, false, 400));
        }
      } else {
        return res
          .status(400)
          .send(response("Incorrect Password", {}, false, 400));
      }
    } else {
      return res
        .status(400)
        .send(response("Email not exist ", {}, false, 400));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};


export { createJobSeeker, jobSeekerLogin};
