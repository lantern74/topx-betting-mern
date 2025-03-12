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

console.time("updateCacheScript"); // Start timing entire script execution

// Function to update the cached match data
async function updateCache() {
  console.time("updateCacheFunction"); // Start timing updateCache function
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
    console.error("Error updating cached match ", err);
  }
  console.timeEnd("updateCacheFunction"); // End timing updateCache function
}

// Function to update HK matches cache
async function updateHKCache() {
  console.time("updateHKCacheFunction"); // Start timing updateHKCache function
  try {
    console.log("Updating HK matches cache...");
    await updateHKMatches();
  } catch (err) {
    console.error("Error updating HK matches cache:", err);
  }
  console.timeEnd("updateHKCacheFunction"); // End timing updateHKCache function
}

console.log("Cache updater started (Bun script)");
// Schedule cache updates
console.time("updateCacheCall"); // Start timing updateCache() call
updateCache()
console.timeEnd("updateCacheCall"); // End timing updateCache() call

console.time("updateHKCacheCall"); // Start timing updateHKCache() call
updateHKCache()
console.timeEnd("updateHKCacheCall"); // End timing updateHKCache() call

console.timeEnd("updateCacheScript"); // End timing entire script execution
