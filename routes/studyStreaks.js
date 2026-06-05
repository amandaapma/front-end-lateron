const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM study_streaks');
  res.json(result.rows);
});

// POST
router.post('/', async (req, res) => {
  const { user_id } = req.body;

  const result = await db.query(
    'INSERT INTO study_streaks (user_id) VALUES ($1) RETURNING *',
    [user_id]
  );

  res.json(result.rows[0]);
});

module.exports = router;