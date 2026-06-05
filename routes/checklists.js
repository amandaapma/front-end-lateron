const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM checklists');
  res.json(result.rows);
});

// POST
router.post('/', async (req, res) => {
  const { user_id, daily_schedule_id } = req.body;

  const result = await db.query(
    'INSERT INTO checklists (user_id, daily_schedule_id) VALUES ($1,$2) RETURNING *',
    [user_id, daily_schedule_id]
  );

  res.json(result.rows[0]);
});

module.exports = router;