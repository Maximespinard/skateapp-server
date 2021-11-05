import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Admin from '../models/admin.js';

dotenv.config();
const router = express.Router();
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
      expiresIn: '3d',
    });

    res.cookie('token', token, { httpOnly: true, maxAge: 60000 * 60 * 24 * 3 });
    res.status(200).json({ clientId: existingAdmin._id });
  } catch (err) {
    res.status(400).json({ message: "Une erreur s'est produite", err });
    console.log('err', err);
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (admin) return res.status(200).send({ admin });
    return res.status(404).end();
  } catch (error) {
    res.status(400).json({ message: "Une erreur s'est produite", err });
  }
};

export default router;
