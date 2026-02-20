import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
  {
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    category: String,
    experience: Number,
    rating: Number,
    languages: [String],
    pricePerSession: Number,
    bio: String,

    availableSlots: [
      {
        date: String,
        slots: [String],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Expert", expertSchema);