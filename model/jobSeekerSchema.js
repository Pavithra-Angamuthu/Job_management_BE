import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  },
  phone_number:{
    type: Number,
    required: true
  },
  confirm_password:{
    type: String,
    required: true
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

var jobseeker = mongoose.model("jobseeker", jobSeekerSchema);

export { jobseeker }; 
