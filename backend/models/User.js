import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    caregiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caregiver",
      required: false,
    },
    stats: {
      exercisesCompleted: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalXp: {
        type: Number,
        default: 0,
        min: 0,
      },
      memoryLevel: {
        type: Number,
        default: 1,
        min: 1,
      },
      // TODO: Add other stats as needed
    },
    goals: {
      type: [String],
      default: [],
    },
    difficulty: {
      type: Number,
      default: 1,
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);