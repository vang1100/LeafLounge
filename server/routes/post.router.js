const express = require ('express');
const pool = require('../modules/pool');
const router = express.Router();

// need a get route for book details by user id

router.get('/', (req, res) => {
    const postID = req.params.id;
    const query = `
    SELECT * FROM "post"
    JOIN "book" ON "book"."id" = "post"."book_id"
    WHERE "book"."user_id" = $1;
  `;
  pool.query(query, [postID])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Getting movie details', err);
      res.sendStatus(500)
    })

});  

module.exports = router;