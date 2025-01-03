const mongoose = require('mongoose');
const { Admin } = require('../models/admin.model');
const { Member } = require('../models/member.model');
const { Match } = require('../models/match.model');
const { Session } = require('../models/session.model');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const uri = process.env.ATLAS_URI || "mongodb://root:example@localhost:27017/betting-china?authSource=admin";

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', async () => {
    console.log("MongoDB database connection established successfully for seeding");

    try {
        // Seed Admins
        const hashedPasswordMain = await bcrypt.hash('mainadmin', 10);
        const hashedPasswordSub = await bcrypt.hash('subadmin', 10);
        const admins = [
            { username: 'mainAdmin', password: hashedPasswordMain, role: 'main' },
            { username: 'subAdmin1', password: hashedPasswordSub, role: 'sub' },
            { username: 'subAdmin2', password: hashedPasswordSub, role: 'sub' },
        ];
        await Admin.insertMany(admins);
        console.log('Admins seeded');

        const createdAdmins = await Admin.find();

        // Seed Members
        const members = [];
        for (let i = 0; i < 200; i++) {
            const hashedPassword = await bcrypt.hash(`member${i+1}`, 10);
            const randomAdmin = createdAdmins[Math.floor(Math.random() * createdAdmins.length)];
            members.push({
                username: `member${i+1}`,
                password: hashedPassword,
                price: Math.floor(Math.random() * 100),
                createdBy: randomAdmin._id,
                ipAddresses: ['127.0.0.1', '192.168.1.1', '10.0.0.1']
            });
        }
        await Member.insertMany(members);
        console.log('Members seeded');

        // Seed Matches
        const matches = [];
        for (let i = 0; i < 200; i++) {
            const randomAdmin = createdAdmins[Math.floor(Math.random() * createdAdmins.length)];
            matches.push({
                id: `match${i+1}`,
                time: new Date(),
                homeTeamName: `Home Team ${i+1}`,
                awayTeamName: `Away Team ${i+1}`,
                homeWinRate: `${Math.floor(Math.random() * 100)}%`,
                awayWinRate: `${Math.floor(Math.random() * 100)}%`,
                overRound: Math.random() * 10,
                evHome: Math.random() * 5,
                evAway: Math.random() * 5,
                pbrHome: Math.random() * 2,
                pbrAway: Math.random() * 2,
                kellyHome: Math.random() * 1,
                kellyAway: Math.random() * 1,
                createdBy: randomAdmin._id,
            });
        }
        await Match.insertMany(matches);
        console.log('Matches seeded');

        // Seed Sessions
        const createdMembers = await Member.find();
        const sessions = [];
        for (let i = 0; i < 200; i++) {
            const randomMember = createdMembers[Math.floor(Math.random() * createdMembers.length)];
            sessions.push({
                sessionId: uuidv4(),
                userId: randomMember._id,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            });
        }
        await Session.insertMany(sessions);
        console.log('Sessions seeded');

        console.log('All seeders completed successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
});
