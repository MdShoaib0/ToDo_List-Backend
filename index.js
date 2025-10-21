import Express from "express";
import router from "./routing/router.js";
import namazRouter from "./routing/namazRouter.js"
import connectDB from "./config/database.js";
import cors from "cors";

const app = Express();
app.use(cors());
app.use(Express.json());

connectDB();

app.use("/task", router);
app.use("/namaz", namazRouter)

app.listen(5000, () => {
  console.log(`🚀 Server is running at port no: ${5000}`);
});