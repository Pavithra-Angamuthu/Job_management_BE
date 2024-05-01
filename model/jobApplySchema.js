import mongoose from "mongoose";

const jobApplySchema = new mongoose.Schema({
  job_opening_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  job_seeker_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  passed_out_year: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

var jobapply = mongoose.model("jobapply", jobApplySchema);

export { jobapply };
