
var express = require('express');
var router = express.Router();
var companygpaDal   = require('../dal/companygpa');

router.get('/all', function(req, res) {
    companygpaDal.GetAll(function (err, result) {
            if (err) throw err;
            //NOTE: res.send() will return plain text to the browser.
            //res.send(result);

            //res.render() will return render the template provided
            res.render('displaycompanygpa.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    companygpaDal.GetByID(req.query.c_id, function (err, result) {
            if (err) throw err;

            res.render('displaycompanygpa.ejs', {rs: result, c_id: req.query.c_id});
        }
    );
});

module.exports = router;