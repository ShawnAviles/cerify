import mongoose from "mongoose";
import { User } from "./models/User.js"; // Adjust paths as needed
import { Caregiver } from "./models/Caregiver.js";
import { connectDB } from "./config/mongoConnection.js";
import "dotenv/config";

const seedDatabase = async () => {
  // await mongoose.connect("mongodb://localhost:27017/your_database_name", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  await connectDB();
  try {
    // Clear existing data
    await User.deleteMany({});
    await Caregiver.deleteMany({});

    // Create caregivers
    const caregiver1 = new Caregiver({
      username: "caregiver1",
      email: "caregiver1@example.com",
      password: "password123",
      firstName: "Alice",
      lastName: "Anderson",
      stats: {
        exercisesCompleted: 15,
        totalXp: 300,
        memoryLevel: 2,
      },
    });

    const caregiver2 = new Caregiver({
      username: "caregiver2",
      email: "caregiver2@example.com",
      password: "password456",
      firstName: "Bob",
      lastName: "Brown",
      stats: {
        exercisesCompleted: 10,
        totalXp: 200,
        memoryLevel: 1,
      },
    });

    await caregiver1.save();
    await caregiver2.save();

    // Create users associated with caregivers
    const user1 = new User({
      username: "user1",
      email: "user1@example.com",
      password: "userpassword123",
      firstName: "Charlie",
      lastName: "Chaplin",
      caregiverID: caregiver1._id,
      stats: {
        exercisesCompleted: 20,
        totalXp: 500,
        memoryLevel: 3,
      },
      goals: ["Improve memory", "Enhance focus"],
      difficulty: 2,
    });

    const user2 = new User({
      username: "user2",
      email: "user2@example.com",
      password: "userpassword456",
      firstName: "Diana",
      lastName: "Davids",
      caregiverID: caregiver2._id,
      stats: {
        exercisesCompleted: 5,
        totalXp: 100,
        memoryLevel: 1,
      },
      goals: ["Increase speed", "Strengthen problem-solving"],
      difficulty: 1,
    });

    await user1.save();
    await user2.save();

    // Link patients to caregivers
    caregiver1.patients.push(user1._id);
    caregiver2.patients.push(user2._id);

    await caregiver1.save();
    await caregiver2.save();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
