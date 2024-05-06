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
    let payload = {
      ...req.body,
      updated_at: new Date(),
    };

    const jobopeningupdate = await jobopening
      .updateOne({ _id: req.body._id }, payload)
      .exec();

    if (jobopeningupdate) {
      return res.send(
        response("Job Opening Updated Successfully"),
        jobopeningupdate,
        true
      );
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
      {
        $lookup: {
          from: "jobapplies",
          localField: "_id",
          foreignField: "job_opening_id",
          as: "result",
        },
      },
      { $sort: { created_at: -1 } },
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

//Get Opneing List basedon emp id
const getJobOpeningBasedOnEmpId = async (req, res) => {
  try {
    const isRemote = req.query.is_remote === "true";
    const query = [
      {
        $match: {
          job_title: {
            $regex: `^${req.query.title}`,
            $options: "i",
          },

          is_remote: isRemote,
        },
      },
      { $sort: { created_at: -1 } },
    ];
    if (req.query.department !== "undefined") {
      query.push({
        $match: {
          department: req.query.department,
        },
      });
    }

    if (req.query.experience !== "undefined") {
      query.push({
        $match: {
          experience: req.query.experience,
        },
      });
    }

    if (req.query.specialization !== "undefined") {
      query.push({
        $match: {
          specialization: req.query.specialization,
        },
      });
    }

    if (req.query.location !== "undefined") {
      query.push({
        $match: {
          location: { $in: [req.query.location] },
        },
      });
    }

    if (req.query.id) {
      query.push({
        $match: {
          emp_id: mongoose.Types.ObjectId(req.query.id),
          //   status: true,
        },
      });
    }

    const count = await jobopening.countDocuments(query);

    if (req.query.skip) {
      query.push({
        $skip: parseInt(req.query.skip ? req.query.skip : 0),
      });
    }

    if (req.query.limit !== 'undefined') {
      query.push({
        $limit: parseInt(
          req.query.limit
        ),
      });
    }

    let data = {};
    if (query.length === 0) {
      data = await jobopening.find({ status: true });
    } else {
      data = await jobopening.aggregate(query);
    }

    if (data) return res.send(response("Job opening list", { count, data }));
    else
      return res
        .status(400)
        .send(response("Failed to get the List", {}, false, 400));
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//Get Opneing List
const getJobOpening = async (req, res) => {
  try {
    const isRemote = req.query.is_remote === "true";
    const query = [
        {
            $match: {
              job_title: {
                $regex: `^${req.query.title}`,
                $options: "i",
              },
              status: true,
    
              is_remote: isRemote,
            },
          },
          { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: "jobapplies",
          localField: "_id",
          foreignField: "job_opening_id",
          as: "result",
        },
      },
      { $sort: { created_at: -1 } },
    ];


    if (req.query.department !== "undefined") {
        query.push({
          $match: {
            department: req.query.department,
          },
        });
      }
  
      if (req.query.experience !== "undefined") {
        query.push({
          $match: {
            experience: req.query.experience,
          },
        });
      }
  
      if (req.query.specialization !== "undefined") {
        query.push({
          $match: {
            specialization: req.query.specialization,
          },
        });
      }
  
      if (req.query.location !== "undefined") {
        query.push({
          $match: {
            location: { $in: [req.query.location] },
          },
        });
      }
      const count = await jobopening.countDocuments(query);

      if (req.query.skip) {
        query.push({
          $skip: parseInt(req.query.skip ? req.query.skip : 0),
        });
      }
  
    if (req.query.limit !== 'undefined') {
      query.push({
        $limit: parseInt(
          req.query.limit
        ),
      });
    }

    

    let data = {};
    if (query.length === 0) {
      data = await jobopening.find({ status: true });
    } else {
      data = await jobopening.aggregate(query);
    }

    if (data) return res.send(response("Job opening list",{count,data}));
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
  getJobOpening,
};
