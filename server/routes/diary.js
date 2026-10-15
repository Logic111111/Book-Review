const express = require('express');
const DiaryEntry = require('../models/DiaryEntry');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/diary - Get recent public reading diary entries
router.get('/', async (req, res) => {
  try {
    const entries = await DiaryEntry.find()
      .populate('user', 'username displayName avatarColor')
      .populate('book', 'title author coverUrl publishedYear pageCount genres')
      .sort({ readDate: -1 })
      .limit(50);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/diary/user/:username - Get a reader's public reading diary
router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const entries = await DiaryEntry.find({ user: user._id })
      .populate('book', 'title author coverUrl publishedYear pageCount genres')
      .sort({ readDate: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/diary - Log a book to the authenticated user's reading diary
router.post('/', auth, async (req, res) => {
  try {
    const { bookId, status, readDate, rating, diaryNotes, pagesRead, isReread, liked, addedToFavorites } = req.body;
    const entry = await DiaryEntry.create({
      user: req.user.id,
      book: bookId,
      status: status || 'read',
      readDate: readDate || new Date(),
      rating,
      diaryNotes,
      pagesRead,
      isReread: Boolean(isReread),
      liked: Boolean(liked),
      addedToFavorites: Boolean(addedToFavorites),
    });
    const populated = await entry.populate('book', 'title author coverUrl publishedYear pageCount genres');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
