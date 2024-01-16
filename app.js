import express from "express";
import { client } from "./utils/db.js";
import { postsRouter } from "./routers/postsRouter.js";

async function init() {
  const app = express();
  const port = 4000;

  try {
    await client.connect();
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  app.use(express.json());

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.use("/posts", postsRouter);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
