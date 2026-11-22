import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minlength: [7, "Phone number is too short"],
      maxlength: [20, "Phone number is too long"],
    },

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [120, "Company name is too long"],
    },

    source: {
      type: String,
      required: [true, "Lead source is required"],
      enum: [
        "Website",
        "LinkedIn",
        "Referral",
        "Cold Call",
        "Email Campaign",
        "Social Media",
        "Other",
      ],
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ name: 1 });
leadSchema.index({ status: 1, createdAt: -1 });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
