import express from "express";
import Namaz from "../models/namazModel.js"

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const newData = await Namaz.find();
    res.send(newData);
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const namazarr = await Namaz.findOne({name: body.name});
    if(!namazarr) {
      const newNamaz = new Namaz(body);
    await newNamaz.save();
    res.send(newNamaz);
    } else {
      const updatedNamaz = await Namaz.findOneAndUpdate(
        {name: body.name},
        {count: body.count},
        {new: true}
      )
      res.send(updatedNamaz);
    }
    
  } catch (error) {
    console.log(error)
  }
})

export default router;