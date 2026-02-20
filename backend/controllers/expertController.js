import Expert from "../expert/Expert.js";

/* ================= GET EXPERTS ================= */

export const getExperts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      language,
      minRating,
      maxPrice,
      search,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (language) query.languages = language;
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (maxPrice) query.pricePerSession = { $lte: Number(maxPrice) };

    if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const experts = await Expert.find(query)
      .populate("userId", "name email")
      .skip(skip)
      .limit(Number(limit))
      .sort({ rating: -1 });

    const total = await Expert.countDocuments(query);

    res.json({
      experts,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};