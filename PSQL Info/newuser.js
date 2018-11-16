// function to add new user to database, for testing on local environment
var pgp = require('pg-promise')();

const dbConfig = { // CHANGE TO YOUR LOCAL INFO
   host: 'localhost',
   port: 5432,
   database: 'dynamic_rhythm',
   user: 'sofielange98',
   password: '' // TODO: Fill in your PostgreSQL password here.
};

var db = pgp(dbConfig);

function addNewUser(user){

  db.any('SELECT count(*) from users where id = $1', [user.id])
    .then(data=>{
      console.log(data),
      console.log(data[0].count);
      if(data[0].count >= 1){
        console.log('User already in database')
      }
      else { //add user to database if they aren't already in there
      var query =
      'INSERT INTO users(id, email, name, country, uri) VALUES($1, $2, $3, $4, $5)'
      db.one( query, [user.id, user.email, user.display_name, user.country, user.uri])
        .then(data => {
          console.log(data.id); // print new user id;
        })
        .catch(function(error){
          console.log('woopsie!');
        })
      }
    })
    .catch(function(error){
      console.log('error')
    })

}
