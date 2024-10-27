import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
    caregiver: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    scores: {
      matching: {
        firstScore: Number,
        scoreHistory: [Number],
        runningAverage: Number,
        runningTotalAttempts: Number,
      },
    },
    goals: [String],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
