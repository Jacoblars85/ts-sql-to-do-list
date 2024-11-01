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
module.exports = router;
