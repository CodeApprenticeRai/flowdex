const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

// some express essentials / good-to-haves
const bodyParser = require('body-parser');
const path = require('path');

app.use( require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
var sql_all_sightings = `select * from sightings`;
// var sql_update_sighting = `update sightings
//   set ? = ?
//   where id = ?`;
// var sql_get_sighting_id = `select id from sighting where name=? and lower(person)=lower(?) and date=? and lower(sighted)=lower(?)`

// ----------------------------




// API Paths
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
  if ( req.body.columnToUpdate == "id" ){
    res.status(403).json({ error: "Fuck you. : )"});
    next(); 
  }

  let query = `update sightings
    set ${ req.body.columnToUpdate } = ?
    where id = ?`;
  db.run( query, [ req.body.updatedValue, req.body.sightingID ], (err) => {
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
