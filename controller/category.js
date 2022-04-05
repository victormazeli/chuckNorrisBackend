import axios from "axios";
import express from "express";
import categoryDb from "../Model/Category.js";
const { req, res } = express;
export const pullCatData = async (req,res) => {
  //checks if category data is present, and deletes category entry in database if it exist
  const checkCategory = await categoryDb.find();
  if (checkCategory) {
    await categoryDb.deleteMany();
  }
  const catOption = {
    method: "get",
    url: "https://api.chucknorris.io/jokes/categories",
  };
  const pullData = await axios.request(catOption);
  const stored = pullData.data;

  //saves new entry with autoincrement id
  for (let i = 0; i < stored.length; i++) {
    await categoryDb.insertMany({
      id: i + 1,
      name: stored[i],
    });
  }
  return res.json({ message: "Category Added", stored: stored });
};

export const getCategory = async (req, res) => {
  try {
    const getCat = await categoryDb.find();
    return res.status(200).json({ getCat });
  } catch (error) {
    console.log(error);
  }
};
