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

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    if (password === user.password) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new  Error('No such user exists under this email');
};

UserSchema.statics.signup = async function (username, email, password, firstName, lastName, caregiverEmail, goals) {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error('Email already in use');
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error('Username already in use');
  }

  const caregiver = await mongoose.model("Caregiver").findOne({ email: caregiverEmail });
  if (!caregiver) {
    throw Error('No such caregiver exists under this email');
  }

  const newUser = await this.create({ username: username, email: email, password: password, firstName: firstName, lastName: lastName, caregiver: caregiver._id , stats: { exercisesCompleted: 0, totalXp: 0, memoryLevel: 1 }, goals: goals, difficulty: 1 });
  return newUser;
};

UserSchema.statics.updateProfile = async function (email, firstName, lastName, username) {
  const user = await this.findOne({ email });
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    await user.save();
    return user;
  }
  throw new Error("No such user exists under this email");
};

UserSchema.statics.updatePassword = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    user.password = password;
    await user.save();
    return user;
  }
  throw new Error("No such user exists under this email");
};

UserSchema.statics.updateStats = async function (email, exercisesCompleted, totalXp, memoryLevel) {
  const user = await this.findOne({ email });
  if (user) {
    user.stats.exercisesCompleted = exercisesCompleted;
    user.stats.totalXp = totalXp;
    user.stats.memoryLevel = memoryLevel;
    await user.save();
    return user;
  }
  throw new Error("No such user exists under this email");
};

UserSchema.statics.getInfo = async function (email) {
  const user = await this.findOne({ email });
  if (user) {
    return user;
  }
  throw new Error("No such user exists under this email");
};

UserSchema

export const User = mongoose.model("User", UserSchema);