var express = require('express');
var router = express.Router();
var schoolDal = require('../dal/school');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/all', function(req, res) {
    schoolDal.GetAll(function (err, result) {
            if (err) throw err;
            //NOTE: res.send() will return plain text to the browser.
            //res.send(result);

            //res.render() will return render the template provided
            res.render('displayAllSchool.ejs', {rs: result});
        }
    );
});

router.get('/create', function(req, res, next) {
    res.render('schoolFormCreate.ejs');
});

router.get('/save', function(req, res, next) {
    console.log("sname equals: " + req.query.sname);
    console.log("the st address submitted was: " + req.query.staddress);
    console.log("the city submitted was: " + req.query.city);
    console.log("the zip submitted was: " + req.query.zip);
    console.log("the state submitted was: " + req.query.state);

    schoolDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

module.exports = router;