import Express from "express";
import Task from "../models/taskModel.js";


const router = Express.Router();
router.use(Express.json());


router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.category || !data.date || !data.description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = new Task(data);
    await newTask.save();

    res.status(201).json({ message: "Task added successfully"});
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;