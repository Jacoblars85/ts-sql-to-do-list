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
module.exports = router;
