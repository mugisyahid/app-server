const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient

//const stringify = require('json-stringify');
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
// parse application/json
app.use(bodyParser.json())
//31.220.54.100
let config = {
'apps':{
    'ip' :'localhost',
    'port':'8000',
    'description':'lalala'},
    'mongodb':{
        'ip':'localhost',
        'port':'27017',
        'dbname':'image'
    }

}

app.get('/', function(req, res) {
  res.send('Hello World! App server which serve only 2 APIs')
})

let db

let url = 'mongodb://'+config.mongodb.ip+':'+config.mongodb.port+'/'+config.mongodb.dbname

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
    app.listen(config.apps.port, config.apps.ip, function() {
      console.log('listening on ' + config.apps.ip +':'+config.apps.port)
    })
})


app.post('/apps', (req, res) => {
  db.collection('application').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send('saved to database : '+ result)
  })
})


app.get('/getapps', (req, res) => {
  db.collection('application').find().toArray(function(err, results) {
    console.log(JSON.stringify(results))
    res.send(JSON.stringify(results))
  })
})



