import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Team } from "../models/Team.js";
import { Activity } from "../models/Activity.js";
import { Leaderboard } from "../models/Leaderboard.js";
import { Workout } from "../models/Workout.js";
/**
 * Seed the octofit_db database with test data
 * This script populates all collections with realistic sample data
 */
const mongoUri = "mongodb://localhost:27017/octofit_db";
async function seedDatabase() {
    try {
        console.log("🌱 Connecting to MongoDB...");
        await mongoose.connect(mongoUri);
        console.log("✅ Connected to MongoDB");
        // Clear existing data
        console.log("🗑️  Clearing existing collections...");
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await Leaderboard.deleteMany({});
        await Workout.deleteMany({});
        // Create sample users
        console.log("👥 Creating sample users...");
        const users = await User.insertMany([
            {
                username: "alex_runner",
                email: "alex@example.com",
                password: "hashed_password_1",
                firstName: "Alex",
                lastName: "Runner",
            },
            {
                username: "jordan_cyclist",
                email: "jordan@example.com",
                password: "hashed_password_2",
                firstName: "Jordan",
                lastName: "Cyclist",
            },
            {
                username: "casey_swimmer",
                email: "casey@example.com",
                password: "hashed_password_3",
                firstName: "Casey",
                lastName: "Swimmer",
            },
            {
                username: "morgan_athlete",
                email: "morgan@example.com",
                password: "hashed_password_4",
                firstName: "Morgan",
                lastName: "Athlete",
            },
        ]);
        console.log(`✅ Created ${users.length} users`);
        // Create sample teams
        console.log("👫 Creating sample teams...");
        const teams = await Team.insertMany([
            {
                name: "Cardio Kings",
                description: "Team focused on cardiovascular fitness",
                members: [users[0]._id, users[1]._id],
                createdBy: users[0]._id,
            },
            {
                name: "Strength Squad",
                description: "Team focused on strength training",
                members: [users[2]._id, users[3]._id],
                createdBy: users[2]._id,
            },
        ]);
        console.log(`✅ Created ${teams.length} teams`);
        // Create sample activities
        console.log("🏃 Creating sample activities...");
        const activities = await Activity.insertMany([
            {
                userId: users[0]._id,
                type: "Running",
                duration: 30,
                distance: 5,
                calories: 350,
                date: new Date("2026-06-01"),
                description: "Morning jog in the park",
            },
            {
                userId: users[0]._id,
                type: "Running",
                duration: 45,
                distance: 8,
                calories: 550,
                date: new Date("2026-06-02"),
                description: "Extended run - tempo pace",
            },
            {
                userId: users[1]._id,
                type: "Cycling",
                duration: 60,
                distance: 25,
                calories: 600,
                date: new Date("2026-06-01"),
                description: "Weekend cycling trip",
            },
            {
                userId: users[2]._id,
                type: "Swimming",
                duration: 40,
                distance: 2,
                calories: 400,
                date: new Date("2026-06-02"),
                description: "Pool workout - freestyle and backstroke",
            },
            {
                userId: users[3]._id,
                type: "Strength Training",
                duration: 50,
                calories: 450,
                date: new Date("2026-06-02"),
                description: "Upper body strength session",
            },
        ]);
        console.log(`✅ Created ${activities.length} activities`);
        // Create sample leaderboard entries
        console.log("🏆 Creating leaderboard entries...");
        const leaderboard = await Leaderboard.insertMany([
            {
                userId: users[0]._id,
                teamId: teams[0]._id,
                rank: 1,
                totalPoints: 900,
                activitiesCompleted: 2,
                totalCalories: 900,
            },
            {
                userId: users[1]._id,
                teamId: teams[0]._id,
                rank: 2,
                totalPoints: 600,
                activitiesCompleted: 1,
                totalCalories: 600,
            },
            {
                userId: users[2]._id,
                teamId: teams[1]._id,
                rank: 1,
                totalPoints: 400,
                activitiesCompleted: 1,
                totalCalories: 400,
            },
            {
                userId: users[3]._id,
                teamId: teams[1]._id,
                rank: 2,
                totalPoints: 450,
                activitiesCompleted: 1,
                totalCalories: 450,
            },
        ]);
        console.log(`✅ Created ${leaderboard.length} leaderboard entries`);
        // Create sample workouts
        console.log("💪 Creating sample workouts...");
        const workouts = await Workout.insertMany([
            {
                userId: users[0]._id,
                name: "Morning Run Routine",
                type: "Cardio",
                difficulty: "Intermediate",
                duration: 30,
                description: "A steady-paced morning run",
                exercises: ["Warm-up jog", "Steady run", "Cool-down walk"],
            },
            {
                userId: users[1]._id,
                name: "Urban Cycling",
                type: "Cardio",
                difficulty: "Advanced",
                duration: 60,
                description: "City cycling with varied terrain",
                exercises: ["Flat road cycling", "Hill climbs", "Sprint intervals"],
            },
            {
                userId: users[2]._id,
                name: "Swimming Technique",
                type: "Cardio",
                difficulty: "Intermediate",
                duration: 40,
                description: "Pool-based swimming workout",
                exercises: ["Freestyle", "Backstroke", "Cool-down"],
            },
            {
                userId: users[3]._id,
                name: "Upper Body Strength",
                type: "Strength",
                difficulty: "Advanced",
                duration: 50,
                description: "Focused upper body training",
                exercises: ["Push-ups", "Pull-ups", "Dumbbell press", "Rows"],
            },
        ]);
        console.log(`✅ Created ${workouts.length} workouts`);
        console.log("\n🎉 Database seeding completed successfully!");
        console.log(`
📊 Summary:
  - Users: ${users.length}
  - Teams: ${teams.length}
  - Activities: ${activities.length}
  - Leaderboard Entries: ${leaderboard.length}
  - Workouts: ${workouts.length}
    `);
        await mongoose.connection.close();
        console.log("✅ Database connection closed");
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}
seedDatabase();
