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
    caregiverID: {
      type: String,
      required: false,
    },
    stats: {
      exercisesCompleted: {
        type: Number,
        required: false,
      },
      totalXp: {
        type: Number,
        required: false
      },
      memoryLevel: {
        type: Number,
        required: false,
      }
      // TODO: Other 3 stats tbd
    },
    goals: [String],
  },
  { timestamps: true }
);

const caregiverSchema = new mongoose.Schema(
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
    patients: [String],
  },
  { timestamps: true }
)

export default mongoose.model("User", UserSchema);
