import { Router } from "express";
import { pullCatData, getCategory } from "../controller/category.js";
import {
  getJokes,
  pullJokeData,
  getJokeById,
  getJokeByCat,
  putJokeInteraction,
} from "../controller/jokes.js";
const router = Router();

router.get("/pullCatData", pullCatData);
router.get("/getCategory", getCategory);
router.get("/pullJokeData", pullJokeData);
router.get("/getJokes", getJokes);
router.get("/getJoke/:id", getJokeById);
router.get("/getJokeByCat", getJokeByCat);
router.put("/getJoke/:id", putJokeInteraction);
export default router;
