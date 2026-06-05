const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM daily_schedules');
  res.json(result.rows);
});

// POST
router.post('/', async (req, res) => {
  const { roadmap_id, schedule_date, topic, duration_minutes } = req.body;

  const result = await db.query(
    'INSERT INTO daily_schedules (roadmap_id, schedule_date, topic, duration_minutes) VALUES ($1,$2,$3,$4) RETURNING *',
    [roadmap_id, schedule_date, topic, duration_minutes]
  );

  res.json(result.rows[0]);
});

module.exports = router;