import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Expert from "./expert/Expert.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

console.log("🌱 Seeding large dataset...");

// clear old data
await User.deleteMany();
await Expert.deleteMany();

/* ===============================
   CONFIG POOLS (for diversity)
================================ */

const categories = [
  "Vedic Astrology",
  "Tarot Reading",
  "Numerology",
  "Palmistry",
  "Face Reading",
  "KP Astrology",
];

const languagesPool = [
  "English",
  "Hindi",
  "Gujarati",
  "Tamil",
  "Kannada",
];

const timeSlotsPool = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset(arr, min = 1, max = 3) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function generateSlots() {
  return [
    {
      date: "2026-02-21",
      slots: getRandomSubset(timeSlotsPool, 3, 6),
    },
    {
      date: "2026-02-22",
      slots: getRandomSubset(timeSlotsPool, 2, 5),
    },
  ];
}

/* ===============================
   REAL LOGIN USERS
================================ */

const realCustomer = await User.create({
  name: "Test Customer",
  email: "customer@vedaz.com",
  password: "123456",
  role: "customer",
});

const realExpertUser = await User.create({
  name: "Dr. Real Expert",
  email: "expert@vedaz.com",
  password: "123456",
  role: "expert",
});

/* ===============================
   GENERATE 49 MORE CUSTOMERS
================================ */

const customerPromises = [];

for (let i = 1; i <= 49; i++) {
  customerPromises.push(
    User.create({
      name: `Customer ${i}`,
      email: `customer${i}@vedaz.com`,
      password: "123456",
      role: "customer",
    })
  );
}

await Promise.all(customerPromises);

/* ===============================
   GENERATE 49 MORE EXPERT USERS
================================ */

const expertUsers = [];

for (let i = 1; i <= 49; i++) {
  const user = await User.create({
    name: `Expert ${i}`,
    email: `expert${i}@vedaz.com`,
    password: "123456",
    role: "expert",
  });
  expertUsers.push(user);
}

/* ===============================
   CREATE EXPERT PROFILES
================================ */

const expertsData = [];

// real expert profile
expertsData.push({
  userId: realExpertUser._id,
  category: getRandom(categories),
  experience: 12,
  rating: 4.9,
  languages: ["Hindi", "English"],
  pricePerSession: 500,
  bio: "Senior Vedic astrologer with deep expertise.",
  availableSlots: generateSlots(),
});

// remaining expert profiles
expertUsers.forEach((user, index) => {
  expertsData.push({
    userId: user._id,
    category: getRandom(categories),
    experience: Math.floor(Math.random() * 15) + 3,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5–5.0
    languages: getRandomSubset(languagesPool, 1, 3),
    pricePerSession: Math.floor(Math.random() * 500) + 200,
    bio: `Professional ${getRandom(categories)} expert with years of experience.`,
    availableSlots: generateSlots(),
  });
});

await Expert.insertMany(expertsData);

console.log("✅ 50 customers created");
console.log("✅ 50 experts created");
console.log("🔐 Customer login: customer@vedaz.com / 123456");
console.log("🧑‍⚕️ Expert login: expert@vedaz.com / 123456");

process.exit();