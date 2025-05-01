const express = require ('express');
const pool = require('../modules/pool');
const router = express.Router();

// Fetch posts for a specific book belonging to the logged-in user
router.get('/:book_id', (req, res) => {
  // Get the authenticated user's ID
  const user_id = req.user.id;
  // Get the book_id from the URL parameter
  const book_id = req.params.book_id;

  // Query: Get posts for this user AND this specific book
  const query = `
    SELECT * FROM "post"
    JOIN "book" ON "book"."id" = "post"."book_id"
    WHERE "user_id" = $1 AND "book_id" = $2;
  `;

  pool.query(query, [user_id, book_id])
    .then(result => {
      if (result.rows.length === 0) {
        // No posts found for this user/book combination
        res.status(404).send('No posts found for this book');
      } else {
        res.send(result.rows);
      }
    })
    .catch(err => {
      console.error('ERROR: Fetching posts', err);
      res.sendStatus(500);
    });
});


module.exports = router;