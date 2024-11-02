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


//post route
router.post('/', (req, res) => {
    console.log(req.body);
   
    const sqlQueryText = `
        INSERT INTO "todos"
            ("text")
            VALUES
            ($1);
    `
    const sqlValues = [req.body.text];
    console.log(sqlValues, "are the values");
    pool.query(sqlQueryText, sqlValues)
        .then((result) => {
            res.sendStatus(201);
            console.log('POST successful');
        }).catch((err) => {
          console.log('error posting todos', err);
            res.sendStatus(500);
        })
  })


  //put route
router.put('/:id', (req, res) => {
    console.log(req.params.id);
  
    const sqlQueryText = `
    UPDATE "todos"
    SET "isComplete" = true
    WHERE "id" = $1
    `
  
    const sqlValues = [req.params.id]
  
    pool.query(sqlQueryText, sqlValues)
    .then((result) => {
        res.sendStatus(201);
        console.log('PUT successful');
    }).catch((err) => {
        res.sendStatus(500);
        console.log('got an error in put route', err);
    })
  
  })


//delete route
router.delete(`/:id`, (req, res) => {
    const sqlQueryText = `
    DELETE FROM "todos"
      WHERE "id" = $1;
    `
    const sqlValues = [req.params.id]

    pool.query(sqlQueryText, sqlValues)
      .then((result) => {
        res.sendStatus(200)
      })
      .catch((err) => {
        console.log(`DELETE /todos SQL query failed: `, err)
        res.sendStatus(500)
      })
  });


module.exports = router;
