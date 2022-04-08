import JokesTable from "../Model/Jokes.js";
import axios from "axios";
/* import express from "express"; */
export const pullJokesData = async (req, res) => {
  const checkJokes = await JokesTable.find();
  if (checkJokes) {
    await JokesTable.deleteMany();
  }
  try {
    const catOption = {
      method: "get",
      url: "https://api.chucknorris.io/jokes/search?query=all",
    };
    const pullData = await axios.request(catOption);
    const stored = pullData.data.result;

    const jokesData = await JokesTable.insertMany(stored);
    res.json({ message: "Data entered succesfully", stored: stored });
  } catch (error) {
    console.error(error);
  }
};

export const getJokes = async (req, res) => {
  const { page, limit } = req.query;
  const jokeOption = {
    page: page || 1,
    limit: limit || 10,
    sort: { created_at: -1 },
  };
  try {
    const getJoke = await JokesTable.paginate({}, jokeOption);
    if (!getJoke.totalDocs) {
      return res.json({ message: "data wasnt found" });
    }
    return res.json(getJoke);
  } catch (error) {
    console.log(error);
  }
};

export const getJokeById = async (req, res) => {
  const id = req.params.id;
  const jokeOption = {
    page: 1,
    limit: 1,
    sort: { created_at: -1 },
  };
  try {
    const getJokeId = await JokesTable.paginate(
      {
        id: id,
      },
      jokeOption
    );
    if (!getJokeId.totalDocs) {
      return res.json({ message: "data wasnt found" });
    }
    return res.json(getJokeId);
  } catch (error) {
    console.log(error);
  }
};

export const getJokeByCat = async (req, res) => {
  let { page, limit, categories } = req.query;
  const jokeOption = {
    page: page || 1,
    limit: limit || 10,
    sort: { created_at: -1 },
  };

  try {
    if (categories === "Uncategorized" || !categories) {
      const getJokeByCat = await JokesTable.paginate(
        {
          categories: { $size: 0 },
        },
        jokeOption
      );
      if (!getJokeByCat.totalDocs) {
        return res.json({ message: "data wasnt found" });
      }
      return res.json(getJokeByCat);
    } else {
      const getJokeByCat = await JokesTable.paginate(
        {
          categories: { $all: [categories] },
        },
        jokeOption
      );
      if (!getJokeByCat.totalDocs) {
        return res.json({ message: "data wasnt found" });
      }
      return res.json(getJokeByCat);
    }
  } catch (error) {
    console.log(error);
  }
};

export const putJokeInteraction = async (req, res) => {
  const { id } = req.params;
  const { likes, dislikes } = req.body;
  try {
    if (likes) {
      const findLikes = await JokesTable.findOne({ id: id });
      const newLikes = findLikes.likes + likes;
      const updateInteraction = await JokesTable.findOneAndUpdate(
        { id: id },
        { likes: newLikes },
        {
          new: true,
        }
      );
      res.json(updateInteraction);
    } else {
      const findLikes = await JokesTable.findOne({ id: id });
      const newDisLikes = findLikes.dislikes + dislikes;
      const updateInteraction = await JokesTable.findOneAndUpdate(
        { id: id },
        { dislikes: newDisLikes },
        {
          new: true,
        }
      );
      res.json(updateInteraction);
    }
  } catch (error) {
    console.log(error);
  }
};
