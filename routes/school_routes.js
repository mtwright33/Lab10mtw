var express = require('express');
var router = express.Router();
var schoolDal   = require('../dal/school');

router.get('/', function (req, res) {
    schoolDal.GetBysID(req.query.s_id, function (err, result) {
            if (err) throw err;

            res.render('displayschoolinfo.ejs', {rs: result, s_id: req.query.s_id});
        }
    );
});

module.exports = router;