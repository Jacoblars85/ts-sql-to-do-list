var router = require('express').Router();
var pool = require('../modules/pool');
//get route
router.get('/', function (req, res) {
    console.log('in get route');
    var queryText = "\n    SELECT * FROM \"todos\" \n    ORDER BY \"id\";\n    ";
    pool.query(queryText)
        .then(function (result) {
        console.log('result', result.rows);
        // Sends back the results in an object
        res.send(result.rows);
    })
        .catch(function (err) {
        console.log('error getting todos', err);
        res.sendStatus(500);
    });
});
//post route
router.post('/', function (req, res) {
    console.log(req.body);
    var sqlQueryText = "\n        INSERT INTO \"todos\"\n            (\"text\")\n            VALUES\n            ($1);\n    ";
    var sqlValues = [req.body.text];
    console.log(sqlValues, "are the values");
    pool.query(sqlQueryText, sqlValues)
        .then(function (result) {
        res.sendStatus(201);
        console.log('POST successful');
    }).catch(function (err) {
        console.log('error posting todos', err);
        res.sendStatus(500);
    });
});
//put route
router.put('/:id', function (req, res) {
    console.log(req.params.id);
    var sqlQueryText = "\n    UPDATE \"todos\"\n    SET \"isComplete\" = true\n    WHERE \"id\" = $1\n    ";
    var sqlValues = [req.params.id];
    pool.query(sqlQueryText, sqlValues)
        .then(function (result) {
        res.sendStatus(201);
        console.log('PUT successful');
    }).catch(function (err) {
        res.sendStatus(500);
        console.log('got an error in put route', err);
    });
});
//delete route
router.delete("/:id", function (req, res) {
    var sqlQueryText = "\n    DELETE FROM \"todos\"\n      WHERE \"id\" = $1;\n    ";
    var sqlValues = [req.params.id];
    pool.query(sqlQueryText, sqlValues)
        .then(function (result) {
        res.sendStatus(200);
    })
        .catch(function (err) {
        console.log("DELETE /todos SQL query failed: ", err);
        res.sendStatus(500);
    });
});
module.exports = router;
