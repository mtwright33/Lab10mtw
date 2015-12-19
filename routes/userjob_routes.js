var express = require('express');
var router = express.Router();
var userjobDal   = require('../dal/userjob');

router.get('/all', function(req, res) {
    userjobDal.GetAll(function (err, result) {
            if (err) throw err;
            //NOTE: res.send() will return plain text to the browser.
            //res.send(result);

            //res.render() will return render the template provided
            res.render('displayuserjob.ejs', {rs: result});
        }
    );
});
module.exports = router;