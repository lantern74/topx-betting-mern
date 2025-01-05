const mongoose = require("mongoose");
const { uniqueNamesGenerator, adjectives, colors, animals } = require(
  "unique-names-generator",
);
const { Admin } = require("../models/admin.model");
const { Member } = require("../models/member.model");
const { Match } = require("../models/match.model");
const { Session } = require("../models/session.model");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const uri = process.env.ATLAS_URI ||
  "mongodb://root:example@localhost:27017/betting-china?authSource=admin";

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log(
    "MongoDB database connection established successfully for seeding",
  );

  // Seed Admins
  const hashedPasswordMain = await bcrypt.hash("mainadmin", 10);
  const hashedPasswordSub = await bcrypt.hash("subadmin", 10);
  // Create array of admin promises
  const adminPromises = [];
  
  // Add main admin
  adminPromises.push(
    Admin.create({
      username: "mainAdmin",
      password: hashedPasswordMain,
      role: "main"
    }).catch(error => {
      if (error.code === 11000) {
        console.log("mainAdmin already exists, skipping");
      } else {
        console.error("Error creating mainAdmin:", error);
      }
    })
  );

  // Add 10 sub admins
  for (let i = 1; i <= 10; i++) {
    adminPromises.push(
      Admin.create({
        username: `subAdmin${i}`,
        password: hashedPasswordSub,
        role: "sub"
      }).catch(error => {
        if (error.code === 11000) {
          console.log(`subAdmin${i} already exists, skipping`);
        } else {
          console.error(`Error creating subAdmin${i}:`, error);
        }
      })
    );
  }

  // Run all admin creations concurrently
  await Promise.all(adminPromises);
  console.log("Admin seeding completed");

  const createdAdmins = await Admin.find();

  // Seed Members
  // Seed Members individually
  for (let i = 0; i < 200; i++) {
    try {
      const hashedPassword = await bcrypt.hash(`member${i + 1}`, 10);
      const randomAdmin =
        createdAdmins[Math.floor(Math.random() * createdAdmins.length)];
      
      // Generate unique slug
      let slug;
      let exists = true;
      while (exists) {
        slug = uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          separator: "-",
          length: 2,
          style: "lowerCase",
        });
        const existingMember = await Member.findOne({ slug });
        if (!existingMember) exists = false;
      }

      const member = new Member({
        username: `member${i + 1}`,
        password: hashedPassword,
        price: Math.floor(Math.random() * 100),
        createdBy: randomAdmin._id,
        ipAddresses: ["127.0.0.1", "192.168.1.1", "10.0.0.1"],
        slug,
        date: new Date(),
      });

      await member.save();
      console.log(`Member ${i + 1} seeded`);
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        console.log(`Member ${i + 1} already exists, skipping`);
      } else {
        console.error(`Error seeding member ${i + 1}:`, error);
      }
    }
  }

  console.log("All seeders completed successfully");
});
