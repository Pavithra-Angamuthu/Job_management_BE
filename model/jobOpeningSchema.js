import mongoose from "mongoose";

const jobOpeningSchema = new mongoose.Schema({
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  location: {
    type: Array,
    required: true,
  },
  is_remote: {
    type: Boolean,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  keywords: {
    type: Array,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  job_description: {
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

var jobopening = mongoose.model("jobopening", jobOpeningSchema);

export { jobopening };
