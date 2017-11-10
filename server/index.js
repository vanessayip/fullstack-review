const express = require('express');
let app = express();
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const api = (require('../helpers/github.js'));
const db = (require('../database/index.js'));
// const db = Promise.promisifyAll(require('../database/index.js'));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res, next) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('inside post /repos');
  console.log('req.body.username:', req.body);
  
  // api.getReposByUsername(req.body.username, function (err, result) {
  //   //what to do with the data that comes back
  //   console.log('err:', err);
  //   console.log('made it back to post after db save: ', result);
  // });
  return api.getReposByUsername(req.body.username)
    .then((repos) => {
      console.log('in post after github request')
      return db.save(repos)
    })
    .then((result) => {
      console.log('result in post:', result);
      return db.findTop25();
    })
    .then((result) => {
      console.log('inside post after top25');
      res.send(result);
    })
    .catch((error) => {
      console.log('error in post: ', error)
    })
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  console.log('inside get repos')
  db.findTop25()
    .then((result) => {
      console.log('result from top25: ', result);
      res.send(result);
    })
    .catch((error) => {
      console.log('error from top25: ', error);
    })
  // console.log('inside get /repos');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

