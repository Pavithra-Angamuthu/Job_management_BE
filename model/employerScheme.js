import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  business_email: {
    type: String,
    required: true,
  },
  business_name: {
    type: String,
    required: true,
  },
  password:{
    type: String,
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

var employer = mongoose.model("employer", employerSchema);

export { employer }; 
