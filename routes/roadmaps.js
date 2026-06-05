const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM roadmaps');
  res.json(result.rows);
});

// POST
router.post('/', async (req, res) => {
  const { user_id, test_target_id, status } = req.body;

  const result = await db.query(
    'INSERT INTO roadmaps (user_id, test_target_id, status) VALUES ($1,$2,$3) RETURNING *',
    [user_id, test_target_id, status]
  );

  res.json(result.rows[0]);
});

module.exports = router;