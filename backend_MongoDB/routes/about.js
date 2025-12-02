import express from 'express';
import About from '../models/About.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const abouts = await About.find();
  res.json(abouts);
});

// POST
router.post('/', async (req, res) => {
  const newAbout = new About(req.body);
  const savedAbout = await newAbout.save();
  res.json(savedAbout);
});

// PUT
router.put('/:id', async (req, res) => {
  const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedAbout);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: 'Elemento eliminado' });
});

export default router;
