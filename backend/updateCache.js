#!/usr/bin/env bun
// updateCaches.bun
// import dotenv from "dotenv";
import mongoose from "mongoose";

import { updateHKMatches } from "./getAPIFixtureId";
import MatchService from "./services/match.service";
import Cache from "./models/cache.model";

const uri = process.env.ATLAS_URI || "mongodb://root:example@localhost:27017/betting-china?authSource=admin";
await mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Function to update the cached match data
async function updateCache() {
  try {
    console.log("Updating cached match data...");
    const data = await MatchService.getMatchData();
    if (data.length > 0) {
      await Cache.findOneAndUpdate(
        { key: "matchData" },
        { data, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.error("Error updating cached match data:", err);
  }
}

// Function to update HK matches cache
async function updateHKCache() {
  try {
    console.log("Updating HK matches cache...");
    await updateHKMatches();
  } catch (err) {
    console.error("Error updating HK matches cache:", err);
  }
}

console.log("Cache updater started (Bun script)");
// Schedule cache updates
updateCache()
updateHKCache()

