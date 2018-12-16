const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

// some express essentials / good-to-haves
const bodyParser = require('body-parser');
const path = require('path');

app.use( require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ----------------------------


// db setup / config
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('././databases/flowers.db', (err) => {
  if (err) {
    return console.error( err.message );
  }
  console.log('Connected to database succesfully');
});

// db.close( (err) => {
//   if (err) {
//     return console.error( err.message );
//   }
//   console.log('The database connection is closed');
// })

// ----------------------------


// SQL Statesments
var sql_all_sightings = `select * from sightings order by sighted desc`;
// var sql_update_sighting = `update sightings
//   set ? = ?
//   where id = ?`;
// var sql_get_sighting_id = `select id from sighting where name=? and lower(person)=lower(?) and date=? and lower(sighted)=lower(?)`

// ----------------------------





// API Paths
// app.use( express.static('dist') )

app.get('/index_bundle.js', (req, res, next ) => res.sendFile('./dist/index_bundle.js', {root: __dirname}));

app.get('/', (req, res, next) => {
  res.sendFile('./dist/index.html', {root: __dirname });
})

// app.listen( 8080, console.log("app listening on localhost:8080") );




app.get('/sightings', (req, res) => {
  let query  = sql_all_sightings
  db.all( query, [], (err, rows) => {
      if (err){
        throw err;
      }
      // console.log(rows);
      res.json( rows );
    });
});

app.post('/sightings', (req, res, next) => {
  let query = `insert into sightings(name, person, location, sighted) values ( ?, ?, ?, ?)`;
  // console.log( req.body );
  db.run ( query, [ req.body.sighting.NAME, req.body.sighting.PERSON, req.body.sighting.LOCATION, req.body.sighting.SIGHTED ], (err) =>{
    if (err){
      // console.log(err);
      res.status(500).json({ error: 'Looks like a bad db query.'});
      return console.error( err.message );
    }
    console.log(`Row(s) updated: ${this.changes}`);
    res.status(200).send();
  });
});

app.put('/sightings', (req, res, next) => {
  console.log( req.body.sighting, req.body.sightingID );
  let query = `update sightings
    set NAME=?,
    PERSON=?,
    LOCATION=?,
    SIGHTED=?
    where id=?`;
  db.run( query, [ req.body.sighting.NAME, req.body.sighting.PERSON, req.body.sighting.LOCATION, req.body.sighting.SIGHTED, req.body.sightingID ], (err) => { // #TODO: Change this to get all this information from the sighting object ( pass the object from the client )
    if (err){
      // console.log(err);
      res.status(500).json({ error: 'Looks like a bad db query.'});
      return console.error( err.message );
    }
    console.log(`Row(s) updated: ${this.changes}`);
    res.status(200).send();
  });
});

app.listen( port, console.log(`App running on http://localhost:${port}`) );
