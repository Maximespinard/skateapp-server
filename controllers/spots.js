import express from 'express';

import Spots from '../models/spots.js';

const router = express.Router();

export const getSpots = async (req, res) => {
  try {
    const data = await Spots.find({});
    console.log(data);
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send({ message: "Une erreur s'est produite" });
    console.log('err', err);
  }
};

export default router;
