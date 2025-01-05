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
  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  
  // Create 200 admins with random names
  const adminPromises = Array.from({ length: 200 }).map(async (_, i) => {
    let username;
    let exists = true;
    
    // Generate unique username
    while (exists) {
      username = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: "-",
        length: 2,
        style: "lowerCase",
      });
      const existingAdmin = await Admin.findOne({ username });
      if (!existingAdmin) exists = false;
    }

    return Admin.create({
      username,
      password: hashedPassword,
      role: i === 0 ? "main" : "sub" // First admin is main, rest are sub
    }).catch(error => {
      if (error.code === 11000) {
        console.log(`Admin ${username} already exists, skipping`);
      } else {
        console.error(`Error creating admin ${username}:`, error);
      }
    });
  });

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
        date: new Date().toISOString(),
      });

      await member.save();
      console.log(`Member ${i + 1} seeded`);
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        console.log(`Member ${i + 1} already exists, skipping`);
      } else {
        console.error(`Error seeding member ${i + 1}:`, error);
      }

      // Simple validation example
      if (date && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(date)) {
        return res.status(400).json({ message: 'Invalid date format. Expected YYYY-MM-DDTHH:mm:ss.sssZ.' });
      }
    }
  }

  console.log("All seeders completed successfully");
});
