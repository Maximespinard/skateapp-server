import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Admin from '../models/admin.js';

const router = express.Router();
dotenv.config();

const secret = process.env.SECRET;

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
    res.status(400).json({ message: "Une erreur s'est produite", err });
    console.log('err', err);
  }
};

export const logAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });

    const displayWrongCreds = () =>
      res
        .status(400)
        .json({ message: 'Identifiant ou mot de passe incorrect' });

    if (!existingAdmin) displayWrongCreds();

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordCorrect) displayWrongCreds();

    const token = jwt.sign({ username, id: existingAdmin._id }, secret, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: "Une erreur s'est produite", err });
    console.log('err', err);
  }
};

export default router;
