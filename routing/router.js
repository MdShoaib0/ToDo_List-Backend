import Express from "express";
import Task from "../models/taskModel.js";
import Namaz from "../models/namazModel.js";

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

    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/:taskId", async (req, res) => {
  try {
    const taskID = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskID);
    
    if (!deletedTask) {
      return res.status(404).json({ 
        success: false, 
        message: "Task not found" 
      });
    }
    
    console.log("Successfully deleted task");
    res.status(200).json({ 
      success: true, 
      message: "Task deleted successfully" 
    });
    
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while deleting task" 
    });
  }
});

router.patch("/:taskId", async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const taskID = req.params.taskId;

    if (!title && !category && !description) {
      return res.status(400).json({ 
        error: "At least one field (title, category, or description) is required" 
      });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskID },
      { title, category, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
});

export default router;