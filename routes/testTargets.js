const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM test_targets');
  res.json(result.rows);
});

// POST
router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Body kosong' });
    }

    const { user_id, test_type, test_date } = req.body;

    const result = await db.query(
      'INSERT INTO test_targets (user_id, test_type, test_date) VALUES ($1,$2,$3) RETURNING *',
      [user_id, test_type, test_date]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;