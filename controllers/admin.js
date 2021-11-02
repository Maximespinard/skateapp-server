import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Admin from '../models/admin.js';

const router = express.Router();

export const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin)
      return res.status(400).json({ message: "L'admin existe déjà" });

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await Admin.create({ username, password: hashedPassword });

    res
      .status(201)
      .json({ message: `L'admin ${username} a été créé avec succès`, result });
  } catch (err) {
    res.status(400).send({ message: "Une erreur s'est produite" });
    console.log('err', err);
  }
};

export default router;
