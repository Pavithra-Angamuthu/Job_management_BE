import response from "../utils/response.js";
import { jobopening } from "../model/jobOpeningSchema.js";
import mongoose from "mongoose";

//Job Opening Create
const createJobOpening = async (req, res) => {
  try {
    let payload = {
      ...req.body,
    };
    const data = await jobopening.create(payload);
    if (data) {
      return res.send(response("Job Opening Created Successfully"), data, true);
    } else {
      return res
        .status(400)
        .send(response("Failed to create Job Opening", {}, false, 400));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//Update JOb Opening
const updateJobOpening = async (req, res) => {
  try {
    if (req.query.id) {
      let payload = {
        ...req.body,
        updated_at: new Date(),
      };

      let jobopeningupdate = await jobopening.updateOne(
        { _id: req.query.id },
        payload
      );
    }

    if (jobopeningupdate) {
      return res.send(response("Job Opening Updated Successfully"), data, true);
    } else {
      return res
        .status(400)
        .send(response("Failed to updated Job Opening", {}, false, 400));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//Get Opening List Based on Id
const getJobOpeningBasedonId = async (req, res) => {
  try {
    const data = await jobopening.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.query.id),
          status: true,
        },
      },
      {
        $lookup: {
          from: "employer",
          localField: "_id",
          foreignField: "emp_id",
          as: "employer",
        },
      },
      {
        $unwind: {
          path: "$employer",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    if (data) return res.send(response("Job Opening details", data));
    else
      return res
        .status(400)
        .send(response("Failed to get the details", {}, false, 400));
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//Get Opneing List
const getJobOpeningBasedOnEmpId = async (req, res) => {
  try {
    const query = [];
    if (req.query.id) {
        query.push({
        $match: {
          emp_id: mongoose.Types.ObjectId(req.query.id),
          //   status: true,
        },
      });
    }

    if (req.query.limit) {
        query.push({
        $limit: parseInt(
          req.query.limit
            ? req.query.limit == 0
              ? 999999
              : req.query.limit
            : 999999
        ),
      });
    }

    if (req.query.skip) {
        query.push({
        $skip: parseInt(req.query.skip ? req.query.skip : 0),
      });
    }

    let data = {};
    if(query.length === 0){
        data = await jobopening.find({status: true});
    }else{
         data = await jobopening.aggregate(query);
    }

    if (data) return res.send(response("Job opening list", data));
    else
      return res
        .status(400)
        .send(response("Failed to get the List", {}, false, 400));
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

export {
  createJobOpening,
  updateJobOpening,
  getJobOpeningBasedonId,
  getJobOpeningBasedOnEmpId,
};
