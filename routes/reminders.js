const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM reminders');
  res.json(result.rows);
});

// POST
router.post('/', async (req, res) => {
  const { user_id, remind_time } = req.body;

  const result = await db.query(
    'INSERT INTO reminders (user_id, remind_time) VALUES ($1,$2) RETURNING *',
    [user_id, remind_time]
  );

  res.json(result.rows[0]);
});

module.exports = router;