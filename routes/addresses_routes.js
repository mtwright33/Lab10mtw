var express = require('express');
var router = express.Router();
var addressesDal = require('../dal/addresses');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/all', function(req, res) {
    addressesDal.GetAll(function (err, result) {
        if (err) {
            console.log(err);
            res.send('there was an error');
        }
        console.log(result);
        res.render('address_list',
            {
                rs: result,
                title: 'this is a title'
            });
    });

});
router.get('/view', function(req, res, next) {
    console.log(req.query.cname);
    addressesDal.GetByID(req.query.cname,
        function(err, result) {
            res.render('address_info.ejs', {rs: result, another_value: 'test'});
        });
});

router.get('/edit', function(req, res, next) {
    addressesDal.GetByID(req.query.a_id, function(err, result) {
        res.render('address_edit.ejs', {rs: result});
    });
});

router.get('/update', function(req, res, next) {
    addressesDal.Update(req.query, function(err, result) {
        var alert_class = 'alert-success';
        var message = "Successfully Updated!";

        if(err) {
            alert_class = 'alert-danger';
            message = err;
        }
        console.log(result);
        res.render('address_edit.ejs', {rs: result, alert_class:alert_class, message: message});
    });
});

router.get('/create', function(req, res, next) {
    res.render('addressesFormCreate.ejs');
});

router.get('/save', function(req, res, next) {
    console.log("cname equals: " + req.query.cname);
    console.log("the st address submitted was: " + req.query.staddress);
    console.log("the city submitted was: " + req.query.city);
    console.log("the zip submitted was: " + req.query.zip);
    console.log("the state submitted was: " + req.query.state);

    addressesDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

module.exports = router;