import response from "../utils/response.js";
import { jobopening } from "../model/jobOpeningSchema.js";
import { jobapply } from "../model/jobApplySchema.js";

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
        $lookup: {
          from: "jobseeker",
          localField: "_id",
          foreignField: "job_seeker_id",
          as: "jobseeker",
        },
      },

      {
        $unwind: {
          path: "$jobseeker",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    if (req.query.id) {
      data.shift({
        $match: {
          job_opening_id: mongoose.Types.ObjectId(req.query.id),
          //   status: true,
        },
      });
    }

    if (req.query.limit) {
      data.push({
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
      data.push({
        $skip: parseInt(req.query.skip ? req.query.skip : 0),
      });
    }

    const data = await jobopening.aggregate(query);

    if (data) return res.send(response("Job apply list", data));
    else
      return res
        .status(400)
        .send(response("Failed to get the List", {}, false, 400));
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

export {
    createJobApply,
  getJobApplyBasedOnOpeningId,
};
