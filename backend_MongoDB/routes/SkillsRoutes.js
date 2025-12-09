import express from 'express';
import Skills from '../models/SkillsModel.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const skills = await Skills.find();
  res.json(skills);
});

// POST
router.post('/', async (req, res) => {
  const newSkill = new Skills(req.body);
  const savedSkill = await newSkill.save();
  res.json(savedSkill);
});

// PUT
router.put('/:id', async (req, res) => {
  const updatedSkill = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedSkill);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Skills.findByIdAndDelete(req.params.id);
  res.json({ message: 'Elemento eliminado' });
});

export default router;
