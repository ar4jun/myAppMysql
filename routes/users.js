var db = require('../config/db');
// db.connect();


exports.home = function(req, res) {
    res.render('home', { title: 'NODE JS' })
};
exports.insert = function(req, res) {
    res.render('insert')
    res.end();
};
exports.insertinto = function(req, res) {

    var user = req.param('userName');
    var pass = req.param('password');
    var post = { user_name: user, password: pass }
    db.query('INSERT INTO users SET ?', post,
        function(err, result) {
            if (err) throw err;

            res.render('insert')

        });
};
exports.views = function(req, res) {
    db.query('SELECT * FROM users ', function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        res.render('view', { data: rows });

    });

};
exports.delete = function(req, res) {
    var id = req.param('id');
    db.query('DELETE FROM users WHERE id= ?', id, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        res.redirect('/views');

    });
};

exports.update1 = function(req, res) {
    var id = req.param('id');
    db.query('SELECT * FROM users WHERE id= ?', id, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        res.render('update2', { data: rows });

    });

};
exports.update = function(req, res) {
    var id = req.param('id');
    var username = req.param('userName');
    var password = req.param('password');
    db.query('UPDATE users SET user_name = ?,password=? WHERE id = ?',[username,password,id],  function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        res.redirect('/views');

    });

};
