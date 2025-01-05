const mongoose = require("mongoose");
const { Member } = require("../models/member.model");
require("dotenv").config();

const uri = process.env.ATLAS_URI ||
  "mongodb://root:example@localhost:27017/betting-china?authSource=admin";

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log(
    "MongoDB database connection established successfully for deleting members",
  );

  try {
    const result = await Member.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} members.`);
  } catch (error) {
    console.error("Error deleting members:", error);
  } finally {
    mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
});
