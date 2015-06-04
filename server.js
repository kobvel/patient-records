/// <reference path="typings/node/node.d.ts"/>
var
  express = require("express"),
  path = require("path"),
  nedb = require('nedb'),
  recordsDB = "db/records.db";

var db = {

  records: new nedb({
    filename: path.join(global.appData, recordsDB),
    autoload: true
  })
};

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'app')));
});

app.get('/api', function(req, res) {
  res.send('API is running');
});

app.get('/records', function(req, res) {
  db.records.find({}).sort({
    date_add: -1
  }).exec(function(err, result) {
    res.send(result);
  });
});

app.post('/records', function(req, res) {
  var item = req.body;
  item.date_add = new Date;
  db.records.insert(item, function(err, result) {
    if (err) {
      res.send({
        'error': 'An error has occurred'
      });
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.send(result);
    }
  });
});

app.delete('/records/:id', function(req, res) {
  var id = req.params.id;
  db.records.remove({
    _id: id
  }, {}, function(err, result) {
    if (err) {
      res.send({
        'error': 'An error has occurred - ' + err
      });
    } else {
      console.log('' + result + ' document(s) deleted');
      res.send(req.body);
    }
  });
});

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));