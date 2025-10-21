import express from "express";
import Namaz from "../models/namazModel.js"

const router = express.Router();

/**
 * ✅ GET /task/:name
 * Fetch the count for a specific namaz (e.g., Fajr, Dhuhr)
 */
router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    let namaz = await Namaz.findOne({ name });

    // If no record found, create one with 0 count
    if (!namaz) {
      namaz = await Namaz.create({ name, namazCount: 0 });
    }

    res.json(namaz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while fetching data" });
  }
});

/**
 * ✅ POST /task/:name
 * Update or create a namaz record with new count
 */
router.post("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { namazCount } = req.body;

    if (typeof namazCount !== "number") {
      return res.status(400).json({ message: "Invalid namazCount" });
    }

    let namaz = await Namaz.findOne({ name });

    if (namaz) {
      namaz.namazCount = namazCount;
      await namaz.save();
    } else {
      namaz = await Namaz.create({ name, namazCount });
    }

    res.status(200).json({ message: `${name} count updated`, namaz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while updating data" });
  }
});

export default router;