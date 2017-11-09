const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const api = require('../helpers/github.js');


app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('inside post /repos');
  console.log('req.body.username:', req.body);
  
  api.getReposByUsername(req.body.username, function (err, result) {
    //what to do with the data that comes back
    console.log('err:', err);
    console.log('made it back to post after db save: ', result);
  });
  res.send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('inside get /repos');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

