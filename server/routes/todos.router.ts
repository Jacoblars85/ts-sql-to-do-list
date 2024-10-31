const router = require('express').Router();
const pool = require('../modules/pool');


//get route
router.get('/', (req, res) => {
    console.log('in get route');

    let queryText = `
    SELECT * FROM "todos" 
    ORDER BY "id";
    `
  pool.query(queryText)
    .then(result => {
        console.log('result', result.rows);
        // Sends back the results in an object
        res.send(result.rows);
  })
  .catch(err => {
    console.log('error getting todos', err);
    res.sendStatus(500);
  });
})



module.exports = router;
