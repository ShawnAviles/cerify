import mongoose from "mongoose";

// Caregiver Schema
const CaregiverSchema = new mongoose.Schema(
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
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

CaregiverSchema.statics.login = async function (email, password) {
  const caregiver = await this.findOne({ email });
  if (caregiver) {
    if (password === caregiver.password) {
      return caregiver;
    }
    throw new Error("Incorrect password");
  }
  throw new  Error('No such user exists under this email');
};

CaregiverSchema.statics.signup = async function (username, email, password, firstName, lastName) {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error('Email already in use');
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error('Username already in use');
  }
  
  const newCaregiver = await this.create({ username: username, email: email, password: password, firstName: firstName, lastName: lastName, stats: { exercisesCompleted: 0, totalXp: 0, memoryLevel: 1 }, patients: [] });
  return newCaregiver;
};

CaregiverSchema.statics.updateProfile = async function (email, firstName, lastName, username) {
  const caregiver = await this.findOne({ email });
  if (caregiver) {
    caregiver.firstName = firstName;
    caregiver.lastName = lastName;
    caregiver.username = username;
    await caregiver.save();
    return caregiver;
  }
  throw new Error('No such user exists under this email');
};

CaregiverSchema.statics.updatePassword = async function (email, password) {
  const caregiver = await this.findOne({ email });
  if (caregiver) {
    caregiver.password = password;
    await caregiver.save();
    return caregiver;
  }
  throw new Error('No such user exists under this email');
};

CaregiverSchema.statics.updateStats = async function (email, exercisesCompleted, totalXp, memoryLevel) {
  const caregiver = await this.findOne({ email });
  if (caregiver) {
    caregiver.stats.exercisesCompleted = exercisesCompleted;
    caregiver.stats.totalXp = totalXp;
    caregiver.stats.memoryLevel = memoryLevel;
    await caregiver.save();
    return caregiver;
  }
};

CaregiverSchema.statics.getInfo = async function (email) {
  const caregiver = await this.findOne({ email });
  if (caregiver) {
    return caregiver;
  }
  throw new Error('No such user exists under this email');
};

export const Caregiver = mongoose.model("Caregiver", CaregiverSchema);