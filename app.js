var express = require('express');
var app = express();

app.configure(function() {
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
    /* res.render(__dirname + "/public/views/index.jade", {layout: false}); */
    res.render('index.jade', {layout: false});
});

app.listen(8080);
