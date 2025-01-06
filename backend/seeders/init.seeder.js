const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models/admin.model");
const TelemetryService = require("../services/telemetry.service");
require("dotenv").config();

const uri = process.env.ATLAS_URI ||
  "mongodb://root:example@localhost:27017/betting-china?authSource=admin";

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log(
    "MongoDB database connection established successfully for seeding",
  );

  if (process.argv.length < 3) {
    console.error("Password argument is required.");
    process.exit(1);
  }

  const password = process.argv[2];

  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists, skipping creation.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
      role: "main",
    });

    await admin.save();
    await TelemetryService.log("info", `Admin created: admin`);
    console.log("Admin user created successfully.");
  } catch (error) {
    await TelemetryService.log("error", "Error seeding admin", {
      error: error.message,
    });
    console.error("Error seeding admin:", error);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
});
