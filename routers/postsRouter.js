import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

export const postsRouter = Router();
const collection = db.collection("posts");

postsRouter.post("/", async (req, res) => {
  try {
    const post = await collection.insertOne({ ...req.body });
    return res.json({
      message: `Post (${post.insertedId}) has been created`,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

postsRouter.get("/", async (req, res) => {
  try {
    const posts = await collection.find({}).toArray();
    return res.json({
      data: posts,
    });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

const { ObjectId } = require("mongodb");

postsRouter.get("/:id", async (req, res) => {
  try {
    const postId = new ObjectId(req.params.id);
    const post = await collection.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.json({
      data: post,
    });
  } catch (error) {
    console.error("Error retrieving post:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

const { ObjectId } = require("mongodb");

postsRouter.put("/:id", async (req, res) => {
  try {
    const postId = new ObjectId(req.params.id);

    const result = await collection.updateOne(
      { _id: postId },
      { $set: { ...req.body } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.json({
      message: "Post has been updated",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

postsRouter.delete("/:id", async (req, res) => {
  try {
    const postId = new ObjectId(req.params.id);

    const result = await collection.deleteOne({ _id: postId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.json({
      message: "Post has been deleted",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
