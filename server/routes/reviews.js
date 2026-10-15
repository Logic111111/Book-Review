const express = require('express');
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/reviews - Get recent community reviews across all books
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'username displayName avatarColor')
      .populate('book', 'title author coverUrl publishedYear genres')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reviews/book/:bookId
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'username displayName avatarColor')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/reviews - Create a 5-star review with thoughts
router.post('/', auth, async (req, res) => {
  try {
    const { bookId, rating, thoughts, moodTags, containsSpoilers } = req.body;
    if (!bookId || !rating || !thoughts) {
      return res.status(400).json({ message: 'bookId, rating (1-5), and thoughts are required.' });
    }
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const review = await Review.create({
      book: bookId,
      user: req.user.id,
      rating: Number(rating),
      thoughts,
      moodTags: moodTags || [],
      containsSpoilers: Boolean(containsSpoilers),
    });

    book.ratingSum += Number(rating);
    book.ratingCount += 1;
    await book.save();

    const populated = await review.populate('user', 'username displayName avatarColor');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/reviews/:id/react - Toggle like on a review
router.post('/:id/react', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const userIdStr = String(req.user.id);
    const existingIdx = review.likes.findIndex((id) => String(id) === userIdStr);
    if (existingIdx >= 0) {
      review.likes.splice(existingIdx, 1);
    } else {
      review.likes.push(req.user.id);
    }
    await review.save();
    res.json({ likes: review.likes, likesCount: review.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
