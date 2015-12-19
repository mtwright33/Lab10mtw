var express = require('express');
var router = express.Router();
var companyDal = require('../dal/company');
var addressesDal = require('../dal/addresses');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/all', function(req, res) {
    companyDal.GetAll(function (err, result) {
            if (err) throw err;
            //NOTE: res.send() will return plain text to the browser.
            //res.send(result);

            //res.render() will return render the template provided
            res.render('displayAllCompany.ejs', {rs: result});
        }
    );
});

/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var c_id = req.query.c_id;
    console.log("c_id: " + c_id);
    companyDal.GetByID(c_id, function(err, company_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving company with id " + c_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('company_edit', data);
        }
        else {
            addressesDal.GetAll(function(err, address_results) {

                console.log(company_results);
                var data = {
                    company: company_results,
                    address: address_results
                };
                res.render('company_edit', data);
            })
        }
    });
});


router.get('/create', function(req, res, next) {
    res.render('companyFormCreate.ejs');
});

router.get('/save', function(req, res, next) {
    console.log("cname equals: " + req.query.cname);
    console.log("numsub submitted was: " + req.query.numsub);

    companyDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});



router.get('/update', function(req, res, next) {
    companyDal.Update(req.query, function(err, result){
        var c_id = req.query.c_id;
        console.log("c_id: " + c_id);
        companyDal.GetByID(c_id, function(err, company_results){

            if(err) {
                var alert_class = 'alert-danger';
                var data = {
                    message: "Error retrieving company with id " + c_id + "<p>" + err + "</p>",
                    alert_class: alert_class
                };
                res.render('company_edit', data);
            }
            else {
                addressesDal.GetAll(function(err, address_results) {

                    var alert_class = 'alert-success';
                    var message = "Successfully Updated!";

                    console.log(company_results);
                    var data = {
                        message: message,
                        alert_class: alert_class,
                        company: company_results,
                        address: address_results
                    };
                    res.render('company_edit', data);
                })
            }
        });
    })
});

router.get('/delete', function(req, res) {
    console.log(req.query.c_id);

    companyDal.Delete(req.query.c_id, function(err, result) {
        res.send(req.query.cname + ' was successfully deleted.');
    });
});

module.exports = router;