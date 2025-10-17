import Express from "express";
import dotenv from "dotenv";
import router from "./routing/router.js";
import connectDB from "./config/database.js";
import cors from "cors";

dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());

connectDB();

app.use("/task", router);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at port no: ${process.env.PORT}`);
});