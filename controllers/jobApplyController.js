import response from "../utils/response.js";
import { jobapply } from "../model/jobApplySchema.js";
import mongoose from "mongoose";

//Job Apply Create
const createJobApply = async (req, res) => {
  try {
    let payload = {
      ...req.body,
    };
    const data = await jobapply.create(payload);
    if (data) {
      return res.send(response("Job Apply Created Successfully"), data, true);
    } else {
      return res
        .status(400)
        .send(response("Failed to create Job Apply", {}, false, 400));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//Get Apply List
const getJobApplyBasedOnOpeningId = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          job_opening_id: mongoose.Types.ObjectId(req.query.id),
        },
      },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: "jobopenings",
          localField: "job_opening_id",
          foreignField: "_id",
          as: "jobopenings",
        },
      },
      {
        $unwind: {
          path: "$jobopenings",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    if (req.query.skip) {
      query.push({
        $skip: parseInt(req.query.skip ? req.query.skip : 0),
      });
    }

    if (req.query.limit !== "undefined" && req.query.limit) {
      query.push({
        $limit: parseInt(req.query.limit),
      });
    }

    const data = await jobapply.aggregate(query);

    if (data) return res.send(response("Job apply list", data));
    else
      return res
        .status(400)
        .send(response("Failed to get the List", {}, false, 400));
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

export { createJobApply, getJobApplyBasedOnOpeningId };
